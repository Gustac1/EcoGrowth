import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDlIqZVbGqeDK1zwR5J8Vy1lopAmGbN5o0",
  authDomain: "ecogrowth-772d4.firebaseapp.com",
  projectId: "ecogrowth-772d4",
  storageBucket: "ecogrowth-772d4.appspot.com",
  messagingSenderId: "37782567711",
  appId: "1:37782567711:web:a21765f0883722d8cace2a"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };