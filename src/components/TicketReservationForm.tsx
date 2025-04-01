
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Event } from '../types';
import { createTicket } from '../utils/api';

interface TicketReservationFormProps {
  event: Event;
}

const TicketReservationForm: React.FC<TicketReservationFormProps> = ({ event }) => {
  const [email, setEmail] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Reserve Your Tickets</h3>
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
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="form-input w-16 mx-2 text-center"
              readOnly
            />
            <button
              type="button"
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="btn-secondary px-3 py-1 rounded-md"
              disabled={quantity === 10}
            >
              +
            </button>
          </div>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Reserve Tickets'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketReservationForm;
