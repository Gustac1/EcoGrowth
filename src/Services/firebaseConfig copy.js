// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlIqZVbGqeDK1zwR5J8Vy1lopAmGbN5o0",
  authDomain: "ecogrowth-772d4.firebaseapp.com",
  projectId: "ecogrowth-772d4",
  storageBucket: "ecogrowth-772d4.appspot.com",
  messagingSenderId: "37782567711",
  appId: "1:37782567711:web:a21765f0883722d8cace2a"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

