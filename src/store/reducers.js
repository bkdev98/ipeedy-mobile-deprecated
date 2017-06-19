import { combineReducers } from 'redux';
import { HomeReducer as home } from '../screens/Home/modules/home';
import { AuthReducer as auth } from '../screens/Auth/modules/auth';

const makeRootReducer = () => combineReducers({
  home,
  auth,
});

export default makeRootReducer;
