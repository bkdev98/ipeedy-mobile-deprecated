import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';

class Drawer extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Drawer;
