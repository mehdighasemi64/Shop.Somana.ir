import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Container, Row, Col, Button, InputGroup, Form, FormControl, Image, ButtonGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function MyShippingDetails() {
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
    const [ShowButtonShipping, setShowButtonShipping] = useState(true);
    const [ShowButtonPayment, setShowButtonPayment] = useState(false);

    const txtName = useRef(null);
    const txtLastName = useRef(null);
    const txtAddress = useRef(null);
    const txtMobile = useRef(null);
    const txtZip = useRef(null);
    const txtDate = useRef(null);
    const txtTime = useRef(null);
    const txtDescription = useRef(null);

    function ConfirmShippingDetails() {
        let user = {
            DeliveyOrderId: "0",
            Name: txtName.current.value,
            LastName: txtLastName.current.value,
            CellPhone: txtMobile.current.value,
            Address: txtAddress.current.value,
            ZipCode: txtZip.current.value,
            DesireDateTime: txtDate.current.value + ' ' + txtTime.current.value,
            Description: txtDescription.current.value
        }
        debugger;
            //fetch('http://localhost:5000/api/DeliveryOrder/RegisterDeliveryOrder', {
                fetch('http://shop.somana.ir/api/DeliveryOrder/RegisterDeliveryOrder', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .catch(e => alert(e));
        setShowButtonShipping(false);
        setShowButtonPayment(true);
    }

    function Payment() {
        alert('payment method');
        let Pay = {
            Name: txtName.current.value + txtLastName.current.value,
            Email: dsUser.items[0].Mobile,
            Mobile: txtMobile.current.value,
            Price: dsCart.total,
            Description: "description",
            OrderId: sessionStorage.getItem('sessionStorageOrderId')
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
            .then(response => response != "no" ? window.location.href = "https://www.zarinpal.com/pg/StartPay/" + response : alert("خطایی در ثبت اطلاعات به وحود آمده است.لطفا دوباره تلاش نماید!. "))
            .catch(e => alert(e));
    }

    return (
        <Container style={{ border: "solid", borderColor: "#dd00dd", backgroundColor:"antiquewhite" }}>
            {/* <Row>
                <Col>
                    <h6>Please Fill Order Form</h6>
                    <span>Details of delivery</span>
                </Col>
            </Row> */}

            <span>Details of delivery</span>

            <br></br>
            <br></br>
            <Row>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Name</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                aria-describedby="inputGroupPrepend"
                                ref={txtName}
                                value={dsUser.items[0].FirstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Receiever Name.
                  </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Last Name</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last Name"
                                aria-describedby="inputGroupPrepend"
                                ref={txtLastName}
                                value={dsUser.items[0].LastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Receiever Last Name.
                    </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
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
                                value={dsUser.items[0].Address}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Receving Address.
              </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Cell Phone</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Cell Phone"
                                aria-describedby="inputGroupPrepend"
                                ref={txtMobile}
                                value={dsUser.items[0].Mobile}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Receiever Cell Phone.
                  </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Zip Code</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Zip Code"
                                aria-describedby="inputGroupPrepend"
                                ref={txtZip}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Receiever Zip Code.
                    </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Desire Date</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="2020-02-20"
                                aria-describedby="inputGroupPrepend"
                                ref={txtDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Select Desire Date of Delivery.
                  </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Desire Time</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="18:30"
                                aria-describedby="inputGroupPrepend"
                                ref={txtTime}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Select Desire Time of Delivery.
                    </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Description</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="textarea" rows="3"
                                required
                                type="text"
                                placeholder="Note"
                                aria-describedby="inputGroupPrepend"
                                ref={txtDescription}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Any Note About Your Order.
              </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <div style={{ textAlign: "center" }}>
                <br />
                <ButtonGroup>
                    {ShowButtonShipping ? <Button hide={true} variant="info" onClick={ConfirmShippingDetails}>Confirm Shipping Details</Button> : null}
                    {/* {ShowButtonPayment ? <Button hide={true} variant="success" onClick={Payment}>Payment</Button> : null} */}
                </ButtonGroup>
                <br></br>
                <br></br>
            </div>
        </Container>
    );
}






