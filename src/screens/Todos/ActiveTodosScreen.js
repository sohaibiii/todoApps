import React, {Component} from 'react';
import {Text, ListView, FlatList, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment';
import SwipeView from 'react-native-swipeview';

import config from '../../config/index';

import * as TodoActionCreators from '../../actions/TodoActionCreators';

import Title from '../../components/Title';
import Input from '../../components/Input';
import TodoRowItem from '../../components/TodoRowItem';
import DateView from '../../components/DateView';

import styles from './styles/ActiveTodosStyles';
import commonStyles from './styles';

class ActiveTodosScreen extends Component {
  state = {
    time: new Date(),
  };
  componentDidMount() {
    let {getAllTodos} = this.props;
    getAllTodos();
  }
  getTime = time => {
    this.setState({time});
  };

  addTodoMain = text => {
    console.log('task Complete time', this.state.time);

    if (
      moment(this.state.time).format('YYYY-MM-DD HH:mm:ss') <
      moment().format('YYYY-MM-DD HH:mm:ss')
    ) {
      alert('select future time');
    } else this.props.addTodo(text, this.state.time);
  };
  render() {
    const {todosReducer} = this.props;
    const {active} = todosReducer;
    const {todos} = active;
    const {addTodo, completeTodo, deleteActiveTodo} = this.props;

    this.leftOpenValue = Dimensions.get('window').width;
    this.rightOpenValue = -Dimensions.get('window').width;

    return (
      <View style={commonStyles.container}>
        <Title title={config.constants.active_todos_screen.title} />
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <Input
              placeholder={
                config.constants.active_todos_screen.add_todo_placeholder
              }
              placeholderTextColor={config.colors.white}
              selectionColor={config.colors.golden}
              underlineColorAndroid={config.colors.transparent}
              maxLength={
                config.constants.active_todos_screen.add_todo_input_maxlength
              }
              clearTextOnFocus={
                config.constants.active_todos_screen
                  .add_todo_input_clear_text_on_focus
              }
              onSubmitEditing={this.addTodoMain}
            />
          </View>
          <DateView getTime={this.getTime} />
        </View>
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          enableEmptySections={true}
          ItemSeparatorComponent={() => <View style={commonStyles.separator} />}
          renderItem={({item, index}) => (
            <SwipeView
              renderVisibleContent={() => (
                <TodoRowItem
                  editTaskAction={this.props.editTaskAction}
                  todo={{...item}}
                  index={index}
                  time={moment()
                    .startOf('hour')
                    .fromNow()}
                />
              )}
              renderLeftView={() => (
                <View style={commonStyles.rowLeft}>
                  <Icon
                    style={commonStyles.icon}
                    name={config.icons.check}
                    size={config.constants.hidden_row_icon_size}
                  />
                </View>
              )}
              renderRightView={() => (
                <View style={commonStyles.rowRight}>
                  <Icon
                    style={commonStyles.icon}
                    name={config.icons.times}
                    size={config.constants.hidden_row_icon_size}
                  />
                </View>
              )}
              leftOpenValue={this.leftOpenValue}
              rightOpenValue={this.rightOpenValue}
              swipeDuration={config.constants.row_swipe_duration}
              swipeToOpenPercent={config.constants.row_swipe_open_percent}
              onSwipedLeft={() => deleteActiveTodo(index, item.id)}
              onSwipedRight={() => {
                completeTodo(index, item.id);
              }}
            />
          )}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(TodoActionCreators, dispatch);
};

const mapStateToProps = state => ({
  todosReducer: state.todosReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTodosScreen);
