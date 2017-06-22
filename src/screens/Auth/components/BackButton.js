import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = ({ onPress }) => (
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
        <Icon name="md-arrow-back" size={30} color="black" />
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
        <Icon name="md-arrow-back" size={25} color="black" />
      </View>
    </TouchableOpacity>
);

export default BackButton;
