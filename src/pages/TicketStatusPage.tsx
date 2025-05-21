
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import TicketStatusSearch from '../components/TicketStatusSearch';
import TicketStatusResult from '../components/TicketStatusResult';
import { fetchTicket, fetchTicketByEmail, fetchEvent } from '../services/ticketService';
import { Ticket, Event } from '../types';

const TicketStatusPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [events, setEvents] = useState<{ [key: string]: Event }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketIdParam = queryParams.get('ticketId');
  
  useEffect(() => {
    if (ticketIdParam) {
      handleSearch(ticketIdParam, 'ticketId');
    }
  }, [ticketIdParam]);
  
  const handleSearch = async (query: string, type: 'email' | 'ticketId') => {
    setIsLoading(true);
    setSearchPerformed(true);
    
    try {
      let foundTickets: Ticket[] = [];
      
      if (type === 'ticketId') {
        const ticket = await fetchTicket(query);
        if (ticket) {
          foundTickets = [ticket];
        }
      } else {
        foundTickets = await fetchTicketByEmail(query);
      }
      
      setTickets(foundTickets);
      
      // Fetch events for all found tickets
      const eventPromises = foundTickets.map(async (ticket) => {
        if (!events[ticket.eventId]) {
          const event = await fetchEvent(ticket.eventId);
          if (event) {
            return { id: event.id, event };
          }
        }
        return null;
      });
      
      const eventResults = await Promise.all(eventPromises);
      const newEvents = { ...events };
      
      eventResults.forEach((result) => {
        if (result) {
          newEvents[result.id] = result.event;
        }
      });
      
      setEvents(newEvents);

      if (foundTickets.length === 0) {
        toast.info('No tickets found with the provided information.');
      }
    } catch (error) {
      console.error('Error searching tickets:', error);
      toast.error('There was an error searching for your tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <SiteHeader />
      
      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Check Ticket Status</h1>
              <p className="text-muted-foreground">
                Enter your email address or ticket ID to check your reservation status
              </p>
            </div>
            
            <TicketStatusSearch onSearch={handleSearch} />
            
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Searching for tickets...</p>
              </div>
            ) : searchPerformed && tickets.length === 0 ? (
              <div className="text-center py-8 bg-card border border-border rounded-lg mt-8">
                <h3 className="text-xl font-bold mb-2">No Tickets Found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any tickets matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="space-y-6 mt-8">
                {tickets.map((ticket) => {
                  const event = events[ticket.eventId];
                  
                  if (!event) {
                    return (
                      <div key={ticket.id} className="text-center py-4 bg-card border border-border rounded-lg">
                        <p className="text-muted-foreground">Loading event details...</p>
                      </div>
                    );
                  }
                  
                  return (
                    <TicketStatusResult 
                      key={ticket.id} 
                      ticket={ticket} 
                      event={event} 
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </>
  );
};

export default TicketStatusPage;
