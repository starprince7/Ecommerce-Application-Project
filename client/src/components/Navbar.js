import React, {useContext} from 'react'
import { Link, withRouter } from 'react-router-dom'

import {AppContext} from '../App'
import cartImage from './img/shopping-cart2.png'
import './navbar.css'

function Navbar(props) {
    const{cart} = useContext(AppContext)

    console.log(props)
    return (
        <nav className=" pink darken-4">
            <div className="nav-wrapper container">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="#">Men's</Link></li>
                <li><Link to="#">Women</Link></li>
            </ul>
            <Link className="right" to="/cart">
                <div className="cart__num-wrapper">
                <img src={cartImage} alt="cart" />
                <div className="cart_number deep-purple darken-4 white-text">{cart.length}</div>
                </div>
            </Link>
        </div>
        </nav>
    )
}

export default withRouter(Navbar)
