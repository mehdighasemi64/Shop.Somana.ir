import React, { useState, useEffect, useRef } from 'react';
import { initProductList, addToCartList } from './Actions';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Card, CardDeck, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function MyProduct() {

    let { SearchParam } = useParams();
    const dispatch = useDispatch();// This is mapDispatchToProps
    const ds = useSelector(state => state.ProductReducer); // this is mapStateToProps
    const dsCart = useSelector(state => state.CartReducer); // this is mapStateToProps

    let ProductList = [];

    useEffect(() => {
        debugger;
        if (ds.items.length == 0) {
            BindProducts();
        }
    }, []);


    function BindProducts() {
          fetch('http://localhost:5000/api/Product/AllProduct/', {
         // fetch('http://localhost:33512/api/Product/AllProduct/', {

            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(response => response.json())
            .then(response => dispatch(initProductList(response)))
            .catch(e => alert(e));
    }

    
    function AddToCart(item) {
        debugger;
        let Item = {
            ProductId: item.ProductId,
            title: item.ProductNameEN,
            desc: item.DescriptionEN,
            quantity: 1,
            price: item.Price,
            img: item.ImageContent
        }
        var x = true;
        for (let index = 0; index < dsCart.items.length; index++) {
            if (dsCart.items[index].ProductId == Item.ProductId)
                x = false;
        }
        if (x)
            dispatch(addToCartList(Item));

    }

    // ProductList = ds.items.map(item => {
    //     return (
    //         // ngFor="let item of group"
    //         <Card className="text-center " style={{ width: '18rem' }}>
    //             <Card.Header style={{ fontSize: "12", fontWeight: "bold" }}>{item.ProductName}</Card.Header>
    //             <Card.Img variant="top" src={`data:image/jpg;base64,${item.ImageContent}`} height={200} ></Card.Img>
    //             <Card.Body>
    //                 <Card.Title>{item.Price}$</Card.Title>
    //                 <Card.Text>
    //                     {item.Description}
    //                     <br></br>
    //                     <p style={{ color: "red" }}>Availibilty : {item.Quantity > 0 ? "In Stock (" + (item.Quantity) + ")" : "Out of Stock"}</p>
    //                 </Card.Text>
    //             </Card.Body>
    //             <Card.Footer className="text-white">
    //                 {item.Quantity > 0 ? <Button variant="primary" onClick={() => { AddToCart(item) }}>Add To Cart</Button> : ""}
    //                 <Link to={"/ProductDetails/" + item.ProductId}><Button variant="success">Details</Button></Link>
    //             </Card.Footer>
    //         </Card>
    //     )
    // });
    
    var spin = <Spinner animation="grow" variant="primary" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>;

    ProductList =
        SearchParam == null ?
            ds.items.map(item => {
                return (
                    // ngFor="let item of group"
                    <Card className="text-center " style={{ width: '18rem' }}>
                        <Card.Header style={{ fontSize: "12", fontWeight: "bold" }}>{item.ProductNameEN}</Card.Header>
                        <Card.Img variant="top" src={`data:image/jpg;base64,${item.ImageContent}`}
                            style={{ height: "200px", width: "200px", objectFit: "contain", marginTop: "20px" }}>
                        </Card.Img>
                        <Card.Body>
                            <Card.Title>{item.Price}$</Card.Title>
                            <Card.Text>
                                {item.DescriptionEN}
                                <br></br>
                                <p style={{ color: "red" }}>Availibilty : {item.Quantity > 0 ? "In Stock (" + (item.Quantity) + ")" : "Out of Stock"}</p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-white">
                            {item.Quantity > 0 ? <Button className="customButton" variant="primary" onClick={() => { AddToCart(item) }}>Add To Cart</Button> : ""}
                            <Link to={"/ProductDetails/" + item.ProductId}><Button variant="success">Details</Button></Link>
                        </Card.Footer>
                    </Card>
                )
            })
            :
            SearchParam <= 10 ? 
             ds.items.filter(item => item.ParentId == SearchParam || item.ProductNameEN.toLowerCase().match(SearchParam)).map(item => {
                return (
                    // ngFor="let item of group"
                    <Card className="text-center " style={{ width: '18rem' }}>
                        <Card.Header style={{ fontSize: "12", fontWeight: "bold" }}>{item.ProductNameEN}</Card.Header>
                        <Card.Img variant="top" className="img-fluid"  src={`data:image/jpg;base64,${item.ImageContent}`}
                            style={{ height: "200px", width: "200px", objectFit: "contain", marginTop: "20px" }} >
                        </Card.Img>
                        <Card.Body>
                            <Card.Title>{item.Price}$</Card.Title>
                            <Card.Text>
                                {item.DescriptionEN}
                                <br></br>
                                <p style={{ color: "red" }}>Availibilty : {item.Quantity > 0 ? "In Stock (" + (item.Quantity) + ")" : "Out of Stock"}</p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-white">
                            {item.Quantity > 0 ? <Button className="customButton" className="customButton" variant="primary" onClick={() => { AddToCart(item) }}>Add To Cart</Button> : ""}
                            <Link to={"/ProductDetails/" + item.ProductId}><Button variant="success">Details</Button></Link>
                        </Card.Footer>
                    </Card>
                )
            })
            :
            ds.items.filter(item => item.ProductCategoryId == SearchParam || item.ProductNameEN.toLowerCase().match(SearchParam)).map(item => {
                return (
                    // ngFor="let item of group"
                    <Card className="text-center " style={{ width: '18rem' }}>
                        <Card.Header style={{ fontSize: "12", fontWeight: "bold" }}>{item.ProductNameEN}</Card.Header>
                        <Card.Img variant="top" className="img-fluid"  src={`data:image/jpg;base64,${item.ImageContent}`}
                            style={{ height: "200px", width: "200px", objectFit: "contain", marginTop: "20px" }} >
                        </Card.Img>
                        <Card.Body>
                            <Card.Title>{item.Price}$</Card.Title>
                            <Card.Text>
                                {item.DescriptionEN}
                                <br></br>
                                <p style={{ color: "red" }}>Availibilty : {item.Quantity > 0 ? "In Stock (" + (item.Quantity) + ")" : "Out of Stock"}</p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-white">
                            {item.Quantity > 0 ? <Button className="customButton" className="customButton" variant="primary" onClick={() => { AddToCart(item) }}>Add To Cart</Button> : ""}
                            <Link to={"/ProductDetails/" + item.ProductId}><Button variant="success">Details</Button></Link>
                        </Card.Footer>
                    </Card>
                )
            })

            ;


    return (
        <div>
            {ds.items.length == 0 ?
                <div style={{ textAlign: "center" }}>
                    {spin}
                </div>
                :
                <div className="card-columns" style={{ border: "solid", borderColor: "#dd00dd", textAlign:"center", padding:"15px", backgroundColor:"antiquewhite" }}>
                    {ProductList}
                </div>}
        </div>
    );
}