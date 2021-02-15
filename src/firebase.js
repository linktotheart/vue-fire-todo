import  firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const app = firebase.initializeApp({
    apiKey: "AIzaSyBF_aTGXP1iNdlywhzTS8HjRi1fVDYMcdI",
    authDomain: "vue-fire-a3a33.firebaseapp.com",
    projectId: "vue-fire-a3a33",
    storageBucket: "vue-fire-a3a33.appspot.com",
    messagingSenderId: "865964814632",
    appId: "1:865964814632:web:02e7e556c0316b1e82601d",
    measurementId: "G-6P889EH79Y"
  });

export const db = app.firestore();
export const todosCollection = db.collection('todos');