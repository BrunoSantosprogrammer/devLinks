import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDL1XjO3i4MBnhuPNxrGffrmxdpmPQ2nuc",
    authDomain: "reactlinks-d45f1.firebaseapp.com",
    projectId: "reactlinks-d45f1",
    storageBucket: "reactlinks-d45f1.appspot.com",
    messagingSenderId: "529703857708",
    appId: "1:529703857708:web:302d33e9bb8f88e5b2ab89"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firebase = getFirestore(app)

export {auth, firebase}