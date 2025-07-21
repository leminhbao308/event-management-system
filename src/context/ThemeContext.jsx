import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import useTheme from '../hooks/useTheme';
import colorConstants from '../constants/colorConstant';

const ThemeContext = createContext();

export { ThemeContext };

export const ThemeProvider = ({ children }) => {
  const { isDarkMode, toggleTheme, setTheme } = useTheme();

  // Get current color palette
  const currentColors = isDarkMode ? colorConstants.dark : colorConstants.light;

  // Ant Design theme configuration
  const antTheme = useMemo(() => ({
    token: {
      colorPrimary: currentColors.primary[500], // Main brand orange
      colorBgContainer: currentColors.background.primary,
      colorBgElevated: currentColors.surface.elevated,
      colorBorder: currentColors.border.medium,
      colorText: currentColors.text.primary,
      colorTextSecondary: currentColors.text.secondary,
      colorTextTertiary: currentColors.text.tertiary,
      borderRadius: 8,
    },
    components: {
      Layout: {
        headerBg: currentColors.background.primary,
        siderBg: currentColors.primary[800], // Dark orange for sidebar
        bodyBg: currentColors.background.secondary,
      },
      Menu: {
        darkItemBg: 'transparent',
        darkItemSelectedBg: currentColors.primary[600],
        darkItemHoverBg: currentColors.primary[700],
        darkItemColor: currentColors.text.inverse,
        darkItemSelectedColor: currentColors.text.inverse,
      },
      Button: {
        colorPrimary: currentColors.primary[500],
        colorPrimaryHover: currentColors.primary[400],
        colorPrimaryActive: currentColors.primary[600],
        colorText: currentColors.text.primary,
      },
      Popover: {
        colorBgElevated: currentColors.background.card,
        colorText: currentColors.text.primary,
      },
      Modal: {
        contentBg: currentColors.background.card,
        headerBg: currentColors.background.card,
        colorText: currentColors.text.primary,
        colorTextHeading: currentColors.text.primary,
      },
      Typography: {
        colorText: currentColors.text.primary,
        colorTextSecondary: currentColors.text.secondary,
        colorTextTertiary: currentColors.text.tertiary,
      },
    },
  }), [currentColors]);

  const value = useMemo(() => ({
    isDarkMode,
    toggleTheme,
    setTheme,
    currentColors,
    antTheme,
  }), [isDarkMode, toggleTheme, setTheme, currentColors, antTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={antTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
