// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQBMim5naYLWPZESPiUKAQxc13dZdOEhk",
  authDomain: "moodmoodproject-4dc63.firebaseapp.com",
  projectId: "moodmoodproject-4dc63",
  storageBucket: "moodmoodproject-4dc63.firebasestorage.app",
  messagingSenderId: "610949842058",
  appId: "1:610949842058:web:3273f924ed3f1bf18c1973",
  measurementId: "G-1X6P63L4Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);