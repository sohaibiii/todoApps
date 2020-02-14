// @flow
import React, {Component} from 'react';

import {Image, ImageBackground, Platform, StatusBar} from 'react-native';
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Header,
  Body,
  Spinner as Spinners,
} from 'native-base';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

import styles from './style';
import colors from '../../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {loginUser} from '../../actions/user';

class Login extends Component {
  state = {
    secure: true,
    loader: false,
    email: '',
    password: '',
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.userStatus) {
      this.setState({
        loader: false,
      });
      this.props.navigation.navigate('tabNavigation');
    } else if (!nextProps.userStatus) {
      this.setState({
        loader: false,
      });
    }
  }

  login = () => {
    let email = this.state.email;
    let password = this.state.password;

    if (email === '') {
      Toast.showWithGravity('Please enter email!', Toast.LONG, Toast.TOP);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      Toast.showWithGravity('Invalid Email!', Toast.LONG, Toast.TOP);
    } else if (password === '') {
      Toast.showWithGravity('Please enter password!', Toast.LONG, Toast.TOP);
    } else if (password.length < 8) {
      Toast.showWithGravity(
        'Password minimum length is 8.',
        Toast.LONG,
        Toast.TOP,
      );
    } else {
      this.setState({
        loader: true,
      });
      this.props.loginUser({email, password});
    }
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header style={styles.header}>
          <StatusBar
            backgroundColor={'#526373'}
            barStyle="light-content"
          />

          <Left></Left>

          <Right></Right>
        </Header>
        <View style={styles.background}>
          <Content contentContainerStyle={{flex: 1}}>
            <View style={[styles.center, {marginBottom: 20}]}>
              <Text style={{fontSize: 30, color: 'white'}}>Task Schedular</Text>
            </View>

            <View style={[styles.center, {marginBottom: 20}]}>
              <Text style={styles.text}>Login with email</Text>
            </View>

            <View style={styles.container}>
              <View style={styles.form}>
                <View>
                  <Item rounded style={styles.inputGrp}>
                    <Input
                      ref={c => (this.textInput = c)}
                      placeholderTextColor="gray"
                      style={styles.input}
                      placeholder="Your Email"
                      onChangeText={text => {
                        this.setState({email: text});
                      }}
                      value={this.state.email}
                    />
                  </Item>
                </View>

                <View>
                  <Item rounded style={styles.inputGrp}>
                    <Input
                      ref={c => (this.textInput = c)}
                      placeholderTextColor="gray"
                      style={styles.input}
                      placeholder="password"
                      secureTextEntry={this.state.secure}
                      onChangeText={text => {
                        this.setState({password: text});
                      }}
                      value={this.state.password}
                    />
                    <Icon
                      active
                      type="MaterialIcons"
                      name="remove-red-eye"
                      style={{color: '#526373'}}
                      onPress={() =>
                        this.setState({secure: !this.state.secure})
                      }
                    />
                  </Item>
                </View>

                {this.state.loader ? (
                  <Button rounded primary block large style={styles.loginBtn}>
                    <Spinners color="#FFFFFF" size={25} />
                  </Button>
                ) : (
                  <Button
                    rounded
                    primary
                    block
                    large
                    style={styles.loginBtn}
                    onPress={() => this.login()}>
                    <Text
                      style={
                        Platform.OS === 'android'
                          ? {fontSize: 16, textAlign: 'center'}
                          : {fontSize: 16, fontWeight: '900'}
                      }>
                      Log In
                    </Text>
                  </Button>
                )}

                <View
                  style={[
                    styles.center,
                    {marginTop: 'auto', marginBottom: 20},
                  ]}>
                  <Text style={styles.text}>
                    Don't have an account?{' '}
                    <Text
                      onPress={() => navigation.navigate('SignUp')}
                      style={{color: '#526373'}}>
                      Sign Up
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  //isNet: store.netInfo.isNet,
  loader: state.user.loader,
  userStatus: state.user.userStatus,
});

export default connect(mapStateToProps, {
  loginUser,
})(Login);
