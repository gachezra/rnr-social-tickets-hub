
import { 
  query, 
  where, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { ticketsCollection, db } from '../utils/firebase';
import { Ticket, TicketStatus } from '../types';
import { generateTicketId } from '../utils/helpers';

export const fetchTickets = async (eventId?: string): Promise<Ticket[]> => {
  try {
    let ticketsQuery;
    
    if (eventId) {
      ticketsQuery = query(
        ticketsCollection, 
        where('eventId', '==', eventId)
      );
    } else {
      ticketsQuery = ticketsCollection;
    }

    const snapshot = await getDocs(ticketsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Ticket));
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const fetchTicket = async (id: string): Promise<Ticket | null> => {
  try {
    const ticketDoc = await getDoc(doc(db, 'tickets', id));
    
    if (ticketDoc.exists()) {
      return {
        id: ticketDoc.id,
        ...ticketDoc.data()
      } as Ticket;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};

export const fetchTicketByEmail = async (email: string): Promise<Ticket[]> => {
  try {
    const ticketsQuery = query(
      ticketsCollection, 
      where('email', '==', email.toLowerCase())
    );
    
    const snapshot = await getDocs(ticketsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Ticket));
  } catch (error) {
    console.error('Error fetching tickets by email:', error);
    throw error;
  }
};

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  try {
    const ticketId = generateTicketId();
    
    const newTicketData = {
      ...ticketData,
      email: ticketData.email.toLowerCase(),
      id: ticketId,
      status: 'pending' as TicketStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await addDoc(ticketsCollection, newTicketData);
    
    return {
      ...newTicketData,
      createdAt: new Date().toISOString(), // For immediate use in client
      updatedAt: new Date().toISOString()
    } as Ticket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const updateTicketStatus = async (id: string, status: TicketStatus): Promise<Ticket | null> => {
  try {
    const ticketsQuery = query(
      ticketsCollection, 
      where('id', '==', id)
    );
    
    const snapshot = await getDocs(ticketsQuery);
    
    if (snapshot.empty) {
      return null;
    }
    
    const ticketDoc = snapshot.docs[0];
    
    await updateDoc(ticketDoc.ref, {
      status,
      updatedAt: serverTimestamp()
    });
    
    // Get the updated document
    const updatedSnapshot = await getDoc(ticketDoc.ref);
    
    return {
      id: ticketDoc.id,
      ...updatedSnapshot.data()
    } as Ticket;
  } catch (error) {
    console.error('Error updating ticket status:', error);
    throw error;
  }
};
