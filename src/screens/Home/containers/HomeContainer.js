import { connect } from 'react-redux';
import {
  getInputData,
} from '../modules/home.js';
import Home from '../components/Home';

const mapStateToProps = state => ({
  inputData: state.home.inputData || {},
});

const mapActionCreators = {
  getInputData,
};

export default connect(mapStateToProps, mapActionCreators)(Home);
