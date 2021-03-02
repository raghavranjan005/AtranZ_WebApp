import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import WishlistScreen from './Screens/WishlistScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button >
          &#9776;
        </button>
      </div>
      <div className="logo">
        <Link to="/"><img src="/AtranZ-final.png" alt="Logo" height="150px" width="250px"/></Link>
        </div>

    <form>
    <input type="search" placeholder="Search.."/>
    </form>
        <div className="header-links">
        <a href="bag.html">My Bag</a>
        <a href="signin.html">Sign In</a>
      </div>

    </header>
    
    <main className="main">
      <div className="content">

        <Route path="/" exact={true} component={HomeScreen}/>
        <Route path="/products/:id" component = {ProductScreen}/>
        <Route path="/cart/" component = {CartScreen}/>
        <Route path="/wishlist/" component = {WishlistScreen}/>

        <footer className="footer">
        © 2021 AtranZ WebD Team. All rights reserved.
        </footer>

      </div>

    </main>





    </div>

    </BrowserRouter>

  );
}

export default App;
