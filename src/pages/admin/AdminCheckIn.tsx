
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import CheckInList from '../../components/admin/CheckInList';
import { fetchEvents, fetchTickets, updateTicketStatus } from '../../utils/api';
import { Event, Ticket } from '../../types';

const AdminCheckIn: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [eventsData, ticketsData] = await Promise.all([
        fetchEvents(),
        fetchTickets()
      ]);
      
      // Only show upcoming and ongoing events
      const activeEvents = eventsData.filter(
        event => event.status === 'upcoming' || event.status === 'ongoing'
      );
      
      setEvents(activeEvents);
      setTickets(ticketsData);
      
      // Auto-select the first event if available
      if (activeEvents.length > 0 && !selectedEventId) {
        setSelectedEventId(activeEvents[0].id);
      }
    } catch (error) {
      console.error('Error loading check-in data:', error);
      toast.error('Failed to load events and tickets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async (ticketId: string) => {
    try {
      await updateTicketStatus(ticketId, 'checked-in');
      
      // Update local state
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === ticketId ? { ...ticket, status: 'checked-in' } : ticket
        )
      );
      
      toast.success('Ticket checked in successfully');
    } catch (error) {
      console.error('Error checking in ticket:', error);
      toast.error('Failed to check in ticket');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Check-In</h1>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading check-in data...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">
            No active events available for check-in
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label htmlFor="eventSelect" className="form-label">Select Event</label>
            <select
              id="eventSelect"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="form-input w-full md:w-1/2"
            >
              <option value="" disabled>Select an event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title} ({new Date(event.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
          
          <CheckInList
            tickets={tickets}
            events={events}
            selectedEventId={selectedEventId}
            onCheckIn={handleCheckIn}
          />
        </>
      )}
    </div>
  );
};

export default AdminCheckIn;
