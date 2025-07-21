import React from 'react';
import { Card, Button, Row, Col, Statistic, Avatar, Space, Divider } from 'antd';
import { UserOutlined, LogoutOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth.js';

const Dashboard = () => {
  const { user, logout, hasRole } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Card style={{ marginBottom: '24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="large">
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <h2 style={{ margin: 0 }}>Welcome back, {user?.username}!</h2>
                <p style={{ margin: 0, color: '#666' }}>
                  {user?.email} • Roles: {user?.roles?.join(', ')}
                </p>
              </div>
            </Space>
          </Col>
          <Col>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Statistics */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Events"
              value={12}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="This Month"
              value={8}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Recent Events" style={{ height: '400px' }}>
            <p>Your recent events will be displayed here...</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Quick Actions" style={{ height: '400px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" block icon={<CalendarOutlined />}>
                Create New Event
              </Button>

              {hasRole('ADMIN') && (
                <>
                  <Divider />
                  <h4>Admin Actions</h4>
                  <Button block>Manage Users</Button>
                  <Button block>System Settings</Button>
                  <Button block>View Reports</Button>
                </>
              )}

              {hasRole('ORGANIZER') && (
                <>
                  <Divider />
                  <h4>Organizer Actions</h4>
                  <Button block>Manage My Events</Button>
                  <Button block>Event Analytics</Button>
                </>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
