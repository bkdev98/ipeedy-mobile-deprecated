import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rating = ({ rating, reviews }) => {
  let rates = '';
  for (i = 0; i < rating; i++) rates += '★';
  for (i = rating; i < 5; i++) rates += '☆';
  return (
    <View style={styles.container}>
      <Text style={styles.rating}>
        {`${rates}  ${reviews} Reviews`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rating: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 9,
  },
});

export default Rating;
