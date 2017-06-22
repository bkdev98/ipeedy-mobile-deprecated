import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const buttonSize = Platform.OS === 'android' ? 75 : 60;
const iconSize = (buttonSize / 2) - 5;

const NextButton = ({ onPress }) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View
      style={{
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        backgroundColor: '#5836b9',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      shadowColor="black"
      shadowOffset={{ width: 3, height: 3 }}
      shadowOpacity={0.2}
      shadowRadius={3}
    >
      <Icon name="md-checkmark" size={iconSize} color="white" />
    </View>
  </TouchableOpacity>
);

export default NextButton;
