import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQZfmoAPJFfjowTR1OdwWdEceB2auVm4Q",
    authDomain: "challenge-greydive-80892.firebaseapp.com",
    projectId: "challenge-greydive-80892",
    storageBucket: "challenge-greydive-80892.appspot.com",
    messagingSenderId: "212954041264",
    appId: "1:212954041264:web:513fe746b5052f3e1ca475",
    measurementId: "G-JC1RNKL9QV"
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);