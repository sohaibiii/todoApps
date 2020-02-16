import config from '../config/index';
import moment from 'moment';
import {db, firebase} from '../config/firebase';

const actions = config.todos.actions;

export function getAllTodos() {
  return dispatch => {
    db.collection('tasks')
      .orderBy('timeStamp', 'desc')
      .onSnapshot(function(querySnapshot) {
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

export function addTodo(text, toCompleteTime) {
  const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
  return dispatch => {
    db.collection('tasks')
      .add({
        text,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'active',
        completed: false,
        toCompleteTime: moment(toCompleteTime).format('YYYY-MM-DD HH:mm:ss'),
        timeStamp: timestamp,
      })
      .then(docRef => {
        console.log('hehh');
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
      .update({
        completed: true,
        toCompleteTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      })
      .then(() => {
        console.log('dsfsf');
      })
      .catch(err => {
        console.log('something bad had happend');
      });
  };
}

export function editTaskAction(id, text) {
  return dispatch => {
    db.collection('tasks')
      .doc(id)
      .update({text: text})
      .then(() => {
        console.log('success has been occured');
      })
      .catch(err => {
        console.log('something bad had happend');
      });
  };
}
