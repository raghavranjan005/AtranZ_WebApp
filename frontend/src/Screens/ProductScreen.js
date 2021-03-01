import React from 'react';
import data from '../data';
import '../index.css'

function ProductScreen(props){

    var pID = props.location.state.pId;
    console.log(pID);
    console.log("Hello");
    return(
        <div>
            <div class="product-row">
            <div class="product-column1">
                <img className="product-image" src={data.products[pID-1].image1} alt="product" />
                <img className="product-image" src={data.products[pID-1].image2} alt="product" />
            </div>
            <div class="product-column2">
                <div className="product-brand">{data.products[pID-1].brand}</div>
                <div className="product-price">&#8377; &nbsp;{data.products[pID-1].price}</div>
                <div className="product-rating">{data.products[pID-1].rating} Stars ({data.products[pID-1].numReviews} Reviews)</div> 
                <button className = "product-cartButton">Add to Cart</button>
                <br></br>
                <button className = "product-wishlistButton">Add to Wishlist</button>
            </div>
            </div>
            

        </div>

    )
}

export default ProductScreen;