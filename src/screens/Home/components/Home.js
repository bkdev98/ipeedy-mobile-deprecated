import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from './MapStyle';
import Hamburger from '../../../components/Hamburger';

class Home extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  state = {
    region: null,
  }

  componentDidMount() {
    this.props.getCurrentLocation();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      region: nextProps.region,
    });
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  handleHamburger = () => this.props.navigation.navigate('DrawerOpen');

  render() {
    const { region, loading } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        {
          loading ?
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
            :
            <MapView
              style={StyleSheet.absoluteFill}
              provider={PROVIDER_GOOGLE}
              region={this.state.region}
              onRegionChange={this.onRegionChange}
              customMapStyle={MapStyle}
            >
              {region && <MapView.Marker coordinate={region} pinColor='pink' />}
            </MapView>
        }

        <View style={styles.hamburgerContainer}>
          <Hamburger onPress={this.handleHamburger} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
