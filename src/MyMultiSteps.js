import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { Link } from "react-router-dom";
import MultiStep from 'react-multistep'
import MyShoppingCartDetails from './MyShoppingCartDetails';
import MyShippingDetails from './MyShippingDetails';
import MyPrePayment from './MyPrePayment';


const steps = [
    { name: 'ConfirmCartDetails' , component: <MyShoppingCartDetails /> },
    { name: 'ConfirmDeliveryDetails' , component: <MyShippingDetails /> ,  },
    { name: 'Payment', component: <MyPrePayment /> , }
]

const prevStyle = { 'background': '#33c3f0', 'border-width': '2px'}
const nextStyle = { 'background': '#33c3f0', 'border-width': '2px'}


 export default function () {

    useEffect(() => {

    }, []);


    return (
        <div style={{backgroundColor:"lightgray" , textAlign:"center"}}>
            <MultiStep steps={steps} showNavigation={true} prevStyle={prevStyle} nextStyle={nextStyle} />            
        </div>
    );
}
