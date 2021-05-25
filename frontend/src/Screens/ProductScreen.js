import React, { useEffect, useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import { addToCart } from '../actions/userActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { Magnifier, GlassMagnifier, SideBySideMagnifier} from "react-image-magnifiers";



function ProductScreen(props){

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productSaveSuccess) {
          alert('Review submitted successfully.');
          setRating(0);
          setComment(' ');
          dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        }
        dispatch(detailsProduct(props.match.params.id));
        return () => {
          //
        };
      }, [productSaveSuccess]);

      const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
          saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment,
          })
        );
      };

      const handleAddToCart = () => {
        // props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
        props.history.push("/signin?redirect=cart/"+props.match.params.id+"?"+qty);
        // console.log(props.match.params.id,qty,userInfo._id);
        // dispatch(addToCart(props.match.params.id,qty,userInfo._id));
      

      //   props.history.push({
      //     pathname:'/signin',
      //     search:'?redirect=cart/'+props.match.params.id,
      //     state:{Qty:qty},
      //   })
      // };
      }
      console.log(qty);
      
    return(
        <div>
      <div className="back-to-result">
      
        <Link to="/"><span>
        <i
          className='fa fa-arrow-circle-left'
        ></i>
      </span>
      Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="row top">
          <div className = "details-image col-2">
                    <div className = "slider">
                    {/* <AliceCarousel autoPlay autoPlayInterval="3000"> */}
                    <AliceCarousel>
                        {/* <img src={product.image1} className="sliderimg large" alt = "product"/>          
                        <img src={product.image2} className="sliderimg large" alt = "product"/>
                        <img src={product.image2} className="sliderimg large" alt = "product"/>          
                        <img src={product.image2} className="sliderimg large" alt = "product"/> */}
                            <SideBySideMagnifier
                              className="sliderimg"
                              // style={{ order: false ? "1" : "0" }}
                              imageSrc={product.image1}
                              largeImageSrc={product.image1}
                              alwaysInPlace={false}
                              overlayOpacity={0.6}
                              switchSides={false}
                              zoomPosition="left"
                              inPlaceMinBreakpoint={400}
                              fillAvailableSpace={false}
                              fillAlignTop={false}
                              fillGapTop={10}
                              fillGapRight={10}
                              fillGapBottom={10}
                              fillGapLeft={0}
                              zoomContainerBorder="1px solid #ccc"
                              zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
                            />
                                <SideBySideMagnifier
                              className="sliderimg"
                              // style={{ order: false ? "1" : "0" }}
                              imageSrc={product.image2}
                              largeImageSrc={product.image2}
                              alwaysInPlace={false}
                              overlayOpacity={0.6}
                              switchSides={false}
                              zoomPosition="left"
                              inPlaceMinBreakpoint={100}
                              fillAvailableSpace={false}
                              fillAlignTop={false}
                              fillGapTop={10}
                              fillGapRight={10}
                              fillGapBottom={10}
                              fillGapLeft={0}
                              zoomContainerBorder="1px solid #ccc"
                              zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
                            />
                                <SideBySideMagnifier
                              className="sliderimg"
                              // style={{ order: false ? "1" : "0" }}
                              imageSrc={product.image3}
                              largeImageSrc={product.image3}
                              alwaysInPlace={false}
                              overlayOpacity={0.6}
                              switchSides={false}
                              zoomPosition="left"
                              inPlaceMinBreakpoint={400}
                              fillAvailableSpace={false}
                              fillAlignTop={false}
                              fillGapTop={10}
                              fillGapRight={10}
                              fillGapBottom={10}
                              fillGapLeft={0}
                              zoomContainerBorder="1px solid #ccc"
                              zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
                            />
                                <SideBySideMagnifier
                              className="sliderimg"
                              // style={{ order: false ? "1" : "0" }}
                              imageSrc={product.image4}
                              largeImageSrc={product.image4}
                              alwaysInPlace={false}
                              overlayOpacity={0.6}
                              switchSides={false}
                              zoomPosition="left"
                              inPlaceMinBreakpoint={400}
                              fillAvailableSpace={false}
                              fillAlignTop={false}
                              fillGapTop={10}
                              fillGapRight={10}
                              fillGapBottom={10}
                              fillGapLeft={0}
                              zoomContainerBorder="1px solid #ccc"
                              zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
                            />
                    </AliceCarousel>   
                    </div>  
                </div>
            <div className="details-info col-1">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li className="rating-text">
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  Price: <b>&#8377;{product.price}</b>
                </li>
                <li>
                  <br></br>
                  Description:
                  <p className="Description" >{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="details-action card card-body col-1">
              <ul>
                
                <li>
                  <div className="row">
                      <div>Price</div>
                      <div className="price">&#8377;{product.price}</div>
                  </div>
                </li>
                
                <li>
                  <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                </li>
                {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={handleAddToCart}
                          className="button primary full-width"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
            </div>
          </div>


          <div className="content-margined">
            <h2>Reviews</h2>
            {!product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container-rating">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}

    </div>
        

    )
}


export default ProductScreen;