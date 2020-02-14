import config from '../config/index';
import moment from 'moment';
import {db} from '../config/firebase';

const actions = config.todos.actions;

export function getAllTodos() {
  return dispatch => {
    db.collection('tasks').onSnapshot(function(querySnapshot) {
      var tasks = [];
      querySnapshot.forEach(function(doc) {
        tasks.push({id: doc.id, ...doc.data()});
      });

      dispatch({
        type: actions.getTodos,
        payload: tasks,
      });
    });
  };
}

export function addTodo(text) {
  return dispatch => {
    db.collection('tasks')
      .add({
        text,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'active',
        completed: false,
      })
      .then(res => {
        console.log('my res is here');
      })
      .catch(err => {
        console.log('something wrong happend');
      });
  };
}

export function deleteActiveTodo(index, id) {
  return dispatch => {
    db.collection('tasks')
      .doc(id)
      .delete()
      .then(() => {
        console.log('success has been occured');
      })
      .catch(err => {
        console.log('something bad had happend');
      });
  };
}

export function deleteCompletedTodo(index, id) {
  return dispatch => {
    db.collection('tasks')
      .doc(id)
      .delete()
      .then(() => {
        console.log('success has been occured');
      })
      .catch(err => {
        console.log('something bad had happend');
      });
  };
}

export function completeTodo(index, id) {
  return dispatch => {
    db.collection('tasks')
      .doc(id)
      .update({completed: true})
      .then(() => {
        console.log('success has been occured');
      })
      .catch(err => {
        console.log('something bad had happend');
      });
  };
}
