import { useState, useEffect } from 'react';

/**
 * Custom hook for managing theme state
 * Handles localStorage persistence and system preference detection
 */
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('event-management-theme');
      if (savedTheme !== null) {
        return JSON.parse(savedTheme);
      }
      // If no saved preference, check system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.warn('Failed to load theme preference from localStorage:', error);
      return false;
    }
  });

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('event-management-theme', JSON.stringify(isDarkMode));
    } catch (error) {
      console.warn('Failed to save theme preference to localStorage:', error);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const setTheme = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  return {
    isDarkMode,
    toggleTheme,
    setTheme,
  };
};

export default useTheme;
