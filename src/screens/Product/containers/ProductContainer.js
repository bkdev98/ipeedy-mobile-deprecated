import { connect } from 'react-redux';
import {
  getProduct,
} from '../modules/product.js';
import Product from '../components/Product';

const mapStateToProps = state => ({
  inputData: state.home.inputData,
  region: state.home.region,
  loading: state.home.loading || state.product.loading,
  product: state.product.product,
});

const mapActionCreators = {
  getProduct,
};

export default connect(mapStateToProps, mapActionCreators)(Product);
