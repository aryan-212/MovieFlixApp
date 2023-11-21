import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCGzRdo4c1HC1qo1qxEfR_d0oRzSUcLllQ",
    authDomain: "movieflix-5017b.firebaseapp.com",
    projectId: "movieflix-5017b",
    storageBucket: "movieflix-5017b.appspot.com",
    messagingSenderId: "878710165881",
    appId: "1:878710165881:web:4904171e810f86721e1fa8",
    measurementId: "G-17FTV5CZ34"
};

const app = initializeApp( firebaseConfig );
const auth = getAuth( app );
const db = getFirestore( app );

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, db };