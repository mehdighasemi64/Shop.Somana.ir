import React, { useState, useEffect, useRef } from 'react';
import ColorPencil from './images/Products/ColorPencil.jpg';
import BlackPencil from './images/Products/BlackPencil.jpg';
import FantasyPencil from './images/Products/FantasyPen.jpg';
import kitkat from './images/LOGOS/KitKat.jpg'

import { Card, CardDeck, Button, Row, Col } from 'react-bootstrap'
import {Link} from "react-router-dom";

export default function MyCard() {

    useEffect(() => {
    }, []);

    const [ShowProduct, setShowProduct] = useState(false);

    function CloseProductComponent() {
        alert('clicked on product list');
        setShowProduct(true);
    }

    function AddToCart() {
        alert('this is add to cart func');
        debugger;

        // let BuyingItem = {
        //     ItemID: "0",
        //     // ProductName: txtEducationLevel.current.value,
        //     // ProductPrice: txtEducationMajor.current.value            
        // }

        // fetch('http://localhost:3818/api/Education/NewEducation/', {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json; charset=utf-8"
        //     },
        //     body: JSON.stringify(BuyingItem)
        // })
        //     // .then(response => response.json())
        //     // .then(response => dispatch(addEducationHistory(response)))
        //     .catch(e => alert(e));

    }
    return (
        <div style={{backgroundColor:"#ffffff75"}}>
            <CardDeck style={{paddingTop:"10px" , paddingBottom: "10px"}}> 
                <Card className="text-center" bg={'danger'} Primary style={{ width: '18rem' }}>
                    <Card.Header>Choclate</Card.Header>
                    <Card.Body>
                        <Card.Title>Quality Street</Card.Title>
                        <Card.Text>
                            <Card.Img variant="top" className="img-fluid" src={ColorPencil} style={{ width :"300px" , height:"300px" , objectFit:"contain"}}/>

                        </Card.Text>
                        <p>This is a wider card with supporting text below as a natural lead-in to
                            additional content</p>
                    </Card.Body>
                    <Card.Footer className="text-white">
                    <Link to='/Product'><Button variant="primary" >More Details</Button></Link>
                    </Card.Footer>
                </Card>

                <Card className="text-center" bg={'warning'} style={{ width: '18rem' }}>
                    <Card.Header>Gift Choclate</Card.Header>
                    <Card.Body>
                        <Card.Title>Chocolate bar</Card.Title>
                        <Card.Text>
                            <Card.Img variant="top"  className="img-fluid" src={BlackPencil} style={{ width :"300px" , height:"300px" , objectFit:"contain"}} />
                        </Card.Text>
                        <p>This is a wider card with supporting text below as a natural lead-in to
                            additional content</p>
                    </Card.Body>
                    <Card.Footer className="text-white">
                        <Link to='/Product'><Button variant="primary" >More Details</Button></Link>
                    </Card.Footer>
                </Card>

                <Card className="text-center" bg={'info'} Primary style={{ width: '18rem' }}>
                    <Card.Header>Dark Choclate</Card.Header>
                    <Card.Body>
                        <Card.Title>Lindt</Card.Title>

                        <Card.Text>
                            <Card.Img variant="top" className="img-fluid" src={FantasyPencil} style={{ width :"300px" , height:"300px" , objectFit:"contain"}} />
                        </Card.Text>
                        <p>This is a wider card with supporting text below as a natural lead-in to
                            additional content</p>
                    </Card.Body>
                    <Card.Footer className="text-white">
                        <Link to='/Product'><Button variant="primary" >More Details</Button></Link>
                    </Card.Footer>
                </Card>                
            </CardDeck>

            {/* {ShowProduct && <MyProduct></MyProduct>} */}
        </div>
    );
}




