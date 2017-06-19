import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './store/createStore';

import Navigator from './Navigator';

const initialState = window.___INTITIAL_STATE__;
const store = createStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
