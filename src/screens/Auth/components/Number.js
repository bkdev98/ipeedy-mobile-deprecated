import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Number extends Component {
  state = { }
  render() {
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F06292',
        }}
        >
          <Text style={{
            fontFamily: 'Quicksand-Medium',
            fontSize: 30,
            color: '#F8BBD0',
          }}
          >Number Screen</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

export default Number;
