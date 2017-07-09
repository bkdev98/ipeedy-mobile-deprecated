import { connect } from 'react-redux';

import {
  getInputData,
  getCurrentLocation,
} from '../modules/home.js';

import {
  getNearbyProducts,
} from '../../Product/modules/product.js';

import Home from '../components/Home';

const mapStateToProps = state => ({
  inputData: state.home.inputData,
  region: state.home.region,
  loading: state.home.loading || state.product.loading,
  products: state.product.products,
});

const mapActionCreators = {
  getInputData,
  getCurrentLocation,
  getNearbyProducts,
};

export default connect(mapStateToProps, mapActionCreators)(Home);
