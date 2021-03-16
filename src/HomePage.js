
import React from 'react';
import './App.css';
import { Container, Row, Col, Image } from 'react-bootstrap'
import MyCarousel from './MyCarousel';
import MyCard from './MyCard';
import MyClient from './MyClient';

function HomePage() {
    return (
        <div>
            <Row>
                <Col >
                    <MyCarousel></MyCarousel>
                </Col>
            </Row>
            <Row>
                <Col >
                    <MyCard></MyCard>
                </Col>
            </Row>
            <Row>
                <Col>
                    <MyClient></MyClient>
                </Col>
            </Row>
        </div>
    );
}

export default HomePage;
