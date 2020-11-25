import React, { useContext, useEffect } from "react";
import {AppContext}  from '../App'
import './loader.css'

export default function Loader() {
    const { state } = useContext(AppContext)
    const { loading } = state
    
    useEffect(() => {
        const loader = document.querySelector('.background-loader')
    
        if (loading) {
            loader.style.display = 'block'
        }
        else {
            loader.style.display = 'none'
        }
    }, [loading])
    
  return (
    <div>
    <div className="background-loader">
        <div id="loader"></div>
    </div>
    </div>
  );
}
