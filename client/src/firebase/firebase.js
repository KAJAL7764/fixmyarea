// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3Pw8Mufx1BUplmYP9NKIZT9M4yPrT_y8",
  authDomain: "fixmyarea-dcad5.firebaseapp.com",
  projectId: "fixmyarea-dcad5",
  storageBucket: "fixmyarea-dcad5.firebasestorage.app",
  messagingSenderId: "577043529037",
  appId: "1:577043529037:web:cdabfd28fd5e8f6adccb04",
  measurementId: "G-K6Q72ZERMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;