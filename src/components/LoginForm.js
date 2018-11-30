import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions";
import { Card, CardSection, Input, Button, Spinner } from "./common";

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    const width = '100%';

      if (this.props.loading) {
          return <Spinner size="large" />
      }
      return (
        <AwesomeButtonBlue 
            type="secondary"
            textColor="#007aff"
            borderColor="#007aff"
            backgroundDarker="#007acc"
            backgroundShadow= '#004aaa'
            width={360.5}
            height={65}
            textSize={22}
            onPress={this.onButtonPress.bind(this)}
            style={{
                flex: 1,
                marginLeft: 0,
                padding: 0,
                // backgroundShadow: '#007aff'
              }}
            >Login</AwesomeButtonBlue>
        // <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        );
  }

  render() {
    return (
        <ImageBackground source={require('../images/gradientsilverbackground.png')} style={{width: '100%', height: '100%'}}>
      <Card>
        <CardSection style={styles.cardSectionStyle}>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        {this.renderError()}
        <CardSection  style={styles.buttonCardSectionStyle}>
            {this.renderButton()}
        </CardSection>
      </Card>
      </ImageBackground>
    );
  }
}
const styles = {
    cardSectionStyle: {
        margin: 2,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
      },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  buttonCardSectionStyle: {
    display: 'flex',
    margin: 0,
    borderWidth: 1,
    
    // borderColor: '#3179CC',
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative',
    borderRadius: 5,
    alignContent: 'center'
  }
//   ,
//   awesomeButtonStyle: {
//     flex: 1,
//     alignSelf: 'stretch',
//     width: width,
//     margin: 0,
//     padding: 0
//   }
};


const mapStateToProps = ({ auth }) => {

  const {email, password, error, loading } = auth
  return { email, password, error, loading }
}

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser
  }
)(LoginForm);
