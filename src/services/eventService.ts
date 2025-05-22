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
  orderBy,
  limit,
  DocumentData,
  Timestamp
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
        orderBy('date', 'asc'),
        limit(50) // Add a reasonable limit
      );
    } else {
      eventsQuery = query(
        eventsCollection, 
        orderBy('date', 'asc'),
        limit(50)
      );
    }

    console.log(`Fetching events with status: ${status || 'all'}`);
    const snapshot = await getDocs(eventsQuery);
    
    if (snapshot.empty) {
      console.log('No events found');
    } else {
      console.log(`Found ${snapshot.docs.length} events`);
    }
    
    const events = snapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore timestamp to ISO string if needed
      const formattedData: any = { ...data };
      
      if (data.createdAt && typeof data.createdAt !== 'string') {
        formattedData.createdAt = data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate().toISOString() 
          : new Date().toISOString();
      }
      
      if (data.updatedAt && typeof data.updatedAt !== 'string') {
        formattedData.updatedAt = data.updatedAt instanceof Timestamp 
          ? data.updatedAt.toDate().toISOString() 
          : new Date().toISOString();
      }

      // Handle date field if it's a Timestamp
      if (data.date && typeof data.date !== 'string') {
        formattedData.date = data.date instanceof Timestamp 
          ? data.date.toDate().toISOString().split('T')[0] 
          : data.date;
      }
      
      return {
        id: doc.id,
        ...formattedData
      } as Event;
    });
    
    console.log(`Processed ${events.length} events:`, events);
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEvent = async (id: string): Promise<Event | null> => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', id));
    
    if (eventDoc.exists()) {
      const data = eventDoc.data() as DocumentData;
      return {
        id: eventDoc.id,
        ...data
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
    const data = updatedSnapshot.data() as DocumentData;
    
    return {
      id,
      ...data
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

export const searchEvents = async (searchQuery: string): Promise<Event[]> => {
  try {
    // Firestore doesn't support full-text search natively
    // For a basic implementation, we'll fetch all events and filter client-side
    // For production, consider using Algolia or similar service
    
    const snapshot = await getDocs(
      query(eventsCollection, orderBy('date', 'asc'), limit(100))
    );
    const allEvents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
    
    const lowerQuery = searchQuery.toLowerCase();
    
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
