import React,{ Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, BackHandler, Alert, TouchableNativeFeedback,TextInput } from 'react-native';
import Spinner from './Spinner';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions/index';

class LoginForm extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  onBackPress() {
    if(Actions.currentScene == "login") {
      Alert.alert(
          'Exit Application',
          'Do you really want to exit?', [{
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
          }, {
              text: 'OK',
              onPress: () => BackHandler.exitApp()
          }, ], {
              cancelable: false
          }
      )
      return true;
    } else {
      Actions.auth();
      return true;
    }
  }

  onEmailChange = (email) => {
    this.props.emailChanged(email);
  }

  onPasswordChange = (password) => {
    this.props.passwordChanged(password);
  }

  onButtonPress = () => {
    const { email, password } = this.props;
    this.props.loginUser({email,password});
  }

  onAuthError() {
    if(this.props.error) {
      return (
        <View>
          <Text style={{color: 'red',fontSize: 18,alignSelf:'center'}}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if(this.props.loading) {
      return <Spinner />
    } 
    return (
       <Button btncolor="#33ccff" onPress={this.onButtonPress.bind(this)}>
        Login 
        <AntDesign name="login" size={20} />
      </Button>
    );
  }


  render() {
    return (
      <Card>
        <CardSection>
            <TextInput 
            onChangeText={this.onEmailChange.bind(this)}
            style={styles.inputStyle} 
            placeholder="someoneawesome@gmail.com" 
            value={this.props.email}
            keyboardType="email-address"
            />
        </CardSection>

        <CardSection>
          <TextInput 
          onChangeText={this.onPasswordChange.bind(this)}
          style={styles.inputStyle} 
          secureTextEntry 
          placeholder="Password" 
          value={this.props.password}
          />
        </CardSection>
        <View>
        { this.onAuthError() }
        </View>
        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    flexDirection:'row',
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#33ccff', 
    margin: 5,
    padding: 10,
    fontSize: 16
  }
});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps,{ emailChanged,passwordChanged, loginUser })(LoginForm);