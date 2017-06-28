import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Rating from './Rating';

class ProductsList extends Component {
  render() {
    const products = this.props.products.map(product => (
      <View style={styles.productContainer} key={product.id}>
        <View style={styles.productHeader}>
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
    ));

    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {products}
      </ScrollView>
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
  productRating: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 9,
  },
});

export default ProductsList;
