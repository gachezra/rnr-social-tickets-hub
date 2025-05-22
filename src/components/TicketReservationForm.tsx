
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Event } from '../types';
import { createTicket } from '../utils/api';
import { fetchTickets } from '../services/ticketService';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

interface TicketReservationFormProps {
  event: Event;
}

const TicketReservationForm: React.FC<TicketReservationFormProps> = ({ event }) => {
  const [email, setEmail] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch confirmed tickets for capacity check
  const { data: confirmedTicketsCount = 0, isLoading: isLoadingTickets } = useQuery({
    queryKey: ['confirmedTicketsCount', event.id],
    queryFn: async () => {
      try {
        const tickets = await fetchTickets(event.id);
        return tickets
          .filter(ticket => ticket.status === 'confirmed' || ticket.status === 'checked-in')
          .reduce((total, ticket) => total + (ticket.quantity || 1), 0);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        return 0;
      }
    },
  });

  // Calculate available capacity
  const remainingSpots = Math.max(0, event.maxCapacity - confirmedTicketsCount);
  const maxAllowedQuantity = Math.min(10, remainingSpots);
  
  // Adjust quantity if it exceeds available spots
  useEffect(() => {
    if (quantity > maxAllowedQuantity) {
      setQuantity(maxAllowedQuantity);
    }
  }, [maxAllowedQuantity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if there's enough capacity
    if (quantity > remainingSpots) {
      toast.error('Not enough spots available', {
        description: `Only ${remainingSpots} spots remaining for this event.`,
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const ticket = await createTicket({
        eventId: event.id,
        email,
        mpesaPhone: mpesaPhone || undefined,
        quantity,
      });
      
      toast.success('Ticket reserved successfully!', {
        description: `Your ticket ID is ${ticket.id}`,
      });
      
      // Navigate to ticket status page
      navigate(`/ticket-status?ticketId=${ticket.id}`);
    } catch (error) {
      console.error('Error reserving ticket:', error);
      toast.error('Failed to reserve ticket', {
        description: 'Please try again or contact support.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (remainingSpots <= 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Ticket Reservations</h3>
        <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-6">
          <div className="flex items-start">
            <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-700 mb-1">Event Sold Out</h4>
              <p className="text-red-600">
                All spots for this event have been booked. Please check other events.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Reserve Your Tickets</h3>
      
      {remainingSpots <= 5 && (
        <div className="mb-4 bg-amber-50 border border-amber-200 p-3 rounded-md text-amber-800">
          <div className="flex items-center">
            <AlertCircle size={16} className="text-amber-500 mr-2" />
            <p className="text-sm">
              <strong>Limited availability!</strong> Only {remainingSpots} {remainingSpots === 1 ? 'spot' : 'spots'} left.
            </p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="form-label">Email Address*</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input w-full"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="mpesaPhone" className="form-label">
            M-Pesa Phone Number (Optional)
          </label>
          <input
            id="mpesaPhone"
            type="tel"
            value={mpesaPhone}
            onChange={(e) => setMpesaPhone(e.target.value)}
            className="form-input w-full"
            placeholder="e.g., 254712345678"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This will help us identify your payment
          </p>
        </div>
        
        <div>
          <label htmlFor="quantity" className="form-label">Number of Tickets*</label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="btn-secondary px-3 py-1 rounded-md"
              disabled={quantity === 1}
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              min={1}
              max={maxAllowedQuantity}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setQuantity(Math.min(maxAllowedQuantity, Math.max(1, val)));
              }}
              className="form-input w-16 mx-2 text-center"
              readOnly
            />
            <button
              type="button"
              onClick={() => setQuantity(Math.min(maxAllowedQuantity, quantity + 1))}
              className="btn-secondary px-3 py-1 rounded-md"
              disabled={quantity === maxAllowedQuantity}
            >
              +
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum {maxAllowedQuantity} tickets per reservation
          </p>
        </div>
        
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">
              {quantity} × KES {event.price.toLocaleString()}
            </span>
            <span className="font-bold text-lg">
              KES {(quantity * event.price).toLocaleString()}
            </span>
          </div>
          
          <div className="bg-secondary/50 p-3 rounded-md mb-4 text-sm">
            <p className="font-medium mb-1">Important:</p>
            <p>
              This is a BYOB (Bring Your Own Beverage) and BYOF (Bring Your Own Food) event. 
              Food and drinks are not provided or sold at the venue.
            </p>
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={isSubmitting || remainingSpots <= 0}
          >
            {isSubmitting ? 'Processing...' : 'Reserve Tickets'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketReservationForm;
