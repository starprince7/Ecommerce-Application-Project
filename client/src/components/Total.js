import React, { useState, useContext } from "react";
import Naira from "react-naira";
import { withRouter } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AppContext } from "../App";

import "./total.css";
import Axios from "axios";
import Stripe_logo from "./img/stripe-pay.png";

function Total(props) {
  const { cart, history } = props;
  const { stateDispatch } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("NG");

  const handleChangeName = (e) => {
    // console.log("event target=====",e.target.value)
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    // console.log("event target=====",e.target.value)
    setEmail(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleChangeState = (e) => {
    setState(e.target.value);
  };
  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const subTotal = cart.reduce((acc, elem) => {
    if (elem.quantity >= 0) {
      return acc + elem.price * elem.quantity;
    } else return null;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    stateDispatch({
      type: "SET_LOADING",
      payload: true,
    });

    const billingDetails = {
      name,
      email,
      address: {
        city,
        state,
        country,
      },
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });
    console.log(paymentMethod || error);

    if (error) {
      stateDispatch({
        type: "SET_LOADING",
        payload: false,
      });
      alert(error.message);
    } else {
      const { id } = paymentMethod;

      const Total = subTotal * 100;

      console.log("The Amount Passed=========>>>>", Total);

      try {
        const res = await Axios.post("/api/charges", { id, amount: Total });

        // The "data" Object has the "client secret!"
        const { data } = res;
        data && console.log("New Res>>>>>>>", res.data.message);
        if (data) {
          try {
            const response = await stripe.confirmCardPayment(data, {
              payment_method: id,
            });

            stateDispatch({
              type: "SET_LOADING",
              payload: false,
            });

            console.log(
              "From confirmed card======",
              response.paymentIntent.status
            );

            alert("Payment Successful!");
            localStorage.removeItem("cart");
            history.push("/");
          } catch (err) {
            console.log("Error Response From server ===============>", err);
          }
        }
      } catch (err) {
        console.log("Check this error", err.message);
        stateDispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }

      // alert("Payment Error!");
    }
  };

  return (
    <div className="card__form">
      <br></br>
      <br></br>
      <div className="card z-depth-0 horizontal">
        <h4>
          Subtotal: - <Naira>{subTotal}</Naira>{" "}
        </h4>
      </div>
      <br></br>
      <div className="stripe_card_container container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleChangeName}
            required
          />
          <br></br>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChangeEmail}
            required
          />
          <br></br>
          <input
            type="text"
            placeholder="city"
            name="city"
            onChange={handleChangeCity}
            required
          />
          <br></br>
          <input
            type="text"
            placeholder="state"
            name="state"
            onChange={handleChangeState}
            required
          />
          <br></br>
          <input
            id="upper_case"
            type="text"
            value={country}
            placeholder="Country Example ( NG )"
            name="country"
            onChange={handleChangeCountry}
            maxLength="2"
            required
          />
          <br></br>
          <CardElement />
          <br></br>
          <br></br>
          <button
            className="btn-large  waves-effect waves-light green light-green darken-2 white-text"
            type="submit"
            disabled={!stripe}
          >
            pay
          </button>
          <br></br>
          <div className="stripe_logo_container">
            <img src={Stripe_logo} alt="stripe-logo" />
          </div>
          <div className="Test_details">
            <p>
              <strong>Note: use test card below to make payment!</strong>
            </p>
            <p>
              <strong>4242 4242 4242 4242</strong>
            </p>
            <p>
              <strong>MM-YY: 04/42, CVC: 424, ZIP: 100001</strong>
            </p>
          </div>
        </form>
      </div>
      <br></br>
    </div>
  );
}

export default withRouter(Total);
