// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeU4F58DiKEFWcZdpckZAn2fKl0R4m2Fk",
    authDomain: "new-react-native-exam.firebaseapp.com",
    projectId: "new-react-native-exam",
    storageBucket: "new-react-native-exam.appspot.com",
    messagingSenderId: "842436684478",
    appId: "1:842436684478:web:bdb464f029020585104cef",
    measurementId: "G-ZD2QN6DLS8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, db, storage }