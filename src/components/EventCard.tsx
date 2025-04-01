
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Event } from '../types';
import { formatDisplayDate, formatTime, getStatusText } from '../utils/helpers';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { id, title, shortDescription, date, startTime, imageUrl, price, status } = event;
  const statusInfo = getStatusText(status);

  return (
    <div className="event-card group h-full flex flex-col">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.colorClass}`}>
          {statusInfo.text}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{shortDescription}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-foreground/80">
            <Calendar size={16} className="mr-2 text-primary" />
            <span>{formatDisplayDate(date)}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/80">
            <Clock size={16} className="mr-2 text-primary" />
            <span>{formatTime(startTime)}</span>
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
