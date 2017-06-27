import { connect } from 'react-redux';
import {
  getInputData,
  getCurrentLocation,
} from '../modules/home.js';
import Home from '../components/Home';

const mapStateToProps = state => ({
  inputData: state.home.inputData,
  region: state.home.region,
  loading: state.home.loading,
});

const mapActionCreators = {
  getInputData,
  getCurrentLocation,
};

export default connect(mapStateToProps, mapActionCreators)(Home);
