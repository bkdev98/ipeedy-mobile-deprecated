import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { DrawerItems } from 'react-navigation';

class Drawer extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/auth-background.png')}
            style={styles.headerImage}
          />
          <View style={styles.infoContainer}>
            <View style={styles.avatar} />
            <View style={styles.metaInfo}>
              <Text style={styles.username}>Quốc Khánh</Text>
              <Text style={styles.phone}>0917 679 524</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <DrawerItems {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 3.5,
    justifyContent: 'flex-end',
  },
  headerImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  infoContainer: {
    bottom: 20,
    paddingLeft: 30,
    position: 'absolute',
    flexDirection: 'row',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
  },
  metaInfo: {
    left: 20,
    justifyContent: 'center',
  },
  username: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white',
  },
  phone: {
    fontFamily: 'Quicksand-Regular',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
  },
  contentContainer: {
    flex: 6.5,
  },
});

export default Drawer;
