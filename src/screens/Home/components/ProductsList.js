import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Rating from '../../../components/Rating';

const { width } = Dimensions.get('window');

class ProductsList extends Component {
  state = {
    selectedProduct: 0,
  }

  handleScroll = event => {
    this.setState({
      selectedProduct: Math.trunc(event.nativeEvent.contentOffset.x / 175),
    });
  }

  selectProduct = index => {
    this.props.pressProduct(index);
  }

  render() {
    const products = this.props.products.map((product, index) => (
      <TouchableOpacity
        underlayColor='#E1BEE7'
        style={styles.productContainer}
        key={product.id}
        onPress={() => this.selectProduct(index)}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.productHeader}>
            {index === this.state.selectedProduct &&
              <View style={styles.seletedProduct} />}
            <Image
              source={{ uri: product.images[0] }}
              style={{ flex: 1 }}
              resizeMode='cover'
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.price} · {product.name}</Text>
            <Rating rating={product.rating} reviews={product.reviews.length} />
          </View>
        </View>
      </TouchableOpacity>
    ));

    return (
      <Animated.ScrollView
        ref={c => this._scrollview = c}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.props.animation,
                },
              },
            },
          ], {
            listener: this.handleScroll,
          }
        )}
        snapToInterval={175}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {products}
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 4,
  },
  scrollViewContent: {
    backgroundColor: 'white',
    paddingRight: width - 175,
  },
  productContainer: {
    width: 175,
    paddingHorizontal: '0.45%',
    paddingVertical: '0.9%',
    backgroundColor: 'transparent',
  },
  productHeader: {
    flex: 7.5,
    backgroundColor: '#7E57C2',
  },
  seletedProduct: {
    height: 3,
    width: 175 - 10,
    position: 'absolute',
    zIndex: 5,
    top: 0,
    backgroundColor: '#7E57C2',
  },
  productInfo: {
    flex: 2.5,
    backgroundColor: 'transparent',
    padding: 5,
  },
  productName: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
  },
  productDescription: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
  },
});

export default ProductsList;
