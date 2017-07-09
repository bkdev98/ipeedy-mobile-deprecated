import axios from 'axios';

import config from '../../../constants/api';
import types from './types.js';

const { API_URL } = config;
const {
  GET_NEARBY_PRODUCTS,
  GET_NEARBY_PRODUCTS_SUCCESS,
  GET_NEARBY_PRODUCTS_FAIL,
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
    axios.get(`${API_URL}/products/`, {
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

const ACTION_HANDLERS = {
  GET_NEARBY_PRODUCTS: handleGetNearbyProduct,
  GET_NEARBY_PRODUCTS_FAIL: handleGetNearbyProductFail,
  GET_NEARBY_PRODUCTS_SUCCESS: handleGetNearbyProductSuccess,
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
};

export function ProductReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
