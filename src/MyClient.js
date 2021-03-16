import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Owl.css';
export default function MyClient() {

    return (
        <div >
            <div class='container-fluid'>
                <div className="row title" >
                    <div class="col-sm-12 btn btn-danger"  style={{backgroundColor:"#1f0c02ba", fontSize:"20px",height:"50px"}}>
                        Our Brands!
                    </div>
                </div>
            </div>
            <div class='container-fluid'  style={{backgroundColor:"white" , 
            paddingLeft:"0px", paddingRight:"0px",paddingTop:"100px", paddingBottom:"100px"}} >
                <OwlCarousel items={8}
                    className="owl-theme"
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={3000}
                    nav={false}
                    dots={false}
                    center={true}
                    autoplayHoverPause ={true}
                    margin={0} >
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/ulker.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/ritter.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/toffifee.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/Mars.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/milka.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/kinder.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/MMs.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                        <img src={require("./images/LOGOS/KitKat.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/nestle.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/merci.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/Lindor.jpg")} />
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img src={require("./images/LOGOS/lindt.jpg")} />
                        </a>
                    </div>
                  
                </OwlCarousel>
            </div>
        </div>
    );
}





