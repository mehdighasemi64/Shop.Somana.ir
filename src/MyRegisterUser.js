import React, { useState, useEffect, useRef } from 'react';
import { initProductList, addToCartList } from './Actions';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Button, Row, Col, Form, InputGroup, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function MyRegisterUser() {

    useEffect(() => {
    }, []);

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFail, setShowAlertFail] = useState(false);
    const ref = useRef(null);
    const [validated, setValidated] = useState(false);
    const RegisterationForm = useRef(null);
    const txtName = useRef(null);
    const txtFamily = useRef(null);
    const txtUserName = useRef(null);
    const txtAddress = useRef(null);
    const txtEmail = useRef(null);
    const txtPassword = useRef(null);
    const txtPasswordConfirm = useRef(null);
    const txtMobile = useRef(null);
    const txtZip = useRef(null);
    const txtCity = useRef(null);

    const handleSubmit = (event) => {
debugger;
        const form = RegisterationForm;

        if (form.current.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

        }
        else {
            RegisterUser();
            setValidated(false);
            ClearForm();
        }
    };
    function comparePasswords(e) {
        debugger;
        if (txtPassword.current.value != txtPasswordConfirm.current.value) {
            alert('Passwords are not match');
            txtPasswordConfirm.current.value = "";
            // txtPasswordConfirm.current.focus();
            // e.preventDefault();
            // e.stopPropagation();
        }
    }

    function showStatus(xx) {
        if (xx == "somone got this user") {
            setShowAlertFail(true)
        } else {
            setShowAlertSuccess(true)
        }
    }

    function ClearForm() {
        txtUserName.current.value = "";
        txtName.current.value = "";
        txtFamily.current.value = "";
        txtMobile.current.value = "";
        txtEmail.current.value = "";
        txtPassword.current.value = "";
        txtPasswordConfirm.current.value = "";
        txtAddress.current.value = "";
        txtZip.current.value = "";
        txtCity.current.value = "";
    }

    function RegisterUser() {
        alert('this is register user')
        debugger;
        let user = {
            UserId: "0",
            UserName: txtUserName.current.value,
            FirstName: txtName.current.value,
            LastName: txtFamily.current.value,
            Mobile: txtMobile.current.value,
            Address: txtAddress.current.value,
            Password: txtPassword.current.value,
            Email: txtEmail.current.value,
            UserTypeId: 2
        }
        //fetch('http://localhost:5000/api/user/RegisterUser', {        
        fetch('http://shop.somana.ir/api/user/RegisterUser', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            //.then(response => alert(response))
            // .then(response => alert(JSON.stringify(response)))            
            // .then(response => response == "somone got this user" ? setShowAlertFail(true) : setShowAlertSuccess(true))
            .then(response => showStatus(response))
            .catch(e => alert(JSON.stringify(e)));
    }

    return (

        <div style={{ border: "solid", borderColor: "#dd00dd", padding: "20px", backgroundColor: "antiquewhite" }}>

            <Alert name="alertsucess" show={showAlertSuccess} variant="success" onClose={() => setShowAlertSuccess(false)} dismissible>
                You have successfully registered in Somana Shop...Please login from menu.
            </Alert>

            <Alert name="alertfail" show={showAlertFail} variant="secondary" onClose={() => setShowAlertFail(false)} dismissible>
                This username has taken by someone else. Please try another one.
            </Alert>

            <Form ref={RegisterationForm} noValidate validated={validated}>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First Name"
                            ref={txtName}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last Name"
                            ref={txtFamily}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                ref={txtUserName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            ref={txtPassword}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            ref={txtPasswordConfirm}
                            //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            onBlur={comparePasswords}
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters.
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Mobile</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Mobile"
                                aria-describedby="inputGroupPrepend"
                                ref={txtMobile}
                                pattern="[0-9]{11}"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a 11 digit number.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                <Form.Row>

                    <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                        <Form.Label>Address</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Address"
                                aria-describedby="inputGroupPrepend"
                                ref={txtAddress}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Your Address.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Email</Form.Label>
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
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please enter an correct email
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>


                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>City</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="City"
                                aria-describedby="inputGroupPrepend"
                                ref={txtCity}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Your City.
              </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." >
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Zip</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Zip"
                                aria-describedby="inputGroupPrepend"
                                ref={txtZip}
                                pattern="[0-9]{10}"

                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter a valid Zip code with 10 digits.
              </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>
                <Button onClick={handleSubmit}>Register</Button>
                {/* <Link to='/'><Button variant="info">Home</Button></Link> */}
            </Form>
        </div>
    );
}












