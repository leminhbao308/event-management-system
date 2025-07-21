import React from 'react';
import { Badge, Card, Typography, Space, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth.js';
import authService from '../services/AuthService.js';

const { Text, Title } = Typography;

const AuthStatus = () => {
  const { user, isAuthenticated, isLoading, isRefreshing } = useAuth();

  const getStatusInfo = () => {
    if (isLoading) return { status: 'processing', text: 'Checking...', icon: <ReloadOutlined spin /> };
    if (isRefreshing) return { status: 'processing', text: 'Refreshing...', icon: <ReloadOutlined spin /> };
    if (isAuthenticated) return { status: 'success', text: 'Authenticated', icon: <CheckCircleOutlined /> };
    return { status: 'error', text: 'Not Authenticated', icon: <CloseCircleOutlined /> };
  };

  const { status, text, icon } = getStatusInfo();

  const handleRefreshToken = async () => {
    try {
      await authService.refreshToken();
    } catch (error) {
      console.error('Manual refresh failed:', error);
    }
  };

  return (
    <Card size="small" style={{ margin: '16px 0' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={5}>Authentication Status</Title>

        <Space>
          <Badge status={status} />
          {icon}
          <Text strong>{text}</Text>
        </Space>

        {isAuthenticated && user && (
          <div>
            <Text>User: {user.username}</Text><br />
            <Text>Email: {user.email}</Text><br />
            <Text>Roles: {user.roles?.join(', ')}</Text>
          </div>
        )}

        {isAuthenticated && (
          <Button size="small" onClick={handleRefreshToken} disabled={isRefreshing}>
            Test Token Refresh
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default AuthStatus;
