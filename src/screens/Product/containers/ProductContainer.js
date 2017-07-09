import { connect } from 'react-redux';
import {
} from '../modules/product.js';
import Product from '../components/Product';

const mapStateToProps = state => ({
  inputData: state.home.inputData,
  region: state.home.region,
  loading: state.home.loading,
});

const mapActionCreators = {
};

export default connect(mapStateToProps, mapActionCreators)(Product);
