
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-lg p-12 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. 
              The URL <span className="font-mono bg-secondary/50 px-2 py-0.5 rounded">{location.pathname}</span> could not be found.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You might want to check if the URL is correct or go back to the homepage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link 
                  to="/" 
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Go to Homepage
                </Link>
                <Link 
                  to="/events" 
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors"
                >
                  Browse Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default NotFound;
