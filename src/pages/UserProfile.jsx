import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Typography,
  Avatar,
  Divider,
  Row,
  Col,
  DatePicker,
  message,
  Modal,
  Spin
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  LockOutlined,
  DeleteOutlined,
  CameraOutlined
} from '@ant-design/icons';
import UserService from '../services/UserService';
import useThemeContext from '../hooks/useThemeContext';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { currentColors } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false);

  const fetchUserProfile = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await UserService.getCurrentProfile();
      setUserProfile(response.data);

      // Set form values
      form.setFieldsValue({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        bio: response.data.bio,
        dateOfBirth: response.data.dateOfBirth ? dayjs(response.data.dateOfBirth) : null,
      });
    } catch (error) {
      message.error('Failed to load profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phoneNumber,
        bio: values.bio,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
      };

      const response = await UserService.updateProfile(updateData);
      setUserProfile(response.data);
      setEditing(false);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      setLoading(true);
      await UserService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      setPasswordModalVisible(false);
      passwordForm.resetFields();
      message.success('Password changed successfully');
    } catch (error) {
      message.error('Failed to change password: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      setLoading(true);
      await UserService.deactivateAccount();
      setDeactivateModalVisible(false);
      message.success('Account deactivated successfully');
      // You might want to redirect to login or handle logout here
    } catch (error) {
      message.error('Failed to deactivate account: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userProfile) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <Card
        style={{
          background: currentColors.background.card,
          border: `1px solid ${currentColors.border.light}`,
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Profile Header */}
          <Col span={24}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar
                size={120}
                icon={<UserOutlined />}
                src={userProfile?.profileImageUrl}
                style={{
                  border: `4px solid ${currentColors.primary[500]}`,
                  marginBottom: '16px'
                }}
              />
              <div>
                <Button
                  type="text"
                  icon={<CameraOutlined />}
                  style={{ color: currentColors.text.secondary }}
                >
                  Change Photo
                </Button>
              </div>
              <Title level={2} style={{ color: currentColors.text.primary, marginBottom: '8px' }}>
                {userProfile?.firstName} {userProfile?.lastName}
              </Title>
              <Text style={{ color: currentColors.text.secondary, fontSize: '16px' }}>
                @{userProfile?.username}
              </Text>
              <br />
              <Text style={{ color: currentColors.text.tertiary }}>
                {userProfile?.email}
              </Text>
            </div>
          </Col>

          {/* Profile Information */}
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Title level={3} style={{ color: currentColors.text.primary, margin: 0 }}>
                Profile Information
              </Title>
              <Space>
                {editing ? (
                  <>
                    <Button onClick={() => setEditing(false)}>Cancel</Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={() => form.submit()}
                      loading={loading}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Space>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdateProfile}
              disabled={!editing}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={<span style={{ color: currentColors.text.primary }}>First Name</span>}
                    name="firstName"
                    rules={[
                      { required: true, message: 'Please enter your first name' },
                      { min: 2, max: 50, message: 'First name must be between 2 and 50 characters' }
                    ]}
                  >
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<span style={{ color: currentColors.text.primary }}>Last Name</span>}
                    name="lastName"
                    rules={[
                      { required: true, message: 'Please enter your last name' },
                      { min: 2, max: 50, message: 'Last name must be between 2 and 50 characters' }
                    ]}
                  >
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={<span style={{ color: currentColors.text.primary }}>Phone Number</span>}
                name="phoneNumber"
                rules={[
                  { pattern: /^\+?[1-9]\d{0,15}$/, message: 'Please enter a valid phone number' }
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: currentColors.text.primary }}>Date of Birth</span>}
                name="dateOfBirth"
              >
                <DatePicker style={{ width: '100%' }} placeholder="Select your date of birth" />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: currentColors.text.primary }}>Bio</span>}
                name="bio"
                rules={[
                  { max: 500, message: 'Bio must not exceed 500 characters' }
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>

      {/* Security Section */}
      <Card
        style={{
          background: currentColors.background.card,
          border: `1px solid ${currentColors.border.light}`,
          marginTop: '24px'
        }}
      >
        <Title level={3} style={{ color: currentColors.text.primary }}>
          Security Settings
        </Title>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ color: currentColors.text.primary }}>Password</Text>
              <br />
              <Text style={{ color: currentColors.text.secondary }}>
                Last changed: Never • Strong password required
              </Text>
            </div>
            <Button
              icon={<LockOutlined />}
              onClick={() => setPasswordModalVisible(true)}
            >
              Change Password
            </Button>
          </div>

          <Divider />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ color: currentColors.text.primary }}>Account Status</Text>
              <br />
              <Text style={{ color: currentColors.text.secondary }}>
                Account is active • You can deactivate your account anytime
              </Text>
            </div>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => setDeactivateModalVisible(true)}
            >
              Deactivate Account
            </Button>
          </div>
        </Space>
      </Card>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={passwordModalVisible}
        onCancel={() => {
          setPasswordModalVisible(false);
          passwordForm.resetFields();
        }}
        footer={null}
        styles={{
          content: { background: currentColors.background.card },
          header: { background: currentColors.background.card }
        }}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: '24px' }}>
            <Space>
              <Button onClick={() => {
                setPasswordModalVisible(false);
                passwordForm.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Change Password
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Deactivate Account Modal */}
      <Modal
        title="Deactivate Account"
        open={deactivateModalVisible}
        onCancel={() => setDeactivateModalVisible(false)}
        footer={null}
        styles={{
          content: { background: currentColors.background.card },
          header: { background: currentColors.background.card }
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <Text style={{ color: currentColors.text.primary }}>
            Are you sure you want to deactivate your account? This action will:
          </Text>
          <ul style={{ margin: '16px 0', color: currentColors.text.secondary }}>
            <li>Disable your account access</li>
            <li>Hide your profile from other users</li>
            <li>Prevent you from creating or managing events</li>
            <li>Require admin approval to reactivate</li>
          </ul>
          <Text strong style={{ color: currentColors.status.error.text }}>
            This action cannot be undone by yourself.
          </Text>
        </div>

        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => setDeactivateModalVisible(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDeactivateAccount}
              loading={loading}
            >
              Deactivate Account
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
