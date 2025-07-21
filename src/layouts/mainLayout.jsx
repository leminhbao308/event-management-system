import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  UserOutlined,
  TagsOutlined,
  DashboardOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import useThemeContext from '../hooks/useThemeContext';
import { useAuth } from '../hooks/useAuth';
import Logo from '../components/Logo';
import SettingPopup from '../components/SettingPopup';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const { isDarkMode, setTheme, currentColors } = useThemeContext();
  const { hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get current menu key based on pathname
  const getCurrentMenuKey = () => {
    const pathname = location.pathname;
    if (pathname === '/dashboard') return '1';
    if (pathname === '/events') return '2';
    if (pathname === '/tickets') return '3';
    if (pathname === '/profile') return '4';
    if (pathname === '/admin/users') return '5';
    return '1'; // default to dashboard
  };

  // Handle menu click
  const handleMenuClick = ({ key }) => {
    switch (key) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/events');
        break;
      case '3':
        navigate('/tickets');
        break;
      case '4':
        navigate('/profile');
        break;
      case '5':
        navigate('/admin/users');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Build menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      {
        key: '1',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      {
        key: '2',
        icon: <CalendarOutlined />,
        label: 'Events',
      },
      {
        key: '3',
        icon: <TagsOutlined />,
        label: 'Tickets',
      },
      {
        key: '4',
        icon: <UserOutlined />,
        label: 'Profile',
      },
    ];

    // Add admin items if user is admin
    if (hasRole('ADMIN')) {
      baseItems.push({
        key: '5',
        icon: <UsergroupAddOutlined />,
        label: 'User Management',
      });
    }

    return baseItems;
  };

  // Handle theme change
  const handleThemeChange = (checked) => {
    setTheme(checked);
  };

  // Handle settings modal
  const showSettingsModal = () => {
    setSettingsModalVisible(true);
  };

  const hideSettingsModal = () => {
    setSettingsModalVisible(false);
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          overflow: 'auto'
        }}
      >
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          <Logo collapsed={collapsed} currentColors={currentColors} />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getCurrentMenuKey()]}
            onClick={handleMenuClick}
            style={{ flex: 1, borderRight: 0 }}
            items={getMenuItems()}
          />

          {/* Settings Button at bottom of sidebar */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: collapsed ? 8 : 16,
            right: collapsed ? 8 : 16
          }}>
            {collapsed ? (
              <Button
                type="text"
                icon={<SettingOutlined />}
                onClick={showSettingsModal}
                style={{
                  width: '100%',
                  height: 40,
                  color: currentColors.text.inverse,
                  border: `1px solid ${currentColors.primary[600]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              />
            ) : (
              <SettingPopup
                isDarkMode={isDarkMode}
                onThemeChange={handleThemeChange}
                showModal={showSettingsModal}
                isModalVisible={false}
                onModalClose={hideSettingsModal}
                showTriggerButton={true}
              />
            )}
          </div>

          {/* Settings Modal - Always present for collapsed sidebar */}
          <SettingPopup
            isDarkMode={isDarkMode}
            onThemeChange={handleThemeChange}
            showModal={showSettingsModal}
            isModalVisible={settingsModalVisible}
            onModalClose={hideSettingsModal}
            showTriggerButton={false}
          />
        </div>
      </Sider>

      <Layout style={{
        marginLeft: collapsed ? 80 : 200,
        transition: 'margin-left 0.2s',
        width: `calc(100vw - ${collapsed ? 80 : 200}px)`,
        maxWidth: `calc(100vw - ${collapsed ? 80 : 200}px)`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <Header style={{
          padding: 0,
          background: currentColors.background.primary,
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 99,
          width: `calc(100vw - ${collapsed ? 80 : 200}px)`,
          transition: 'width 0.2s'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: currentColors.text.primary,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '88px 16px 24px 16px', // Top margin accounts for fixed header height (64px + 24px)
            padding: 24,
            minHeight: 'calc(100vh - 136px)', // Account for header and margins
            background: currentColors.background.primary,
            borderRadius: borderRadiusLG,
            width: 'calc(100% - 32px)', // Account for margin
            maxWidth: 'calc(100% - 32px)',
            overflow: 'auto',
            boxSizing: 'border-box'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout