import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';
import '../index.css'


function HomeScreen(props){

    return  <ul className="products">
          {
            data.products.map(product =>
          <li>
            <div className="product">
              <img className="product-image" src={product.image1} alt="product" />
              <div className="product-name" id="link">
                <Link to={{pathname:'/products/' + product._id,state:{pId:product._id}}} >{product.name}</Link>
              </div>
              {/* <h1>{product._id}</h1> */}
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">&#8377; &nbsp;{product.price}</div>
              <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
            </div>
          </li>)
            }
            </ul>


}

export default HomeScreen;
