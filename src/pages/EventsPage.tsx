
import React, { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import EventCard from "../components/EventCard";
import EventSearchBar from "../components/EventSearchBar";
import { fetchEvents, searchEvents } from "../utils/api";
import { Event } from "../types";
import { isEventUpcoming, isEventPast } from "../utils/helpers";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "upcoming" | "past">(
    "all"
  );

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        console.log("All events loaded:", eventsData.length);
        setEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      // Reset to the filtered view based on current filter
      filterEvents(activeFilter);
      return;
    }

    try {
      const results = await searchEvents(query);
      setFilteredEvents(results);
      setActiveFilter("all");
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };

  const filterEvents = (filter: "all" | "upcoming" | "past") => {
    setActiveFilter(filter);

    if (filter === "all") {
      setFilteredEvents(events);
    } else if (filter === "upcoming") {
      // Use client-side date checking for upcoming events
      const upcomingEvents = events.filter((event) => isEventUpcoming(event.date));
      console.log("Filtering upcoming events:", upcomingEvents.length);
      setFilteredEvents(upcomingEvents);
    } else if (filter === "past") {
      // Use client-side date checking for past events
      const pastEvents = events.filter((event) => isEventPast(event.date));
      console.log("Filtering past events:", pastEvents.length);
      setFilteredEvents(pastEvents);
    }
  };

  return (
    <>
      <SiteHeader />

      <main className="py-12">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Events</h1>
            <p className="text-muted-foreground">
              Browse all RNR Social Lab events
            </p>
          </div>

          <EventSearchBar onSearch={handleSearch} />

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => filterEvents("all")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => filterEvents("upcoming")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === "upcoming"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => filterEvents("past")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === "past"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Past Events
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">
                {activeFilter === "upcoming" 
                  ? "No upcoming events found" 
                  : activeFilter === "past" 
                  ? "No past events found"
                  : "No events found"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export default EventsPage;
