import React from 'react';
import PropTypes from 'prop-types';
import { CalendarOutlined } from '@ant-design/icons';

const Logo = ({ collapsed, currentColors }) => {
  return (
    <div style={{
      height: 32,
      margin: 16,
      background: currentColors.primary[500],
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: collapsed ? '18px' : '20px',
      transition: 'all 0.2s ease-in-out',
    }}>
      <CalendarOutlined style={{
        fontSize: collapsed ? '18px' : '20px',
        transition: 'font-size 0.2s ease-in-out'
      }} />
      {!collapsed && (
        <span style={{
          marginLeft: '8px',
          fontSize: '14px',
          opacity: 1,
          transition: 'opacity 0.2s ease-in-out',
        }}>
          EMS
        </span>
      )}
    </div>
  );
};

Logo.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  currentColors: PropTypes.object.isRequired,
};

export default Logo;
