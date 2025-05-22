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
  Timestamp,
  collection,
  QuerySnapshot,
} from "firebase/firestore";
import { eventsCollection, db } from "../utils/firebase";
import { Event, EventStatus } from "../types";

export const fetchEvents = async (status?: EventStatus): Promise<Event[]> => {
  try {
    // Enhanced debugging
    console.log(`Starting fetchEvents with status: ${status || "all"}`);
    console.log("Using eventsCollection reference:", eventsCollection);

    let eventsQuery;

    if (status) {
      console.log(`Creating query with status filter: ${status}`);
      eventsQuery = query(
        eventsCollection,
        where("status", "==", status),
        orderBy("date", "asc"),
        limit(50)
      );
    } else {
      console.log("Creating query without status filter");
      eventsQuery = query(eventsCollection, orderBy("date", "asc"), limit(50));
    }

    console.log(`Fetching events with status: ${status || "all"}`);

    // Get a raw snapshot - alternative approach for debugging
    const rawCollection = collection(db, "events");
    const rawSnapshot = await getDocs(rawCollection);
    console.log(`Raw collection has ${rawSnapshot.docs.length} documents`);
    if (rawSnapshot.docs.length > 0) {
      console.log(
        "First raw document:",
        rawSnapshot.docs[0].id,
        rawSnapshot.docs[0].data()
      );
    }

    // Get filtered snapshot
    const snapshot = await getDocs(eventsQuery);

    console.log(
      `Query snapshot received, empty: ${snapshot.empty}, size: ${snapshot.size}`
    );

    if (snapshot.empty) {
      console.log("No events found in snapshot");
      return [];
    } else {
      console.log(`Found ${snapshot.docs.length} events in snapshot`);
    }

    // Log all events raw data for debugging
    snapshot.docs.forEach((doc) => {
      console.log(`Raw event data for ${doc.id}:`, doc.data());
    });

    const events = snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      console.log(`Processing event: ${doc.id}`, data);
      console.log(`Event status: ${data.status}, type: ${typeof data.status}`);

      // Convert Firestore timestamp to ISO string if needed
      const formattedData: DocumentData = { ...data };

      if (data.createdAt && typeof data.createdAt !== "string") {
        formattedData.createdAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString();
      }

      if (data.updatedAt && typeof data.updatedAt !== "string") {
        formattedData.updatedAt =
          data.updatedAt instanceof Timestamp
            ? data.updatedAt.toDate().toISOString()
            : new Date().toISOString();
      }

      // Handle date field if it's a Timestamp
      if (data.date && typeof data.date !== "string") {
        formattedData.date =
          data.date instanceof Timestamp
            ? data.date.toDate().toISOString().split("T")[0]
            : data.date;
      }

      const event = {
        id: doc.id,
        ...formattedData,
      } as Event;

      console.log(`Processed event ${doc.id}:`, event);
      return event;
    });

    console.log(`Processed ${events.length} events total:`, events);
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEvent = async (id: string): Promise<Event | null> => {
  try {
    const eventDoc = await getDoc(doc(db, "events", id));

    if (eventDoc.exists()) {
      const data = eventDoc.data() as DocumentData;
      return {
        id: eventDoc.id,
        ...data,
      } as Event;
    }

    return null;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const createEvent = async (
  eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
): Promise<Event> => {
  try {
    const newEventData = {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(eventsCollection, newEventData);

    return {
      id: docRef.id,
      ...eventData,
      createdAt: new Date().toISOString(), // For immediate use in client
      updatedAt: new Date().toISOString(),
    } as Event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (
  id: string,
  eventData: Partial<Event>
): Promise<Event | null> => {
  try {
    const eventRef = doc(db, "events", id);
    const eventSnapshot = await getDoc(eventRef);

    if (!eventSnapshot.exists()) {
      return null;
    }

    const updateData = {
      ...eventData,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(eventRef, updateData);

    // Get the updated document
    const updatedSnapshot = await getDoc(eventRef);
    const data = updatedSnapshot.data() as DocumentData;

    return {
      id,
      ...data,
    } as Event;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  try {
    const eventRef = doc(db, "events", id);
    await deleteDoc(eventRef);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const searchEvents = async (searchQuery: string): Promise<Event[]> => {
  try {
    // Firestore doesn't support full-text search natively
    // For a basic implementation, we'll fetch all events and filter client-side
    // For production, consider using Algolia or similar service

    const snapshot = await getDocs(
      query(eventsCollection, orderBy("date", "asc"), limit(100))
    );
    const allEvents = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Event)
    );

    const lowerQuery = searchQuery.toLowerCase();

    return allEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery) ||
        event.shortDescription.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
};
