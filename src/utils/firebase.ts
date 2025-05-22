
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
  QueryConstraint,
  enableIndexedDbPersistence
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
console.log('Initializing Firebase with config:', { ...firebaseConfig, apiKey: '***' });
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log('Firebase services initialized:', {
  auth: !!auth,
  db: !!db,
  storage: !!storage,
  dbInstance: db
});

// Try to enable indexed DB persistence for offline capabilities
try {
  enableIndexedDbPersistence(db)
    .then(() => console.log('Firestore persistence enabled'))
    .catch(err => console.error('Error enabling persistence:', err));
} catch (err) {
  console.warn('Unable to enable persistence:', err);
}

// Collection references
export const eventsCollection = collection(db, 'events');
export const ticketsCollection = collection(db, 'tickets');
export const usersCollection = collection(db, 'users');

console.log('Collection references created:', {
  events: eventsCollection.path,
  tickets: ticketsCollection.path,
  users: usersCollection.path
});

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

