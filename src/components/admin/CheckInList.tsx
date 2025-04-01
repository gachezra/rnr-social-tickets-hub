
import React, { useState } from 'react';
import { Ticket, Event } from '../../types';
import { Search, Check, X } from 'lucide-react';
import { getStatusText } from '../../utils/helpers';

interface CheckInListProps {
  tickets: Ticket[];
  events: Event[];
  selectedEventId: string;
  onCheckIn: (ticketId: string) => void;
}

const CheckInList: React.FC<CheckInListProps> = ({ 
  tickets, 
  events, 
  selectedEventId, 
  onCheckIn 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const confirmableTickets = tickets.filter(
    ticket => 
      ticket.eventId === selectedEventId && 
      ticket.status === 'confirmed'
  );
  
  const checkedInTickets = tickets.filter(
    ticket => 
      ticket.eventId === selectedEventId && 
      ticket.status === 'checked-in'
  );
  
  const filteredTickets = confirmableTickets.filter(
    ticket => 
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.mpesaPhone && ticket.mpesaPhone.includes(searchQuery))
  );

  const selectedEvent = events.find(e => e.id === selectedEventId);
  
  if (!selectedEvent) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Select an event to see check-in list</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="bg-secondary p-4 rounded-lg">
        <h3 className="text-lg font-bold">{selectedEvent.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            {confirmableTickets.length} tickets to be checked in
          </p>
          <p className="text-sm text-green-500">
            {checkedInTickets.length} checked in
          </p>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search by email, ticket ID, or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input w-full pl-10"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </span>
      </div>
      
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {filteredTickets.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No tickets found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Ticket ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">M-Pesa Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map(ticket => {
                  const statusInfo = getStatusText(ticket.status);
                  
                  return (
                    <tr key={ticket.id} className="border-b border-border hover:bg-secondary/20">
                      <td className="px-4 py-3 text-sm font-mono">{ticket.id}</td>
                      <td className="px-4 py-3 text-sm">{ticket.email}</td>
                      <td className="px-4 py-3 text-sm">{ticket.mpesaPhone || '-'}</td>
                      <td className="px-4 py-3 text-sm">{ticket.quantity}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.colorClass}`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => onCheckIn(ticket.id)}
                          className="flex items-center justify-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                          aria-label="Check In"
                        >
                          <Check size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInList;
