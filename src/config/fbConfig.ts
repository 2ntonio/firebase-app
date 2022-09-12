// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzuyXwXX84YgTNcu3O9iIYrskyMGAniRk",
  authDomain: "firstproject-p1-test.firebaseapp.com",
  projectId: "firstproject-p1-test",
  storageBucket: "firstproject-p1-test.appspot.com",
  messagingSenderId: "337315927559",
  appId: "1:337315927559:web:16138c50f5e0fa369dbca2",
  measurementId: "G-YFRW2ZT1Z4",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
