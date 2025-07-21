// colorConstants.js - Event Management and Ticketing System Color Template
// Main theme: Orange and Hot colors with Light/Dark mode support

const colorConstants = {
  // ==========================================
  // LIGHT MODE COLORS
  // ==========================================
  light: {
    // Primary Brand Colors (Orange/Hot Theme)
    primary: {
      50: '#fff7ed',   // Very light orange
      100: '#ffedd5',  // Light orange
      200: '#fed7aa',  // Lighter orange
      300: '#fdba74',  // Light orange
      400: '#fb923c',  // Medium orange
      500: '#f97316',  // Main brand orange
      600: '#ea580c',  // Dark orange
      700: '#c2410c',  // Darker orange
      800: '#9a3412',  // Very dark orange
      900: '#7c2d12',  // Deepest orange
    },

    // Secondary Hot Colors (Red-Orange)
    secondary: {
      50: '#fef2f2',   // Very light red
      100: '#fee2e2',  // Light red
      200: '#fecaca',  // Lighter red
      300: '#fca5a5',  // Light red
      400: '#f87171',  // Medium red
      500: '#ef4444',  // Main red
      600: '#dc2626',  // Dark red
      700: '#b91c1c',  // Darker red
      800: '#991b1b',  // Very dark red
      900: '#7f1d1d',  // Deepest red
    },

    // Accent Colors (Yellow-Orange for highlights)
    accent: {
      50: '#fffbeb',   // Very light yellow
      100: '#fef3c7',  // Light yellow
      200: '#fde68a',  // Lighter yellow
      300: '#fcd34d',  // Light yellow
      400: '#fbbf24',  // Medium yellow
      500: '#f59e0b',  // Main yellow
      600: '#d97706',  // Dark yellow
      700: '#b45309',  // Darker yellow
      800: '#92400e',  // Very dark yellow
      900: '#78350f',  // Deepest yellow
    },

    // Event Module Colors
    event: {
      creation: '#f97316',    // Primary orange
      details: '#fb923c',     // Medium orange
      scheduling: '#fdba74',  // Light orange
      venue: '#fed7aa',       // Lighter orange
    },

    // Ticket Sales Colors
    ticketSales: {
      main: '#10b981',        // Green for sales/money
      types: '#059669',       // Dark green
      pricing: '#047857',     // Darker green
      inventory: '#065f46',   // Darkest green
    },

    // Payment Processing Colors
    payment: {
      main: '#8b5cf6',        // Purple for payments
      gateway: '#7c3aed',     // Dark purple
      security: '#6d28d9',    // Darker purple
      refund: '#5b21b6',      // Darkest purple
    },

    // User Management Colors
    user: {
      main: '#3b82f6',        // Blue for users
      registration: '#2563eb', // Dark blue
      authentication: '#1d4ed8', // Darker blue
      profiles: '#1e40af',    // Darkest blue
    },

    // Background Colors
    background: {
      primary: '#ffffff',     // Main background
      secondary: '#f9fafb',   // Secondary background
      tertiary: '#f3f4f6',    // Tertiary background
      card: '#ffffff',        // Card background
      modal: '#ffffff',       // Modal background
    },

    // Surface Colors
    surface: {
      elevated: '#ffffff',    // Elevated surfaces
      base: '#f9fafb',       // Base surface
      sunken: '#f3f4f6',     // Sunken surfaces
    },

    // Text Colors
    text: {
      primary: '#111827',     // Main text
      secondary: '#6b7280',   // Secondary text
      tertiary: '#9ca3af',    // Tertiary text
      disabled: '#d1d5db',    // Disabled text
      inverse: '#ffffff',     // Text on dark backgrounds
      link: '#f97316',        // Link color (brand orange)
      linkHover: '#ea580c',   // Link hover color
    },

    // Border Colors
    border: {
      light: '#f3f4f6',       // Light borders
      medium: '#e5e7eb',      // Medium borders
      dark: '#d1d5db',        // Dark borders
      focus: '#f97316',       // Focus borders (brand orange)
      error: '#ef4444',       // Error borders
      success: '#10b981',     // Success borders
      warning: '#f59e0b',     // Warning borders
    },

    // Status Colors
    status: {
      success: {
        bg: '#d1fae5',        // Success background
        text: '#065f46',      // Success text
        border: '#10b981',    // Success border
      },
      warning: {
        bg: '#fef3c7',        // Warning background
        text: '#92400e',      // Warning text
        border: '#f59e0b',    // Warning border
      },
      error: {
        bg: '#fee2e2',        // Error background
        text: '#991b1b',      // Error text
        border: '#ef4444',    // Error border
      },
      info: {
        bg: '#dbeafe',        // Info background
        text: '#1e40af',      // Info text
        border: '#3b82f6',    // Info border
      },
    },

    // Interactive States
    interactive: {
      hover: 'rgba(249, 115, 22, 0.05)',  // Hover overlay
      pressed: 'rgba(249, 115, 22, 0.1)', // Pressed overlay
      focus: 'rgba(249, 115, 22, 0.2)',   // Focus overlay
      disabled: 'rgba(156, 163, 175, 0.5)', // Disabled overlay
    },
  },

  // ==========================================
  // DARK MODE COLORS
  // ==========================================
  dark: {
    // Primary Brand Colors (Orange/Hot Theme - adjusted for dark mode)
    primary: {
      50: '#7c2d12',   // Deepest orange (inverted)
      100: '#9a3412',  // Very dark orange
      200: '#c2410c',  // Darker orange
      300: '#ea580c',  // Dark orange
      400: '#f97316',  // Main brand orange
      500: '#fb923c',  // Medium orange
      600: '#fdba74',  // Light orange
      700: '#fed7aa',  // Lighter orange
      800: '#ffedd5',  // Light orange
      900: '#fff7ed',  // Very light orange (inverted)
    },

    // Secondary Hot Colors (Red-Orange)
    secondary: {
      50: '#7f1d1d',   // Deepest red (inverted)
      100: '#991b1b',  // Very dark red
      200: '#b91c1c',  // Darker red
      300: '#dc2626',  // Dark red
      400: '#ef4444',  // Main red
      500: '#f87171',  // Medium red
      600: '#fca5a5',  // Light red
      700: '#fecaca',  // Lighter red
      800: '#fee2e2',  // Light red
      900: '#fef2f2',  // Very light red (inverted)
    },

    // Accent Colors (Yellow-Orange for highlights)
    accent: {
      50: '#78350f',   // Deepest yellow (inverted)
      100: '#92400e',  // Very dark yellow
      200: '#b45309',  // Darker yellow
      300: '#d97706',  // Dark yellow
      400: '#f59e0b',  // Main yellow
      500: '#fbbf24',  // Medium yellow
      600: '#fcd34d',  // Light yellow
      700: '#fde68a',  // Lighter yellow
      800: '#fef3c7',  // Light yellow
      900: '#fffbeb',  // Very light yellow (inverted)
    },

    // Event Module Colors (darker versions)
    event: {
      creation: '#ea580c',    // Dark orange
      details: '#f97316',     // Primary orange
      scheduling: '#fb923c',  // Medium orange
      venue: '#fdba74',       // Light orange
    },

    // Ticket Sales Colors (adjusted for dark mode)
    ticketSales: {
      main: '#059669',        // Dark green
      types: '#047857',       // Darker green
      pricing: '#065f46',     // Darkest green
      inventory: '#064e3b',   // Very dark green
    },

    // Payment Processing Colors (adjusted for dark mode)
    payment: {
      main: '#7c3aed',        // Dark purple
      gateway: '#6d28d9',     // Darker purple
      security: '#5b21b6',    // Darkest purple
      refund: '#4c1d95',      // Very dark purple
    },

    // User Management Colors (adjusted for dark mode)
    user: {
      main: '#2563eb',        // Dark blue
      registration: '#1d4ed8', // Darker blue
      authentication: '#1e40af', // Darkest blue
      profiles: '#1e3a8a',    // Very dark blue
    },

    // Background Colors (dark theme)
    background: {
      primary: '#0f172a',     // Main dark background
      secondary: '#1e293b',   // Secondary dark background
      tertiary: '#334155',    // Tertiary dark background
      card: '#1e293b',        // Card background
      modal: '#0f172a',       // Modal background
    },

    // Surface Colors (dark theme)
    surface: {
      elevated: '#334155',    // Elevated surfaces
      base: '#1e293b',       // Base surface
      sunken: '#0f172a',     // Sunken surfaces
    },

    // Text Colors (dark theme)
    text: {
      primary: '#f8fafc',     // Main text (light)
      secondary: '#cbd5e1',   // Secondary text
      tertiary: '#94a3b8',    // Tertiary text
      disabled: '#64748b',    // Disabled text
      inverse: '#0f172a',     // Text on light backgrounds
      link: '#fb923c',        // Link color (lighter orange)
      linkHover: '#f97316',   // Link hover color
    },

    // Border Colors (dark theme)
    border: {
      light: '#334155',       // Light borders
      medium: '#475569',      // Medium borders
      dark: '#64748b',        // Dark borders
      focus: '#fb923c',       // Focus borders (lighter orange)
      error: '#f87171',       // Error borders
      success: '#34d399',     // Success borders
      warning: '#fbbf24',     // Warning borders
    },

    // Status Colors (dark theme)
    status: {
      success: {
        bg: '#064e3b',        // Success background (dark)
        text: '#6ee7b7',      // Success text (light)
        border: '#059669',    // Success border
      },
      warning: {
        bg: '#78350f',        // Warning background (dark)
        text: '#fcd34d',      // Warning text (light)
        border: '#d97706',    // Warning border
      },
      error: {
        bg: '#7f1d1d',        // Error background (dark)
        text: '#fca5a5',      // Error text (light)
        border: '#dc2626',    // Error border
      },
      info: {
        bg: '#1e3a8a',        // Info background (dark)
        text: '#93c5fd',      // Info text (light)
        border: '#2563eb',    // Info border
      },
    },

    // Interactive States (dark theme)
    interactive: {
      hover: 'rgba(251, 146, 60, 0.1)',   // Hover overlay
      pressed: 'rgba(251, 146, 60, 0.2)', // Pressed overlay
      focus: 'rgba(251, 146, 60, 0.3)',   // Focus overlay
      disabled: 'rgba(100, 116, 139, 0.5)', // Disabled overlay
    },
  },

  // ==========================================
  // COMMON GRADIENTS
  // ==========================================
  gradients: {
    light: {
      primary: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      secondary: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      accent: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      hero: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #f59e0b 100%)',
      card: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
    },
    dark: {
      primary: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
      secondary: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      accent: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      hero: 'linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #d97706 100%)',
      card: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
    },
  },

  // ==========================================
  // SHADOWS
  // ==========================================
  shadows: {
    light: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      colored: '0 8px 32px rgba(249, 115, 22, 0.15)',
    },
    dark: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      colored: '0 8px 32px rgba(234, 88, 12, 0.25)',
    },
  },

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  utils: {
    // Get colors based on current theme
    getColors: (isDark = false) => {
      return isDark ? colorConstants.dark : colorConstants.light;
    },

    // Get gradient based on current theme
    getGradients: (isDark = false) => {
      return isDark ? colorConstants.gradients.dark : colorConstants.gradients.light;
    },

    // Get shadows based on current theme
    getShadows: (isDark = false) => {
      return isDark ? colorConstants.shadows.dark : colorConstants.shadows.light;
    },

    // Convert hex to rgba
    hexToRgba: (hex, alpha = 1) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },

    // Lighten color
    lighten: (color, amount = 0.1) => {
      // Simple implementation - you might want to use a more sophisticated color manipulation library
      return color + Math.round(amount * 255).toString(16).padStart(2, '0');
    },

    // Darken color
    darken: (color, amount = 0.1) => {
      // Simple implementation - you might want to use a more sophisticated color manipulation library
      return color.replace(/[0-9a-f]/g, (char) => {
        const num = parseInt(char, 16);
        const darkened = Math.max(0, num - Math.round(amount * 15));
        return darkened.toString(16);
      });
    },
  },

  // ==========================================
  // MODULE-SPECIFIC COLORS
  // ==========================================
  modules: {
    eventCreation: {
      light: {
        primary: '#f97316',
        secondary: '#fb923c',
        background: '#fff7ed',
        card: '#ffffff',
      },
      dark: {
        primary: '#ea580c',
        secondary: '#f97316',
        background: '#1e293b',
        card: '#334155',
      },
    },
    ticketSales: {
      light: {
        primary: '#10b981',
        secondary: '#059669',
        background: '#ecfdf5',
        card: '#ffffff',
      },
      dark: {
        primary: '#059669',
        secondary: '#047857',
        background: '#064e3b',
        card: '#065f46',
      },
    },
    payment: {
      light: {
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        background: '#f5f3ff',
        card: '#ffffff',
      },
      dark: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        background: '#2d1b69',
        card: '#4c1d95',
      },
    },
    userManagement: {
      light: {
        primary: '#3b82f6',
        secondary: '#2563eb',
        background: '#eff6ff',
        card: '#ffffff',
      },
      dark: {
        primary: '#2563eb',
        secondary: '#1d4ed8',
        background: '#1e3a8a',
        card: '#1e40af',
      },
    },
  },
};

export default colorConstants;