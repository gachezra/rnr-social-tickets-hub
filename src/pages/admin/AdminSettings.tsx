import React from 'react';
import { toast } from 'sonner';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AdminSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'sleek-night' | 'bold-energy') => {
    setTheme(newTheme);
    toast.success(`Theme updated to ${newTheme === 'sleek-night' ? 'Sleek Night' : 'Bold Energy'}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Website Settings</h1>
      
      <div className="space-y-8">
        {/* Theme Settings */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="border-b border-border p-4">
            <h2 className="font-bold">Theme Settings</h2>
          </div>
          
          <div className="p-6">
            <p className="text-muted-foreground mb-6">
              Choose a theme for the website. This will affect how the website appears to all users.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  theme === 'sleek-night' 
                    ? 'border-primary ring-2 ring-primary/30' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleThemeChange('sleek-night')}
              >
                <div className="bg-[#1A1F2C] h-36 flex items-center justify-center">
                  <div className="text-white font-bold flex flex-col items-center">
                    <Moon size={32} className="mb-2" />
                    <span>Sleek Night</span>
                  </div>
                </div>
                <div className="p-4 bg-secondary">
                  <p className="text-sm">
                    A dark, sophisticated theme with red accents. Modern and sleek.
                  </p>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  theme === 'bold-energy' 
                    ? 'border-primary ring-2 ring-primary/30' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleThemeChange('bold-energy')}
              >
                <div className="bg-white h-36 flex items-center justify-center">
                  <div className="text-[#1A1F2C] font-bold flex flex-col items-center">
                    <Sun size={32} className="mb-2 text-[#ea384c]" />
                    <span>Bold Energy</span>
                  </div>
                </div>
                <div className="p-4 bg-secondary">
                  <p className="text-sm">
                    A light, energetic theme with prominent red accents. Dynamic and vibrant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other settings sections could be added here */}
        <div className="bg-card border border-border rounded-lg overflow-hidden opacity-60">
          <div className="border-b border-border p-4">
            <h2 className="font-bold">Additional Settings</h2>
          </div>
          
          <div className="p-6">
            <p className="text-muted-foreground text-center">
              More settings will be available in future updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
