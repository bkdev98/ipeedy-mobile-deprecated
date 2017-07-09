import axios from 'axios';

import config from '../../../constants/api';
import types from './types.js';

const { API_URL } = config;
const {
  GET_NEARBY_PRODUCTS,
  GET_NEARBY_PRODUCTS_SUCCESS,
  GET_NEARBY_PRODUCTS_FAIL,
  GET_PRODUCT,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
} = types;

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/

export function getNearbyProducts(region) {
  const { latitude, longitude } = region;
  return (dispatch) => {
    dispatch({
      type: GET_NEARBY_PRODUCTS,
    });
    axios.get(`${API_URL}/products`, {
      params: {
        latitude,
        longitude,
      },
    }).then(products => {
      dispatch({
        type: GET_NEARBY_PRODUCTS_SUCCESS,
        payload: products.data,
      });
    }).catch(error => {
      if (error.response) {
        dispatch({
          type: GET_NEARBY_PRODUCTS_FAIL,
          payload: error.response,
        });
      }
    });
  };
}

export function getProduct(id) {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCT,
    });
    axios.get(`${API_URL}/product/${id}`).then(product => {
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: product.data,
      });
    }).catch(error => {
      if (error.response) {
        dispatch({
          type: GET_PRODUCT_FAIL,
          payload: error.response,
        });
      }
    });
  };
}

//  GET NEARBY PRODUCTS

/**
|--------------------------------------------------
| Action Handlers
|--------------------------------------------------
*/

const handleGetNearbyProduct = (state) => ({
  ...state,
  loading: true,
  error: null,
});

const handleGetNearbyProductFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.error,
});

const handleGetNearbyProductSuccess = (state, action) => ({
  ...state,
  loading: false,
  products: action.payload,
});

const handleGetProduct = (state) => ({
  ...state,
  loading: true,
  error: null,
});

const handleGetProductFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.error,
});

const handleGetProductSuccess = (state, action) => ({
  ...state,
  loading: false,
  product: action.payload,
});

const ACTION_HANDLERS = {
  GET_NEARBY_PRODUCTS: handleGetNearbyProduct,
  GET_NEARBY_PRODUCTS_FAIL: handleGetNearbyProductFail,
  GET_NEARBY_PRODUCTS_SUCCESS: handleGetNearbyProductSuccess,
  GET_PRODUCT: handleGetProduct,
  GET_PRODUCT_FAIL: handleGetProductFail,
  GET_PRODUCT_SUCCESS: handleGetProductSuccess,
};

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/

const initialState = {
  products: [],
  error: null,
  loading: false,
  product: null,
};

export function ProductReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
