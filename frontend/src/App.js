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
import CustomerCareScreen from './Screens/CustomerCareScreen';
import FeedbackScreen from './Screens/FeedbackScreen';
import SearchScreen from './Screens/SearchScreen';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import { useEffect } from 'react';
import { listProductCategories } from './actions/productActions';
import FaqsScreen from './Screens/FaqsScreen'
import VerificationScreen from './Screens/VerificationScreen';


function App(props) {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;



  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  }

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  // const takeToCart = () => {
  //   props.history.push("/signin?redirect=cart");
  // }

  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/60aca264a4114e480ad0b9ce/1f6h5kn3u';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();





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
        <Link to="/"><img src="https://atranz.s3.ap-south-1.amazonaws.com/AtranZ-final.png" alt="AtranZ" font-color="white"  height="150px" width="auto" /></Link>
        </div>

        <div className="header-links">
            {/* <a href="/cart">
            <span>
              <i className='fa fa-shopping-bag'></i>
            </span>
             &nbsp;
              My Bag
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            
            </a> */}
             {userInfo ? (
              <Link to="/cart"> 
              <span>
              <i className='fa fa-shopping-bag'></i>
              </span>
              &nbsp;My Bag              
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
              </Link>
            ) : (
              <Link to="/signin">
              <span>
              <i className='fa fa-shopping-bag'></i>
            </span>
             &nbsp;My Bag</Link>
            )}
            
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
          {/* <Link to = "/category/saree">saree</Link>
          <Link to = "/category/suit">suit</Link> */}

            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                  <Link
                    to={`/search/category/${c}`}
                  >
                    {c}
                  </Link>
              ))
            )}


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
          <li>
        <strong>FAQs</strong>
        </li>
          <Link to = "/faqs">FAQs</Link>
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
            <Route path="/verifyemail/:id"  component={VerificationScreen} />
            <Route path="/faqs" component={FaqsScreen} />
            
            
            <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
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
