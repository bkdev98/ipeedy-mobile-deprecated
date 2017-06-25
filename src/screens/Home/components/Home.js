import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Hamburger from '../../../components/Hamburger';

class Home extends Component {
  static navigationOptions = {
    // tabBarVisible: false,
  }

  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  handleHamburger = () => this.props.navigation.navigate('DrawerOpen');

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <View style={styles.hamburgerContainer}>
          <Hamburger onPress={this.handleHamburger} />
        </View>

        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburgerContainer: {
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
    top: Platform.OS === 'android' ? 35 : 25,
    left: Platform.OS === 'android' ? 35 : 5,
    backgroundColor: 'transparent',
  },
});

export default Home;
