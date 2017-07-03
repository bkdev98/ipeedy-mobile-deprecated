import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class Filters extends Component {
  state = { }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Filters</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
  },
});

export default Filters;
