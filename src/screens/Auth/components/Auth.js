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
    input: '',
  }

  componentWillMount() {
    this.phoneAnimate = new Animated.Value(0);
    this.socialAnimate = new Animated.Value(0);
  }

  handleChangePhone = phone => this.setState({ input: phone })

  handlePressNumber = () => {
    this.setState((state) => ({
      openPhone: !state.openPhone,
    }), () => {
      const toValue = this.state.openPhone ? 1 : 0;
      Animated.timing(this.phoneAnimate, {
        toValue,
        duration: 300,
      }).start();
    });
  }

  handlePressSocial = () => {
    this.props.navigation.navigate('Social');
  }

  handleNextPhone = () => {}

  render() {
    /**
    |--------------------------------------------------
    | Animation Styles
    |--------------------------------------------------
    */
    const reverseValueInterpolate = this.phoneAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const headerStyle = {
      flex: this.phoneAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [7, 0],
      }),
    };

    const backIconStyle = {
      transform: [
        { translateX: this.phoneAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [-45, Platform.OS === 'android' ? 20 : 10],
        }) },
      ],
    };

    const nextButtonStyle = {
      right: this.phoneAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [-75, 45],
      }),
    };

    const titleContainerStyle = {
      transform: [
        { scale: reverseValueInterpolate },
      ],
      flex: this.phoneAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [2.5, 0],
      }),
    };

    const opacityInterpolateStyle = {
      opacity: this.phoneAnimate.interpolate({
        inputRange: [0, 0.5],
        outputRange: [1, 0],
      }),
    };

    const scaleInterpolateStyle = {
      transform: [
        { scale: reverseValueInterpolate },
      ],
    };

    const socialStyle = {
      flex: this.phoneAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 0],
      }),
    };

    /**
    |--------------------------------------------------
    | Magics
    |--------------------------------------------------
    */

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/*
          Header
        */}

        <Animated.View style={[styles.headerContainer, headerStyle]}>
          <Image
            style={styles.backgroundImage}
            source={require('../../../../assets/images/auth-background.png')}
          >
            <Animated.View
              style={[styles.iconContainer, opacityInterpolateStyle]}
            >
              <Icon name="ios-cart-outline" size={60} color="black" />
            </Animated.View>
          </Image>
        </Animated.View>

        {/*
          Phone Number Container
        */}

        <Animated.View style={[styles.nextButtonContainer, nextButtonStyle]}>
          <NextButton onPress={this.handleNextPhone} />
        </Animated.View>

        {this.state.openPhone &&
          <Animated.View style={[styles.backIcon, backIconStyle]}>
            <BackButton onPress={this.handlePressNumber} />
          </Animated.View>
        }

        <View style={styles.authContainer}>
          <Animated.View style={[styles.titleContainer, titleContainerStyle]}>
            <Animated.Text style={[styles.title, opacityInterpolateStyle, scaleInterpolateStyle]}>Ride Like The Wind</Animated.Text>
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
                    placeholderTextColor="rgba(0,0,0,.3)"
                    keyboardType="phone-pad"
                    underlineColorAndroid="black"
                    selectionColor="black"
                    onChangeText={value => this.props.getInputData({ key: 'phone', value })}
                    value={this.props.inputData.phone}
                  />
                  <TouchableOpacity style={styles.closeIconContainer} onPress={() => this.props.getInputData({ key: 'phone', value: '' })}>
                    <View style={{ flex: 1 }}>
                      <Icon name="md-close" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              : <TouchableOpacity onPress={() => this.handlePressNumber()} activeOpacity={0.9} style={styles.phoneButtonContainer}>
                <View style={styles.phoneInsideContainer}>
                  <Text style={styles.nationFlag}>+84 </Text>
                  <Animated.Text style={[styles.numberText, opacityInterpolateStyle]}>Enter your mobile number</Animated.Text>
                </View>
              </TouchableOpacity>
            }
          </Animated.View>

          <Animated.View style={{ height: 1, backgroundColor: 'rgba(0,0,0,.1)', ...opacityInterpolateStyle }} />

          {/*
            Social Section
          */}

          <Animated.View style={[styles.socialContainer, socialStyle]}>
            <TouchableOpacity onPress={this.handlePressSocial} activeOpacity={0.9} style={styles.socialButtonContainer}>
              <Animated.Text style={[styles.socialText, opacityInterpolateStyle]}>Or connect with social</Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

/**
|--------------------------------------------------
| Beautiful
|--------------------------------------------------
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  headerContainer: {
    flex: 7,
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
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  authContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 2.5,
    top: 15,
    justifyContent: 'center',
    // backgroundColor: '#F3E5F5',
    paddingLeft: 30,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Quicksand-Regular',
    // color: '#894fc6',
    color: 'black',
  },
  closeIconContainer: {
    flex: 2,
    top: Platform.OS === 'android' ? -12 : 0,
    justifyContent: 'center',
  },
  phoneContainer: {
    flex: 4.5,
    // backgroundColor: '#894fc6',
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
    color: 'black',
    fontFamily: 'Quicksand-Regular',
  },
  phoneOpenTitleContainer: {
    paddingLeft: 20,
    top: 80,
  },
  phoneInputContainer: {
    top: 110,
    flexDirection: 'row',
    paddingLeft: 30,
  },
  nationFlag: {
    fontSize: Platform.OS === 'android' ? 22 : 20,
    fontFamily: 'Quicksand-Regular',
    color: 'black',
    flex: 2,
  },
  numberText: {
    fontSize: Platform.OS === 'android' ? 22 : 20,
    color: 'rgba(0,0,0,.3)',
    left: -15,
    flex: 9,
    alignItems: 'flex-start',
    fontFamily: 'Quicksand-Regular',
  },
  textInput: {
    top: Platform.OS === 'android' ? -14 : 0,
    left: -15,
    fontSize: Platform.OS === 'android' ? 22 : 20,
    color: 'black',
    flex: 6,
    fontFamily: 'Quicksand-Regular',
  },
  socialContainer: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  socialButtonContainer: {
    paddingLeft: 30,
    flex: 1,
    justifyContent: 'center',
  },
  socialText: {
    color: '#3F51B5',
    fontFamily: 'Quicksand-Regular',
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
