import React from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { MapPin, Mail, Phone } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="bg-gradient-to-b from-background to-secondary/10 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About RNR Social Lab</h1>
              <p className="text-lg text-muted-foreground">
                Eldoret's premier social watch party venue
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-foreground/90">
                  <p>
                    RNR Social Lab was founded in 2022 with a simple mission: to
                    create a vibrant community space where sports and
                    entertainment enthusiasts can come together to enjoy watch
                    parties in a lively, social atmosphere.
                  </p>
                  <p>
                    What makes our concept unique is our BYOB (Bring Your Own
                    Beverage) and BYOF (Bring Your Own Food) policy. We provide
                    the venue, the big screens, and the atmosphere - you bring
                    your favorite refreshments! - only on outdoor cinemas and F1 events.
                  </p>
                  <p>
                    Located in the outskirts of Eldoret, our venue has quickly
                    become a favorite gathering spot for everything from major
                    sporting events to season premieres and special screenings.
                  </p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/about-social-club.jpg"
                  alt="RNR Social Lab Venue"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What We Offer
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-3">
                  Premium Viewing Experience
                </h3>
                <p className="text-muted-foreground">
                  Multiple large screens with high-definition displays and
                  quality sound systems ensure you don't miss any of the action.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-3">Community Atmosphere</h3>
                <p className="text-muted-foreground">
                  Watch and celebrate with fellow fans in a vibrant social
                  setting that enhances the viewing experience.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-3">Variety of Events</h3>
                <p className="text-muted-foreground">
                  From F1 Grand Prix to football matches, basketball games to
                  special screenings - we host a diverse range of events.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 rounded-lg overflow-hidden">
                <img
                  src="/images/byob-concept.jpg"
                  alt="BYOB Concept"
                  className="w-full h-auto"
                />
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">
                  The BYOB & BYOF Concept
                </h2>
                <div className="space-y-4 text-foreground/90">
                  <p>
                    Our BYOB (Bring Your Own Beverage) and BYOF (Bring Your Own
                    Food) policy allows you to customize your experience while
                    keeping ticket prices affordable.
                  </p>
                  <p>
                    You're welcome to bring your favorite drinks, snacks, or
                    even a full meal to enjoy during the event. This creates a
                    relaxed, personalized atmosphere where everyone can enjoy
                    their preferences.
                  </p>
                  <p>
                    We provide comfortable seating, tables, and all the
                    excitement - you just bring the refreshments that will make
                    your experience perfect!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Location</h3>
                  <p>123 Event Street, Eldoret, Kenya</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <p>+254 712 345 678</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p>info@rnrsocialclub.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
};

export default AboutPage;
