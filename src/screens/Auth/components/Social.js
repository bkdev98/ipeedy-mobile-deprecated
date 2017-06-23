import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BackButton from './BackButton';

class Social extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  componentWillMount() {
    this.animate = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animate, {
      toValue: 1,
      duration: 200,
    }).start();
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  }

  handleAuthFacebook = () => {}

  handleAuthGoogle = () => {}

  render() {
    const backiconInterpolate = this.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [-45, Platform.OS === 'android' ? 20 : 10],
    });

    const backIconStyle = {
      transform: [
        { translateX: backiconInterpolate },
      ],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.backIcon, backIconStyle]}>
          <BackButton onPress={this.handlePressBack} />
        </Animated.View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose an account</Text>
        </View>

        <View style={styles.accountContainer}>
          <TouchableOpacity onPress={this.handleAuthFacebook} style={styles.accountRowContainer}>
            <Icon name='logo-facebook' size={25} color='#0D47A1' />
            <Text style={styles.accountText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleAuthGoogle} style={styles.accountRowContainer}>
            <Icon name='logo-google' size={25} color='#B71C1C' />
            <Text style={styles.accountText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backIcon: {
    position: 'absolute',
    zIndex: 100,
    top: Platform.OS === 'android' ? 35 : 25,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    top: 120,
    left: 20,
  },
  title: {
    fontSize: Platform.OS === 'android' ? 22 : 20,
    color: 'black',
    fontFamily: 'Quicksand-Regular',
  },
  accountContainer: {
    left: 40,
    top: 160,
  },
  accountRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  accountText: {
    fontSize: Platform.OS === 'android' ? 20 : 18,
    color: 'black',
    left: 20,
    fontFamily: 'Quicksand-Regular',
  },
};

export default Social;
