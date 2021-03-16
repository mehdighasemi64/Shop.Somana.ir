import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Container, Row, Col, Button, InputGroup, Form, FormControl, Image } from 'react-bootstrap'
import { Redirect } from 'react-router'
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import { Link } from 'react-router-dom';

export default function MyShoppingManagement() {

    const ref = useRef(null);

    useEffect(() => {
        BindGridManagement();
    }, []);

    const txtOrderId = useRef(null);
    const txtPrice = useRef(null);
    const txtDate = useRef(null);
    const txtDescription = useRef(null);

    const [show, setShow] = useState(false);

    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps

    const dispatch = useDispatch();// This is mapDispatchToProps
    let CartList = [];
    const [rows, setrows] = useState([]);

    const columns = [
        { key: 'num', name: '#', width: 10, resizable: "true", sortable: "true", dragable: "true" },
        { key: 'OrderId', name: 'OrderId' },
        { key: 'Price', name: 'Price' },
        { key: 'OrderDate', name: 'OrderDate' },
        { key: 'Description', name: 'Description' },
        { key: 'OrderStatusName', name: 'Status' }

    ];

    function BindGridManagement() {

        debugger;
            fetch('http://localhost:5000/api/Order/ManageShopping/', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(response => response.json())
            .then(response => setrows(response))
            .catch(e => alert(e));
    }

    function onRowSelected(row) {
        alert(rows[row].OrderDate);
        txtOrderId.current.value = rows[row].OrderId;
        txtPrice.current.value = rows[row].Price;
        txtDate.current.value = rows[row].OrderDate;
        txtDescription.current.value = rows[row].Description;
        if (rows[row].OrderStatusId == 3) {
            setShow(true);
        }
    }


    function DeliveryDone() {

        debugger;
            fetch('http://localhost:5000/api/DeliveryOrder/DeliveryDone/', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(txtOrderId.current.value)
        })
            .then(response => response.json())
            .then(response => BindGridManagement())
            .then(setShow(false))
            .catch(e => alert(e));
    }

    return (
        <div id="parentDivOfGrid" style={{border:"solid" , borderColor:"#dd00dd", backgroundColor:"antiquewhite"}}>
            { (dsUser.items == "") && (
                <Redirect to="/"> </Redirect>
            )}
            <br />
            <Container>
                <Row>
                    <Col>
                        <h6>Manage Customer Shopping({rows.length} items) </h6>
                    </Col>
                </Row>
                <br />              
                <Row>
                    <Col>
                        <ReactDataGrid
                            columns={columns}
                            rows={rows}
                            enableCellSelect={true}
                            enableRowSelect
                            onRowClick={row => onRowSelected(row)}
                        />
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>OrderId</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtOrderId}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtPrice}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Date</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtDate}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Description</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtDescription}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {show ? <Button hide={true} variant="warning" onClick={DeliveryDone}>Delivery Done</Button> : null}
                    </Col>                   
                </Row>
                <br></br>
            </Container>
        </div>
    );
}






