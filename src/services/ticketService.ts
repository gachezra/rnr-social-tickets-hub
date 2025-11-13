import {
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { ticketsCollection, db } from "../utils/firebase";
import { Ticket, TicketStatus, Event } from "../types";
import { generateTicketId } from "../utils/helpers";
import { fetchEvent } from "./eventService";

export const fetchTickets = async (eventId?: string): Promise<Ticket[]> => {
  try {
    let ticketsQuery;

    if (eventId) {
      ticketsQuery = query(ticketsCollection, where("eventId", "==", eventId));
    } else {
      ticketsQuery = ticketsCollection;
    }

    const snapshot = await getDocs(ticketsQuery);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        tId: doc.id, // Firestore document ID
        ...data,
      } as Ticket;
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const fetchTicket = async (id: string): Promise<Ticket | null> => {
  try {
    // First try to find by document ID
    const ticketDoc = await getDoc(doc(db, "tickets", id));

    if (ticketDoc.exists()) {
      const data = ticketDoc.data() as DocumentData;
      return {
        tId: ticketDoc.id, // Firestore document ID
        ...data,
      } as Ticket;
    }

    // If not found, try to find by ticket ID field
    const ticketsQuery = query(ticketsCollection, where("id", "==", id));

    const snapshot = await getDocs(ticketsQuery);

    if (!snapshot.empty) {
      const ticketDoc = snapshot.docs[0];
      const data = ticketDoc.data();
      return {
        tId: ticketDoc.id, // Firestore document ID
        ...data,
      } as Ticket;
    }

    return null;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

export const fetchTicketByEmail = async (email: string): Promise<Ticket[]> => {
  try {
    const ticketsQuery = query(
      ticketsCollection,
      where("email", "==", email.toLowerCase())
    );

    const snapshot = await getDocs(ticketsQuery);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        tId: doc.id, // Firestore document ID
        ...data,
      } as Ticket;
    });
  } catch (error) {
    console.error("Error fetching tickets by email:", error);
    throw error;
  }
};

export const createTicket = async (
  ticketData: Omit<Ticket, "id" | "status" | "createdAt" | "updatedAt" | "amount" | "tId">
): Promise<Ticket> => {
  try {
    const event = await fetchEvent(ticketData.eventId);
    if (!event) {
      throw new Error(`Event with ID ${ticketData.eventId} not found`);
    }

    const ticketId = generateTicketId();
    const amount = event.price * ticketData.quantity;

    const newTicketData = {
      ...ticketData,
      email: ticketData.email.toLowerCase(),
      id: ticketId,
      amount,
      status: "pending" as TicketStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(ticketsCollection, newTicketData);

    return {
      tId: docRef.id, // Firestore document ID
      ...newTicketData,
      createdAt: new Date().toISOString(), // For immediate use in client
      updatedAt: new Date().toISOString(),
    } as unknown as Ticket;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

export const updateTicketStatus = async (
  id: string,
  status: TicketStatus
): Promise<Ticket | null> => {
  try {
    const ticketsQuery = query(ticketsCollection, where("id", "==", id));

    const snapshot = await getDocs(ticketsQuery);

    if (snapshot.empty) {
      return null;
    }

    const ticketDoc = snapshot.docs[0];

    await updateDoc(ticketDoc.ref, {
      status,
      updatedAt: serverTimestamp(),
    });

    // Get the updated document
    const updatedSnapshot = await getDoc(ticketDoc.ref);

    return {
      tId: ticketDoc.id, // Firestore document ID
      ...updatedSnapshot.data(),
    } as Ticket;
  } catch (error) {
    console.error("Error updating ticket status:", error);
    throw error;
  }
};

// Export fetchEvent here for use in TicketStatusPage
export { fetchEvent };
