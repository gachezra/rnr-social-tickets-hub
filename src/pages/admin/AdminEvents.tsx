
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search } from 'lucide-react';
import { toast } from 'sonner';
import EventForm from '../../components/admin/EventForm';
import { Event } from '../../types';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../utils/api';
import { formatDisplayDate, formatTime, getStatusText } from '../../utils/helpers';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchQuery, events]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const eventsData = await fetchEvents();
      // Sort events by date, most recent first
      const sortedEvents = eventsData.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createEvent(eventData);
      setIsCreating(false);
      await loadEvents();
      toast.success('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
      throw error;
    }
  };

  const handleUpdateEvent = async (eventData: any) => {
    if (!selectedEvent) return;
    
    try {
      await updateEvent(selectedEvent.id, eventData);
      setSelectedEvent(null);
      await loadEvents();
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
      throw error;
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }
    
    try {
      const result = await deleteEvent(eventId);
      
      if (result) {
        await loadEvents();
        toast.success('Event deleted successfully');
      } else {
        toast.error('Cannot delete event with existing tickets');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const cancelForm = () => {
    setIsCreating(false);
    setSelectedEvent(null);
  };

  if (isCreating || selectedEvent) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {isCreating ? "Create New Event" : "Edit Event"}
          </h1>
          <button
            onClick={cancelForm}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
        
        <EventForm
          event={selectedEvent || undefined}
          onSubmit={isCreating ? handleCreateEvent : handleUpdateEvent}
          onCancel={cancelForm}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="btn-primary"
        >
          <Plus size={18} className="mr-2" />
          Create Event
        </button>
      </div>
      
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input w-full pl-10"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </span>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">
            {searchQuery ? 'No events match your search criteria' : 'No events found'}
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Capacity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => {
                  const statusInfo = getStatusText(event.status);
                  
                  return (
                    <tr key={event.id} className="border-b border-border hover:bg-secondary/20">
                      <td className="px-4 py-3">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.id}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{formatDisplayDate(event.date)}</td>
                      <td className="px-4 py-3 text-sm">{formatTime(event.startTime)} - {formatTime(event.endTime)}</td>
                      <td className="px-4 py-3 text-sm">KES {event.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">{event.maxCapacity}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.colorClass}`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="p-1 rounded-md hover:bg-secondary transition-colors"
                            aria-label="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-1 rounded-md hover:bg-red-100 hover:text-red-500 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
