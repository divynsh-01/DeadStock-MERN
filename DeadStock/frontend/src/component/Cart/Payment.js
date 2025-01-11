import React, { useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import axios from 'axios'
import "./Payment.css"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const Payment = () => {
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const payBtn = useRef(null)

    const {shippingInfo, cartItems} = useSelector((state)=> state.cart)
    const {user} = useSelector((state)=> state.user)
    const {error} = useSelector((state)=> state.newOrder)

    const submitHandler = () =>{
        e.preventDefault()
        payBtn.current.disabled = true;
        try {
            const config = {
                
            }
            
        } catch (error) {
            payBtn.current.disabled = false
            toast.error(error.response.data.message)
        }

    }
  return (
    <>
        <MetaData title={"Payment -- DeadStock"}/>
        <CheckoutSteps activeStep={2}/>
        <div className="paymentContainer">
            <form onSubmit={(e)=>submitHandler(e)} className="paymentForm">
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon/>
                    <CardNumberElement className='paymentInput'/>
                </div>
                <div>
                    <EventIcon/>
                    <CardExpiryElement className='paymentInput'/>
                </div>
                <div>
                    <VpnKeyIcon/>
                    <CardCvcElement className='paymentInput'/>
                </div>
                <input type="text" 
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className='paymentFormBtn'
                />
            </form>
        </div>
    
    </>
  )
}

export default Payment
