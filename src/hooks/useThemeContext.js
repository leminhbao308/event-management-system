import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Hook to access theme context
 * Must be used within a ThemeProvider
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default useThemeContext;
