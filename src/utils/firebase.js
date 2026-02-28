import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbDSdthZH6GGKx1xeFiKu9Lor0j-23NKA",
  authDomain: "tpreact-48042.firebaseapp.com",
  projectId: "tpreact-48042",
  storageBucket: "tpreact-48042.firebasestorage.app",
  messagingSenderId: "306074106737",
  appId: "1:306074106737:web:a0ad903fa4465f2cdc54d0",
  measurementId: "G-GL6KZSZPHS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);