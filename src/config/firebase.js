// Firebase Live Configuration & Cloud Service for Sirajul Huda Portal
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBOBPHdu00JWbcO4VUivrmquKAjAww1pHU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sirajul-huda-portal.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sirajul-huda-portal",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sirajul-huda-portal.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "704637403476",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:704637403476:web:bfb36a6640a55c3f91c8c1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GBRZPX4DVP"
};

let app = null;
let db = null;
let isFirebaseConfigured = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isFirebaseConfigured = true;
  console.log("🔥 Live Firebase initialized for Sirajul Huda Portal (sirajul-huda-portal)!");
} catch (error) {
  console.warn("⚠️ Firebase Initialization fallback:", error.message);
}

export { app, db, isFirebaseConfigured };
