import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Container, Row, Col, Button, InputGroup, Form, FormControl, Image, ButtonGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function MyPrePayment() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    useEffect(() => {
    }, []);

    //let { OrderId } = useParams();
    const dsCart = useSelector(state => state.CartReducer); // this is mapStateToProps
    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps

    function Payment() {
        let Pay = {
            Name: dsUser.items[0].FirstName + ' ' + dsUser.items[0].LastName,
            Email: dsUser.items[0].Email,
            Mobile: dsUser.items[0].Mobile,
            Price: dsCart.total,
            Description: "description",
            OrderId: parseInt(sessionStorage.getItem('sessionStorageOrderId'))
        }
        debugger;
        //fetch('http://localhost:5000/api/ZarinShop/RegisterShop/', {
        fetch('http://shop.somana.ir/api/ZarinShop/RegisterShop/', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(Pay)
        })
            .then(response => response.json())
            // .then(response => alert(response))
            .then(response => response != "nok" ? window.location.href = "https://www.zarinpal.com/pg/StartPay/" + response : alert("خطایی در ثبت اطلاعات به وحود آمده است.لطفا دوباره تلاش نماید!. "))
            .catch(e => alert(e));
    }

    return (
        <Container >
            <div style={{ textAlign: "center" }}>
                <br />
                <ButtonGroup>
                    <Button hide={true} variant="success" onClick={Payment}>Payment</Button>
                </ButtonGroup>
                <br></br>
                <br></br>
            </div>
        </Container>
    );
}






