
import { Event, EventStatus } from '../types';

export const determineEventStatus = (eventDate: string, currentDate: Date = new Date()): EventStatus => {
  const eventDateObj = new Date(eventDate);
  const today = new Date(currentDate);
  
  // Reset time to compare dates only
  today.setHours(0, 0, 0, 0);
  eventDateObj.setHours(0, 0, 0, 0);
  
  if (eventDateObj < today) {
    return 'past';
  } else if (eventDateObj > today) {
    return 'upcoming';
  } else {
    return 'ongoing'; // Event is today
  }
};

export const updateEventStatuses = (events: Event[]): Event[] => {
  return events.map(event => ({
    ...event,
    status: determineEventStatus(event.date)
  }));
};
