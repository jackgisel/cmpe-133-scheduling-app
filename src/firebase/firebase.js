import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyBuX0UeM93g2uyAy9eYt-Ry9f5z8j0dYas',
  authDomain: 'all-scheduler-1a96c.firebaseapp.com',
  databaseURL: 'https://all-scheduler-1a96c.firebaseio.com',
  projectId: 'all-scheduler-1a96c',
  storageBucket: 'all-scheduler-1a96c.appspot.com',
  messagingSenderId: '927804145048',
  appId: '1:927804145048:web:2f90cf9051d637e3ba7fed',
  measurementId: 'G-TGC6R0BHM9'
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
