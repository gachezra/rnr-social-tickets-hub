
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';
import { Event } from '../types';
import { formatDisplayDate, formatTime, getStatusText } from '../utils/helpers';
import { fetchTickets } from '../services/ticketService';
import { useQuery } from '@tanstack/react-query';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { id, title, shortDescription, date, startTime, imageUrl, price, status, maxCapacity } = event;
  const statusInfo = getStatusText(status);

  // Fetch confirmed tickets for this event
  const { data: confirmedTicketsCount = 0 } = useQuery({
    queryKey: ['confirmedTicketsCount', id],
    queryFn: async () => {
      try {
        const tickets = await fetchTickets(id);
        return tickets
          .filter(ticket => ticket.status === 'confirmed' || ticket.status === 'checked-in')
          .reduce((total, ticket) => total + (ticket.quantity || 1), 0);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        return 0;
      }
    },
  });

  const remainingSpots = Math.max(0, maxCapacity - confirmedTicketsCount);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="event-card group h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden aspect-video">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.colorClass}`}>
          {statusInfo.text}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{shortDescription}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-foreground/80">
            <Calendar size={16} className="mr-2 text-primary" />
            <span>{formatDisplayDate(date)}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/80">
            <Clock size={16} className="mr-2 text-primary" />
            <span>{formatTime(startTime)}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/80">
            <Users size={16} className="mr-2 text-primary" />
            <span>{remainingSpots} spots remaining</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">
            KES {price.toLocaleString()}
          </span>
          <Link to={`/events/${id}`} className="btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
