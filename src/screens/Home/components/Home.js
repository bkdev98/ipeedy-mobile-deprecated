import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  Platform,
  StyleSheet,
  Animated,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from './MapStyle';
import ProductsList from './ProductsList';
import Hamburger from '../../../components/Hamburger';
import UserMarker from './UserMarker';

import feedProducts from '../modules/feed';

class Home extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  state = {
    region: null,
  }

  componentWillMount() {
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.getCurrentLocation();
    this.animation.addListener(({ value }) => {
      let index = Math.floor((value / 175) + 0.3);
      if (index >= feedProducts.length) {
        index = feedProducts.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = feedProducts[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.props.region.latitudeDelta,
              longitudeDelta: this.props.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      region: nextProps.region,
    });
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  handleMarkerPress = index => {
    this._productlist._scrollview._component.scrollTo({
      x: index * 175,
      animated: false,
    });
  }

  handleHamburger = () => this.props.navigation.navigate('DrawerOpen');

  render() {
    const { region, loading } = this.props;

    const interpolations = feedProducts.map((product, index) => {
      const inputRange = [
        (index - 1) * 175,
        index * 175,
        ((index + 1) * 175),
      ];

      const size = this.animation.interpolate({
        inputRange,
        outputRange: [24, 60, 24],
        extrapolate: 'clamp',
      });

      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });

      return { opacity, size };
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <View style={styles.hamburgerContainer}>
          <Hamburger onPress={this.handleHamburger} />
        </View>

        {/*
          Map View
        */}

        <View style={styles.mapContainer}>
          {
            loading ?
              <View style={styles.loadingContainer}>
                <ActivityIndicator />
              </View>
              :
              <MapView
                ref={map => this.map = map}
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                customMapStyle={MapStyle}
              >
                {region &&
                <MapView.Marker coordinate={region} anchor={{ x: 0.5, y: 0.5 }}>
                  <UserMarker />
                </MapView.Marker>}
                {feedProducts.map((product, index) => {
                  const sizeStyle = {
                    width: interpolations[index].size,
                    height: interpolations[index].size,
                    borderRadius: interpolations[index].size,
                  };
                  const opacityStyle = {
                    opacity: interpolations[index].opacity,
                  };
                  return (
                    <MapView.Marker
                      key={product.id}
                      coordinate={product.coordinate}
                      anchor={{ x: 0.5, y: 0.5 }}
                      onPress={() => this.handleMarkerPress(index)}
                    >
                      <Animated.View style={[styles.markerWrap, opacityStyle]}>
                        <Animated.View style={[styles.ring, sizeStyle]} />
                        <View style={styles.marker} />
                      </Animated.View>
                    </MapView.Marker>
                  );
                })}
              </MapView>
          }
        </View>

        {/*
          Products
        */}

        <View style={styles.productsContainer}>
          <ProductsList
            products={feedProducts}
            animation={this.animation}
            ref={c => this._productlist = c}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 7.5,
  },
  productsContainer: {
    flex: 2.5,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
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
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: 60,
    height: 60,
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.2)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.4)',
  },
});

export default Home;
