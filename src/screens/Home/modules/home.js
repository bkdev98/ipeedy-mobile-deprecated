import { Dimensions } from 'react-native';

import constants from './types.js';

const {
  GET_INPUT,
  GET_CURRENT_LOCATION,
  GET_CURRENT_LOCATION_SUCCESS,
  GET_CURRENT_LOCATION_FAIL,
} = constants;

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/

//  GET USER INPUT
export function getInputData(payload) {
  return {
    type: GET_INPUT,
    payload,
  };
}

//  GET CURRENT LOCATION
export function getCurrentLocation() {
  return (dispatch) => {
    dispatch({
      type: GET_CURRENT_LOCATION,
    });
    return navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: GET_CURRENT_LOCATION_SUCCESS,
          payload: position,
        });
      },
      error => {
        dispatch({
          type: GET_CURRENT_LOCATION_FAIL,
          payload: error,
        });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
}

/**
|--------------------------------------------------
| Action Handlers
|--------------------------------------------------
*/

const handleGetInputData = (state, action) => {
  const { key, value } = action.payload;
  return {
    ...state,
    inputData: {
      ...state.inputData,
      [key]: value,
    },
  };
};

const handleGetCurrentLocation = (state) => ({
  ...state,
  loading: true,
});

const handleGetCurrentLocationSuccess = (state, action) => ({
  ...state,
  loading: false,
  region: {
    ...state.region,
    latitude: action.payload.coords.latitude,
    longitude: action.payload.coords.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
});

const handleGetCurrentLocationFail = (state, action) => ({
  ...state,
  loading: false,
  region: {
    ...state.region,
    error: action.payload.error,
  },
});

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/

const ACTION_HANDLERS = {
  GET_INPUT: handleGetInputData,
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_CURRENT_LOCATION_SUCCESS: handleGetCurrentLocationSuccess,
  GET_CURRENT_LOCATION_FAIL: handleGetCurrentLocationFail,
};

const initialState = {
  inputData: {},
  currentLocation: {},
  loading: false,
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
