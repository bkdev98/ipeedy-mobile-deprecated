import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Hamburger = ({ onPress }) => (
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
        <Icon name="ios-menu" size={32} color="white" />
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
        <Icon name="ios-menu" size={28} color="white" />
      </View>
    </TouchableOpacity>
);

export default Hamburger;
