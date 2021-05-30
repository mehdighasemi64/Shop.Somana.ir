
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Navbar, Nav, Form, Button, FormControl, Image } from 'react-bootstrap'
import logo2 from './images/logoMan.png';
import MyMenu from './MyMenu'
import MyShoppingCart2 from './MyShoppingCart2';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import { LoginUser, LogOutUser, BindCurrentUser } from './Actions';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MyNavbar() {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [SearchParam, SetSearchParam] = useState("");
    useEffect(() => {

    }, []);

    const dsUser = useSelector(state => state.UserReducer); // this is mapStateToProps
    const dispatch = useDispatch();// This is mapDispatchToProps    
    const txtSearch = useRef(null);
    const txtUserName = useRef(null);
    const txtPassword = useRef(null);
    function Login() {
        let item = {
            UserName: txtUserName.current.value,
            PassWord: txtPassword.current.value,
        }
        debugger;
        
        fetch('http://shop.somana.ir/api/user/LoginUser/', {
       // fetch('http://localhost:5000/api/user/LoginUser/', {
       //     fetch('http://localhost:33512/api/user/LoginUser/', {

            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(response => response == null ? alert("Invalid Username or Password") : LoginSuccess(response))
            .catch(e => alert(e));
    }

    function LoginSuccess(response) {
        debugger;
        dispatch(LoginUser(response))
        setShowLoginModal(false)
    }

    function LogOut() {
        debugger;
        dispatch(LogOutUser(null))
        setShowLoginModal(false)
    }

    function clearSearchBox() {
        txtSearch.current.value = "";
    }

    function handleChange() {
        debugger;
        SetSearchParam(txtSearch.current.value);
    }

    return (
        <div style={{ backgroundColor: "read", marginTop: "20px" }}>
            {/* <nav  class="navbar navbar-expand-sm  navbar-dark  bg-dark "> */}
            <nav class="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: "khaki" }}>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div style={{ textAlign: "center" }}>

                    <Image alt="Bootstrap Image Preview" src={logo2} style={{ width: "130px", height: "130px", objectFit: "contain" }} roundedCircle />
                    <br />
                    <div style={{ textAlign: "left" }}>

                        <div style={{ float: "left" }}>
                            <Button style={{ backgroundColor: "khaki", border: "0px", color: "darkgray", paddingTop: "22px" }} onClick={() => setShowLoginModal(true)}>
                                {dsUser.items != "" ? dsUser.items[0].UserName : <FontAwesomeIcon icon="user" style={{ fontSize: "30px", color: "gray" }} />}
                            </Button>
                        </div>
                        <div >
                            <MyShoppingCart2></MyShoppingCart2>

                        </div>

                    </div>
                    <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} >

                        <Modal.Header closeButton>
                            <Modal.Title>User Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control ref={txtUserName} type="email" placeholder="Email" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={txtPassword} type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" onClick={Login} >
                                    Login
                                </Button>

                                {dsUser.items != "" && (
                                    <Button variant="success" onClick={LogOut} >
                                        LogOut
                                    </Button>
                                )}

                                <Link to='/NewUser'><Button variant="info">NewUser</Button></Link>
                                <Link to='/PasswordRecovery'><Button variant="danger">Forget Password</Button></Link>

                                {dsUser.items != "" && (

                                    <Link to={'/ShoppingHistory/' + dsUser.items[0].UserId} >
                                        <Button variant="warning">
                                            Shopping History
                                        </Button>
                                    </Link>
                                )}


                                {(dsUser.items != "" && dsUser.items[0].UserTypeId == 1) && (

                                    <Link to={'/ShoppingManagement/'} >
                                        <Button variant="dark">
                                            Shoppings
                                        </Button>
                                    </Link>
                                )}


                                {(dsUser.items != "" && dsUser.items[0].UserTypeId == 1) && (

                                    <Link to={'/UserManagement/'} >
                                        <Button variant="primary">
                                            Users
                                        </Button>
                                    </Link>
                                )}

                                {(dsUser.items != "" && dsUser.items[0].UserTypeId == 1) && (

                                    <Link to={'/ProductManagement/'} >
                                        <Button variant="danger">
                                            Products
                                        </Button>
                                    </Link>
                                )}

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setShowLoginModal(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                </div>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <MyMenu></MyMenu>
                    <Form inline style={{ paddingLeft: "60px" }}>
                        <FormControl onChange={handleChange} ref={txtSearch} type="text" placeholder="Search Product" className="mr-sm-2" />
                        <Button onClick={clearSearchBox} variant="light">
                            <Link to={"/Product/" + SearchParam}>Search</Link>
                        </Button>
                    </Form>
                </div>
            </nav>
        </div>
    );
}
