

const firebaseConfig = {
    apiKey: "AIzaSyC9G6Aky0LRTMj6rnpQFFCVeZfw5SA4SlM",
    authDomain: "fasttrack-69875.firebaseapp.com",
    projectId: "fasttrack-69875",
    storageBucket: "fasttrack-69875.firebasestorage.app",
    messagingSenderId: "14126042112",
    appId: "1:14126042112:web:35d898ba9a64ab0e1d5ce5",
    measurementId: "G-Q06R30V83M"
};

const app = window.firebase.initializeApp(firebaseConfig);
export const db = window.firebase.getFirestore(app);

export const addDoc = window.firebase.addDoc;
export const collection = window.firebase.collection;
export const doc = window.firebase.doc;
export const setDoc = window.firebase.setDoc;
export const getDoc = window.firebase.getDoc;
export const getDocs = window.firebase.getDocs;
