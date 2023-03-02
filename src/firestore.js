// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "todo-pwa-a1582.firebaseapp.com",
  projectId: "todo-pwa-a1582",
  storageBucket: "todo-pwa-a1582.appspot.com",
  messagingSenderId: "68173145197",
  appId: "1:68173145197:web:b1b87a48c76e09c8d8cb64",
  measurementId: "G-PFHCTENHF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
enableIndexedDbPersistence(firestore)
.catch((err) => {
  if (err.code == 'failed-precondition') {
      console.log("persistence can only be enabled")
  } else if (err.code == 'unimplemented') {
      console.log("The current browser does not support all of the")
  }
});

export default firestore