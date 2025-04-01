
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Event, EventStatus } from '../../types';

interface EventFormProps {
  event?: Event;
  onSubmit: (eventData: any) => Promise<void>;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    imageUrl: '',
    price: 0,
    maxCapacity: 0,
    status: 'upcoming' as EventStatus,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        shortDescription: event.shortDescription,
        description: event.description,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        imageUrl: event.imageUrl,
        price: event.price,
        maxCapacity: event.maxCapacity,
        status: event.status,
      });
    }
  }, [event]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' || name === 'maxCapacity' ? parseInt(value) || 0 : value 
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      toast.success(event ? 'Event updated successfully' : 'Event created successfully');
    } catch (error) {
      console.error('Error submitting event:', error);
      toast.error(event ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="title" className="form-label">Event Title*</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input w-full"
          />
        </div>
        
        <div className="col-span-2">
          <label htmlFor="shortDescription" className="form-label">Short Description*</label>
          <input
            id="shortDescription"
            name="shortDescription"
            type="text"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            className="form-input w-full"
            maxLength={150}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Brief summary (max 150 characters) shown on event cards
          </p>
        </div>
        
        <div className="col-span-2">
          <label htmlFor="description" className="form-label">Full Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            className="form-input w-full"
          />
        </div>
        
        <div>
          <label htmlFor="date" className="form-label">Event Date*</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="form-label">Start Time*</label>
            <input
              id="startTime"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="form-input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="endTime" className="form-label">End Time*</label>
            <input
              id="endTime"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="form-input w-full"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="form-label">Location*</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="form-input w-full"
          />
        </div>
        
        <div>
          <label htmlFor="status" className="form-label">Status*</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="form-input w-full"
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="price" className="form-label">Ticket Price (KES)*</label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            value={formData.price}
            onChange={handleChange}
            required
            className="form-input w-full"
          />
        </div>
        
        <div>
          <label htmlFor="maxCapacity" className="form-label">Maximum Capacity*</label>
          <input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            min={1}
            value={formData.maxCapacity}
            onChange={handleChange}
            required
            className="form-input w-full"
          />
        </div>
        
        <div className="col-span-2">
          <label htmlFor="imageUrl" className="form-label">Image URL*</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="form-input w-full"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter a URL for the event image
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
