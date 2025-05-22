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

    // Get filtered snapshot
    const snapshot = await getDocs(eventsQuery);

    console.log(
      `Query snapshot received, empty: ${snapshot.empty}, size: ${snapshot.size}`
    );

    if (snapshot.empty) {
      console.log("No events found in snapshot");

      // If filtering by status returns empty, try without filter as fallback
      if (status) {
        console.log("Trying fallback query without status filter...");
        const fallbackQuery = query(
          eventsCollection,
          orderBy("date", "asc"),
          limit(50)
        );
        const fallbackSnapshot = await getDocs(fallbackQuery);

        if (!fallbackSnapshot.empty) {
          console.log(`Fallback found ${fallbackSnapshot.docs.length} events`);
          return processEventDocs(fallbackSnapshot);
        }
      }

      return [];
    }

    console.log(`Found ${snapshot.docs.length} events in snapshot`);
    return processEventDocs(snapshot);
  } catch (error) {
    console.error("Error fetching events:", error);

    // Try a simpler query as last resort
    try {
      console.log("Attempting simple fallback query...");
      const simpleQuery = collection(db, "events");
      const simpleSnapshot = await getDocs(simpleQuery);

      if (!simpleSnapshot.empty) {
        console.log(`Simple query found ${simpleSnapshot.docs.length} events`);
        return processEventDocs(simpleSnapshot);
      }
    } catch (fallbackError) {
      console.error("Fallback query also failed:", fallbackError);
    }

    throw error;
  }
};

// Helper function to process Firestore documents into Event objects
const processEventDocs = (snapshot: QuerySnapshot<DocumentData>): Event[] => {
  const events = snapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    console.log(`Processing event: ${doc.id}`, data);

    // Convert Firestore timestamp to ISO string if needed
    const formattedData: DocumentData = { ...data };

    // Handle createdAt
    if (data.createdAt) {
      if (data.createdAt instanceof Timestamp) {
        formattedData.createdAt = data.createdAt.toDate().toISOString();
      } else if (typeof data.createdAt !== "string") {
        formattedData.createdAt = new Date().toISOString();
      }
    } else {
      formattedData.createdAt = new Date().toISOString();
    }

    // Handle updatedAt
    if (data.updatedAt) {
      if (data.updatedAt instanceof Timestamp) {
        formattedData.updatedAt = data.updatedAt.toDate().toISOString();
      } else if (typeof data.updatedAt !== "string") {
        formattedData.updatedAt = new Date().toISOString();
      }
    } else {
      formattedData.updatedAt = new Date().toISOString();
    }

    // Handle date field - ensure it's a string in YYYY-MM-DD format
    if (data.date) {
      if (data.date instanceof Timestamp) {
        formattedData.date = data.date.toDate().toISOString().split("T")[0];
      } else if (typeof data.date === "object" && data.date.toDate) {
        // Handle Firestore Timestamp-like objects
        formattedData.date = data.date.toDate().toISOString().split("T")[0];
      } else if (typeof data.date !== "string") {
        formattedData.date = new Date(data.date).toISOString().split("T")[0];
      }
    }

    // Ensure required fields have default values
    const event: Event = {
      id: doc.id,
      title: data.title || "Untitled Event",
      description: data.description || "",
      shortDescription: data.shortDescription || "",
      date: formattedData.date || new Date().toISOString().split("T")[0],
      startTime: data.startTime || "00:00",
      endTime: data.endTime || "23:59",
      location: data.location || "",
      imageUrl: data.imageUrl || "",
      price: typeof data.price === "number" ? data.price : 0,
      byob: Boolean(data.byob),
      maxCapacity:
        typeof data.maxCapacity === "number" ? data.maxCapacity : 100,
      status: data.status || "upcoming",
      createdAt: formattedData.createdAt,
      updatedAt: formattedData.updatedAt,
    };

    console.log(`Processed event ${doc.id}:`, event);
    return event;
  });

  console.log(`Processed ${events.length} events total`);
  return events;
};

export const fetchEvent = async (id: string): Promise<Event | null> => {
  try {
    const eventDoc = await getDoc(doc(db, "events", id));

    if (eventDoc.exists()) {
      const data = eventDoc.data() as DocumentData;

      // Use the same processing logic as fetchEvents
      const processedEvents = processEventDocs({
        docs: [eventDoc],
        empty: false,
        size: 1,
      } as QuerySnapshot<DocumentData>);

      return processedEvents.length > 0 ? processedEvents[0] : null;
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
      createdAt: new Date().toISOString(),
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

    // Get the updated document and process it
    const updatedSnapshot = await getDoc(eventRef);
    if (updatedSnapshot.exists()) {
      const processedEvents = processEventDocs({
        docs: [updatedSnapshot],
        empty: false,
        size: 1,
      } as QuerySnapshot<DocumentData>);

      return processedEvents.length > 0 ? processedEvents[0] : null;
    }

    return null;
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
    throw false;
  }
};

export const searchEvents = async (searchQuery: string): Promise<Event[]> => {
  try {
    // Fetch all events first
    const snapshot = await getDocs(
      query(eventsCollection, orderBy("date", "asc"), limit(100))
    );

    if (snapshot.empty) {
      return [];
    }

    const allEvents = processEventDocs(snapshot);
    const lowerQuery = searchQuery.toLowerCase();

    return allEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery) ||
        event.shortDescription.toLowerCase().includes(lowerQuery) ||
        event.location.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
};
