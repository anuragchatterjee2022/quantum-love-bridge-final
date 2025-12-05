// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- PASTE YOUR ACTUAL CONFIG OBJECT HERE ---
const firebaseConfig = {
  apiKey: "AIzaSyC3WKm-VkGeu7mRgmObye3-bWZTjM7xQAQ",
  authDomain: "quantum-love-bridge-db.firebaseapp.com",
  projectId: "quantum-love-bridge-db",
  storageBucket: "quantum-love-bridge-db.firebasestorage.app",
  messagingSenderId: "951150509196",
  appId: "1:951150509196:web:82a0633b9f3b5d5ce14fa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);