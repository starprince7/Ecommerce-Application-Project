import React, { useContext } from "react";
import Naira from 'react-naira'


import { AppContext } from "../App";
import { removeFromMyCart } from "../utility/cartUtility";
import "./cart.css";
import Total from "./Total";

function Cart() {
  const { cart, cartDispatch } = useContext(AppContext);



  const removeFromMyCart = (id) => {
    cartDispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    })
  }

  const increaseQty = (id) => {
    cartDispatch({
      type: 'INCREASE_QUANTITY',
      payload: id
    })
  }

  const decreaseQty = (id) => {
    cartDispatch({
      type: 'REDUCE_QUANTITY',
      payload: id
    })
  }


  const cartList = cart.map(({ id, title, image, price, quantity }) => {
    return (
      <div key={id} className="col s12 m12 l12">
        <div className="card  z-depth-0">
        <div className="card horizontal z-depth-0">
          <div className="card-image image-container">
            <img className="cart__image" src={image} alt="product" />
          </div>
          <div className="row">
          <div className="col l6 s12">
          <div className="card-stacked">
          <div className="card-content title">
            <p>{title}</p>
          </div>
          </div>
          </div>
          <div className="col l6 s12">
          <div className="card-content price">
            <p><Naira>{price * quantity}</Naira></p>
          </div>
          </div>
          </div>
          </div>
          <div className="card-action row">
            <div onClick={()=> removeFromMyCart(id)} className="col s6 m6 l6 remove__btn">REMOVE</div>
            <div className="col s6 m6 l6">
              <div className="Quantity-btns">
              <div onClick={() => decreaseQty(id)} className="increase-btn deep-purple darken-2 white-text">-</div>
              <div className="count">- {quantity} -</div>
              <div  onClick={() => increaseQty(id)} className="decrease-btn deep-purple darken-2 white-text">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="card horizontal">
      <h5 className="right-align">Cart - ( <strong>{cart.length ? cart.length : 0} </strong>) Items </h5>
      </div>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">         
          {cart.length > 0 ? (
            <table>
            <tbody>
              <tr>
              <th>Image</th>
              <th>Title</th>
              <th className="hide-on-med-and-down">Price</th>
              </tr>
            </tbody>
          </table>
          ) : null}
          {cart.length > 0 ? cartList : <p>You have no items in your cart!</p>}</div>
          {cart.length !== 0 ? <Total cart={cart} /> : null}
      </div>
    </div>
  );
}

export default Cart;
