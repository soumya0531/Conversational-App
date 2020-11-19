import firebase from 'firebase/app'
import 'firebase/auth'



var firebaseConfig = {
    apiKey: "AIzaSyAMI7Y4FgPStVQgtR9FA0qYWI0aTLeTz8o",
    authDomain: "curious-system-295707.firebaseapp.com",
    databaseURL: "https://curious-system-295707.firebaseio.com",
    projectId: "curious-system-295707",
    storageBucket: "curious-system-295707.appspot.com",
    messagingSenderId: "896462633395",
    appId: "1:896462633395:web:645d6e36add18b30b333c6",
    measurementId: "G-RTNMT9TD5S"
  };

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

