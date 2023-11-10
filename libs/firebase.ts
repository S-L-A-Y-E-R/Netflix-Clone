// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "netflix-clone-231ca.firebaseapp.com",
  projectId: "netflix-clone-231ca",
  storageBucket: "netflix-clone-231ca.appspot.com",
  messagingSenderId: "804711095702",
  appId: "1:804711095702:web:426f3c218d622da99b91b7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
