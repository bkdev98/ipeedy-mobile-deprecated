import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

class NavBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
    top: 0,
    height: Platform.OS === 'android' && Platform.Version >= 20 ? 89 : 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 15,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.5)',
  },
});

export default NavBar;
