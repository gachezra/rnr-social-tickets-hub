
import React from 'react';
import { Ticket, Event } from '../types';
import { formatDisplayDate, formatTime, getStatusText } from '../utils/helpers';
import { Calendar, Clock, User, Phone, Ticket as TicketIcon } from 'lucide-react';

interface TicketStatusResultProps {
  ticket: Ticket;
  event: Event;
}

const TicketStatusResult: React.FC<TicketStatusResultProps> = ({ ticket, event }) => {
  const statusInfo = getStatusText(ticket.status);

  const paymentLink = `https://rnr-pay-1ybi.vercel.app/?amount=${(event.price * ticket.quantity)}&ticketId=${ticket.tId}&phone=${ticket.mpesaPhone}`;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-fadeIn">
      <div className="bg-secondary p-4 border-b border-border">
        <h3 className="font-bold text-xl mb-1">{event.title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1 text-primary" />
            <span>{formatDisplayDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-primary" />
            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Ticket ID</div>
            <div className="font-mono font-medium">{ticket.id}</div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.colorClass}`}>
            {statusInfo.text}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <User size={18} className="text-primary mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div>{ticket.email}</div>
            </div>
          </div>
          
          {ticket.mpesaPhone && (
            <div className="flex items-start gap-2">
              <Phone size={18} className="text-primary mt-1" />
              <div>
                <div className="text-sm text-muted-foreground">M-Pesa Phone</div>
                <div>{ticket.mpesaPhone}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-2">
            <TicketIcon size={18} className="text-primary mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Quantity</div>
              <div>{ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'}</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
          <div className="font-bold text-lg">KES {(event.price * ticket.quantity).toLocaleString()}</div>
        </div>
        
        {ticket.status === 'pending' && (
          <div className="bg-yellow-100/10 border border-yellow-200/20 rounded p-3 text-sm">
            <p className="font-medium text-yellow-500 mb-1">Payment Instructions</p>
            <p>Please complete your payment via M-Pesa to confirm your reservation.</p>
            <p className="mt-1">M-Pesa Pay Bill: <span className="font-mono">123456</span></p>
            <p>Account Number: <span className="font-mono">{ticket.id}</span></p>
            <p>Or</p>
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Pay Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketStatusResult;
