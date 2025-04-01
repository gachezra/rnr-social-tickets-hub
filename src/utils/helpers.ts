
import { format, parseISO } from 'date-fns';
import { TicketStatus, EventStatus } from '../types';

// Format date to display in a user-friendly way
export const formatDisplayDate = (dateString: string): string => {
  return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
};

// Format time to display in a user-friendly way
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12; // Convert 0 to 12
  return `${formattedHour}:${minutes} ${period}`;
};

// Generate a unique ticket ID
export const generateTicketId = (): string => {
  const timestamp = new Date().getTime().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RNR-${timestamp.slice(-4)}-${random}`;
};

// Get the status text with appropriate color class
export const getStatusText = (status: TicketStatus | EventStatus): { text: string; colorClass: string } => {
  switch (status) {
    case 'pending':
      return { text: 'Pending', colorClass: 'text-yellow-500 bg-yellow-100' };
    case 'confirmed':
      return { text: 'Confirmed', colorClass: 'text-green-500 bg-green-100' };
    case 'checked-in':
      return { text: 'Checked In', colorClass: 'text-blue-500 bg-blue-100' };
    case 'cancelled':
      return { text: 'Cancelled', colorClass: 'text-red-500 bg-red-100' };
    case 'upcoming':
      return { text: 'Upcoming', colorClass: 'text-blue-500 bg-blue-100' };
    case 'ongoing':
      return { text: 'Ongoing', colorClass: 'text-green-500 bg-green-100' };
    case 'past':
      return { text: 'Past', colorClass: 'text-gray-500 bg-gray-100' };
    default:
      return { text: 'Unknown', colorClass: 'text-gray-500 bg-gray-100' };
  }
};

// Local storage helper functions
export const saveToLocalStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

// Simple function for client-side "authentication"
export const authenticate = (username: string, password: string, users: any[]): any | null => {
  return users.find(user => user.username === username && user.password === password) || null;
};
