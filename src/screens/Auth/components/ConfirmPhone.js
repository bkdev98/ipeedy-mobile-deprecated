import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { getInputData } from '../modules/auth';

import { styles as authStyles } from './Auth';

import { interFormat } from '../../../utils/phoneNumber';

import BackButton from './BackButton';
import NextButton from './NextButton';

class Number extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  state = {
    count: 20,
  }

  componentDidMount() {
    this.startCountdown();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startCountdown = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count > 0 ? this.state.count - 1 : 0,
      });
    }, 1000);
  }

  handleResendCode = () => {
    this.setState({ count: 20 }, () => this.startCountdown());
  }

  handlePressNext = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    const { navigation, inputData, getInputData } = this.props;

    return (
      <View style={styles.container}>
        <View style={[authStyles.backIcon, { left: Platform.OS === 'android' ? 20 : 10 }]}>
          <BackButton onPress={navigation.goBack} />
        </View>

        <View style={[authStyles.nextButtonContainer, { right: 45 }]}>
          <NextButton onPress={this.handlePressNext} />
        </View>

        <View style={[authStyles.phoneOpenTitleContainer, styles.titleContainer]}>
          <Text style={authStyles.phoneOpenTitle}>
            Enter the 4-digit code sent to
            <Text style={[authStyles.phoneOpenTitle, styles.titleBold]}> {interFormat(inputData.phone)}</Text>
          </Text>
        </View>

        {!this.state.count ?
          <TouchableOpacity style={styles.resendContainer} onPress={this.handleResendCode}>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
          :
          <View style={styles.resendContainer}>
            <Text style={styles.resendTextActive}>Resend code in 00:{this.state.count < 10 ? '0' : ''}{this.state.count}</Text>
          </View>
        }

        <View style={[authStyles.phoneInputContainer, styles.inputContainer]}>
          <TextInput
            autoFocus
            placeholder="0"
            placeholderTextColor="rgba(0,0,0,.3)"
            keyboardType="numeric"
            underlineColorAndroid="black"
            selectionColor="black"
            maxLength={1}
            onChangeText={value => {
              getInputData({ key: 'firstDigit', value });
              this.refs.SecondInput.focus(); // eslint-disable-line
            }}
            returnKeyType="next"
            style={[authStyles.textInput, styles.input]}
          />
          <TextInput
            placeholder="0"
            placeholderTextColor="rgba(0,0,0,.3)"
            keyboardType="numeric"
            ref="SecondInput" // eslint-disable-line
            onChangeText={value => {
              getInputData({ key: 'secondDigit', value });
              this.refs.ThirdInput.focus(); // eslint-disable-line
            }}
            returnKeyType="next"
            maxLength={1}
            underlineColorAndroid="black"
            selectionColor="black"
            style={[authStyles.textInput, styles.input]}
          />
          <TextInput
            placeholder="0"
            placeholderTextColor="rgba(0,0,0,.3)"
            returnKeyType="next"
            maxLength={1}
            onChangeText={value => {
              getInputData({ key: 'thirdDigit', value });
              this.refs.FourthInput.focus(); // eslint-disable-line
            }}
            keyboardType="numeric"
            ref="ThirdInput" // eslint-disable-line
            underlineColorAndroid="black"
            selectionColor="black"
            style={[authStyles.textInput, styles.input]}
          />
          <TextInput
            placeholder="0"
            returnKeyType="done"
            ref="FourthInput" // eslint-disable-line
            maxLength={1}
            placeholderTextColor="rgba(0,0,0,.3)"
            keyboardType="numeric"
            underlineColorAndroid="black"
            onSubmitEditing={this.handlePressNext}
            onChangeText={value => {
              getInputData({ key: 'firstDigit', value });
              this.handlePressNext();
            }}
            selectionColor="black"
            style={[authStyles.textInput, styles.input]}
          />
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
  inputContainer: {
    top: 130,
    paddingHorizontal: 100,
    left: 30,
  },
  input: {
    flex: 1,
    color: 'black',
    alignItems: 'center',
  },
  resendContainer: {
    position: 'absolute',
    bottom: 45,
    left: 20,
  },
  resendText: {
    color: '#3F51B5',
  },
  resendTextActive: {
    color: 'black',
  },
};

const mapStateToProps = state => ({
  inputData: state.auth.inputData || {},
});

const mapActionCreators = {
  getInputData,
};

export default connect(mapStateToProps, mapActionCreators)(Number);
