import config from '../config/index';
import moment from 'moment';
import {db} from '../config/firebase';
import ReactNativeAN from 'react-native-alarm-notification';

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

export function addTodo(text, toCompleteTime) {
  return dispatch => {
    db.collection('tasks')
      .add({
        text,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'active',
        completed: false,
        toCompleteTime: moment(toCompleteTime).format('YYYY-MM-DD HH:mm:ss'),
      })
      .then(docRef => {
        // notify alaram for task

        const alarmNotifData = {
          id: docRef.id,
          title: 'Your Task Alaram',
          message: text,
          channel: 'fyptodos11',
          ticker: 'My Notification Ticker',
          auto_cancel: false,
          vibrate: true,
          vibration: 100,
          small_icon: 'ic_launcher',
          large_icon: 'ic_launcher',
          play_sound: true,
          sound_name: null,
          color: 'orange',
          schedule_once: true,
          tag: 'some_tag',
          fire_date: moment(toCompleteTime).format('YYYY-MM-DD HH:mm:ss'),

          data: {foo: text},
        };
        ReactNativeAN.scheduleAlarm(alarmNotifData);
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
      .then(docRef => {
        ReactNativeAN.deleteAlarm(docRef.id);
        console.log('success has been occured');
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
