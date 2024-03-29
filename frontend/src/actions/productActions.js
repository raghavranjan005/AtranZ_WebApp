import {
  NORMAL_PRODUCT_LIST_REQUEST,
  NORMAL_PRODUCT_LIST_SUCCESS,
  NORMAL_PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
} from '../constants/productConstants';
import axios from 'axios';
import Axios from 'axios';

// const listProducts = (
//   category = '',
//   searchKeyword = '',
//   sortOrder = ''
// ) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_LIST_REQUEST });
//     const { data } = await axios.get(
//       '/api/products?category=' +
//         category +
//         '&searchKeyword=' +
//         searchKeyword +
//         '&sortOrder=' +
//         sortOrder
//     );
//     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
//   }
// };

const normalListProducts =()=>async(dispatch,getState)=>{

    dispatch({type:NORMAL_PRODUCT_LIST_REQUEST});
    try {
      const {data} = await axios.get('/api/products/normal');
      dispatch({type:NORMAL_PRODUCT_LIST_SUCCESS,payload:data});
    } catch (error) {
      dispatch({ type: NORMAL_PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
};

const listProducts = ({
  pageNumber = '',
  name = '',
  category = '',
  order = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL,payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await Axios.post('/api/products', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/products/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL,payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};


const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/products/' + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProdcut,
  saveProductReview,
  listProductCategories,
  normalListProducts,
};
