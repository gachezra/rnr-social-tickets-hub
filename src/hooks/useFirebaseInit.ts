
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { initializeAdminUsers } from '../services/authService';
import { getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { events, tickets } from '../utils/mockData';

export const useFirebaseInit = () => {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Initialize admin users
        await initializeAdminUsers();
        
        // Check if we need to initialize events and tickets collections
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const ticketsSnapshot = await getDocs(collection(db, 'tickets'));
        
        // If collections are empty, populate with mock data
        if (eventsSnapshot.empty) {
          const eventsCollection = collection(db, 'events');
          for (const event of events) {
            await setDoc(doc(eventsCollection, event.id), event);
          }
          console.log('Events collection initialized with mock data');
        }
        
        if (ticketsSnapshot.empty) {
          const ticketsCollection = collection(db, 'tickets');
          for (const ticket of tickets) {
            await setDoc(doc(ticketsCollection, ticket.id), ticket);
          }
          console.log('Tickets collection initialized with mock data');
        }
        
        setInitialized(true);
      } catch (err) {
        console.error('Error initializing Firebase:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    
    initializeFirebase();
  }, []);

  return { initialized, loading, error };
};

export default useFirebaseInit;
