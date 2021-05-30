import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Container, Row, Col, Button, InputGroup, Form, FormControl, Image, FormFile } from 'react-bootstrap'
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

import axios from 'axios';

export default function MyProductManagement() {

    const ref = useRef(null);
    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps

    useEffect(() => {
        BindDropDownProductCategory();
        BindDropDownCountry();
        BindGridProducts();
    }, []);

    const txtProductId = useRef(null);
    const txtProductName = useRef(null);
    const txtPrice = useRef(null);
    const txtQuantity = useRef(null);
    const ddlCountry = useRef(null);
    const txtDescription = useRef(null);
    const fileImage = useRef(null);
    const ddlProductCategory = useRef(null);
    const ddlProductSubCategory = useRef(null);

    const [show, setShow] = useState(false);
    const [DropDownCategory, setDropDownCategory] = useState([]);
    const [DropDownCountry, setDropDownCountry] = useState([]);
    const [selectedCategory, setselectedCategory] = useState(0);
    const [selectedSubCategory, setselectedSubCategory] = useState(0);

    const dispatch = useDispatch();// This is mapDispatchToProps

    const [rows, setrows] = useState([]);

    const columns = [
        { key: 'num', name: '#', width: 10, resizable: "true", sortable: "true", dragable: "true" },
        { key: 'ProductId', name: 'ProductId' },
        { key: 'ProductName', name: 'ProductName' },
        { key: 'Price', name: 'Price' },
        { key: 'Quantity', name: 'Quantity' },
        {
            key: 'ImageContent', name: 'Images',
            formatter: ({ row }) => ImageFormatter(row)

        },
        { key: 'Country', name: 'Country' },
        { key: 'Description', name: 'Description' }
    ]

    function ImageFormatter(row) {

        return (
            <img src={`data:image/jpg;base64,${row.ImageContent}`} style={{ width: "50px", height: "50px" }} />
        )
    }

    function BindDropDownProductCategory() {
        debugger;
        // fetch('http://localhost:33512/api/Category/AllProductCategory', {
        //fetch('http://localhost:5000/api/Category/AllProductCategory/', {
        fetch('http://shop.somana.ir/api/Category/AllProductCategory/', {

            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(result => result.json())
            .then(result => setDropDownCategory(result))
    }

    function BindDropDownCountry() {
        debugger;
        // fetch('http://localhost:5000/api/Country/AllCountry/', {
        fetch('http://shop.somana.ir/api/Country/AllCountry/', {

            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(result => result.json())
            .then(result => setDropDownCountry(result))
    }

    function BindGridProducts() {

        debugger;
        //fetch('http://localhost:5000/api/Product/AllProduct/', {
        fetch('http://shop.somana.ir/api/Product/AllProduct/', {
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

        txtProductId.current.value = rows[row].ProductId;
        txtProductName.current.value = rows[row].ProductName;
        txtPrice.current.value = rows[row].Price;
        txtQuantity.current.value = rows[row].Quantity;
        ddlCountry.current.value = rows[row].CountryId;
        ddlProductCategory.current.value = rows[row].ProductCategoryId;
        txtDescription.current.value = rows[row].Description;
        //fileImage.current.value = rows[row].Image
        setShow(true);
    }

    function DeleteProduct() {

        debugger;
        //fetch('http://localhost:5000/api/Product/DeleteProduct/', {
            fetch('http://shop.somana.ir/api/Product/DeleteProduct/', {

            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(parseInt(txtProductId.current.value))
        })
            .then(response => response.json())
            .then(response => BindGridProducts())
            .then(response => ClearForm())
            .then(setShow(false))
            .catch(e => alert(e));
    }

    async function UpdateProduct() {
        debugger;

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        var files = [];
        files = fileImage.current.files[0];

        let image = {};

        var title = "";
        var data = {};
        if (files != undefined) {
            title = files.name;
            image = {
                ImageName: title,
                Content: await toBase64(files),
            }
        }
        else {
            image = {
                ImageName: title,
                Content: null,
            }
        }

        let product = {
            ProductId: parseInt(txtProductId.current.value),
            ProductName: txtProductName.current.value,
            Price: parseInt(txtPrice.current.value),
            Quantity: parseInt(txtQuantity.current.value),
            CountryId: parseInt(ddlCountry.current.value),
            Description: txtDescription.current.value,
            ProductCategoryId: parseInt(ddlProductSubCategory.current.value)
        };

        let ProductImage = {
            image: image,
            product: product
        }

        //  fetch('http://localhost:5000/api/Product/UpdateProduct/', {
        fetch('http://shop.somana.ir/api/Product/UpdateProduct/', {

            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(ProductImage)
        })
            .then(response => response.json())
            .then(response => BindGridProducts())
            .then(response => ClearForm())
            .then(setShow(false))
            .catch(e => alert(e));
    }

    function handleChangeCategory(e) {
        setselectedCategory(e.target.value)
    }

    function handleChangeSubcatgory(e) {
        setselectedSubCategory(e.target.value)
    }

    // function RegisterProduct() {
    //     alert('register product')
    //     debugger;
    //     //let files = [];
    //     let files = fileImage.current.files[0];
    //     var formData = new FormData();
    //     formData.append("file", files);

    //     var Product = {
    //         ProductId: txtProductId.current.value,
    //         ProductName: txtProductName.current.value,
    //         Price: txtPrice.current.value,
    //         Quantity: txtQuantity.current.value,
    //         Country: txtCountry.current.value,
    //         Description: txtDescription.current.value,
    //         ProductImage: formData
    //     }

    //     debugger;

    //     axios.post("http://localhost:33512/api/Product/RegisterProduct", formData, {
    //         headers: {
    //             // "Accept": "application/json",
    //             //  "Content-Type": "application/json; charset=utf-8"
    //             "Content-Type": "multipart/form-data"
    //         }
    //     });


    async function RegisterProduct() {
        alert('register product');
        debugger;
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        var files = [];
        files = fileImage.current.files[0];
        var title = files.name;

        let image = {
            ImageName: title,
            Content: await toBase64(files),
        }

        let product = {
            // ProductId: txtProductId.current.value,
            ProductName: txtProductName.current.value,
            Price: parseInt(txtPrice.current.value),
            Quantity: parseInt(txtQuantity.current.value),
            CountryId: parseInt(ddlCountry.current.value),
            Description: txtDescription.current.value,
            ProductCategoryId: parseInt(ddlProductSubCategory.current.value)
        };

        let ProductImage = {
            image: image,
            product: product
        }

        //  fetch('http://localhost:5000/api/Product/RegisterProduct/', {
        fetch('http://shop.somana.ir/api/Product/RegisterProduct/', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(ProductImage)
        })
            .then(response => response.json())
            .then(response => BindGridProducts())
            .then(response => ClearForm())
            .then(setShow(false))
            .catch(e => alert(e));
    }

    function ClearForm() {
        txtProductId.current.value = "";
        txtProductName.current.value = "";
        txtPrice.current.value = "";
        txtQuantity.current.value = "";
        ddlCountry.current.value = "";
        txtDescription.current.value = "";
    }
    return (
        <div id="parentDivOfGrid" style={{ border: "solid", borderColor: "#dd00dd", backgroundColor: "antiquewhite" }}>
            {(dsUser.items == "") && (
                <Redirect to="/"> </Redirect>
            )}
            <br />
            <Container>
                <Row>
                    <Col>
                        <h6>Manage Products({rows.length} items) </h6>
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
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>ProductId</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        ref={txtProductId}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>ProductName</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        ref={txtProductName}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Product Category</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        as="select"
                                        required
                                        type="dropdown"
                                        aria-describedby="inputGroupPrepend"
                                        ref={ddlProductCategory}
                                        onChange={handleChangeCategory}
                                        value={selectedCategory}
                                    >
                                        <option value={0}>Please select a category</option>
                                        {DropDownCategory.filter(x => x.ParentId == null).map(x => <option key={x.ProductCategoryId} value={x.ProductCategoryId}> {x.ProductCategoryName}</option>)}

                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Product SubCategory</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        as="select"
                                        required
                                        type="dropdown"
                                        aria-describedby="inputGroupPrepend"
                                        ref={ddlProductSubCategory}
                                        onChange={handleChangeSubcatgory}
                                    >
                                        <option value={0}>Please select a Subcategory</option>
                                        {DropDownCategory.filter(x => x.ParentId == selectedCategory).map(x => <option key={x.ProductCategoryId} value={x.ProductCategoryId}> {x.ProductCategoryName}</option>)}

                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
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
                        <Col>
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Quantity</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        ref={txtQuantity}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Country</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        as="select"
                                        aria-describedby="inputGroupPrepend"
                                        ref={ddlCountry}
                                    >
                                        <option value={0}>Please select a Country</option>
                                        {DropDownCountry.map(x => <option key={x.CountryId} value={x.CountryId}> {x.CountryName}</option>)}
                                    </Form.Control>
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
                            <Form.Group controlId="validationCustomUsername">
                                {/* <Form.Label>Image</Form.Label> */}
                                <InputGroup>
                                    {/* <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                    </InputGroup.Prepend> */}

                                    <Form.File
                                        required
                                        ref={fileImage}
                                        id="exampleFormControlFile1" label="Example file input"
                                    />

                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button hide={true} variant="success" onClick={RegisterProduct}>Register</Button>
                            {show ? <Button hide={true} variant="primary" onClick={UpdateProduct}>Update</Button> : null}
                            {show ? <Button hide={true} variant="warning" onClick={DeleteProduct}>Delete</Button> : null}
                        </Col>
                    </Row>
                    <br></br>
                </Form>
            </Container>
        </div>
    );
}






