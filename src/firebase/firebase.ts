import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9G6Aky0LRTMj6rnpQFFCVeZfw5SA4SlM",
    authDomain: "fasttrack-69875.firebaseapp.com",
    projectId: "fasttrack-69875",
    storageBucket: "fasttrack-69875.firebasestorage.app",
    messagingSenderId: "14126042112",
    appId: "1:14126042112:web:35d898ba9a64ab0e1d5ce5",
    measurementId: "G-Q06R30V83M"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);