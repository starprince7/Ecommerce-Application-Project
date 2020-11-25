import React, {useState, useContext } from 'react'
import Naira from 'react-naira'
import {withRouter} from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {AppContext} from '../App'

import './total.css'
import Axios from 'axios';
import Stripe_logo from './img/stripe-pay.png'

function Total(props) {
  const { cart, history } = props;
  const {stateDispatch} = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')

  const handleChangeName = (e) => {
    // console.log("event target=====",e.target.value)
    setName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    // console.log("event target=====",e.target.value)
    setEmail(e.target.value)
  }
  const handleChangeCity = (e) => {

    setCity(e.target.value)
  }
  const handleChangeState = (e) => {
    setState(e.target.value)
  }
  const handleChangeCountry = (e) => {
    setCountry(e.target.value)
  }
    
  const subTotal = cart.reduce((acc, elem) => {
    if (elem.quantity >= 0) {
      return acc + elem.price * elem.quantity;
    } else return null;
  }, 0);
  
  const stripe = useStripe()
  const elements = useElements();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    stateDispatch({
      type: 'SET_LOADING',
      payload: true
    })

    const billingDetails = {
      name,
      email,
      address: {
        city,
        state,
        country
      }
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    });
    console.log(paymentMethod || error)

    const { id } = paymentMethod
    
    try {
      const { data } = await Axios.post('/api/charges', { id, amount: subTotal })
      // The "data" Object has the "client secret!"
      data && console.log(data) 
      if (data) {
        const confirmCardPayment = await stripe.confirmCardPayment(data, {
          payment_method: id
        })
        stateDispatch({
          type: 'SET_LOADING',
          payload: false
        })
        if (confirmCardPayment.paymentIntent.status) {
          alert('Payment Successful!')
          localStorage.removeItem("cart");
          history.push('/')
        }
        console.log( 'From confirmed card======',confirmCardPayment)
        console.log( 'From confirmed card======',confirmCardPayment.paymentIntent.status)
      }
     }
    catch (err) {
      console.log(err)
    }
  };

    return (
        <div className="">
           <div className="card z-depth-0 horizontal">
           <h3>Subtotal: - <Naira>{subTotal}</Naira> </h3>
           </div> 
           <br></br>
        <div className="stripe_card_container">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="your name" name="name" onChange={ handleChangeName } required />
            <br></br>
            <input type="text" placeholder="email" name="email" onChange={ handleChangeEmail } required />
            <br></br>
            <input type="text" placeholder="city" name="city" onChange={ handleChangeCity } required />
            <br></br>
            <input type="text" placeholder="state" name="state" onChange={ handleChangeState } required />
            <br></br>
            <input type="text" placeholder="Country Example ( NG )" name="country" onChange={handleChangeCountry}
               maxLength="2" required
            />
            <br></br>
            <CardElement />
            <br></br>
            <br></br>
            <button className="btn-large  waves-effect waves-light green light-green darken-2 white-text" type="submit" disabled={!stripe}>
              pay
              </button>
              <div className="stripe_logo_container">
              <img src={Stripe_logo} alt="stripe-logo" />
            </div>
          </form>
        </div>
        </div>
    )
}

export default withRouter(Total);
