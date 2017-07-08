import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class InputProductName extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter product name:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 20,
  },
});

export default InputProductName;
