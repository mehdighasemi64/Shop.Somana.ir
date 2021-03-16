import React, { Component, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { Overlay, Popover, Badge, Card, CardDeck, Button } from 'react-bootstrap'
import { initCartList, addToCart } from './Actions';
import './MyShopping.css'
export default function MyShoppingCart() {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    useEffect(() => {
        BindShoppingCart();
    }, []);

    const ds = useSelector(state => state.CartReducer); // this is mapStateToProps
    const dispatch = useDispatch();// This is mapDispatchToProps
    let CartList = [];

    function BindShoppingCart() {
        dispatch(initCartList(null));
    }

    //if (ds.items.length != 0) {

        CartList = ds.items.map(item => {
            return (
                // ngFor="let item of group"
                <Card className="text-center " style={{ width: '18rem' }}>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Img variant="top" src={item.img} height={200} ></Card.Img>

                    <Card.Body>
                        <Card.Title>{item.price}$</Card.Title>

                        <Card.Text>
                            {item.desc}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-white">
                    </Card.Footer>
                </Card>
            )
        })
    
    

    return (
        <div>
            <Button variant="primary" onClick={handleClick}>
                <i class="fa fa-shopping-cart">  Shopping Cart <Badge variant="light">{ds.items.length}</Badge></i>
                <span className="sr-only">unread messages</span>
            </Button>
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Title as="h3">Shopping Cart Items: </Popover.Title>
                    <Popover.Content>
                        {/* <strong>Holy guacamole!</strong> Check this info. */}
                        {CartList}
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}





