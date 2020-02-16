import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import config from '../config';
import {Icon as Icons, Item, Input, Label, Form} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/TodoRowItemStyles';
import {TextInput} from 'react-native-gesture-handler';

class TodoRowItem extends Component {
  state = {
    showModel: false,
    text: '',
  };

  editTask = id => {
    let {text} = this.state;
    this.props.editTaskAction(id, text);
    this.setState({showModel: false});
  };
  render() {
    const {todo} = this.props;
    const {text, time, id, toCompleteTime} = todo;

    return (
      <View style={styles.row} key={todo.id}>
        <View style={styles.timeline}>
          <View style={styles.timelineVerticalLink} />
          <Icon
            style={styles.icon}
            name={config.icons.circle}
            size={config.constants.row_timeline_icon_size}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.time}>{toCompleteTime} to Complete</Text>
        </View>
        {!this.props.completed && (
          <View style={styles.editIcon}>
            <TouchableOpacity
              onPress={() => {
                this.setState({showModel: true});
              }}>
              <Icons
                type="AntDesign"
                name="edit"
                style={{color: 'white'}}
                onPress={() => {
                  this.setState({showModel: true});
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        <Modal
          testID={'modal'}
          isVisible={this.state.showModel}
          backdropColor="gray"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          onBackdropPress={() => this.setState({showModel: false})}>
          <View
            style={{
              height: 210,
              width: '100%',
              backgroundColor: '#526373',
              borderRadius: 10,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  paddingTop: 15,
                }}>
                Edit task
              </Text>
            </View>

            <View style={{width: '100%', marginTop: 20}}>
              <TextInput
                style={{
                  backgroundColor: '#313842',
                  width: '100%',
                  height: 55,
                  paddingLeft: 10,
                  borderRadius: 5,
                  color: 'white',
                }}
                placeholder="Write Task"
                placeholderTextColor="white"
                value={this.state.text}
                onChangeText={text => {
                  this.setState({text});
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({showModel: false})}
                style={{
                  height: 40,
                  width: 90,
                  backgroundColor: '#313842',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                }}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.editTask(id);
                }}
                style={{
                  height: 40,
                  width: 90,
                  backgroundColor: '#313842',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                }}>
                <Text style={{color: 'white'}}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default TodoRowItem;
