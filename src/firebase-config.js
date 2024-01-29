// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE4CMfsDWk7K9uRy6SpugbDdC6GKSggro",
  authDomain: "blogapp-49a03.firebaseapp.com",
  projectId: "blogapp-49a03",
  storageBucket: "blogapp-49a03.appspot.com",
  messagingSenderId: "545665474730",
  appId: "1:545665474730:web:5f422fd43f0672fe1a70d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
