
import React from 'react';
import { Ticket, Event } from '../../types';
import { formatDisplayDate, getStatusText } from '../../utils/helpers';

interface TicketListProps {
  tickets: Ticket[];
  events: Event[];
  onStatusChange: (ticketId: string, newStatus: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, events, onStatusChange }) => {
  const getEventTitle = (eventId: string): string => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Unknown Event';
  };

  if (tickets.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No tickets found</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Ticket ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Event</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium">M-Pesa Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Date Reserved</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => {
              const statusInfo = getStatusText(ticket.status);
              
              return (
                <tr key={ticket.id} className="border-b border-border hover:bg-secondary/20">
                  <td className="px-4 py-3 text-sm font-mono">{ticket.id}</td>
                  <td className="px-4 py-3 text-sm">{getEventTitle(ticket.eventId)}</td>
                  <td className="px-4 py-3 text-sm">{ticket.email}</td>
                  <td className="px-4 py-3 text-sm">{ticket.mpesaPhone || '-'}</td>
                  <td className="px-4 py-3 text-sm">{ticket.quantity}</td>
                  <td className="px-4 py-3 text-sm">{formatDisplayDate(ticket.createdAt)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.colorClass}`}>
                      {statusInfo.text}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={ticket.status}
                      onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                      className="form-input text-xs py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked-in">Checked In</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;
