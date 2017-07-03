import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FunButton = ({ icon, color, iconColor, title, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.title}>{title} </Text>
      <Icon name={icon} color={iconColor || 'black'} size={12} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 7,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
  },
  title: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 12,
  },
});

export default FunButton;
