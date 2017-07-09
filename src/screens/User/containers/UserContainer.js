import { connect } from 'react-redux';
import {
} from '../modules/user.js';
import User from '../components/User';

const mapStateToProps = state => ({
  inputData: state.home.inputData,
  region: state.home.region,
  loading: state.home.loading,
});

const mapActionCreators = {
};

export default connect(mapStateToProps, mapActionCreators)(User);
