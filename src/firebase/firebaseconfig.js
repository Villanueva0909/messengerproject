import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB1R0GZh0nASIWQzYxpMobuOhcItTYpfD8",
  authDomain: "messenger-app-2830d.firebaseapp.com",
  projectId: "messenger-app-2830d",
  storageBucket: "messenger-app-2830d.appspot.com",
  messagingSenderId: "388678653023",
  appId: "1:388678653023:web:c2a4d619d332e902fff7ea",
  measurementId: "G-D82MTKLY0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();

