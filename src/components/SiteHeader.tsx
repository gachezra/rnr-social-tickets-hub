
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SiteHeader: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="text-primary font-heading text-2xl font-bold">RNR</span>
            <span className="font-heading text-xl font-medium">
              Social Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`nav-link ${isActive('/events') || location.pathname.startsWith('/events/') ? 'active' : ''}`}
            >
              Events
            </Link>
            <Link 
              to="/ticket-status" 
              className={`nav-link ${isActive('/ticket-status') ? 'active' : ''}`}
            >
              Ticket Status
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/admin-panel" 
              className="btn-primary"
            >
              Admin Panel
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden flex items-center text-foreground"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 md:hidden">
          <div className="container py-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                <span className="text-primary font-heading text-2xl font-bold">RNR</span>
                <span className="font-heading text-xl font-medium">
                  Social Club
                </span>
              </Link>
              <button 
                onClick={closeMenu}
                className="text-foreground"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-6 text-xl">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/events" 
                className={`nav-link ${isActive('/events') || location.pathname.startsWith('/events/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Events
              </Link>
              <Link 
                to="/ticket-status" 
                className={`nav-link ${isActive('/ticket-status') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Ticket Status
              </Link>
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/admin-panel" 
                className="btn-primary w-full justify-center mt-4"
                onClick={closeMenu}
              >
                Admin Panel
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
