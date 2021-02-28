import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
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
