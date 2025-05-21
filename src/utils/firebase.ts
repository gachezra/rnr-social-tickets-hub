
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  Timestamp,
  orderBy,
  QueryConstraint
} from 'firebase/firestore';
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

// Collection references
export const eventsCollection = collection(db, 'events');
export const ticketsCollection = collection(db, 'tickets');
export const usersCollection = collection(db, 'users');

// Helper for timestamps
export const timestamp = serverTimestamp;
export const fromTimestamp = (timestamp: Timestamp) => timestamp.toDate().toISOString();

// Initialize analytics only if supported by the browser
export const analytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
