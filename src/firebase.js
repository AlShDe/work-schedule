// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtl_-9TeObh-lrFPB-oam9Rzn6DY1cowA",
  authDomain: "work-schedule-930cb.firebaseapp.com",
  projectId: "work-schedule-930cb",
  storageBucket: "work-schedule-930cb.appspot.com",
  messagingSenderId: "343939602714",
  appId: "1:343939602714:web:9fa3e1b7db5827255934a3",
  measurementId: "G-XWHNZF0DWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
