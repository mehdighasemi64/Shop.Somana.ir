// import React from 'react';
// import './App.css';
// import { Container, Row, Col, Image } from 'react-bootstrap'
// import MyCarousel from './MyCarousel';
// import logo from './images/logo.jpg';
// import MyCard from './MyCard';
// import MyNavbar from './MyNavbar';
// import MyClient from './MyClient';
// import MyFooter from './MyFooter';
// import MyProduct from './MyProduct';
// import ProductDetail from './ProductDetail'


// function App() {
//   return (
//     <div className="App">

//       <Container>
//         <Row>
//           <Col>
//             <Row>

//               <Col xs={12} sm={6} md={4} lg={12} xl={12} >
//                 <MyNavbar></MyNavbar>
//               </Col>

//             </Row>
//           </Col>
//         </Row>

//         <Row>
//           <Col >
//             <MyCarousel></MyCarousel>
//           </Col>
//         </Row>        

//         <Row>
//           <Col >
//             <MyCard></MyCard>
//           </Col>          
//         </Row>

//         {/* <Row>
//           <Col >
//             <MyProduct></MyProduct>
//           </Col>          
//         </Row>

//         <Row>
//           <Col >
//             <ProductDetail></ProductDetail>
//           </Col>          
//         </Row> */}

//         <Row>
//           <Col>
//             <MyClient></MyClient>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <MyFooter></MyFooter>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import MyProduct from './MyProduct';
import ProductDetail from './ProductDetail'
import HomePage from './HomePage'
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'
import MyShoppingCartDetails from './MyShoppingCartDetails';
import MyRegisterUser from './MyRegisterUser';
import MyShippingDetails from './MyShippingDetails';
import MyPaymentFeedback from './MyPaymentFeedback';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPlusSquare, faMinusSquare, faStroopwafel, faCheckSquare, faCoffee, faBan, faUser, faShoppingCart, faShoppingBasket, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import MyShoppingHistory from './MyShoppingHistory';
import MyShoppingManagement from './MyShoppingManagement';
import MyUserManagement from './MyUserManagement';
import MyProductManagement from './MyProductManagement';
import MyFooter from './MyFooter';
import MyNavbar from './MyNavbar'
import { Container, Card, CardDeck, Button, Row, Col } from 'react-bootstrap';
import MyMultiSteps from './MyMultiSteps';
import MyStepper from './MyStepper'
import MyPasswordRecovery from './MyPasswordRecovery';
import MyResetPassword from './MyResetPassword';

library.add( faTrashAlt, faPlusSquare, faMinusSquare, faStroopwafel, faCheckSquare, faCoffee, faBan, faUser, faShoppingCart, faShoppingBasket, faShoppingBag)

function App() {
  return (
    <div>
      <Router>
        <Container>
          <Row>
            <Col>
              <MyNavbar />
            </Col>
          </Row>          
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/Product/:SearchParam?' component={MyProduct} />
            {/* <Route exact path='/ShoppingCartDetails' component={MyShoppingCartDetails} /> */}
            {/* <Route exact path='/ShoppingCartDetails/' component={MyMultiSteps} /> */}
            <Route exact path='/ShoppingCartDetails/' component={MyStepper} />
            <Route exact path='/ProductDetails/:ProductId' component={ProductDetail} />
            <Route exact path='/NewUser' component={MyRegisterUser} />
            <Route exact path='/ShippingDetails/' component={MyShippingDetails} />
            <Route exact path='/PaymentFeedback/' component={MyPaymentFeedback} />
            <Route exact path='/ShoppingHistory/:UserId' component={MyShoppingHistory} />
            <Route exact path='/ShoppingManagement/' component={MyShoppingManagement} />
            <Route exact path='/UserManagement/' component={MyUserManagement} />
            <Route exact path='/ProductManagement/' component={MyProductManagement} />
            <Route exact path='/PasswordRecovery/' component={MyPasswordRecovery} />
            {/* <Route exact path='/ResetPassword/:username/:token' component={MyResetPassword} /> */}
            <Route exact path='/ResetPassword/' component={MyResetPassword} />

          </Switch>
          <Row>
            <Col>
              <MyFooter />
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}
export default App;
