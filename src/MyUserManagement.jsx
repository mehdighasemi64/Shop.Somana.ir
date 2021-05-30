import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Container, Row, Col, Button, InputGroup, Form, FormControl, Image } from 'react-bootstrap'
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

export default function MyUserManagement() {

    const ref = useRef(null);

    useEffect(() => {
        BindGridUsers();
    }, []);

    const txtUserId = useRef(null);
    const txtUserName = useRef(null);
    const txtFirstName = useRef(null);
    const txtLastName = useRef(null);
    const txtMobile = useRef(null);
    const txtEmail = useRef(null);
    const txtPassword = useRef(null);
    const txtAddress = useRef(null);

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();// This is mapDispatchToProps
    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps

    const [rows, setrows] = useState([]);

    const columns = [
        { key: 'num', name: '#', width: 10, resizable: "true", sortable: "true", dragable: "true" },
        { key: 'UserId', name: 'UserId' },
        { key: 'UserName', name: 'UserName' },
        { key: 'FirstName', name: 'FirstName' },
        { key: 'LastName', name: 'LastName' },
        { key: 'Mobile', name: 'Mobile' },
        { key: 'Email', name: 'Email' },
        { key: 'Password', name: 'Password' },
        { key: 'Address', name: 'Address' }

    ];

    function BindGridUsers() {

        debugger;
        //fetch('http://localhost:5000/api/User/AllUsers/', {
        fetch('http://shop.somana.ir/api/User/AllUsers/', {

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
        alert(rows[row].FirstName);

        txtUserId.current.value = rows[row].UserId;
        txtUserName.current.value = rows[row].UserName;
        txtFirstName.current.value = rows[row].FirstName;
        txtLastName.current.value = rows[row].LastName;
        txtMobile.current.value = rows[row].Mobile;
        txtEmail.current.value = rows[row].Email;
        txtPassword.current.value = rows[row].Password;
        txtAddress.current.value = rows[row].Address;
        setShow(true);
    }

    function DeleteUser() {

        debugger;
        //fetch('http://localhost:5000/api/User/DeleteUser/', {
        fetch('http://shop.somana.ir/api/User/DeleteUser/', {

            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(txtUserId.current.value)
        })
            .then(response => response.json())
            .then(response => BindGridUsers())
            .then(response => ClearForm())
            .then(setShow(false))
            .catch(e => alert(e));
    }

    function UpdateUser() {

        var User = {
            UserId: txtUserId.current.value,
            UserName: txtUserName.current.value,
            FirstName: txtFirstName.current.value,
            LastName: txtLastName.current.value,
            Mobile: txtMobile.current.value,
            Email: txtEmail.current.value,
            Password: txtPassword.current.value,
            Address: txtAddress.current.value
        }

        debugger;
        //fetch('http://localhost:5000/api/User/UpdateUser/', {
        fetch('http://shop.somana.ir/api/User/UpdateUser/', {

            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(User)
        })
            .then(response => response.json())
            .then(response => BindGridUsers())
            .then(response => ClearForm())
            .then(setShow(false))
            .catch(e => alert(e));
    }

    function ClearForm() {
        txtUserId.current.value = "";
        txtUserName.current.value = "";
        txtFirstName.current.value = "";
        txtLastName.current.value = "";
        txtMobile.current.value = "";
        txtEmail.current.value = "";
        txtPassword.current.value = "";
        txtAddress.current.value = "";
    }

    return (
        <div id="parentDivOfGrid" style={{ border: "solid", borderColor: "#dd00dd", backgroundColor: "antiquewhite" }}>
            { (dsUser.items == "") && (
                <Redirect to="/"> </Redirect>
            )}
            <br />
            <Container>
                <Row>
                    <Col>
                        <h6>Manage Users({rows.length} items) </h6>
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
                            // onRowClick={row => alert(row)}
                            onRowClick={row => onRowSelected(row)}
                        />
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>UserId</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtUserId}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>UserName</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtUserName}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>FirstName</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtFirstName}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>LastName</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtLastName}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Mobile</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtMobile}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtEmail}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    required
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtPassword}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
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
                                    aria-describedby="inputGroupPrepend"
                                    ref={txtAddress}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {show ? <Button hide={true} variant="warning" onClick={DeleteUser}>Delete</Button> : null}
                        {show ? <Button hide={true} variant="primary" onClick={UpdateUser}>Update</Button> : null}
                    </Col>
                </Row>
                <br></br>
            </Container>
        </div>
    );
}






