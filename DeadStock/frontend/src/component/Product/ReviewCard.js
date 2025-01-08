import React from 'react'
import profilePng from "../../images/Profile.png"
import ReactStars from "react-rating-stars-component"

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: 25,
        isHalf: true,
        value: review.rating,
      };
  return (
    <div className='reviewCard'>
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options}/>
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
