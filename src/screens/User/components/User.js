import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import BackButton from '../../../components/BackButton';

class User extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.backButton}>
          <BackButton
            onPress={() => this.props.navigation.goBack()}
            color='white'
          />
        </View>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../../assets/images/auth-background.png')}
            style={styles.headerImage}
          />
          <View style={styles.infoContainer}>
            <View style={styles.avatar} />
            <View style={styles.metaInfo}>
              <Text style={styles.username}>Quốc Khánh</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
  },
  headerContainer: {
    flex: 3.5,
    backgroundColor: '#9C27B0',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'white',
  },
  metaInfo: {
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white',
  },
  headerImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 6.5,
  },
});

export default User;
