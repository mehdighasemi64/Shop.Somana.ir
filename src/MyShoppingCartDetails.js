import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Table, Button, ButtonGroup } from 'react-bootstrap'
import { initCartList, addToCartList, removeFromCartList, addItemQuantityCart, subItemQuantityCart } from './Actions';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MyShoppingCartDetails() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    useEffect(() => {
        //BindShoppingCart();
    }, []);

    const [ShowButtonConfirmation, setShowButtonConfirmation] = useState(true);
    const [ShowButtonDelivery, setShowButtonButtonDelivery] = useState(false);

    const dsCart = useSelector(state => state.CartReducer); // this is mapStateToProps
    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps
    const dispatch = useDispatch();// This is mapDispatchToProps

    let CartList = [];
    let od = 0;
    function BindShoppingCart() {
        dispatch(initCartList(null));
    }

    function AddQuantity(id) {
        debugger;
        dispatch(addItemQuantityCart(id));
    }

    function SubQuantity(id) {
        debugger;
        dispatch(subItemQuantityCart(id));
    }

    function SubmitOrder() {
        debugger;
        let Order = {
            OrderStatusId: 1,
            TotalCost: dsCart.total,
            TotalQuantity: dsCart.items.length,
            UserId: dsUser.items[0].UserId
        }

        fetch('http://localhost:5000/api/Order/RegisterOrder', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(Order)
        })
            .then(response => response.json())
            .then(response => SubmitOrderDetails(response))
            .catch(e => alert(e));
    }

    function SubmitOrderDetails(responsedOrder) {
        debugger;
        alert('You Have Sumbmitted an Order No :' + responsedOrder.OrderId)
        // let Product = JSON.parse(JSON.stringify(dsCart.items));
        // Product[0]["OrderId"] = responsedOrder.OrderId;
       
       let  Product = { orderId: responsedOrder.OrderId , products: dsCart.items };

        fetch('http://localhost:5000/api/Order/RegisterOrderDetails', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },

            // body: JSON.stringify(Product),
            body: JSON.stringify(Product),
            contentType: "application/json",
        })
            .then(response => response.json())
            .then(response => sessionStorage.setItem('sessionStorageOrderId', response))
            .catch(e => alert(e));

        setShowButtonConfirmation(false);
        setShowButtonButtonDelivery(true);

    }

    function RemoveFromCart(item) {
        let Item = {
            ProductId: item.ProductId,
            title: item.title,
            desc: item.desc,
            quantity: item.quantity,
            price: item.price,
            img: item.img
        }
        dispatch(removeFromCartList(item));
    }

    // function renderTableHeader() {   /// if wanna make a table heade dynamically by name of columns
    //     let header = Object.keys(ds.items[0])
    //     return header.map((key, index) => {
    //         return  <th key={index}>{key.toUpperCase()}</th>
    //     })
    // }

    function renderTableHeader() {

        let header = (<tr style={{ textAlign: "center" }}><th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quanity</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th></tr>)
        return header;
    }

    function renderTableData() {
        return dsCart.items.map((item, index) => {
            return (
                <tr style={{ textAlign: "center" }}>
                    <td>
                        <img src={`data:image/jpg;base64,${item.img}`} alt="Sheep" style={{ width: "120px", height: "120px" }} ></img>
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price}$</td>
                    <td class="qty"><input type="text" id="input1" style={{ width: "30px" }} value={item.quantity} /></td>
                    <td>{item.price * item.quantity} $</td>
                    <td>
                        <ButtonGroup size="sm">
                            {item.quantity >= 1 ? <Button onClick={() => SubQuantity(item.id)}><FontAwesomeIcon icon="minus-square" style={{ fontSize: "14px", color: "white" }}></FontAwesomeIcon></Button> : ""}
                            <Button onClick={() => AddQuantity(item.id)}><FontAwesomeIcon icon="plus-square" style={{ fontSize: "14px", color: "white" }}></FontAwesomeIcon></Button>
                            <Button onClick={() => RemoveFromCart(item)}><FontAwesomeIcon icon="trash-alt" style={{ fontSize: "14px", color: "white" }}></FontAwesomeIcon></Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
    }

    CartList =
        <div>
            <div>
                <h6 id='title' style={{ textAlign: "center" }} >Your Shopping Cart Details</h6>
            </div>
            <Table striped bordered hover variant="dark">
                <tbody>
                    {renderTableHeader()}
                    {renderTableData()}
                </tbody>
            </Table>
        </div >
        ;

    return (
        <div style={{ textAlign: "center", border: "solid", borderColor: "#dd00dd", backgroundColor: "antiquewhite" }}>
            <br />
            <br />
            <br />
            {CartList}
            <div>
                <h6>Total: <span class="price text-success">{dsCart.total}$</span></h6>
            </div>
            <ButtonGroup>
                {ShowButtonConfirmation ? <Button variant="success" onClick={SubmitOrder}>Confirm Shopping Cart</Button> : null}
                {/* <Link to='/ShippingDetails/'>{ShowButtonDelivery ? <Button hide={true} variant="info" >Shipping Details</Button> : null}</Link> */}
            </ButtonGroup>
            <br />
            <br />
            <br />

            {/* <div>
                <Link to='/'><Button variant="dark">Home</Button></Link>
            </div> */}
        </div>
    );
}






