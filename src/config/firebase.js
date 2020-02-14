import firebase from 'firebase/app';
require('firebase/firestore');
require('firebase/auth');

let firebaseConfig = {
  apiKey: 'AIzaSyBa5mDYOLSpmWBF84a31npln89JbrJjROc',
  authDomain: 'todos-4f0b4.firebaseapp.com',
  databaseURL: 'https://todos-4f0b4.firebaseio.com',
  projectId: 'todos-4f0b4',
  storageBucket: 'todos-4f0b4.appspot.com',
  messagingSenderId: '71159442921',
  appId: '1:71159442921:web:39de34dcb86c739e456f78',
  measurementId: 'G-ME130SEWBN',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth, firebase};
