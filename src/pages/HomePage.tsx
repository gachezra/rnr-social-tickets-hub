import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import EventCard from "../components/EventCard";
import EventSearchBar from "../components/EventSearchBar";
import { searchEvents } from "../utils/api";
import { Event } from "../types";
import { fetchEvents } from "../services/eventService";
import { useToast } from "@/components/ui/use-toast";

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Event[] | null>(null);
  const { toast } = useToast();

  // Use React Query to fetch upcoming events with better error handling
  const {
    data: upcomingEvents = [],
    isLoading,
    error,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: async () => {
      try {
        console.log("Starting to fetch upcoming events...");
        // Attempt to get all events first if filtering isn't working
        const allEvents = await fetchEvents();
        console.log("All events (unfiltered):", allEvents);

        // Then try with the filter
        const events = await fetchEvents("upcoming");
        console.log("Fetched upcoming events (raw):", events);
        console.log("Number of events fetched:", events.length);
        console.log(
          "First event details (if any):",
          events.length > 0 ? events[0] : "No events"
        );
        return events.length > 0 ? events : allEvents;
      } catch (err) {
        console.error("Error fetching upcoming events:", err);
        throw err;
      }
    },
    staleTime: 60000, // 1 minute
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading events:", error);
      toast({
        title: "Error loading events",
        description: "There was a problem loading events. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Additional debugging useEffect
  useEffect(() => {
    console.log("upcomingEvents in state:", upcomingEvents);
    console.log("upcomingEvents length:", upcomingEvents.length);

    if (isFetched && upcomingEvents.length === 0) {
      console.log(
        "Events fetched but none found. This could indicate an issue with the database or query."
      );
    }
  }, [upcomingEvents, isFetched]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const results = await searchEvents(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };

  const displayedEvents = searchResults ?? upcomingEvents;
  console.log("Displaying events final:", displayedEvents);
  console.log("Displaying events length:", displayedEvents.length);

  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-secondary/10 py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-[url('/images/f1-event.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
                <span className="text-primary">RNR Social Lab</span> Social
                Experiences
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fadeIn">
              Elevate your social experiences with our diverse events.  From unforgettable Outdoor Cinema Nights under the Eldoret stars to the thrilling action of F1 Sunday live screenings, oonts and many more. We bring people together for unique and curates experiences. Stay tuned for our upcoming lineup of various other exciting events designed to entertain and engage!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn">
                <Link to="/events" className="btn-primary py-3 px-6">
                  Browse Events
                </Link>
                <Link to="/about" className="btn-secondary py-3 px-6">
                  About RNR
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BYOB/BYOF Explanation */}
        <section className="py-16 bg-card">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Book Your Spot</h3>
                  <p className="text-muted-foreground">
                    Browse our upcoming events and reserve your tickets online.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">BYOB & BYOF</h3>
                  <p className="text-muted-foreground">
                    Bring your favorite food and drinks to enjoy during the
                    event.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Enjoy the Show</h3>
                  <p className="text-muted-foreground">
                    Arrive on time, check in with your ticket, and enjoy the
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                {searchResults ? "Search Results" : "Upcoming Events"}
              </h2>
              {!searchResults && (
                <Link
                  to="/events"
                  className="flex items-center text-primary hover:underline"
                >
                  <span>View All</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              )}
            </div>

            <EventSearchBar onSearch={handleSearch} />

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : displayedEvents.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">
                  {searchResults
                    ? "No events found matching your search criteria."
                    : "No upcoming events at the moment. Check back soon!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedEvents.slice(0, 6).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/premier-league-event.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Ready to Join the Fun?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Discover our upcoming events and reserve your spot today!
              </p>
              <Link
                to="/events"
                className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-md hover:bg-white/90 transition-colors"
              >
                Browse All Events
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
};

export default HomePage;
