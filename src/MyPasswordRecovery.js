import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Container, Row, Col, Button, InputGroup, Form, FormControl, Image, ButtonGroup, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function MyPasswordRecovery() {
    const ref = useRef(null);

    useEffect(() => {
    }, []);

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps  
    const txtEmail = useRef(null);

    function ResetPassword() {
        let user = {
            email: txtEmail.current.value
        }
        debugger;
        fetch('http://shop.somana.ir/api/Credential/PasswordRecovery', {
        //fetch('http://localhost:5000/api/Credential/PasswordRecovery', {
       // fetch('http://localhost:33512/api/Credential/PasswordRecovery', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(setShowAlertSuccess(true) , txtEmail.current.value="")
            .catch(e => alert(e));
    }

    return (
        <Container style={{ border: "solid", borderColor: "#dd00dd", backgroundColor: "antiquewhite", paddingTop: "100px", paddingBottom: "100px" }}>
            <Alert name="alertsucess" show={showAlertSuccess} variant="success" onClose={() => setShowAlertSuccess(false)} dismissible>
                Password reset link has sent to your email..please check and click on the link inside your email.
            </Alert>
            <br></br>
            <br></br>
            <Row style={{ textAlign: "center" }}>
                <Col></Col>
                <Col>
                    Please enter your email.
                </Col>
                <Col></Col>
            </Row>
            <br />
            <Row>
                <Col></Col>
                <Col style={{ textAlign: "center", width: "200px" }}>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Email"
                                aria-describedby="inputGroupPrepend"
                                ref={txtEmail}
                            />
                            <Form.Control.Feedback>
                                Please Enter Your Email.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col></Col>

            </Row>
            <div style={{ textAlign: "center" }}>
                <br />
                <ButtonGroup>
                    <Button hide={true} variant="info" onClick={ResetPassword}>Reset Password</Button>
                    {/* {ShowButtonPayment ? <Button hide={true} variant="success" onClick={Payment}>Payment</Button> : null} */}
                </ButtonGroup>
                <br></br>
                <br></br>
            </div>
        </Container>
    );
}






