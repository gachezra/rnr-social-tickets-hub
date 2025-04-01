
import { events, tickets, users } from './mockData';
import { Event, Ticket, User, EventStatus, TicketStatus } from '../types';
import { generateTicketId, saveToLocalStorage, getFromLocalStorage } from './helpers';

// Load data from localStorage if it exists, otherwise use mock data
const getEvents = (): Event[] => {
  return getFromLocalStorage<Event[]>('rnr-events', events);
};

const getTickets = (): Ticket[] => {
  return getFromLocalStorage<Ticket[]>('rnr-tickets', tickets);
};

const getUsers = (): User[] => {
  return users; // We always use the mock data for users for demo purposes
};

// API functions
export const fetchEvents = async (status?: EventStatus): Promise<Event[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allEvents = getEvents();
  if (status) {
    return allEvents.filter(event => event.status === status);
  }
  return allEvents;
};

export const fetchEvent = async (id: string): Promise<Event | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allEvents = getEvents();
  return allEvents.find(event => event.id === id) || null;
};

export const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allEvents = getEvents();
  const newEvent: Event = {
    ...eventData,
    id: `ev-${allEvents.length + 1}`.padStart(6, '0'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const updatedEvents = [...allEvents, newEvent];
  saveToLocalStorage('rnr-events', updatedEvents);
  
  return newEvent;
};

export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allEvents = getEvents();
  const eventIndex = allEvents.findIndex(event => event.id === id);
  
  if (eventIndex === -1) return null;
  
  const updatedEvent: Event = {
    ...allEvents[eventIndex],
    ...eventData,
    updatedAt: new Date().toISOString(),
  };
  
  allEvents[eventIndex] = updatedEvent;
  saveToLocalStorage('rnr-events', allEvents);
  
  return updatedEvent;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allEvents = getEvents();
  const eventTickets = getTickets().filter(ticket => ticket.eventId === id);
  
  // If there are tickets for this event, don't allow deletion
  if (eventTickets.length > 0) {
    return false;
  }
  
  const filteredEvents = allEvents.filter(event => event.id !== id);
  saveToLocalStorage('rnr-events', filteredEvents);
  
  return true;
};

export const searchEvents = async (query: string): Promise<Event[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allEvents = getEvents();
  const lowerQuery = query.toLowerCase();
  
  return allEvents.filter(event => 
    event.title.toLowerCase().includes(lowerQuery) ||
    event.description.toLowerCase().includes(lowerQuery) ||
    event.shortDescription.toLowerCase().includes(lowerQuery)
  );
};

export const fetchTickets = async (eventId?: string): Promise<Ticket[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allTickets = getTickets();
  if (eventId) {
    return allTickets.filter(ticket => ticket.eventId === eventId);
  }
  return allTickets;
};

export const fetchTicket = async (id: string): Promise<Ticket | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allTickets = getTickets();
  return allTickets.find(ticket => ticket.id === id) || null;
};

export const fetchTicketByEmail = async (email: string): Promise<Ticket[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allTickets = getTickets();
  return allTickets.filter(ticket => ticket.email.toLowerCase() === email.toLowerCase());
};

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allTickets = getTickets();
  const newTicket: Ticket = {
    ...ticketData,
    id: generateTicketId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const updatedTickets = [...allTickets, newTicket];
  saveToLocalStorage('rnr-tickets', updatedTickets);
  
  return newTicket;
};

export const updateTicketStatus = async (id: string, status: TicketStatus): Promise<Ticket | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allTickets = getTickets();
  const ticketIndex = allTickets.findIndex(ticket => ticket.id === id);
  
  if (ticketIndex === -1) return null;
  
  const updatedTicket: Ticket = {
    ...allTickets[ticketIndex],
    status,
    updatedAt: new Date().toISOString(),
  };
  
  allTickets[ticketIndex] = updatedTicket;
  saveToLocalStorage('rnr-tickets', allTickets);
  
  return updatedTicket;
};

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allUsers = getUsers();
  return allUsers.find(user => user.username === username && user.password === password) || null;
};
