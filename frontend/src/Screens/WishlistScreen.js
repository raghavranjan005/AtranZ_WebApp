import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

function WishlistScreen(props){

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

    // const items = new Map();
    // items.set(1,2);
    // items.set(3,5);
    // items.set(4,6);
    // console.log(items);
    var items = {
      1:2,
      2:3,
      5:1
    }
    

    const petList = Object.entries(items).map(([key,value])=>{
      return (
          <div>
            {/* <img src = {products[key].image1} alt="product"/> */}
            <h1>{key} : {value}</h1>
          </div>
      );
    })

    console.log(products);
    const pID = props.location.state.pId;
    console.log(pID);
    console.log("Hello");
    return (
        <div>
               <h1>this is wishlist screen</h1>
               <ul>
                 
               </ul>
        </div>
    )
}

export default WishlistScreen;