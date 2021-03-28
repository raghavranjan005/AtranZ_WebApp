import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import SigninScreen from './Screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';
import OrdersScreen from './Screens/OrdersScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrderScreen from './Screens/OrderScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import './index.css'


function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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
        <Link to="/"><img src="/AtranZ-final.png" alt="Logo" height="150px" max-width="150rem"/></Link>
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
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
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
    
      <ul className="categories">
        <li>
        <strong>Shopping Categories</strong>
          <button className = "close-side-bar" onClick = {closeMenu}>
            <i className="fa fa-close"></i>
          </button>
        </li>
        <li>
          <Link to = "/category/saree">saree</Link>
        </li>
        <li>
        <Link to = "/category/suit">suit</Link>
        </li>
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
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
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
