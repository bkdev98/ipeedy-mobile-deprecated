import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import BackButton from '../../../components/BackButton';

const { width, height } = Dimensions.get('window');

class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backButton}>
          <BackButton color='white' onPress={() => this.props.navigation.goBack()} />
        </View>
        <Image source={require('../../../../assets/images/auth-background.png')} style={styles.background} />
        <View style={styles.authorContainer}>
          <Text style={styles.author}>Quốc Khánh, 2017</Text>
        </View>
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
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 20,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  authorContainer: {
    position: 'absolute',
    flex: 1,
    bottom: 20,
    alignItems: 'center',
    width,
  },
  author: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});

export default About;
