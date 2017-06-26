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

const MainNavigator = DrawerNavigator({
  Home: { screen: HomeContainer },
  Settings: { screen: Settings },
}, {
  contentComponent: props => <Drawer {...props} />,
});

const Navigator = TabNavigator({
  Auth: { screen: AuthNavigator },
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
});

export default Navigator;
