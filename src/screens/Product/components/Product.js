import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import feedProducts from '../../Home/modules/feed';
import BackButton from '../../../components/BackButton';
import ShareButton from '../../../components/ShareButton';
import Divider from '../../../components/Divider';
import Rating from '../../../components/Rating';

import MapStyle from '../../Home/components/MapStyle';

const { width, height } = Dimensions.get('window');

class Product extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.product = feedProducts[props.navigation.state.params.id];
  }

  componentWillMount() {
    this.navbarAnimated = new Animated.Value(0);
  }

  render() {
    const navbarStyle = {
      backgroundColor: this.navbarAnimated.interpolate({
        inputRange: [0, ((height * 2) / 3) - 300, ((height * 2) / 3) - 200],
        outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      }),
      shadowOpacity: this.navbarAnimated.interpolate({
        inputRange: [0, ((height * 2) / 3) - 300, ((height * 2) / 3) - 200],
        outputRange: [0, 0, 1],
      }),
    };

    const iconColorStyle = {
      color: this.navbarAnimated.interpolate({
        inputRange: [0, ((height * 2) / 3) - 300, ((height * 2) / 3) - 200],
        outputRange: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(0,0,0)'],
      }),
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <Animated.View style={[styles.navbar, navbarStyle]}>
          <View style={styles.backButton}>
            <BackButton
              onPress={() => this.props.navigation.goBack()}
              color="white"
              animatedColor={iconColorStyle}
            />
          </View>
          <View style={styles.shareButton}>
            <ShareButton
              onPress={() => {}}
              color="white"
              animatedColor={iconColorStyle}
            />
          </View>
        </Animated.View>

        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutContent}>
            <Text style={styles.checkoutPrizeGroup}>
              <Text style={styles.checkoutPrize}>{this.product.price}</Text>
              <Text style={styles.checkoutUnit}> / product</Text>
            </Text>
            <Rating
              rating={this.product.rating}
              reviews={this.product.reviews.length}
              displayText={false}
            />
          </View>
          <View style={styles.checkoutButtonContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {}}
            >
              <Text style={styles.checkoutButtonText}>MUA</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ height: 1300 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.navbarAnimated } } },
          ])}
        >
          <Image style={styles.images} source={{ uri: this.product.images[0] }} />
          <View style={styles.content}>
            <Text style={styles.text}>
              {this.product.name.toUpperCase()}
            </Text>

            <View style={styles.metaInfo}>
              <View>
                <Text style={styles.category}>Đồ ăn vặt</Text>
                <Text style={styles.hawker}>
                  <Text style={styles.soldBy}>Bán bởi </Text>
                  <Text style={styles.hawkerName}>Quốc Khánh</Text>
                </Text>
              </View>
              <View style={styles.hawkerImageContainer}>
                <View style={styles.hawkerImage} />
              </View>
            </View>

            <Divider />

            <View style={styles.metaIcons}>
              <View style={styles.metaIcon}>
                <Icon name='ios-cart-outline' color='black' size={30} />
                <Text style={styles.metaIconText}>21 delivered</Text>
              </View>
              <View style={styles.metaIcon}>
                <Icon name='ios-archive-outline' color='black' size={30} />
                <Text style={styles.metaIconText}>69 left</Text>
              </View>
              <View style={styles.metaIcon}>
                <Icon name='ios-clock-outline' color='black' size={30} />
                <Text style={styles.metaIconText}>10 min</Text>
              </View>
              <View style={styles.metaIcon}>
                <Icon name='ios-cloudy-night-outline' color='black' size={30} />
                <Text style={styles.metaIconText}>6h-22h</Text>
              </View>
            </View>

            <Divider />

            <View style={styles.descriptionContainer}>
              <Text style={styles.smallTitle}>Mô tả</Text>
              <Text style={styles.description}>{this.product.description}</Text>
            </View>

            <Divider />

            <View style={styles.locationContainer}>
              <Text style={styles.smallTitle}>Vị trí</Text>
              <MapView
                ref={map => this.map = map}
                style={styles.locationMap}
                provider={PROVIDER_GOOGLE}
                region={{
                  ...this.product.coordinate,
                  latitudeDelta: 0.035,
                  longitudeDelta: (width / height) * 0.035,
                }}
                customMapStyle={MapStyle}
                scrollEnabled={false}
              >
                <MapView.Circle
                  center={this.product.coordinate}
                  radius={1000}
                  strokeColor='rgba(130,4,150, 0.4)'
                  fillColor='rgba(130,4,150, 0.1)'
                />
              </MapView>
              <Text style={styles.distance}>6.9km from here</Text>
            </View>

            <Divider />

            <View style={styles.reviewContainer}>
              <Text style={styles.smallTitle}>Đánh giá</Text>
              <View style={styles.featuredReviewContainer}>
                <View style={styles.featuredReviewUser}>
                  <View style={styles.hawkerImage} />
                  <View style={{ left: 10 }}>
                    <Text style={styles.username}>Quốc Khánh</Text>
                    <Text style={styles.postTime}>July 2017</Text>
                  </View>
                </View>
                <View style={styles.featuredReviewContent}>
                  <Text style={styles.featuredReview}>
                    {this.product.reviews[0].content}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.allReview}>
                  <View>
                    <Text style={styles.hawkerName}>{`Xem tất cả ${this.product.reviews.length} đánh giá`}</Text>
                  </View>
                  <View>
                    <Rating
                      rating={this.product.rating}
                      reviews={this.product.reviews.length}
                      displayText={false}
                      displayNumber={false}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navbar: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    height: 65,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 15,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  shareButton: {
    backgroundColor: 'transparent',
  },
  images: {
    width,
    height: (height * 2) / 5,
    backgroundColor: '#AB47BC',
  },
  content: {
    height,
    padding: 15,
  },
  metaInfo: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
  },
  metaIcons: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metaIcon: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaIconText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
  },
  category: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
  },
  hawker: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
  },
  soldBy: {
  },
  hawkerName: {
    color: '#8E24AA',
  },
  hawkerImageContainer: {

  },
  hawkerImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#BA68C8',
  },
  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 30,
  },
  descriptionContainer: {
    top: 20,
    height: 90,
  },
  smallTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
  },
  locationContainer: {
    top: 20,
    height: (height / 3) + 100,
  },
  locationMap: {
    top: 10,
    height: height / 3,
  },
  distance: {
    top: 20,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,.4)',
    backgroundColor: 'transparent',
  },
  reviewContainer: {
    top: 20,
    height: 300,
  },
  featuredReviewContainer: {
    top: 10,
    height: 100,
  },
  featuredReviewUser: {
    flexDirection: 'row',
  },
  username: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  },
  postTime: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 15,
  },
  featuredReviewContent: {
    top: 10,
  },
  featuredReview: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
  },
  allReview: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutContainer: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    width,
    height: height / 9,
    borderTopWidth: 1,
    backgroundColor: 'white',
    borderTopColor: 'rgba(0,0,0,.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  checkoutContent: {
    justifyContent: 'center',
  },
  checkoutPrizeGroup: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
  },
  checkoutPrize: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 17,
  },
  checkoutButtonContainer: {
  },
  checkoutButton: {
    paddingVertical: 10,
    backgroundColor: '#AB47BC',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  checkoutButtonText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    color: 'white',
  },
});

export default Product;
