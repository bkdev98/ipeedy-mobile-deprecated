import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ShareButton = ({ onPress, color, animatedColor }) => (
  Platform.OS === 'android' ?
    <TouchableOpacity
      onPress={() => onPress()}
    >
      <View style={{
        width: 50,
        height: 50,
        borderRadius: 25,
      }}
      >
        <Icon name="md-share" size={25} color={color} />
      </View>
    </TouchableOpacity>
    : <TouchableOpacity
      onPress={() => onPress()}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AnimatedIcon name="md-share" size={22} color={color} style={animatedColor} />
      </View>
    </TouchableOpacity>
);

ShareButton.propTypes = {
  color: PropTypes.string,
};

ShareButton.defaultProps = {
  color: 'black',
};

export default ShareButton;
