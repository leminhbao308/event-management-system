import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const Login = () => {
  const [form] = Form.useForm();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // Clear any previous errors when component mounts
    clearError();
  }, [clearError]);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await login(values);
      // Navigation will happen automatically due to auth state change
    } catch (err) {
      // Error is handled by auth context
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleErrorDismiss = () => {
    clearError();
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <Card
        title="Sign In"
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        {error && (
          <Alert
            message="Login Failed"
            description={error}
            type="error"
            showIcon
            closable
            onClose={handleErrorDismiss}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please enter your username' },
              { min: 3, message: 'Username must be at least 3 characters' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
              size="large"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span>Don't have an account? </span>
            <Link to="/register">Sign up here</Link>
          </div>
        </Form>

        {(isLoading && !isSubmitting) && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Spin size="small" />
            <span style={{ marginLeft: 8 }}>Checking authentication...</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
