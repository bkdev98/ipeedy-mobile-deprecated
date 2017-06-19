import constants from './types.js';

const {
  GET_INPUT,
} = constants;

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

/**
|--------------------------------------------------
| Action Handlers
|--------------------------------------------------
*/

function handleGetInputData(state, action) {
  const { key, value } = action.payload;
  return {
    ...state,
    inputData: {
      ...state.inputData,
      [key]: value,
    },
  };
}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/

const ACTION_HANDLERS = {
  GET_INPUT: handleGetInputData,
};

const initialState = {
  inputData: {},
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
