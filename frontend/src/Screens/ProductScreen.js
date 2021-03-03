import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


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

    console.log(products);
    const pID = props.location.state.pId;
    console.log(pID);
    console.log("Hello");
    // console.log(products);
    return(
        <div>
            {products.length!==0&&
            <div class="product-row">
            <div class="product-column1">
                <div className = "slider">
                <AliceCarousel autoPlay autoPlayInterval="3000">
                    <img src={products[pID-1].image1} className="sliderimg" alt = "product"/>          
                    <img src={products[pID-1].image2} className="sliderimg" alt = "product"/>
                </AliceCarousel>   
                </div>  
            </div>
            <div class="product-column2">
                <div className="product-brand">{products[pID-1].brand}</div>
                <div className="product-price">&#8377; &nbsp;{products[pID-1].price}</div>
                <div className="product-rating">{products[pID-1].rating} Stars ({products[pID-1].numReviews} Reviews)</div> 
                <Link to={{pathname:'/cart/',state:{pId:pID}}} >
                    <button className = "product-cartButton">Add to Cart</button>
                </Link>
                <br></br>
                <Link to={{pathname:'/wishlist/',state:{pId:pID}}}>
                    <button className = "product-wishlistButton">Add to Wishlist</button>
                </Link>

            </div>
            </div>
            
            }
    
        </div>
        

    )
}


export default ProductScreen;