import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Naira from 'react-naira'

import { AppContext } from "../App";
import "./product.css";

function Home() {
  const { state, stateDispatch, cartDispatch } = useContext(AppContext);
  const { products } = state;
  // console.log('Products From Context =======>', state.products)
  useEffect(() => {
    stateDispatch({
      type: 'SET_LOADING',
      payload: true
    })
    //"https://jsonplaceholder.typicode.com/posts"

    const fetchData = async () => {
      try {
        const res = await axios("https://fakestoreapi.com/products");
        if (res) {
          stateDispatch({
            type: 'SET_LOADING',
            payload: false
          })
            stateDispatch({
              type: "ADD_PRODUCTS",
              payload: res.data,
            });
        }       
      } catch (err) {
        console.log(err);
        stateDispatch({
          type: "SET_ERROR",
        });
      }
    };
    fetchData();
  }, []);

  const addToCart = (id, title, image, price, quantity = 1) => {
    // alert();
    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {id, title, image, price, quantity}
    })
  };

  console.log("check if it came in!!!", products);
  const ProductList = products.map(
    ({ id, title, price, description, image }) => {
      return (
        <div key={id} className="col s12 m6 l4">
          <div className=" card medium z-depth-0 horizontal product__card">
            <div className="card-stacked">
              <div className="card-content">
                <Link className="left-align" to={"/" + id}>
                  <div className=" deep-purple-text darken-4"> {title} </div>
                </Link>
                <div className="card-action">
                  <span className="product__price"><Naira>{price}</Naira></span>
                  <div onClick={() => addToCart(id, title, image, price)}>
                    <Link
                      className="btn-small product__button deep-purple darken-3 white-text waves-effect waves-light  z-depth-2"
                      to="#"
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-image valign-wrapper">
              <div className="card-content">
                <img className="Product__image" src={image} alt="product" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
  return (
    <div>
      <div className="product__banner">
        <img
          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://www.idesignibuy.com/wp-content/uploads/2017/08/banner-bg.png"
          alt="product banner"
        />
      </div>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          {ProductList}
        </div>
      </div>
    </div>
  );
}

export default Home;
