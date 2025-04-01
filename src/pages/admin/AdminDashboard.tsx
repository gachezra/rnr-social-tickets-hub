
import React, { useEffect, useState } from 'react';
import { CalendarCheck, Users, Ticket, Clock } from 'lucide-react';
import { fetchEvents, fetchTickets } from '../../utils/api';
import { Event, Ticket as TicketType } from '../../types';

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsData, ticketsData] = await Promise.all([
          fetchEvents(),
          fetchTickets()
        ]);
        
        setEvents(eventsData);
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const upcomingEvents = events.filter(event => event.status === 'upcoming').length;
  const pastEvents = events.filter(event => event.status === 'past').length;
  const pendingTickets = tickets.filter(ticket => ticket.status === 'pending').length;
  const confirmedTickets = tickets.filter(ticket => ticket.status === 'confirmed').length;
  const checkedInTickets = tickets.filter(ticket => ticket.status === 'checked-in').length;
  
  // Get the next upcoming event
  const nextEvent = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  
  // Get the most recent tickets
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border flex items-center">
          <div className="rounded-full p-3 bg-blue-100 text-blue-600 mr-4">
            <CalendarCheck size={24} />
          </div>
          <div>
            <h3 className="text-muted-foreground text-sm">Upcoming Events</h3>
            <p className="text-2xl font-bold">{upcomingEvents}</p>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border flex items-center">
          <div className="rounded-full p-3 bg-yellow-100 text-yellow-600 mr-4">
            <Ticket size={24} />
          </div>
          <div>
            <h3 className="text-muted-foreground text-sm">Pending Tickets</h3>
            <p className="text-2xl font-bold">{pendingTickets}</p>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border flex items-center">
          <div className="rounded-full p-3 bg-green-100 text-green-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-muted-foreground text-sm">Confirmed Tickets</h3>
            <p className="text-2xl font-bold">{confirmedTickets}</p>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border flex items-center">
          <div className="rounded-full p-3 bg-purple-100 text-purple-600 mr-4">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-muted-foreground text-sm">Total Events</h3>
            <p className="text-2xl font-bold">{events.length}</p>
          </div>
        </div>
      </div>
      
      {/* Next Event & Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Event */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="border-b border-border p-4">
            <h2 className="font-bold">Next Upcoming Event</h2>
          </div>
          
          <div className="p-4">
            {nextEvent ? (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden">
                  <img 
                    src={nextEvent.imageUrl} 
                    alt={nextEvent.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{nextEvent.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(nextEvent.date).toLocaleDateString()} at {nextEvent.startTime}
                  </p>
                  <p className="text-sm">{nextEvent.shortDescription}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No upcoming events scheduled
              </p>
            )}
          </div>
        </div>
        
        {/* Recent Tickets */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="border-b border-border p-4">
            <h2 className="font-bold">Recent Ticket Reservations</h2>
          </div>
          
          <div>
            {recentTickets.length > 0 ? (
              <div className="divide-y divide-border">
                {recentTickets.map(ticket => {
                  const event = events.find(e => e.id === ticket.eventId);
                  
                  return (
                    <div key={ticket.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">
                          {ticket.email} ({ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'})
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event?.title || 'Unknown Event'}
                        </p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full
                          ${ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                          ${ticket.status === 'confirmed' ? 'bg-green-100 text-green-600' : ''}
                          ${ticket.status === 'checked-in' ? 'bg-blue-100 text-blue-600' : ''}
                          ${ticket.status === 'cancelled' ? 'bg-red-100 text-red-600' : ''}
                        `}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No recent ticket reservations
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
