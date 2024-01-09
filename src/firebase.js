// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDo7IxWPs2XLNtHt6U5g0WqIKMybWG1a_U",
    authDomain: "handtime-52950.firebaseapp.com",
    projectId: "handtime-52950",
    storageBucket: "handtime-52950.appspot.com",
    messagingSenderId: "485462149373",
    appId: "1:485462149373:web:015fcc76de9076b4fed694"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

