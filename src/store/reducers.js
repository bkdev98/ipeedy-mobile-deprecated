import { combineReducers } from 'redux';
import { HomeReducer as home } from '../screens/Home/modules/home';
import { ProductReducer as product } from '../screens/Product/modules/product';
import { AuthReducer as auth } from '../screens/Auth/modules/auth';

const makeRootReducer = () => combineReducers({
  home,
  auth,
  product,
});

export default makeRootReducer;
