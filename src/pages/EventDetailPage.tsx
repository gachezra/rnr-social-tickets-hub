
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import TicketReservationForm from '../components/TicketReservationForm';
import { fetchEvent } from '../utils/api';
import { fetchTickets } from '../services/ticketService';
import { Progress } from '@/components/ui/progress';
import { Event, Ticket } from '../types';
import { formatDisplayDate, formatTime, getStatusText } from '../utils/helpers';
import { useQuery } from '@tanstack/react-query';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      
      try {
        const eventData = await fetchEvent(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const { data: confirmedTicketsCount = 0, isLoading: isLoadingTickets } = useQuery({
    queryKey: ['confirmedTicketsCount', id],
    queryFn: async () => {
      if (!id) return 0;
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
    enabled: !!id
  });

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <main className="py-12">
          <div className="container-custom">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading event details...</p>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <SiteHeader />
        <main className="py-12">
          <div className="container-custom">
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/events" className="btn-primary">
                Browse All Events
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const statusInfo = getStatusText(event.status);
  const isAvailableForBooking = event.status === 'upcoming' || event.status === 'ongoing';

  // Calculate capacity
  const remainingSpots = Math.max(0, event.maxCapacity - confirmedTicketsCount);
  const capacityPercentage = Math.min(100, Math.round((confirmedTicketsCount / event.maxCapacity) * 100));
  const isEventFull = remainingSpots <= 0;

  return (
    <>
      <SiteHeader />
      
      <main>
        {/* Event Banner */}
        <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/50" />
        </div>
        
        <div className="container-custom -mt-20 relative z-10">
          <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.colorClass}`}>
                  {statusInfo.text}
                </span>
                <span className="text-muted-foreground">
                  KES {event.price.toLocaleString()} per person
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 mb-8">
                <div className="flex items-center">
                  <Calendar size={20} className="text-primary mr-3" />
                  <span>{formatDisplayDate(event.date)}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock size={20} className="text-primary mr-3" />
                  <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={20} className="text-primary mr-3" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold flex items-center">
                    <Users size={18} className="mr-2 text-primary" />
                    Capacity
                  </h3>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${isEventFull ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {isEventFull ? 'SOLD OUT' : `${remainingSpots} spots remaining`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={capacityPercentage} className="h-2 flex-1" />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {confirmedTicketsCount}/{event.maxCapacity} booked
                  </span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="bg-secondary/50 p-4 rounded-md mb-6">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">BYOB & BYOF Event</h3>
                      <p className="text-muted-foreground">
                        This is a Bring Your Own Beverage (BYOB) and Bring Your Own Food (BYOF) event. 
                        Food and drinks are not provided or sold at the venue.
                      </p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-4">About This Event</h2>
                <div className="text-foreground/80 space-y-4 whitespace-pre-line">
                  {event.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg overflow-hidden p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Event Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">Venue Information</h3>
                    <p className="text-foreground/80 mb-1">{event.location}</p>
                    <p className="text-muted-foreground">Eldoret, Kenya</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Capacity</h3>
                    <div className="flex items-center">
                      <Users size={20} className="text-primary mr-3" />
                      <span>Limited to {event.maxCapacity} attendees</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Event Rules</h3>
                    <ul className="list-disc list-inside space-y-1 text-foreground/80">
                      <li>Arrive at least 15 minutes before start time</li>
                      <li>Bring your own food and drinks (BYOB & BYOF)</li>
                      <li>Proof of reservation required for entry</li>
                      <li>No smoking inside the venue</li>
                      <li>Be respectful of other attendees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {isAvailableForBooking && !isEventFull ? (
                <TicketReservationForm event={event} />
              ) : (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Ticket Reservations</h3>
                  <div className="bg-secondary/50 p-4 rounded-md mb-6 text-center">
                    <p className="font-medium mb-2">
                      {isEventFull ? 'This Event is Sold Out' : 'Reservations Unavailable'}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      {isEventFull 
                        ? 'All spots for this event have been booked.' 
                        : (event.status === 'past' ? 'This event is already over.' : 'This event is not available for booking.')}
                    </p>
                    <Link to="/events" className="btn-primary">
                      Browse Other Events
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </>
  );
};

export default EventDetailPage;
