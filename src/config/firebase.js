import firebase from 'firebase/app';
require('firebase/firestore');
require('firebase/auth');

var firebaseConfig = {
  apiKey: 'AIzaSyBucR5gzRJbtSPzeJMnqMyQTmd056YmMfc',
  authDomain: 'scheduling-c8af9.firebaseapp.com',
  databaseURL: 'https://scheduling-c8af9.firebaseio.com',
  projectId: 'scheduling-c8af9',
  storageBucket: 'scheduling-c8af9.appspot.com',
  messagingSenderId: '608409234231',
  appId: '1:608409234231:web:be4c8adf2f8339b208c8b2',
  measurementId: 'G-76BSD7FQC9',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth, firebase};
