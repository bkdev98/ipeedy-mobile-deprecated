import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
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
          >Home Screen</Text>
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

export default Home;
