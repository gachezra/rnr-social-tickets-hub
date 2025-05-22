import React from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const TermsPage: React.FC = () => {
  return (
    <>
      <SiteHeader />

      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-3">1. General Terms</h2>
                  <p className="mb-2">
                    Welcome to RNR Social Lab. By accessing our website and
                    using our services, you agree to be bound by these Terms and
                    Conditions, our Privacy Policy, and any other terms
                    referenced herein.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who
                    access or use RNR Social Lab services. By accessing or using
                    the service, you agree to be bound by these terms. If you
                    disagree with any part of the terms, you may not access the
                    service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    2. Event Tickets and Reservations
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      All event tickets purchased through our website are
                      subject to availability.
                    </li>
                    <li>
                      Ticket reservations are not confirmed until payment has
                      been received and verified.
                    </li>
                    <li>
                      Each ticket is valid only for the specific event, date,
                      and time indicated on the ticket.
                    </li>
                    <li>
                      RNR Social Lab reserves the right to refuse entry if valid
                      ticket proof cannot be presented.
                    </li>
                    <li>Tickets are non-transferable and cannot be resold.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    3. BYOB & BYOF Policy
                  </h2>
                  <p className="mb-2">
                    RNR Social Lab operates on a Bring Your Own Beverage (BYOB)
                    and Bring Your Own Food (BYOF) policy. By attending our
                    events, you agree to the following:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      You are responsible for bringing your own food and
                      beverages if desired.
                    </li>
                    <li>
                      RNR Social Lab does not sell or provide food or beverages
                      at events.
                    </li>
                    <li>
                      You must be of legal drinking age to consume alcoholic
                      beverages.
                    </li>
                    <li>
                      Responsible consumption is required; intoxicated
                      individuals may be asked to leave.
                    </li>
                    <li>You are responsible for cleaning up after yourself.</li>
                    <li>
                      Glass containers may be restricted at certain events for
                      safety reasons.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    4. Refund and Cancellation Policy
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Full refunds are available if requested at least 48 hours
                      before the event.
                    </li>
                    <li>
                      No refunds will be issued for cancellations less than 48
                      hours before the event.
                    </li>
                    <li>
                      If RNR Social Lab cancels an event, ticket holders will be
                      offered a full refund or the option to transfer their
                      ticket to a future event.
                    </li>
                    <li>
                      RNR Social Lab is not responsible for refunding travel,
                      accommodation, or any other expenses in case of event
                      cancellation.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    5. Conduct at Events
                  </h2>
                  <p className="mb-2">
                    RNR Social Lab aims to provide a safe and enjoyable
                    environment for all attendees. By attending our events, you
                    agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Behave in a respectful manner toward staff and other
                      attendees.
                    </li>
                    <li>Refrain from engaging in any illegal activities.</li>
                    <li>Comply with venue rules and regulations.</li>
                    <li>
                      Follow the instructions of RNR Social Lab staff and
                      security personnel.
                    </li>
                    <li>
                      Not engage in behavior that disrupts the event or other
                      attendees' enjoyment.
                    </li>
                  </ul>
                  <p className="mt-2">
                    RNR Social Lab reserves the right to remove any individual
                    from an event without refund if they violate these conduct
                    guidelines.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">6. Liability</h2>
                  <p className="mb-2">RNR Social Lab is not liable for:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Personal injury or property damage occurring during
                      events.
                    </li>
                    <li>Lost, stolen, or damaged personal belongings.</li>
                    <li>
                      Any issues arising from the consumption of food or
                      beverages brought by attendees.
                    </li>
                    <li>
                      Changes to event programming, timing, or featured content.
                    </li>
                  </ul>
                  <p className="mt-2">
                    By attending our events, you acknowledge these limitations
                    of liability.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    7. Photography and Recording
                  </h2>
                  <p>
                    RNR Social Lab may photograph or record events for
                    promotional purposes. By attending our events, you consent
                    to being photographed or recorded, and to the use of such
                    materials in our marketing efforts without compensation.
                    Personal photography and recording are permitted for
                    non-commercial use only.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    8. Modifications to Terms
                  </h2>
                  <p>
                    RNR Social Lab reserves the right to modify these Terms and
                    Conditions at any time. Changes will be effective
                    immediately upon posting to our website. Your continued use
                    of our services after any changes indicates your acceptance
                    of the modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    9. Contact Information
                  </h2>
                  <p>
                    If you have any questions about these Terms and Conditions,
                    please contact us at info@rnrsocialclub.com or call +254 712
                    345 678.
                  </p>
                </section>

                <p className="text-muted-foreground text-sm border-t border-border pt-4 mt-8">
                  Last updated: August 1, 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export default TermsPage;
