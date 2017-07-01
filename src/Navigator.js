import React from 'react';
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
} from 'react-navigation';

import AuthContainer from './screens/Auth/containers/AuthContainer';
import ConfirmPhone from './screens/Auth/components/ConfirmPhone';
import Social from './screens/Auth/components/Social';
import HomeContainer from './screens/Home/containers/HomeContainer';
import Settings from './screens/Settings/components/Settings';
import Product from './screens/Product/components/Product';
import About from './screens/About/components/About';

import Drawer from './components/Drawer';

const PhoneAuthNavigator = StackNavigator({
  Auth: { screen: AuthContainer },
  ConfirmPhone: { screen: ConfirmPhone },
}, {
  headerMode: 'none',
});

const AuthNavigator = StackNavigator({
  Auth: { screen: PhoneAuthNavigator },
  Social: { screen: Social },
}, {
  headerMode: 'none',
  mode: 'modal',
});

const HomeNavigator = StackNavigator({
  Home: { screen: HomeContainer },
  Product: {
    screen: Product,
    path: 'product/:id',
  },
});

const MainNavigator = DrawerNavigator({
  Home: { screen: HomeNavigator },
  Settings: { screen: Settings },
  About: { screen: About },
}, {
  contentComponent: props => <Drawer {...props} />,
  contentOptions: {
    labelStyle: {
      fontFamily: 'Quicksand-Regular',
      fontSize: 17,
      fontWeight: '400',
    },
    style: {
      top: 0,
      left: 20,
    },
    activeTintColor: 'black',
    activeBackgroundColor: 'transparent',
    inactiveTintColor: 'black',
    inactiveBackgroundColor: 'transparent',
  },
});

const Navigator = TabNavigator({
  // Auth: { screen: AuthNavigator },
  Main: { screen: MainNavigator },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      height: 0,
    },
    showLabel: false,
  },
  lazy: true,
});

export default Navigator;
