
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyAa6TuKQkzG8PuGICkeXBjAdXQEsl3574A",
  authDomain: "learning-projects-asha.firebaseapp.com",
  projectId: "learning-projects-asha",
  storageBucket: "learning-projects-asha.firebasestorage.app",
  messagingSenderId: "997581604816",
  appId: "1:997581604816:web:2e6c7a3b110a30f3a89bd5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);