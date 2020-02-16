import React, {Component} from 'react';
import {ImageBackground, View, Image} from 'react-native';

export default class Loader extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          background: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://www.freeiconspng.com/uploads/tasks-icon-14.png',
          }}
          style={{height: 300, width: 300}}
        />
      </View>
    );
  }
}
