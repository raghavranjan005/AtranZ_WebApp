import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';


function App() {

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (

    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick = {openMenu}>
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
    <aside className = "sidebar">
      <h3>Shopping Categories</h3>
      <button className = "sidebar-close-button" onClick = {closeMenu}>x</button>
      <ul>
        <li>
          <a href = "index.html">Saree</a>
        </li>
        <li>
          <a href = "index.html">suit</a>
        </li>
      </ul>
    </aside>
    <main className="main">
      <div className="content">

        <Route path="/" exact={true} component={HomeScreen}/>
        <Route path="/products/:id" component = {ProductScreen}/>
        <Route path="/cart/" component = {CartScreen}/>

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
