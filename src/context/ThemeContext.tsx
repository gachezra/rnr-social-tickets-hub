
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'sleek-night' | 'bold-energy';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('sleek-night');

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('rnr-theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply the theme class to the document element
    document.documentElement.classList.remove('theme-sleek-night', 'theme-bold-energy');
    document.documentElement.classList.add(`theme-${theme}`);
    // Save the theme preference to localStorage
    localStorage.setItem('rnr-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
