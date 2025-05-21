
// Import Firebase services
import * as eventService from '../services/eventService';
import * as ticketService from '../services/ticketService';
import * as authService from '../services/authService';
import { Event, Ticket, User, EventStatus, TicketStatus } from '../types';

// Re-export all functions from services
export const fetchEvents = eventService.fetchEvents;
export const fetchEvent = eventService.fetchEvent;
export const createEvent = eventService.createEvent;
export const updateEvent = eventService.updateEvent;
export const deleteEvent = eventService.deleteEvent;
export const searchEvents = eventService.searchEvents;

export const fetchTickets = ticketService.fetchTickets;
export const fetchTicket = ticketService.fetchTicket;
export const fetchTicketByEmail = ticketService.fetchTicketByEmail;
export const createTicket = ticketService.createTicket;
export const updateTicketStatus = ticketService.updateTicketStatus;

export const authenticateUser = authService.authenticateUser;
