const React = require('react-native');
import {StyleSheet} from 'react-native';
const {Dimensions, Platform} = React;

import colors from '../../styles/colors';

const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: '#1B2127',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  form: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  formErrorIcon: {
    color: '#fff',
    marginTop: 5,
    right: 10,
  },
  formErrorText1: {
    fontSize: Platform.OS === 'android' ? 12 : 15,
    color: colors.primarColor,
    textAlign: 'right',
    top: -10,
  },
  formErrorText2: {
    fontSize: Platform.OS === 'android' ? 12 : 15,
    color: 'transparent',
    textAlign: 'right',
    top: -10,
  },
  loginBtn: {
    marginTop: 7,
    height: 45,
    backgroundColor: '#526373',
  },
  otherLinksContainer: {
    paddingTop: deviceHeight < 600 ? 5 : Platform.OS === 'android' ? 10 : 15,
    flexDirection: 'row',
  },
  helpBtns: {
    opacity: 0.9,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: Platform.OS === 'android' ? 12 : 12,
  },
  inputGrp: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 0,
    borderColor: 'transparent',
    height: 45,
  },
  input: {
    paddingLeft: 20,
    color: 'gray',
    fontSize: 12,
  },
  skipBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: '#FFF',
    position: 'absolute',
    bottom: 15,
    right: 0,
  },

  header: {
    elevation: 0,
    backgroundColor: '#1B2127',
  },
  Oauth: {
    flexDirection: 'row',
    backgroundColor: '#3b5998',
    height: 45,
    paddingRight: 30,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 12, color: 'gray'},
});
