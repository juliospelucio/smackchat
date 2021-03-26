import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCbAY7LaRG2ax_GUeOtnjK1yuinfPAUQFQ",
  authDomain: "teleapp-f8fca.firebaseapp.com",
  projectId: "teleapp-f8fca",
  storageBucket: "teleapp-f8fca.appspot.com",
  messagingSenderId: "6518049954",
  appId: "1:6518049954:web:73d82f3c337b4de6c2dbfb"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb }
