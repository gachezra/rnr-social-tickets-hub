
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Public pages
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import TicketStatusPage from "./pages/TicketStatusPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminCheckIn from "./pages/admin/AdminCheckIn";
import AdminSettings from "./pages/admin/AdminSettings";

import NotFound from "./pages/NotFound";

const App = () => {
  // Create a new QueryClient for each component instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HelmetProvider>
          <Helmet>
            <title>RNR Social Club - Sports Watch Parties in Eldoret</title>
            <meta name="description" content="Join RNR Social Club for exciting sports watch parties in Eldoret. Bring your own food and drinks, we'll provide the venue and atmosphere!" />
            <meta name="keywords" content="RNR Social Club, watch parties, sports events, Eldoret, F1, football, NBA, BYOB, BYOF" />
            <meta property="og:title" content="RNR Social Club - Sports Watch Parties" />
            <meta property="og:description" content="Join us for exciting sports watch parties in Eldoret. BYOB & BYOF policy applies." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://rnr-social.com" />
            <meta property="og:image" content="/images/f1-event.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="canonical" href="https://rnr-social.com" />
          </Helmet>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/ticket-status" element={<TicketStatusPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                
                {/* Redirect for old URL format to ensure backward compatibility */}
                <Route path="/ticket-status/:ticketId" element={
                  <Navigate to={params => `/ticket-status?ticketId=${params.ticketId}`} replace />
                } />
                
                {/* Admin Routes */}
                <Route path="/admin-panel" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="tickets" element={<AdminTickets />} />
                  <Route path="check-in" element={<AdminCheckIn />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
