
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdaZspHdpWxv0Z6uDYEAdKtlqOqMZp5RY",
  authDomain: "rnr-social.firebaseapp.com",
  projectId: "rnr-social",
  storageBucket: "rnr-social.firebasestorage.app",
  messagingSenderId: "21141699518",
  appId: "1:21141699518:web:ab2952a5a8d080ed4417ef",
  measurementId: "G-JT96XKP1QT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics only if supported by the browser
export const analytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
