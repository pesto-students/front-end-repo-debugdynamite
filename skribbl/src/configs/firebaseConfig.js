import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCQCxR0jyFl6w-fr3vXp8nRfOvesdS6tww",
  authDomain: "skribbl-17bf8.firebaseapp.com",
  projectId: "skribbl-17bf8",
  storageBucket: "skribbl-17bf8.appspot.com",
  messagingSenderId: "922179282410",
  appId: "1:922179282410:web:f36ff1eb088f23c403fe93",
  measurementId: "G-XRMM58TS8Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
