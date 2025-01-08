import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productAction'; // Add clearErrors here
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import { toast } from "react-toastify"; // Import toastify
import MetaData from '../layout/MetaData.js';
import { addItemsToCart } from '../../actions/cartAction.js';

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id)); // Fetch product details when component mounts
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" }); // Show error as toast notification
      dispatch(clearErrors()); // Clear error after displaying it
    }
  }, [error, dispatch]); // Run whenever `error` changes

  const options = product && product.ratings !== undefined ? {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: 25,
    isHalf: true,
    value: product.ratings,
  } : null;

  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () =>{
    if(product.Stock <= quantity){
        return;
    }
    const qty = quantity+1;
    setQuantity(qty)
  }

  const decreaseQuantity = () =>{
    if(quantity <= 1){
      return;
  }
    const qty = quantity-1;
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity)); // Use 'id' from useParams
    toast.success("Item Added to Cart");
};


  return (
    <>
      {loading ? (
        <Loader /> // Show loader while fetching product details
      ) : (
        <>
        <MetaData title= {`${product.name} -- DeadStock`}/>
          <div className="ProductDetails">
            <div className="dv">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="detailss">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type='number' value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button>Submit Review</button>
            </div>
          </div>

          <h3 className="ReviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className='noReviews'>No reviews yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
