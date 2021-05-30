import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Col, Row, Button, Container } from 'react-bootstrap'
import { useParams } from "react-router";
import ReactDataGrid from 'react-data-grid';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import 'react-data-grid/dist/react-data-grid.css';

export default function MyShoppingHistory() {

    const ref = useRef(null);
    let { UserId } = useParams();

    useEffect(() => {
        BindGridShopping();
    }, []);

    const ds = useSelector(state => state.CartReducer); // this is mapStateToProps
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


    function BindGridShopping() {
        debugger;
            // fetch('http://localhost:5000/api/Order/ShoppingHistory/', {
                fetch('http://shop.somana.ir/api/Order/ShoppingHistory/', {

            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(UserId)
        })
            .then(response => response.json())
            .then(response => setrows(response))
            .catch(e => alert(e));
    }
    function onRowSelected(row) {
        alert(rows[row].OrderDate)
    }

    return (

        <div id="parentDivOfGrid" style={{ border: "solid", borderColor: "#dd00dd", backgroundColor:"antiquewhite" }}>
            {(dsUser.items == "") && (
                <Redirect to="/"> </Redirect>
            )}
            <Container>
                <br />
                <Row>
                    <Col>
                        <h6>{dsUser.items[0].FirstName+"'s"} Shopping History</h6>
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
                <Row>
                    <Col>
                        <span>You had {rows.length} shopping item</span>
                    </Col>
                </Row>
                <br></br>

            </Container>
        </div>
    );
}






