import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Switch, Space, Typography, Button } from 'antd';
import { MoonOutlined, SunOutlined, SettingOutlined } from '@ant-design/icons';
import colorConstants from '../constants/colorConstant';

const { Text } = Typography;

const SettingPopup = ({ isDarkMode, onThemeChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentColors = isDarkMode ? colorConstants.dark : colorConstants.light;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleThemeChange = (checked) => {
    onThemeChange(checked);
  };

  const modalStyles = {
    content: {
      background: currentColors.background.card,
      color: currentColors.text.primary,
    },
    header: {
      background: currentColors.background.card,
      borderBottom: `1px solid ${currentColors.border.medium}`,
      color: currentColors.text.primary,
    },
    body: {
      background: currentColors.background.primary,
    }
  };

  return (
    <>
      {/* Settings Button Trigger */}
      <Button
        type="text"
        icon={<SettingOutlined />}
        onClick={showModal}
        style={{
          width: '100%',
          height: 40,
          color: currentColors.text.inverse,
          border: `1px solid ${currentColors.primary[600]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 16px',
        }}
      >
        Settings
      </Button>

      {/* Settings Modal */}
      <Modal
        title={
          <Typography.Title level={3} style={{ color: currentColors.text.primary, margin: 0, paddingBottom: '8px' }}>
            ⚙️ Settings
          </Typography.Title>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
        width="80vw"
        style={{
          top: '5vh',
          maxWidth: 'none',
        }}
        styles={modalStyles}
        bodyStyle={{
          height: '80vh',
          overflow: 'auto',
          background: currentColors.background.primary,
          padding: '20px'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Theme Settings Section */}
          <div>
            <Typography.Title level={4} style={{ color: currentColors.text.primary, marginBottom: '16px' }}>
              Theme Settings
            </Typography.Title>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: currentColors.background.secondary,
              borderRadius: '8px',
              border: `1px solid ${currentColors.border.light}`
            }}>
              <Space>
                {isDarkMode ? <MoonOutlined style={{ color: currentColors.text.primary }} /> : <SunOutlined style={{ color: currentColors.text.primary }} />}
                <div>
                  <Text strong style={{ color: currentColors.text.primary, display: 'block' }}>
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                  </Text>
                  <Text style={{ color: currentColors.text.secondary, fontSize: '12px' }}>
                    Switch between light and dark themes
                  </Text>
                  <Text style={{ color: currentColors.text.tertiary, fontSize: '10px', display: 'block', marginTop: '2px' }}>
                    Preference saved automatically • Follows system theme by default
                  </Text>
                </div>
              </Space>
              <Switch
                checked={isDarkMode}
                onChange={handleThemeChange}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                size="default"
              />
            </div>
          </div>

          {/* Display Settings Section */}
          <div>
            <Typography.Title level={4} style={{ color: currentColors.text.primary, marginBottom: '16px' }}>
              Display Settings
            </Typography.Title>
            <div style={{
              padding: '16px',
              background: currentColors.background.secondary,
              borderRadius: '8px',
              border: `1px solid ${currentColors.border.light}`
            }}>
              <Text style={{ color: currentColors.text.secondary }}>
                Additional display preferences and configurations can be added here.
              </Text>
            </div>
          </div>

          {/* Notification Settings Section */}
          <div>
            <Typography.Title level={4} style={{ color: currentColors.text.primary, marginBottom: '16px' }}>
              Notification Settings
            </Typography.Title>
            <div style={{
              padding: '16px',
              background: currentColors.background.secondary,
              borderRadius: '8px',
              border: `1px solid ${currentColors.border.light}`
            }}>
              <Text style={{ color: currentColors.text.secondary }}>
                Configure notification preferences for events, tickets, and system updates.
              </Text>
            </div>
          </div>

          {/* System Information Section */}
          <div>
            <Typography.Title level={4} style={{ color: currentColors.text.primary, marginBottom: '16px' }}>
              System Information
            </Typography.Title>
            <div style={{
              padding: '16px',
              background: currentColors.background.secondary,
              borderRadius: '8px',
              border: `1px solid ${currentColors.border.light}`
            }}>
              <Space direction="vertical" size="small">
                <Text style={{ color: currentColors.text.secondary, fontSize: '12px' }}>
                  <strong>Version:</strong> 1.0.0
                </Text>
                <Text style={{ color: currentColors.text.secondary, fontSize: '12px' }}>
                  <strong>Build:</strong> Development
                </Text>
                <Text style={{ color: currentColors.text.secondary, fontSize: '12px' }}>
                  <strong>Theme:</strong> {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </Space>
            </div>
          </div>
        </Space>
      </Modal>
    </>
  );
};

SettingPopup.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default SettingPopup;
