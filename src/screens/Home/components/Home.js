import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from './MapStyle';
import ProductsList from './ProductsList';
import Hamburger from '../../../components/Hamburger';
import FunButton from '../../../components/FunButton';
import ModalBox from '../../../components/ModalBox';
import NavBar from '../../../components/NavBar';
import UserMarker from './UserMarker';
import Filters from './Filters';

import feedProducts from '../modules/feed';

const { width, height } = Dimensions.get('window');

class Home extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    header: null,
  }

  state = {
    region: null,
    filtersVisible: false,
  }

  componentWillMount() {
    this.props.getCurrentLocation();
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
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

  handlePressProduct = index => {
    this.props.navigation.navigate('Product', { id: index });
  }

  handleFilter = () => {
    console.log('Hello', this.state.region);
    this.setState({ filtersVisible: true }, () => console.log(this.state.region));
  }

  handleAddProduct = () => {
    this.props.navigation.navigate('CreateProduct');
  }

  handleRefresh = () => {}

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
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <NavBar>
          <View style={styles.hamburger}>
            <Hamburger onPress={this.handleHamburger} />
          </View>
          <View style={styles.addButton}>
            <FunButton
              onPress={this.handleAddProduct}
              icon='ios-cart-outline'
              title='ADD'
              color='white'
              iconColor='black'
            />
          </View>
        </NavBar>

        <ModalBox
          isOpen={this.state.filtersVisible}
          onClosed={() => this.setState({ filtersVisible: false })}
          backButtonClose={false}
        >
          <View style={styles.filtersModal}>
            <Filters />
          </View>
        </ModalBox>

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
              <View style={{ flex: 1 }}>
                <View style={styles.mapControl}>
                  <View style={styles.filterContainer}>
                    <FunButton
                      icon='ios-color-wand-outline'
                      title='FILTERS'
                      onPress={this.handleFilter}
                      color='white'
                      iconColor='black'
                    />
                  </View>
                </View>
                <MapView
                  ref={map => this.map = map}
                  style={StyleSheet.absoluteFill}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={region}
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
              </View>
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
            pressProduct={this.handlePressProduct}
            onAdd={this.handleAddProduct}
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
  mapControl: {
    position: 'absolute',
    bottom: 20,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingHorizontal: 20,
  },
  refreshContainer: {
    paddingRight: 20,
  },
  filterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  filtersModal: {
    width: width * 0.9,
    height: height * 0.8,
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
  hamburger: {
    backgroundColor: 'transparent',
  },
  addButton: {
    top: 10,
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
