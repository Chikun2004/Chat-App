// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDuHJ7IjIZXCPdP2kftYRKWGu6-gcLg23M",
  authDomain: "chat-app-cascade.firebaseapp.com",
  projectId: "chat-app-cascade",
  storageBucket: "chat-app-cascade.firebasestorage.app",
  messagingSenderId: "397929124233",
  appId: "1:397929124233:web:d688a816ebd2ef84431158",
  measurementId: "G-6L35GS9Y9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);