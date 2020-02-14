// @flow
import React, {Component} from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
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
  Spinner,
} from 'native-base';
import {connect} from 'react-redux';

import styles from './style';
import colors from '../../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createUser} from '../../actions/user';

class SignUp extends Component {
  state = {
    secure: true,
    email: '',
    password: '',
    status: '',
    username: '',
    brand: '',
    number: '',
    loader: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userStatus) {
      this.setState({
        loader: false,
      });
      this.props.navigation.navigate('Main');
    } else if (!nextProps.userStatus) {
      this.setState({
        loader: false,
      });
    }
  }

  signup = () => {
    let {email, password, username} = this.state;

    if (username === '') {
      Toast.showWithGravity('Please enter username!', Toast.LONG, Toast.TOP);
    } else if (email === '') {
      Toast.showWithGravity('Please enter Email!', Toast.LONG, Toast.TOP);
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
      this.props.createUser({username, email, password});
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

          <Left>
            <Icon
              type="Ionicons"
              name="ios-arrow-round-back"
              style={{color: 'white'}}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>

          <Right></Right>
        </Header>
        <View style={styles.background}>
          <ScrollView>
            <Content contentContainerStyle={{flex: 1}}>
              <View>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'white',
                    marginLeft: 30,
                    marginBottom: 30,
                  }}>
                  Sign Up
                </Text>
              </View>

              <View style={[styles.center, {marginBottom: 20}]}>
                <Text style={styles.text}> sign up with email</Text>
              </View>

              <View style={styles.container}>
                <View style={styles.form}>
                  <View>
                    <Item rounded style={styles.inputGrp}>
                      <Input
                        ref={c => (this.textInput = c)}
                        placeholderTextColor="gray"
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                      />
                    </Item>
                  </View>

                  <View>
                    <Item rounded style={styles.inputGrp}>
                      <Input
                        ref={c => (this.textInput = c)}
                        placeholderTextColor="gray"
                        style={styles.input}
                        placeholder="Your Email"
                        onChangeText={text => this.setState({email: text})}
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
                        onChangeText={text => this.setState({password: text})}
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
                      <Spinner color="#FFFFFF" size={25} />
                    </Button>
                  ) : (
                    <Button
                      rounded
                      primary
                      block
                      large
                      style={styles.loginBtn}
                      onPress={() => this.signup()}>
                      <Text
                        style={
                          Platform.OS === 'android'
                            ? {fontSize: 16, textAlign: 'center'}
                            : {fontSize: 16, fontWeight: '900'}
                        }>
                        Sign Up
                      </Text>
                    </Button>
                  )}

                  <View
                    style={[styles.center, {marginTop: 15, marginBottom: 30}]}>
                    <Text style={styles.text}>
                      By Signing up you agreed with our Terms of
                    </Text>
                    <Text style={styles.text}>Services and Privacy Policy</Text>
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.text}>
                      Already have account?
                      <Text
                        onPress={() => navigation.navigate('Login')}
                        style={{color: '#526373'}}>
                        Login
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </Content>
          </ScrollView>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  loader: state.user.loader,
  userStatus: state.user.userStatus,
});

export default connect(mapStateToProps, {createUser})(SignUp);
