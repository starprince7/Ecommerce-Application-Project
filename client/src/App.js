import React, { useReducer, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CheckOut from "./components/CheckOut";
import Cart from "./components/Cart";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { initState, productReducer } from "./Reducers/productsReducer";
import { initCart, cartReducer } from "./Reducers/cartReducer";
import Stripe from "./HOC/Stripe";
import Loader from './components/Loader'

export const AppContext = React.createContext();

function App() {
  const [state, stateDispatch] = useReducer(productReducer, initState);
  const [cart, cartDispatch] = useReducer(cartReducer, initCart, () => {
    const cartLocalStorage = localStorage.getItem("cart");
    return cartLocalStorage ? JSON.parse(cartLocalStorage) : initCart;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Stripe>
      <AppContext.Provider value={{ state, stateDispatch, cart, cartDispatch }}>
        <BrowserRouter>
          <div className="App grey lighten-4">
            <div className="navbar-fixed">
              <Navbar />
            </div>
            <Loader />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/checkout" component={CheckOut} />
              <Route path="/cart" component={Cart} />
              <Route path="/:user_id" component={PrivateRoute} />
            </Switch>
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </Stripe>
  );
}

export default App;
