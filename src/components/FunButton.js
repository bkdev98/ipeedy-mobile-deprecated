import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FunButton = ({ icon, color, iconColor, title, onPress, medium }) => {
  let mediumStyle;
  let mediumTextStyle;
  let iconSize = 12;
  if (medium) {
    mediumStyle = {
      paddingHorizontal: 25,
      paddingVertical: 20,
      borderRadius: 20,
    };
    mediumTextStyle = {
      fontSize: 17,
    };
    iconSize = 16;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: color }, mediumStyle]}
      >
        <Text
          style={[styles.title, mediumTextStyle, { color: iconColor }]}
        >
          {title} </Text>
        <Icon name={icon} color={iconColor || 'black'} size={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 7,
    paddingHorizontal: 20,
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
