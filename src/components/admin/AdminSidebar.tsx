
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Ticket, 
  UserCheck, 
  Settings, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'sleek-night' ? 'bold-energy' : 'sleek-night');
  };

  return (
    <div className="h-screen bg-card border-r border-border flex flex-col w-64 fixed left-0 top-0">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-primary font-heading text-2xl font-bold">RNR</span>
          <span className="font-heading text-lg font-medium">Admin</span>
        </div>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavLink 
          to="/admin-panel" 
          end
          className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-secondary'
            }`
          }
        >
          <Home size={20} className="mr-3" />
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/admin-panel/events" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-secondary'
            }`
          }
        >
          <Calendar size={20} className="mr-3" />
          Events
        </NavLink>
        
        <NavLink 
          to="/admin-panel/tickets" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-secondary'
            }`
          }
        >
          <Ticket size={20} className="mr-3" />
          Tickets
        </NavLink>
        
        <NavLink 
          to="/admin-panel/check-in" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-secondary'
            }`
          }
        >
          <UserCheck size={20} className="mr-3" />
          Check-In
        </NavLink>
        
        <NavLink 
          to="/admin-panel/settings" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-secondary'
            }`
          }
        >
          <Settings size={20} className="mr-3" />
          Settings
        </NavLink>
        
        <a 
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-md transition-colors text-foreground hover:bg-secondary"
        >
          <Home size={20} className="mr-3" />
          View Website
        </a>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Current Theme:</span>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label={theme === 'sleek-night' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'sleek-night' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-purple-400" />
            )}
          </button>
        </div>
        
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
