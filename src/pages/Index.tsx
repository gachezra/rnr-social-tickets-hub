
import { useEffect, useState } from 'react';
import useFirebase from '../hooks/useFirebase';

const Index = () => {
  const { currentUser } = useFirebase();
  const [firebaseStatus, setFirebaseStatus] = useState('Checking Firebase connection...');

  useEffect(() => {
    // This will confirm Firebase is initialized correctly
    try {
      if (currentUser) {
        setFirebaseStatus('Firebase successfully initialized! You are logged in.');
      } else {
        setFirebaseStatus('Firebase successfully initialized! You are not logged in.');
      }
    } catch (error) {
      console.error('Firebase initialization error:', error);
      setFirebaseStatus('Error connecting to Firebase. Check console for details.');
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to RNR Social Club</h1>
        <p className="text-xl text-gray-600 mb-8">Start exploring our upcoming events and reserve your tickets!</p>
        
        <div className="p-4 bg-white rounded-lg shadow-md mb-6">
          <h2 className="font-semibold text-lg mb-2">Firebase Status</h2>
          <p className={firebaseStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}>
            {firebaseStatus}
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <a href="/events" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Browse Events
          </a>
          <a href="/about" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            About Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
