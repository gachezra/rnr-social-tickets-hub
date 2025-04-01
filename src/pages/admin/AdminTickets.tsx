
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import TicketList from '../../components/admin/TicketList';
import { fetchEvents, fetchTickets, updateTicketStatus } from '../../utils/api';
import { Ticket, Event, TicketStatus } from '../../types';

const AdminTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterEvent, filterStatus, tickets]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ticketsData, eventsData] = await Promise.all([
        fetchTickets(),
        fetchEvents()
      ]);
      
      setTickets(ticketsData);
      setEvents(eventsData);
      setFilteredTickets(ticketsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load tickets and events');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...tickets];
    
    // Apply event filter
    if (filterEvent !== 'all') {
      result = result.filter(ticket => ticket.eventId === filterEvent);
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(ticket => ticket.status === filterStatus);
    }
    
    // Apply search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(ticket => 
        ticket.email.toLowerCase().includes(lowerQuery) || 
        ticket.id.toLowerCase().includes(lowerQuery) ||
        (ticket.mpesaPhone && ticket.mpesaPhone.toLowerCase().includes(lowerQuery))
      );
    }
    
    setFilteredTickets(result);
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      await updateTicketStatus(ticketId, newStatus as TicketStatus);
      
      // Update local state
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === ticketId ? { ...ticket, status: newStatus as TicketStatus } : ticket
        )
      );
      
      toast.success('Ticket status updated');
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast.error('Failed to update ticket status');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterEvent('all');
    setFilterStatus('all');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ticket Management</h1>
      
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by email, ticket ID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </span>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="form-input"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked-in">Checked In</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button
              onClick={resetFilters}
              className="btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
          <div className="flex items-center">
            <Filter size={18} className="text-primary mr-2" />
            <span className="text-sm">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Pending: {tickets.filter(t => t.status === 'pending').length} | 
            Confirmed: {tickets.filter(t => t.status === 'confirmed').length} | 
            Checked In: {tickets.filter(t => t.status === 'checked-in').length} | 
            Cancelled: {tickets.filter(t => t.status === 'cancelled').length}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading tickets...</p>
        </div>
      ) : (
        <TicketList 
          tickets={filteredTickets} 
          events={events} 
          onStatusChange={handleStatusChange} 
        />
      )}
    </div>
  );
};

export default AdminTickets;
