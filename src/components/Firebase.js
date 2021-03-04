// https://firebase.google.com/docs/web/setup?authuser=2
import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAIStaSs6RUsd3GI9kxP1IPrwJ7hyziFms",
    authDomain: "sagetap-one-tap-1614353467926.firebaseapp.com",
    projectId: "sagetap-one-tap-1614353467926",
    storageBucket: "sagetap-one-tap-1614353467926.appspot.com",
    messagingSenderId: "12158249262",
    appId: "1:12158249262:web:c2042129713dbbb81cb2bf"
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
