import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

import NavBar from '../../../components/NavBar';
import FunButton from '../../../components/FunButton';
import BackButton from '../../../components/BackButton';

const { width } = Dimensions.get('window');

class CreateProduct extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar>
          <View style={styles.backButton}>
            <BackButton
              color='white'
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </NavBar>
        <View style={styles.header}>
          <Image
            style={styles.animateImage}
            source={require('../../../../assets/images/fleksiloutto.gif')}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Ride Like The Wind</Text>
          <Text style={styles.contentText}>Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit 🐳</Text>
          <View style={{ top: 60, width: 150 }}>
            <FunButton
              onPress={() => { this.props.navigation.navigate('EnterName'); }}
              icon='ios-arrow-forward-outline'
              title='Continue'
              iconColor='white'
              color='#AB47BC'
              medium
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 26,
  },
  header: {
    flex: 4,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AB47BC',
  },
  animateImage: {
    flex: 1,
    width,
  },
  content: {
    flex: 5,
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    top: 30,
    fontFamily: 'Quicksand-Regular',
  },
});

export default CreateProduct;
