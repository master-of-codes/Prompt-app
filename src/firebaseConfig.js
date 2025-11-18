// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// WARNING: Replace with your actual Firebase config (or use environment variables)
const firebaseConfig = {
    apiKey: "AIzaSyDzPkZEn_QwM6aBUk4LhHRkvSy0KM_P8W0",
    authDomain: "coder-prompt.firebaseapp.com",
    projectId: "coder-prompt",
    storageBucket: "coder-prompt.firebasestorage.app",
    messagingSenderId: "746694129606",
    appId: "1:746694129606:web:0069eb3290bac0380364c7",
    measurementId: "G-L3KTDME0HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { db, messaging };