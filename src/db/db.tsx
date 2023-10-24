// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvSwOdiRr37Ir2oEdogGpOEs0gIJsF3ms",
  authDomain: "react-54d8b.firebaseapp.com",
  projectId: "react-54d8b",
  storageBucket: "react-54d8b.appspot.com",
  messagingSenderId: "1044103979617",
  appId: "1:1044103979617:web:299a1947472bcbebbd0020",
  measurementId: "G-M27DYXL638"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { auth };