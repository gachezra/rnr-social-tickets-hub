import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Event, EventStatus } from "../../types";

interface EventFormProps {
  event?: Event;
  onSubmit: (eventData: any) => Promise<void>;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    imageUrl: "",
    price: 0,
    maxCapacity: 0,
    status: "upcoming" as EventStatus,
    byob: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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
        byob: event.byob,
      });
      setImagePreview(event.imageUrl);
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox input
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "maxCapacity"
            ? parseInt(value) || 0
            : value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!image) return null;

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "events"); // Use your upload preset name here

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dykwdjdaf/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      throw error;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Upload image if a new one is selected
      let imageUrl = formData.imageUrl;
      if (image) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          toast.error("Image upload failed");
          return;
        }
      }

      // Prepare event data with image URL
      const eventData = {
        ...formData,
        imageUrl,
      };

      await onSubmit(eventData);
      toast.success(
        event ? "Event updated successfully" : "Event created successfully"
      );
    } catch (error) {
      console.error("Error submitting event:", error);
      toast.error(event ? "Failed to update event" : "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-card border border-border rounded-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="title" className="form-label">
            Event Title*
          </label>
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
          <label htmlFor="shortDescription" className="form-label">
            Short Description*
          </label>
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
          <label htmlFor="description" className="form-label">
            Full Description*
          </label>
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

        {/* Image Upload Section */}
        <div className="col-span-2">
          <label htmlFor="image" className="form-label">
            Event Image*
          </label>
          <div className="space-y-4">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            <p className="text-xs text-muted-foreground">
              Upload an image for your event (max 5MB). Supported formats: JPG,
              PNG, GIF, WebP
            </p>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Event preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {isUploadingImage && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                Uploading image...
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="date" className="form-label">
            Event Date*
          </label>
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
            <label htmlFor="startTime" className="form-label">
              Start Time*
            </label>
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
            <label htmlFor="endTime" className="form-label">
              End Time*
            </label>
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
          <label htmlFor="location" className="form-label">
            Location*
          </label>
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
          <label htmlFor="status" className="form-label">
            Status*
          </label>
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
          <label htmlFor="price" className="form-label">
            Ticket Price (KES)*
          </label>
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
          <label htmlFor="maxCapacity" className="form-label">
            Maximum Capacity*
          </label>
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

        {/* BYOB Checkbox */}
        <div className="col-span-2">
          <div className="flex items-center space-x-3">
            <input
              id="byob"
              name="byob"
              type="checkbox"
              checked={formData.byob}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="byob" className="form-label flex-1">
              BYOB Event (Bring Your Own Beverage & Food)
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-7">
            Check this box if attendees should bring their own food and
            beverages. This will display a notice on the event page.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting || isUploadingImage}
        >
          {isSubmitting ? "Saving..." : event ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
