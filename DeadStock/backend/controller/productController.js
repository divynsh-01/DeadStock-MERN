const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");


// Create product -- admin
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    })
})

// Get all products

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;

    // Step 1: Apply search and filter without executing the query
    const apiFeature = new Apifeatures(Product.find(), req.query).search().filter();

    // Step 2: Get the filtered count without executing the query (only count documents)
    const filteredProductsCount = await apiFeature.query.clone().countDocuments();

    // Step 3: Apply pagination (after counting, we apply pagination)
    apiFeature.pagination(resultPerPage);

    // Step 4: Execute the final query after pagination
    const products = await apiFeature.query;

    // Step 5: Get the total count of all products (unfiltered count)
    const productCount = await Product.countDocuments();

    // Step 6: Return the response
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
        paginationNeeded: filteredProductsCount > resultPerPage,  // Show pagination flag
    });
});





// Get single product detail

exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success:true,
        product
    });
})


// Update product -- admin

exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})


//Delete product -- admin

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Pdt deleted successfully"
    })
})



// Create or Update Review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

    const {rating, comment, productId} = req.body 

    const review = {
        user:req.user.id,
        name:req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString() === req.user._id.toString()){

                rev.rating=rating,
                rev.comment=comment
            }
        })

    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    }) 

    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave : false})

    res.status(200).json({
        success:true
    })

})



// Get reviews of a product
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})


//Delete a review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const { id, productId } = req.query; // `id` here refers to the review's `_id`, not the user's id.

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Filter out the review to be deleted
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== id);

    // Recalculate the average rating
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = reviews.length > 0 ? avg / reviews.length : 0;
    const numOfReviews = reviews.length;

    // Update the product with the new reviews array
    await Product.findByIdAndUpdate(
        productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
});
