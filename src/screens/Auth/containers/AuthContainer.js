import { connect } from 'react-redux';
import {
  getInputData,
} from '../modules/auth.js';
import Auth from '../components/Auth';

const mapStateToProps = state => ({
  inputData: state.auth.inputData || {},
});

const mapActionCreators = {
  getInputData,
};

export default connect(mapStateToProps, mapActionCreators)(Auth);
