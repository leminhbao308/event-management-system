import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  UserOutlined,
  TagsOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import useThemeContext from '../hooks/useThemeContext';
import Logo from '../components/Logo';
import SettingPopup from '../components/SettingPopup';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const { isDarkMode, setTheme, currentColors } = useThemeContext();

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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed} currentColors={currentColors} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
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
              label: 'Users',
            },
          ]}
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
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: currentColors.background.primary }}>
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
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: currentColors.background.primary,
            borderRadius: borderRadiusLG,
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