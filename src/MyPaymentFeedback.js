import React, { useState, useEffect, useRef, useReducer, useImperativeHandle } from 'react';
import { Card, CardDeck, Button, Row, Col, CardGroup } from 'react-bootstrap'
import { EmptyCartList } from './Actions';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";

export default function MyPaymentFeedback() {

    const qs = require('query-string');
    const parsed = qs.parse(window.location.search);
    const Authority = parsed.Authority;
    const Status = parsed.Status;

    const dispatch = useDispatch();// This is mapDispatchToProps

    useEffect(() => {
        HandleZarinFeedback();
    }, []);

    let result = "";

    function Success(response) {
      //  result = response;
      dispatch(EmptyCartList(null));
    }

    function Failure() {
        alert('failure in payment');
    }

    function HandleZarinFeedback() {
        
        if (Status == "OK") {
            let shop = {
                Authority: Authority
            };
            debugger;
                fetch('http://localhost:5000/api/ZarinShop/HandleZarinFeedback', {

                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(shop)
            })
                .then(response => response.json())
                .then(response => response != "NOK" ? () => {Success(response)} : { Failure })
                .catch(e => alert(e));
       }
        else {
            alert('Failure in payment')
        }
    }
    
    if (Status == "OK") {
        result =
            <div>
                <CardGroup>
                    <Card className="text-center" bg={'gray'} style={{ width: '18rem' }}>
                        <Card.Header>Payment Success</Card.Header>
                        <Card.Body>
                            <Card.Title>Congratulation</Card.Title>
                            <Card.Text>
                                <FontAwesomeIcon icon="check-square" size="10x" color="lightgreen" />
                            </Card.Text>
                            <p>You paid the bill successfully with refrence number: {Authority}</p>
                            <p>Please be patient until our colleagues contact you for delivery</p>
                        </Card.Body>
                        <Card.Footer className="text-white">
                        <Link to='/'><Button variant="dark" >Home</Button></Link>
                        </Card.Footer>
                    </Card>
                </CardGroup>
            </div>;
    }
    else {
        result =
        <div>
            <CardGroup>
                <Card className="text-center" bg={'gray'} style={{ width: '18rem' }}>
                    <Card.Header>Payment Failure</Card.Header>
                    <Card.Body>
                        <Card.Title>Sorry</Card.Title>
                        <Card.Text>
                            <FontAwesomeIcon icon="ban" size="10x" color="red" />
                        </Card.Text>
                        <p>Payment process failed with refrence number: {Authority}</p>
                        <p>Please contact our colleagues to check the details.</p>
                    </Card.Body>
                    {/* <Card.Footer className="text-white">                        
                        <Link to='/'><Button variant="dark" >Home</Button></Link>
                    </Card.Footer> */}
                </Card>
            </CardGroup>
        </div>;
    }

    return (
        <div style={{border:"solid", borderColor:"#dd00dd",backgroundColor:"antiquewhite"}}>
            {result}
        </div>
    );
}






