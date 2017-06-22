import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
} from 'react-navigation';

import AuthContainer from './screens/Auth/containers/AuthContainer';
import Number from './screens/Auth/components/Number';
import Social from './screens/Auth/components/Social';
import HomeContainer from './screens/Home/containers/HomeContainer';
import Settings from './screens/Settings/components/Settings';

const AuthNavigator = StackNavigator({
  Auth: { screen: AuthContainer },
  Number: { screen: Number },
  Social: { screen: Social },
}, {
  headerMode: 'none',
});

const MainNavigator = DrawerNavigator({
  Home: { screen: HomeContainer },
  Settings: { screen: Settings },
});

const Navigator = TabNavigator({
  Auth: { screen: AuthNavigator },
  Main: { screen: MainNavigator },
}, {
  swipeEnabled: false,
  animationEnabled: false,
});

export default Navigator;
