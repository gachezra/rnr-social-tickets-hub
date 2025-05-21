
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, storage } from '../utils/firebase';

export const useFirebase = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          setCurrentUser(user);
          setLoading(false);
        },
        (error) => {
          console.error('Auth state change error:', error);
          setError(error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Firebase hook error:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setLoading(false);
    }
  }, []);

  return {
    auth,
    db,
    storage,
    currentUser,
    loading,
    error,
  };
};

export default useFirebase;
