import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Container, Row, Col, Button, InputGroup, Form, FormControl, Image, ButtonGroup, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function MyResetPassword() {

    const ref = useRef(null);
    const qs = require('query-string');
    const parsed = qs.parse(window.location.search);
    
    const username = parsed.username;
    const token = parsed.token;

    useEffect(() => {
    }, []);

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps  
    const txtPassword = useRef(null);
    const txtRepeatedPassword = useRef(null);

    function ResetPassword() {
       
        if (txtPassword.current.value == txtRepeatedPassword.current.value) {
                  fetch('http://localhost:5000/api/Credential/UpdateUser', {
        //fetch('http://localhost:33512/api/Credential/PasswordRecovery', {

            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                token: token,
                userName: username,
                password: txtPassword.current.value,
              })
        })
            .then(response => response.json())
            .then(setShowAlertSuccess(true), txtPassword.current.value="" , txtRepeatedPassword.current.value="")
            .catch(e => alert(e));
        }  
        else
        alert('Passwords are not match');
    }

    return (
        <Container style={{ border: "solid", borderColor: "#dd00dd", backgroundColor: "antiquewhite", paddingTop: "100px", paddingBottom: "100px" }}>          
            <Alert name="alertsucess" show={showAlertSuccess} variant="success" onClose={() => setShowAlertSuccess(false)} dismissible>
                You have successfully changed your password...Please login from menu.
            </Alert>
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
                                type="password"
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                ref={txtPassword}
                            />
                            <Form.Control.Feedback>
                                Please Enter Your Password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Repeat Password"
                                aria-describedby="inputGroupPrepend"
                                ref={txtRepeatedPassword}
                            />
                            <Form.Control.Feedback>
                                Please Repeat Your Password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>         
                <Col></Col> 
            </Row>

            <div style={{ textAlign: "center" }}>
                <br />
                <ButtonGroup>
                    <Button hide={true} variant="info" onClick={ResetPassword}>Submit</Button>
                    {/* {ShowButtonPayment ? <Button hide={true} variant="success" onClick={Payment}>Payment</Button> : null} */}
                </ButtonGroup>
                <br></br>
                <br></br>
            </div>
        </Container>
    );
}






