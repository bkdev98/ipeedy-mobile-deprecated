import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native';

import { styles as authStyles } from './Auth';

import { interFormat } from '../../../utils/phoneNumber';

import BackButton from './BackButton';

class Number extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  state = { }
  render() {
    const { navigation, inputData } = this.props;

    return (
      <View style={styles.container}>
        <View style={[authStyles.backIcon, { left: Platform.OS === 'android' ? 20 : 10 }]}>
          <BackButton onPress={navigation.goBack} />
        </View>

        <View style={[authStyles.phoneOpenTitleContainer, styles.titleContainer]}>
          <Text style={authStyles.phoneOpenTitle}>
            Enter the 4-digit code sent to you at
            <Text style={[authStyles.phoneOpenTitle, styles.titleBold]}> {interFormat(inputData.phone)}</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {

  },
  titleBold: {
    fontWeight: '600',
  },
};

const mapStateToProps = state => ({
  inputData: state.auth.inputData || {},
});

export default connect(mapStateToProps, null)(Number);
