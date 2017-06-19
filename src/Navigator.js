import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
} from 'react-navigation';

import Auth from './screens/Auth/components/Auth';
import Number from './screens/Auth/components/Number';
import Social from './screens/Auth/components/Social';
import Home from './screens/Home/components/Home';
import Settings from './screens/Settings/components/Settings';

const AuthNavigator = StackNavigator({
  Auth: { screen: Auth },
  Number: { screen: Number },
  Social: { screen: Social },
});

const MainNavigator = DrawerNavigator({
  Home: { screen: Home },
  Settings: { screen: Settings },
});

const Navigator = TabNavigator({
  Auth: { screen: AuthNavigator },
  Main: { screen: MainNavigator },
});

export default Navigator;
