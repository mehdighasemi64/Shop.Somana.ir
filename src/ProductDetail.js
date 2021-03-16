import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Overlay, Popover, Badge, Table, Button, ButtonGroup } from 'react-bootstrap'
import { initCartList, addToCartList, removeFromCartList, addItemQuantityCart, subItemQuantityCart, bindProductDetail } from './Actions';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ProductDetail() {

    let { ProductId } = useParams();

    useEffect(() => {
    }, []);

    const ds = useSelector(state => state.ProductReducer); // this is mapStateToProps
    const dsCart = useSelector(state => state.CartReducer); // this is mapStateToProps
    const dispatch = useDispatch();// This is mapDispatchToProps
    let ProductDetail = [];

    function AddToCart(item) {
        debugger;
        let Item = {
            ProductId: item.ProductId,
            title: item.ProductName,
            desc: item.Description,
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

    ProductDetail = ds.items.filter(item => item.ProductId == ProductId).map(item => {
        return (
            <div>
                <div class="col-md-12" style={{ textAlign: "center" }}>
                    <section class="panel">
                        <div class="panel-body" >

                            <div class="col-md-12">
                                <div >
                                    <img className="img-fluid" src={`data:image/jpg;base64,${item.ImageContent}`} style={{ width: "400px", height: "400px" }} alt="" />
                                </div>
                                {/* <div class="pro-img-list">
                                    <a href="#">
                                        <img src="http://thevectorlab.net/flatlab/img/product-list/pro-thumb-1.jpg" alt="" />
                                    </a>
                                    <a href="#">
                                        <img src="http://thevectorlab.net/flatlab/img/product-list/pro-thumb-2.jpg" alt="" />
                                    </a>
                                    <a href="#">
                                        <img src="http://thevectorlab.net/flatlab/img/product-list/pro-thumb-3.jpg" alt="" />
                                    </a>
                                    <a href="#">
                                        <img src="http://thevectorlab.net/flatlab/img/product-list/pro-thumb-1.jpg" alt="" />
                                    </a>
                                </div> */}
                            </div>
                            <div class="col-md-12">
                                <h4 class="pro-d-title">
                                    {item.ProductNameEN}
                                </h4>
                                <p>
                                    {item.DescriptionEN}
                                </p>
                                {/* <div class="product_meta">
                                    <span class="posted_in"> <strong>Categories:</strong> <a rel="tag" href="#">Jackets</a>, <a rel="tag" href="#">Men</a>, <a rel="tag" href="#">Shirts</a>, <a rel="tag" href="#">T-shirt</a>.</span>
                                    <span class="tagged_as"><strong>Tags:</strong> <a rel="tag" href="#">mens</a>, <a rel="tag" href="#">womens</a>.</span>
                                </div> */}
                                <div class="product_meta">                                  
                                    <span class="tagged_as">{item.Weight != null ? <div><strong>Net Weight:</strong> {item.Weight} Grams</div> : "" }</span>
                                    <br/>
                                    <span class="posted_in"> {item.Weight != null ? <div><strong>Tags: </strong> {item.TagEN} #</div> : ""}  </span>
                                </div>
                                <div class="m-bot15"> <strong>Price:</strong> <span class="amount-old">${item.Price}</span>  <span class="pro-price"></span></div>
                                {/* <div class="form-group">
                                    <label>Quantity</label>
                                    <input type="quantiy" placeholder="1" class="form-control quantity" />
                                </div> */}

                                {item.DescriptionEN}
                                <br></br>
                                <p style={{ color: "red" }}>Availibilty : {item.Quantity > 0 ? "In Stock (" + (item.Quantity) + ")" : "Out of Stock"}</p>

                                <div class="form-group">
                                    {item.Quantity > 0 ? <Button className="customButton" variant="primary" onClick={() => { AddToCart(item) }}>Add To Cart</Button> : ""}
                                    {/* <button class="btn btn-round btn-danger" type="button" onClick={() => { AddToCart(item)}} ><i class="fa fa-shopping-cart"></i> ADD</button> */}
                                    <Link to='/Product'><Button variant="success">Back</Button></Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    });
    return (
        <div style={{ border: "solid", backgroundColor: "antiquewhite", borderColor: "#dd00dd", textAlign: "center", alignContent: "center", alignItems: "center" }}>
            {ProductDetail}
        </div>
    );
}






