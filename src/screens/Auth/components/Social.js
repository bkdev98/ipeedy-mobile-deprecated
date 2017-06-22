import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Platform,
} from 'react-native';

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

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
        >
          <Text style={{
            fontFamily: 'Quicksand-Regular',
            fontSize: 30,
            color: 'white',
          }}
          >Social Screen</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  backIcon: {
    position: 'absolute',
    zIndex: 100,
    top: Platform.OS === 'android' ? 35 : 25,
    backgroundColor: 'transparent',
  },
};

export default Social;
