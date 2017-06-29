import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rating = ({ rating, reviews }) => {
  let rates = '';
  let i = 0;
  for (i = 0; i < rating; i++) rates += '★';
  for (i = rating; i < 5; i++) rates += '☆';
  return (
    <View style={styles.container}>
      <Text style={styles.rating}>
        {rates}
      </Text>
      <Text style={styles.reviews}>
        {`${reviews} Reviews`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  rating: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 10,
    color: '#9C27B0',
  },
  reviews: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 10,
    paddingLeft: 8,
    top: 2,
  },
});

export default Rating;
