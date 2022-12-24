import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDN9ntUDdNmzISjTlBKKS4NV-swMktnCyc",
    authDomain: "eshop-lesson.firebaseapp.com",
    projectId: "eshop-lesson",
    storageBucket: "eshop-lesson.appspot.com",
    messagingSenderId: "758741184907",
    appId: "1:758741184907:web:fdee04864109cd5be0bf8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
