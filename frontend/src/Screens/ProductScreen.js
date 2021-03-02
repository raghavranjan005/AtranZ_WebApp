import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

function ProductScreen(props){

    const [products, setProduct] = useState([]);

  useEffect(() => {
    
    const fetchData = async () =>{
      const {data} = await axios.get("/api/products");
      setProduct(data);

    }
    fetchData();

    return () => {
      //
    };
  }, [])

    var pID = props.location.state.pId;
    console.log(pID);
    return(
        <div>
            {products.length != 0 && 
            <div>

            <div class="product-row">
            <div class="product-column1">
                <img className="product-image" src={products[pID-1].image1} alt="products" />
                <img className="product-image" src={products[pID-1].image2} alt="products" />
            </div>
            <div class="product-column2">
                <div className="product-brand">{products[pID-1].brand}</div>
                <div className="product-price">&#8377; &nbsp;{products[pID-1].price}</div>
                <div className="product-rating">{products[pID-1].rating} Stars ({products[pID-1].numReviews} Reviews)</div> 
                <button className = "product-cartButton">Add to Cart</button>
                <br></br>
                <button className = "product-wishlistButton">Add to Wishlist</button>
            </div>
            </div>
            </div>
            
            }
    
        </div>
        

    )
}

export default ProductScreen;