import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {fromLeft, fromRight} from 'react-navigation-transitions';
import {AnimatedCircleBarComponent} from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';

import SignUp from '../screens/Auth/Signup';

import Login from '../screens/Auth/authlogin';

import AuthLoadingScreen from '../screens/Auth/starting';
import ActiveTodosScreen from '../screens/Todos/ActiveTodosScreen';
import CompletedTodosScreen from '../screens/Todos/CompletedTodosScreen';

let TabNav = createBottomTabNavigator(
  {
    ActiveTasks: {
      screen: ActiveTodosScreen,
    },
    CompleteTasks: {
      screen: CompletedTodosScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        let clr;
        const {routeName} = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'ActiveTasks':
            iconSource = 'pencil-square-o';
            break;
          case 'CompleteTasks':
            iconSource = 'check-square-o';
            break;

          default:
            iconSource = 'ellipsis-h';
        }
        focused ? (clr = 'black') : (clr = 'gray');
        return (
          <View style={styles.tabBarItemContainer}>
            {routeName === 'ActiveTasks' ? (
              <Icon
                color={tintColor}
                type="FontAwesome"
                name={iconSource}
                style={[styles.tabBarIcon, {color: `${clr}`}]}
              />
            ) : routeName === 'CompleteTasks' ? (
              <Icon
                color={tintColor}
                type="FontAwesome"
                name={iconSource}
                style={[styles.tabBarIcon, {color: `${clr}`}]}
              />
            ) : (
              ''
            )}
          </View>
        );
      },
    }),
    tabBarComponent: AnimatedCircleBarComponent,
    tabBarPosition: 'bottom',
    initialRouteName: 'ActiveTasks',

    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        elevation: 5,
        borderTopWidth: 0.5,
        backgroundColor: 'white',
        borderTopColor: '#d6d6d6',
      },
    },
  },
);

const handleCustomTransition = ({scenes}) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    prevScene &&
    prevScene.route.routeName === 'Login' &&
    nextScene.route.routeName === 'SignUp'
  ) {
    return fromLeft();
  } else if (
    prevScene &&
    prevScene.route.routeName === 'SignUp' &&
    nextScene.route.routeName === 'Login'
  ) {
    return fromRight();
  }
  return fromLeft();
};

const Auth = createStackNavigator(
  {
    AuthLoadingScreen: {
      screen: AuthLoadingScreen,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'AuthLoadingScreen',
    transitionConfig: nav => handleCustomTransition(nav),
  },
);

const RootNavigator = createSwitchNavigator(
  {
    Auth: Auth,
    Main: TabNav,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(RootNavigator);

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    fontSize: 22,
  },
  tabBarIconFocused: {
    tintColor: 'red',
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    color: 'white',
    fontSize: 18,
  },
});
