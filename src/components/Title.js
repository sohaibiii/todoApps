import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {logoutUser} from '../actions/user';

import styles from './styles/TitleStyles';

const Title = ({title, navigation}) => {
  const dispatch = useDispatch();
 let navi = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(logoutUser(navi));
        }}>
        <Icon
          type="AntDesign"
          name="logout"
          style={{color: 'white', fontSize: 20}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(Title);
