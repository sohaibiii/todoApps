import React, {Component} from 'react';
import {ImageBackground} from 'react-native';

export default class Loader extends Component {
  render() {
    return (
      <ImageBackground
        source={{
          uri:
            'https://www.toptal.com/designers/subtlepatterns/patterns/5-dots.png',
        }}
        resizeMode="center"
        style={{flex: 1}}></ImageBackground>
    );
  }
}
