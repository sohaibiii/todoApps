import {auth, db, firebase} from '../config/firebase';
import Toast from 'react-native-simple-toast';

import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  GETUSER,
  LOGINERR,
  SIGNUPERR,
  LOGOUTERR,
  GETUSERERR,
  GETALLUSERS,
} from '../constants/actionsConstants';

import _ from 'lodash';

//Login
export function loginUser(
  data,
  ftwo = () => {
    console.log('hurray');
  },
) {
  console.log('loginUser');
  return dispatch => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(users => {
        auth.onAuthStateChanged(user => {
          if (user) {
            db.collection('users')
              .where('uid', '==', user.uid)
              .get()
              .then(function(querySnapshot) {
                ftwo();
                let datatoStore = {};
                querySnapshot.forEach(function(doc) {
                  let data = doc.data();
                  let docid = doc.id;
                  let final = {
                    ...data,
                    docid,
                  };

                  datatoStore = final;
                });
                Toast.showWithGravity(
                  'Successfully login',
                  Toast.LONG,
                  Toast.TOP,
                );

                dispatch({
                  type: LOGIN,
                  payload: datatoStore,
                });
              });
          } else {
            Toast.showWithGravity('login Failure', Toast.LONG, Toast.TOP);

            dispatch({
              type: LOGINERR,
              payload: new Date(),
            });
          }
        });
      })
      .catch(function(error) {
        console.log('Error firebase login: ', error);
        Toast.showWithGravity('' + error, Toast.LONG, Toast.TOP);

        dispatch({
          type: LOGINERR,
          payload: new Date(),
        });
      });
  };
}

//Logout
export function logoutUser(func) {
  console.log('logoutUser');
  return dispatch => {
    auth.signOut().then(
      function() {
        Toast.showWithGravity('Successfully Logout', Toast.LONG, Toast.TOP);
        func();

        dispatch({
          type: LOGOUT,
        });
      },
      function(error) {
        console.log('Error logout: ', error);
        Toast.showWithGravity('Error Logout', Toast.LONG, Toast.TOP);

        dispatch({
          type: LOGOUTERR,
        });
      },
    );
  };
}

//current user get;
export function startGetCurrentUser() {
  console.log('startGetCurrentUser');
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users')
          .where('uid', '==', user.uid)
          .get()
          .then(function(querySnapshot) {
            let datatoStore = {};
            querySnapshot.forEach(function(doc) {
              let data = doc.data();
              let docid = doc.id;
              let final = {
                ...data,
                docid,
              };

              datatoStore = final;
            });

            let datas = {
              ...datatoStore,
            };
            console.log('data from net', datas);
            dispatch({
              type: GETUSER,
              payload: datas,
            });
          });
      } else {
        dispatch({
          type: GETUSERERR,
          payload: 'nill',
        });
      }
    });
  };
}

//Signup
export function createUser(
  data,
  ftwo = () => {
    console.log('hurray');
  },
) {
  console.log('createUser');
  console.log('my c user is here guys', data);
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(users => {
        auth.onAuthStateChanged(user => {
          if (user) {
            db.collection('users')
              .add({
                uid: user.uid,
                username: data.username,
                email: user.email,
              })
              .then(function(docRef) {
                dispatch({
                  type: SIGNUP,
                  payload: {
                    uid: user.uid,
                    username: data.username,
                    email: user.email,
                  },
                });
                ftwo();
              })
              .catch(function(error) {
                auth.currentUser.delete().then(function() {
                  Toast.showWithGravity(
                    'Error signup again',
                    Toast.LONG,
                    Toast.TOP,
                  );
                  dispatch({
                    type: SIGNUPERR,
                    payload: new Date(),
                  });
                });
              });
          } else {
            Toast.showWithGravity('Error signup again', Toast.LONG, Toast.TOP);

            dispatch({
              type: SIGNUPERR,
              payload: new Date(),
            });
          }
        });
      })
      .catch(function(error) {
        console.log('Error firebase signup: ', error);
        Toast.showWithGravity('' + error, Toast.LONG, Toast.TOP);

        dispatch({
          type: SIGNUPERR,
          payload: new Date(),
        });
      });
  };
}
