
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQBMim5naYLWPZESPiUKAQxc13dZdOEhk",
  authDomain: "moodmoodproject-4dc63.firebaseapp.com",
  projectId: "moodmoodproject-4dc63",
  storageBucket: "moodmoodproject-4dc63.firebasestorage.app",
  messagingSenderId: "610949842058",
  appId: "1:610949842058:web:289dca5444143ea08c1973",
  measurementId: "G-D3169YTEXH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;