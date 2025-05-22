import React from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const PrivacyPage: React.FC = () => {
  return (
    <>
      <SiteHeader />

      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
                  <p>
                    RNR Social Lab ("we", "our", or "us") is committed to
                    protecting your privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you visit our website or use our services. Please read this
                    privacy policy carefully. If you do not agree with the terms
                    of this privacy policy, please do not access the site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    2. Information We Collect
                  </h2>
                  <p className="mb-2">
                    We collect information that you provide directly to us,
                    including:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Personal Information: such as your name, email address,
                      and phone number when you register or purchase tickets.
                    </li>
                    <li>
                      Transaction Information: details about tickets purchases,
                      payment methods, and billing information.
                    </li>
                    <li>
                      Communication Information: when you contact us, we may
                      collect information about your communication and any
                      information you provide.
                    </li>
                    <li>
                      Usage Information: we may collect information about how
                      you use our website, including your IP address, browser
                      type, referring/exit pages, and operating system.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    3. How We Use Your Information
                  </h2>
                  <p className="mb-2">
                    We may use the information we collect from you for various
                    purposes, including to:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Process ticket reservations and payments.</li>
                    <li>
                      Communicate with you about events, confirmations, updates,
                      security alerts, and support messages.
                    </li>
                    <li>
                      Provide customer support and respond to your inquiries.
                    </li>
                    <li>
                      Analyze how our website is used to improve its
                      functionality and user experience.
                    </li>
                    <li>
                      Send promotional communications about new events, special
                      offers, or other information that may be of interest to
                      you.
                    </li>
                    <li>Enforce our terms, conditions, and policies.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    4. Disclosure of Your Information
                  </h2>
                  <p className="mb-2">
                    We may share your information in the following situations:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      With Service Providers: We may share your information with
                      third-party vendors, service providers, contractors or
                      agents who perform services for us.
                    </li>
                    <li>
                      For Business Transfers: We may share or transfer your
                      information in connection with, or during negotiations of,
                      any merger, sale of company assets, financing, or
                      acquisition of all or a portion of our business.
                    </li>
                    <li>
                      With Your Consent: We may disclose your personal
                      information for any other purpose with your consent.
                    </li>
                    <li>
                      Legal Requirements: We may disclose your information where
                      required to do so by law or in response to valid requests
                      by public authorities.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    5. Security of Your Information
                  </h2>
                  <p>
                    We use administrative, technical, and physical security
                    measures to help protect your personal information. While we
                    have taken reasonable steps to secure the personal
                    information you provide to us, please be aware that no
                    security measures are perfect or impenetrable, and no method
                    of data transmission can be guaranteed against any
                    interception or other type of misuse.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    6. Your Privacy Choices
                  </h2>
                  <p className="mb-2">
                    You have certain choices regarding your personal
                    information:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Opt-Out of Marketing Communications: You can opt-out of
                      receiving our marketing communications by following the
                      unsubscribe instructions included in such communications.
                    </li>
                    <li>
                      Access, Update, or Delete: You may request to review,
                      correct, update, or delete your personal information by
                      contacting us directly.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">
                    7. Changes to This Privacy Policy
                  </h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last Updated" date. You are
                    advised to review this Privacy Policy periodically for any
                    changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-3">8. Contact Us</h2>
                  <p>
                    If you have questions or comments about this Privacy Policy,
                    please contact us at:
                  </p>
                  <p className="mt-2">
                    Email: privacy@rnrsociallab.com
                    <br />
                    Phone: +254 704 433 367
                    <br />
                    Address: RnR Social Lab, Eldoret, Kenya
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

export default PrivacyPage;
