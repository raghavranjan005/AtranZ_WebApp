import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import SigninScreen from './Screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';
import OrdersScreen from './Screens/OrdersScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrderScreen from './Screens/OrderScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import './index.css'
import ResetPasswordLinkScreen from './Screens/ResetPasswordLinkScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import { logout } from './actions/userActions';
import DevloperInfoScreen from './Screens/DevloperInfoScreen';
import AboutScreen from './Screens/AboutScreen';
import CustomerServiceScreen from './Screens/CustomerCareScreen';
import CustomerCareScreen from './Screens/CustomerCareScreen';
import FeedbackScreen from './Screens/FeedbackScreen';



function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleLogout = () => {
    dispatch(logout());
  }

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (

    <BrowserRouter>
    <div className="grid-container">
    <header className="row header">
      <div className="brand">
        <button className="open-sidebar" onClick = {openMenu}>
        <i className="fa fa-bars"></i>
        </button>
      </div>
      <div className="logo">
        <Link to="/"><img src=" AtranZ-final.png" alt="Logo" height="150px" max-width="150rem"/></Link>
        </div>

        <div className="header-links">
            <a href="/cart/">
            <span>
              <i className='fa fa-shopping-bag'></i>
            </span>
             &nbsp;
              My Bag
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            
            </a>
            {userInfo ? (
              <div className="dropdown">
                <Link to="/profile">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>

                  <li>
                    <Link to="/orderhistory">My Orders</Link>
                  </li>

                  <li>
                    <Link to="/" onClick={handleLogout} >Logout</Link>
                  </li>

                </ul>
              </div>
            )  : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

    </header>
    <aside className = "sidebar">
        <div className="Hello-container">
        <strong className="Hello"><i className="fa fa-user-circle"></i>&thinsp;Hello {userInfo && `, ${userInfo.name}`}!</strong>
          <button className = "close-side-bar" onClick = {closeMenu}>
            <i className="fa fa-close"></i>
          </button>
        </div>
        <ul className="categories">
        <li>
        <strong>Shopping categories</strong>
        </li>
          <Link to = "/category/saree">saree</Link>
          <Link to = "/category/suit">suit</Link>
        <hr></hr>

      </ul>

      <ul className="categories">
        <li>
        <strong>Get to know us</strong>
        </li>
          <Link to = "/devinfo">Developer Info</Link>
          <Link to = "/aboutus">About Us</Link>
        <hr></hr>

        <li>
        <strong>Feedback</strong>
        </li>
          <Link to = "/feedback">Feedback</Link>
        <hr></hr>

        <li>
        <strong>Help?</strong>
        </li>
          <Link to = "/customercare">Customer Care</Link>
        <hr></hr>
        
      </ul>


    </aside>
    <main className="main">
      <div className="content">

      <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/reset-password" component={ResetPasswordScreen} />
            <Route path="/resetpassword/:id" component={ResetPasswordLinkScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/devinfo" component={DevloperInfoScreen} />
            <Route path="/aboutus" component={AboutScreen} />
            <Route path="/feedback" component={FeedbackScreen} />
            <Route path="/customercare" component={CustomerCareScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/orderhistory" exact={true} component={OrderHistoryScreen} />
      </div>
    </main>
        <footer className="footer">
          © 2021 AtranZ WebD Team. All rights reserved.      
        </footer>

     
 





    </div>
   
    </BrowserRouter>

  );
}

export default App;
