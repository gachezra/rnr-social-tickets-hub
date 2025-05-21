
import { 
  query, 
  where, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { eventsCollection, db } from '../utils/firebase';
import { Event, EventStatus } from '../types';

export const fetchEvents = async (status?: EventStatus): Promise<Event[]> => {
  try {
    let eventsQuery;
    
    if (status) {
      eventsQuery = query(
        eventsCollection, 
        where('status', '==', status),
        orderBy('date', 'asc')
      );
    } else {
      eventsQuery = query(eventsCollection, orderBy('date', 'asc'));
    }

    const snapshot = await getDocs(eventsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEvent = async (id: string): Promise<Event | null> => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', id));
    
    if (eventDoc.exists()) {
      return {
        id: eventDoc.id,
        ...eventDoc.data()
      } as Event;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
  try {
    const newEventData = {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(eventsCollection, newEventData);
    
    return {
      id: docRef.id,
      ...eventData,
      createdAt: new Date().toISOString(), // For immediate use in client
      updatedAt: new Date().toISOString()
    } as Event;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event | null> => {
  try {
    const eventRef = doc(db, 'events', id);
    const eventSnapshot = await getDoc(eventRef);
    
    if (!eventSnapshot.exists()) {
      return null;
    }
    
    const updateData = {
      ...eventData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(eventRef, updateData);
    
    // Get the updated document
    const updatedSnapshot = await getDoc(eventRef);
    
    return {
      id,
      ...updatedSnapshot.data()
    } as Event;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  try {
    const eventRef = doc(db, 'events', id);
    await deleteDoc(eventRef);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const searchEvents = async (query: string): Promise<Event[]> => {
  try {
    // Firestore doesn't support full-text search natively
    // For a basic implementation, we'll fetch all events and filter client-side
    // For production, consider using Algolia or similar service
    
    const snapshot = await getDocs(eventsCollection);
    const allEvents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
    
    const lowerQuery = query.toLowerCase();
    
    return allEvents.filter(event => 
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery) ||
      event.shortDescription.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};
