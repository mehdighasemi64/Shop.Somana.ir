import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Overlay, Popover, Badge, Table, Button, ButtonGroup, OverlayTrigger } from 'react-bootstrap'
import { initCartList, addToCartList, removeFromCartList, addItemQuantityCart, subItemQuantityCart } from './Actions';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MyShoppingCart2() {
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        //BindShoppingCart();
    }, []);

    const ds = useSelector(state => state.CartReducer); // this is mapStateToProps
    const dsCart = useSelector(state => state.CartReducer); // this is mapStateToProps    
    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps

    const dispatch = useDispatch();// This is mapDispatchToProps
    let CartList = [];

    function BindShoppingCart() {
        dispatch(initCartList(null));
    }

    function AddQuantity(id) {
        //alert('add quantity' + id);
        debugger;
        dispatch(addItemQuantityCart(id));
    }

    function SubQuantity(id) {
        //alert('sub quantity' + id);
        debugger;
        dispatch(subItemQuantityCart(id));
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
        return ds.items.map((item, index) => {
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
                            {item.quantity >= 1 ? <Button onClick={() => SubQuantity(item.ProductId)}><FontAwesomeIcon icon="minus-square" style={{ fontSize: "14px", color: "white" }}></FontAwesomeIcon></Button> : ""}
                            <Button onClick={() => AddQuantity(item.ProductId)}><FontAwesomeIcon icon="plus-square" style={{ fontSize: "14px", color: "white" }}></FontAwesomeIcon></Button>
                            <Button onClick={() => RemoveFromCart(item)}><FontAwesomeIcon icon="trash-alt" style={{ fontSize: "14px", color: "white" }}></FontAwesomeIcon></Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
    }

    // CartList = ds.items.map(item => {
    //     return (
    //         <div>
    //             <Table striped bordered hover variant="dark">

    //                 <thead>
    //                     <tr>
    //                     <th scope="col">#</th>
    //                         <th scope="col">Product Name</th>
    //                         <th scope="col">Price</th>
    //                         <th scope="col">Quanity</th>
    //                         <th scope="col">Total</th>
    //                         <th scope="col">Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                         <td>
    //                             <img src={item.img} alt="Sheep" style={{ width: "120px", height: "120px" }} ></img>
    //                         </td>
    //                         <td>{item.title}</td>
    //                         <td>{item.price}$</td>
    //                         <td class="qty"><input type="text" id="input1" style={{ width: "30px" }} value={item.quantity} /></td>
    //                         <td>{item.price * item.quantity} $</td>
    //                         <td>
    //                             <ButtonGroup size="sm">
    //                                 <Button onClick={() => AddQuantity(item.id)}>+</Button>
    //                                 <Button onClick={() => SubQuantity(item.id)}>-</Button>
    //                                 <Button onClick={() => RemoveFromCart(item)}>X</Button>
    //                             </ButtonGroup>
    //                         </td>
    //                     </tr>
    //                 </tbody>
    //             </Table>
    //         </div>
    //     )
    // });

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
        <div>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 300 }}
                trigger="focus"
                overlay={(
                    <Popover id="popover-contained" onMouseDown={(e) => e.preventDefault()} >
                        <Popover.Title as="h5">Shopping Cart Items: </Popover.Title>
                        <Popover.Content>
                            {/* <strong>Holy guacamole!</strong> Check this info. */}
                            <h6 class="modal-title" id="exampleModalLabel">
                                {/* Your Shopping Cart */}
                            </h6>
                            {CartList}
                            <div class="d-flex justify-content-end">
                                <h5>Total: <span class="price text-success">{ds.total}$</span></h5>
                            </div>
                            <div class="d-flex justify-content-end">

                                {(ds.total > 0 && dsUser.items != "") && (
                                    // <a href={"/ShoppingCartDetails/"}>
                                    //     <Button variant="success" >Continue Shopping</Button>
                                    // </a>
                                    <Link to='/ShoppingCartDetails/'><Button variant="success" >Continue Shopping</Button></Link>
                                )}

                            </div>
                        </Popover.Content>
                    </Popover>)}>
                <div>
                    <div className="badge" style={{ textAlign: "center", width: "40px" }}>
                        <Badge variant="light" >{ds.items.length}</Badge>
                    </div>
                    <div>
                        <Button style={{ backgroundColor: "khaki", padding: "0", border: "0", color: "darkgray" }}>
                            <FontAwesomeIcon icon="shopping-cart" style={{ fontSize: "30px", }} color="gray" />
                        </Button>
                    </div>
                </div>
            </OverlayTrigger>
        </div >
    );
}






