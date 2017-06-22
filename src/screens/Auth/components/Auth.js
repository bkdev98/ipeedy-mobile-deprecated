import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NextButton from './NextButton';
import BackButton from './BackButton';

class Auth extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  state = {
    openPhone: false,
    openSocial: false,
  }

  componentWillMount() {
    this.phoneAnimate = new Animated.Value(0);
    this.socialAnimate = new Animated.Value(0);
  }

  handlePressNumber = () => {
    this.setState((state) => ({
      openPhone: !state.openPhone,
    }), () => {
      const toValue = this.state.openPhone ? 1 : 0;
      Animated.timing(this.phoneAnimate, {
        toValue,
        duration: 200,
        easing: Easing.ease,
      }).start();
    });
  }

  handlePressSocial = () => {

  }

  handleNextPhone = () => {}

  render() {
    /**
    |--------------------------------------------------
    | Interpolates
    |--------------------------------------------------
    */
    const headerFlexInterpolate = this.phoneAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [6.5, 0],
    });

    const titleFlexInterpolate = this.phoneAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [1.25, 0],
    });

    const titleHeightInterpolate = this.phoneAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    const reverseValueInterpolate = this.phoneAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const backiconInterpolate = this.phoneAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [-45, Platform.OS === 'android' ? 20 : 10],
    });

    const nextbuttonInterpolate = this.phoneAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [-75, 45],
    });

    /**
    |--------------------------------------------------
    | Animation Styles
    |--------------------------------------------------
    */

    const headerStyle = {
      flex: headerFlexInterpolate,
    };

    const backIconStyle = {
      transform: [
        { translateX: backiconInterpolate },
      ],
    };

    const titleStyle = {
      flex: titleFlexInterpolate,
      height: titleHeightInterpolate,
      transform: [
        { scale: reverseValueInterpolate },
      ],
    };

    const socialStyle = {
      flex: reverseValueInterpolate,
    };

    const textStyle = {
      opacity: reverseValueInterpolate,
      transform: [
        { scale: reverseValueInterpolate },
      ],
    };

    const socialTextStyle = {
      transform: [
        { scale: reverseValueInterpolate },
      ],
    };

    const phoneTextStyle = {
      opacity: reverseValueInterpolate,
    };

    const nextButtonStyle = {
      right: nextbuttonInterpolate,
    };

    /**
    |--------------------------------------------------
    | Magics
    |--------------------------------------------------
    */

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />

        <Animated.View style={[styles.nextButtonContainer, nextButtonStyle]}>
          <NextButton onPress={this.handleNextPhone} />
        </Animated.View>

        <Animated.View style={[styles.headerContainer, headerStyle]}>
          <Image
            style={styles.backgroundImage}
            source={require('../../../../assets/images/auth-background.png')}
          >
            <View
              style={styles.iconContainer}
              shadowColor="black"
              shadowOffset={{ width: 0, height: 0 }}
              shadowOpacity={0.3}
              shadowRadius={10}
            >
              <Icon name="ios-cart-outline" size={60} color="#8E24AA" />
            </View>
          </Image>
        </Animated.View>

        <Animated.View style={[styles.backIcon, backIconStyle]}>
          <BackButton onPress={this.handlePressNumber} />
        </Animated.View>

        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <Animated.Text style={[styles.title, textStyle]}>Ride Like The Wind</Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.phoneContainer]}>
          {this.state.openPhone ?
            <View style={styles.phoneOpenContainer}>
              <View style={styles.phoneOpenTitleContainer}>
                <Text style={styles.phoneOpenTitle}>Enter your mobile number</Text>
              </View>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.nationFlag}>+84 </Text>
                <TextInput
                  autoFocus
                  style={styles.textInput}
                  placeholder="091 234 56 78"
                  placeholderTextColor="rgba(255,255,255,.3)"
                  keyboardType="phone-pad"
                  underlineColorAndroid="white"
                  selectionColor="white"
                />
                <View style={styles.closeIconContainer}>
                  <Icon name="md-close" size={20} color="white" />
                </View>
              </View>
            </View>
            : <TouchableOpacity onPress={() => this.handlePressNumber()} activeOpacity={0.9} style={styles.phoneButtonContainer}>
              <View style={styles.phoneInsideContainer}>
                <Text style={styles.nationFlag}>+84 </Text>
                <Animated.Text style={[styles.numberText, phoneTextStyle]}>Enter your mobile number</Animated.Text>
              </View>
            </TouchableOpacity>
          }
        </Animated.View>
        <Animated.View style={[styles.socialContainer, socialStyle]}>
          <TouchableOpacity onPress={this.handlePressSocial} activeOpacity={0.9} style={styles.socialButtonContainer}>
            <Animated.Text style={[styles.socialText, socialTextStyle]}>Or connect with social</Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  headerContainer: {
    flex: 6.5,
  },
  backIcon: {
    position: 'absolute',
    zIndex: 100,
    top: Platform.OS === 'android' ? 35 : 25,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    flex: 3.5,
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 1.25,
    justifyContent: 'center',
    backgroundColor: '#F3E5F5',
    paddingLeft: 30,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Quicksand-Medium',
    color: '#894fc6',
  },
  closeIconContainer: {
    flex: 2,
    top: Platform.OS === 'android' ? -12 : 0,
    justifyContent: 'center',
  },
  phoneContainer: {
    flex: 1.75,
    backgroundColor: '#894fc6',
  },
  phoneButtonContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  phoneInsideContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  phoneOpenContainer: {

  },
  phoneOpenTitle: {
    fontSize: Platform.OS === 'android' ? 22 : 20,
    color: 'white',
    fontFamily: 'Quicksand-Medium',
  },
  phoneOpenTitleContainer: {
    paddingLeft: 20,
    top: 100,
  },
  phoneInputContainer: {
    top: 150,
    flexDirection: 'row',
    paddingLeft: 30,
  },
  nationFlag: {
    fontSize: Platform.OS === 'android' ? 22 : 20,
    fontFamily: 'Quicksand-Medium',
    color: 'white',
    flex: 2,
  },
  numberText: {
    fontSize: Platform.OS === 'android' ? 22 : 20,
    color: 'rgba(255,255,255,.3)',
    flex: 9,
    alignItems: 'flex-start',
    fontFamily: 'Quicksand-Medium',
  },
  textInput: {
    top: Platform.OS === 'android' ? -12 : 0,
    fontSize: Platform.OS === 'android' ? 22 : 20,
    color: 'white',
    flex: 6,
    fontFamily: 'Quicksand-Medium',
  },
  socialContainer: {
    backgroundColor: '#c26bd6',
    flex: 1,
  },
  socialButtonContainer: {
    paddingLeft: 30,
    flex: 1,
    justifyContent: 'center',
  },
  socialText: {
    color: 'rgba(255,255,255,.7)',
    fontFamily: 'Quicksand-Medium',
    fontSize: 17,
  },
  nextButtonContainer: {
    position: 'absolute',
    flex: 1,
    zIndex: 3,
    bottom: 45,
  },
});

export default Auth;
