import React, { Component } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

class UserMarker extends Component {
  constructor(props) {  // eslint-disable-line
    super(props);
  }

  componentWillMount() {
    this.animated = new Animated.Value(0);
  }

  componentDidMount() {
    this.cycleAnimation();
  }

  cycleAnimation = () => {
    Animated.sequence([
      Animated.timing(this.animated, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        delay: 2000,
      }),
      Animated.timing(this.animated, {
        toValue: 0,
        duration: 0,
      }),
    ]).start(() => {
      this.cycleAnimation();
    });
  }

  render() {
    const sizeInterpolate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 70],
    });

    const opacityInterpolate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const animatedStyle = {
      width: sizeInterpolate,
      height: sizeInterpolate,
      borderRadius: sizeInterpolate,
      opacity: opacityInterpolate,
    };

    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Animated.View style={[styles.animatedCircle, animatedStyle]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: '#673AB7',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  animatedCircle: {
    backgroundColor: 'transparent',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: '#673AB7',
  },
});

export default UserMarker;
