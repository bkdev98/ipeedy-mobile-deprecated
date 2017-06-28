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
import ProductsList from './ProductsList';
import Hamburger from '../../../components/Hamburger';
import UserMarker from './UserMarker';

const productsArray = [
  {
    id: 1001,
    name: 'Vé số',
    images: [
      'https://source.unsplash.com/user/erondu/400x400',
    ],
    price: '10K',
    description: 'Vé số chiều xổ đây',
    rating: 5,
    reviews: [
      {
        id: 1,
        content: 'Etiam Vestibulum Sem Ligula Egestas',
      }, {
        id: 2,
        content: 'Risus Adipiscing Malesuada Inceptos',
      }, {
        id: 3,
        content: 'Justo Sit Sollicitudin',
      }, {
        id: 4,
        content: 'Fusce Purus Sem Consectetur',
      },
    ],
  }, {
    id: 1002,
    name: 'Xoài lắc',
    images: [
      'https://source.unsplash.com/collection/190727/400x400',
    ],
    price: '15K',
    description: 'Xoài lắc lắc lắc lắc',
    rating: 4,
    reviews: [
      {
        id: 1,
        content: 'Etiam Vestibulum Sem Ligula Egestas',
      }, {
        id: 2,
        content: 'Risus Adipiscing Malesuada Inceptos',
      }, {
        id: 4,
        content: 'Fusce Purus Sem Consectetur',
      },
    ],
  }, {
    id: 1003,
    name: 'Trà đào',
    images: [
      'https://source.unsplash.com/user/erondu/likes/400x400',
    ],
    price: '20K',
    description: 'Trà đào thơm miệng giải độc',
    rating: 2,
    reviews: [
      {
        id: 1,
        content: 'Etiam Vestibulum Sem Ligula Egestas',
      }, {
        id: 2,
        content: 'Risus Adipiscing Malesuada Inceptos',
      }, {
        id: 3,
        content: 'Justo Sit Sollicitudin',
      },
    ],
  }, {
    id: 1004,
    name: 'Keo chó',
    images: [
      'https://source.unsplash.com/user/erondu/400x400',
    ],
    price: '5K',
    description: 'X-66 100ml chất lượng, giá tốt',
    rating: 5,
    reviews: [
      {
        id: 1,
        content: 'Etiam Vestibulum Sem Ligula Egestas',
      },
    ],
  }, {
    id: 1005,
    name: 'Bạc xỉu',
    images: [
      'https://source.unsplash.com/collection/190727/400x400',
    ],
    price: '30K',
    description: 'Ly sữa vị cà phê dân dã',
    rating: 3,
    reviews: [
      {
        id: 1,
        content: 'Etiam Vestibulum Sem Ligula Egestas',
      }, {
        id: 2,
        content: 'Risus Adipiscing Malesuada Inceptos',
      },
    ],
  }, {
    id: 1006,
    name: 'Kẹo sữa Milkita',
    images: [
      'https://source.unsplash.com/user/erondu/likes/400x400',
    ],
    price: '2K',
    description: 'Được làm từ sữa',
    rating: 5,
    reviews: [
      {
        id: 1,
        content: 'Etiam Vestibulum Sem Ligula Egestas',
      }, {
        id: 2,
        content: 'Risus Adipiscing Malesuada Inceptos',
      }, {
        id: 3,
        content: 'Justo Sit Sollicitudin',
      }, {
        id: 4,
        content: 'Fusce Purus Sem Consectetur',
      },
    ],
  },
];

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
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                customMapStyle={MapStyle}
              >
                {region && <MapView.Marker coordinate={region}>
                  <UserMarker />
                </MapView.Marker>}
              </MapView>
          }
        </View>

        {/*
          Products
        */}

        <View style={styles.productsContainer}>
          <ProductsList products={productsArray} />
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
    flex: 7,
  },
  productsContainer: {
    flex: 3,
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
});

export default Home;
