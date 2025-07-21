import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  message,
  Popconfirm,
  Select,
  Input,
  Row,
  Col,
  Avatar,
  Badge,
  DatePicker,
  Divider
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
  CrownOutlined
} from '@ant-design/icons';
import UserService from '../services/UserService';
import useThemeContext from '../hooks/useThemeContext';
import { useAuth } from '../hooks/useAuth';
import { DeselectableMultiSelect } from '../components';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const AdminUserManagement = () => {
  const { currentColors } = useThemeContext();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    role: [], // Changed to array for multi-select
    status: [], // Changed to array for multi-select
    emailVerified: '',
    dateRange: null
  });

  // Helper function to get role color
  const getRoleColor = (roleName) => {
    switch (roleName) {
      case 'ADMIN': return 'red';
      case 'ORGANIZER': return 'orange';
      case 'MODERATOR': return 'blue';
      default: return 'green';
    }
  };

  const availableRoles = ['USER', 'ORGANIZER', 'ADMIN', 'MODERATOR'];

  // Fetch users
  const fetchUsers = async (page = 1, size = 10) => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers({
        page: page - 1, // Backend uses 0-based pagination
        size,
        sort: 'createdAt,desc'
      });

      const usersData = response.data.content;
      setUsers(usersData);
      applyFilters(usersData, filters);
      setPagination({
        current: page,
        pageSize: size,
        total: response.data.totalElements
      });
    } catch (error) {
      message.error('Failed to fetch users: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to users list
  const applyFilters = (usersList, currentFilters) => {
    let filtered = [...usersList];

    // Search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName?.toLowerCase().includes(searchTerm) ||
        user.lastName?.toLowerCase().includes(searchTerm) ||
        user.username?.toLowerCase().includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm)
      );
    }

    // Role filter - now supports multiple roles
    if (currentFilters.role && currentFilters.role.length > 0) {
      filtered = filtered.filter(user =>
        user.roles?.some(role => currentFilters.role.includes(role.name))
      );
    }

    // Status filter - now supports multiple statuses
    if (currentFilters.status && currentFilters.status.length > 0) {
      filtered = filtered.filter(user => {
        if (currentFilters.status.includes('active') && currentFilters.status.includes('inactive')) {
          return true; // Show all if both selected
        }
        if (currentFilters.status.includes('active')) {
          return user.active === true;
        }
        if (currentFilters.status.includes('inactive')) {
          return user.active === false;
        }
        return false;
      });
    }

    // Email verification filter
    if (currentFilters.emailVerified !== '') {
      const isVerified = currentFilters.emailVerified === 'verified';
      filtered = filtered.filter(user => user.emailVerified === isVerified);
    }

    // Date range filter
    if (currentFilters.dateRange && currentFilters.dateRange.length === 2) {
      const [startDate, endDate] = currentFilters.dateRange;
      filtered = filtered.filter(user => {
        const userDate = dayjs(user.createdAt);
        return userDate.isAfter(startDate.startOf('day')) && userDate.isBefore(endDate.endOf('day'));
      });
    }

    setFilteredUsers(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(users, newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      role: [], // Reset to empty array
      status: [], // Reset to empty array
      emailVerified: '',
      dateRange: null
    };
    setFilters(clearedFilters);
    applyFilters(users, clearedFilters);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch current user
        try {
          const currentUserResponse = await UserService.getCurrentProfile();
          setCurrentUserData(currentUserResponse.data);
        } catch (error) {
          console.error('Failed to fetch current user data:', error);
        }

        // Fetch all users
        const response = await UserService.getAllUsers({
          page: 0,
          size: 10,
          sort: 'createdAt,desc'
        });

        const usersData = response.data.content;
        setUsers(usersData);
        setFilteredUsers(usersData);
        setPagination({
          current: 1,
          pageSize: 10,
          total: response.data.totalElements
        });
      } catch (error) {
        message.error('Failed to fetch users: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    applyFilters(users, filters);
  }, [users, filters]);

  // Handle pagination change
  const handleTableChange = (pagination) => {
    fetchUsers(pagination.current, pagination.pageSize);
  };

  // Toggle user status
  const handleToggleStatus = async (user) => {
    try {
      const response = await UserService.toggleUserStatus(user.id);
      message.success(`User ${response.data.active ? 'activated' : 'deactivated'} successfully`);
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Failed to update user status: ' + (error.response?.data?.message || error.message));
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      message.success('User deleted successfully');
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Failed to delete user: ' + (error.response?.data?.message || error.message));
    }
  };

  // Update user role
  const handleUpdateRole = async () => {
    try {
      await UserService.updateUserRole(selectedUser.id, selectedRole);
      message.success('User role updated successfully');
      setRoleModalVisible(false);
      setSelectedUser(null);
      setSelectedRole('');
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Failed to update user role: ' + (error.response?.data?.message || error.message));
    }
  };

  // Show role update modal
  const showRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.roles?.[0]?.name || '');
    setRoleModalVisible(true);
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{
              backgroundColor: currentColors.primary['500'] || currentColors.primary[500] || '#f97316',
              color: currentColors.text.inverse
            }}
          />
          <div>
            <div style={{ fontWeight: 'bold', color: currentColors.text.primary }}>
              {record.firstName} {record.lastName}
            </div>
            <div style={{ color: currentColors.text.secondary, fontSize: '12px' }}>
              @{record.username}
            </div>
            <div style={{ color: currentColors.text.secondary, fontSize: '12px' }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Badge
            status={record.active ? 'success' : 'error'}
            text={record.active ? 'Active' : 'Inactive'}
          />
          <Badge
            status={record.emailVerified ? 'success' : 'warning'}
            text={record.emailVerified ? 'Verified' : 'Unverified'}
          />
        </Space>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      render: (_, record) => (
        <Space wrap>
          {record.roles?.map(role => (
            <Tag
              key={role.id}
              color={getRoleColor(role.name)}
            >
              {role.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Joined',
      key: 'createdAt',
      render: (_, record) => (
        <div style={{ color: currentColors.text.secondary }}>
          {dayjs(record.createdAt).format('MMM DD, YYYY')}
        </div>
      ),
    },
    {
      title: 'Last Login',
      key: 'lastLogin',
      render: (_, record) => (
        <div style={{ color: currentColors.text.secondary }}>
          {record.lastLogin ? dayjs(record.lastLogin).format('MMM DD, YYYY') : 'Never'}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showRoleModal(record)}
            style={{ color: currentColors.primary['600'] || currentColors.primary[600] || '#ea580c' }}
          >
            Role
          </Button>
          <Button
            type="link"
            onClick={() => handleToggleStatus(record)}
            style={{
              color: record.active ?
                (currentColors.secondary['600'] || currentColors.secondary[600] || '#dc2626') :
                (currentColors.accent['600'] || currentColors.accent[600] || '#d97706')
            }}
          >
            {record.active ? 'Deactivate' : 'Activate'}
          </Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user? This action cannot be undone."
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Current User Display */}
      {currentUserData && (
        <Card
          style={{
            backgroundColor: currentColors.background.primary,
            borderColor: currentColors.primary['500'] || currentColors.primary[500] || '#f97316',
            borderWidth: '2px',
            marginBottom: '24px',
          }}
        >
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar
                size={64}
                icon={<CrownOutlined />}
                style={{
                  backgroundColor: currentColors.primary['500'] || currentColors.primary[500] || '#f97316',
                  color: currentColors.text.inverse,
                  border: `3px solid ${currentColors.accent['400'] || currentColors.accent[400] || '#fbbf24'}`,
                }}
              />
            </Col>
            <Col flex="auto">
              <Space direction="vertical" size="small">
                <div>
                  <Tag color="red" icon={<CrownOutlined />}>CURRENT ADMIN</Tag>
                  <Title level={4} style={{ margin: 0, color: currentColors.text.primary, display: 'inline', marginLeft: '8px' }}>
                    {currentUserData.firstName} {currentUserData.lastName}
                  </Title>
                </div>
                <div>
                  <Text strong style={{ color: currentColors.text.secondary }}>@{currentUserData.username}</Text>
                  <Divider type="vertical" />
                  <Text style={{ color: currentColors.text.secondary }}>{currentUserData.email}</Text>
                </div>
                <Space wrap>
                  {currentUserData.roles?.map(role => (
                    <Tag key={role.id} color={getRoleColor(role.name)}>
                      {role.name}
                    </Tag>
                  ))}
                  <Badge status={currentUserData.active ? 'success' : 'error'} text={currentUserData.active ? 'Active' : 'Inactive'} />
                  <Badge status={currentUserData.emailVerified ? 'success' : 'warning'} text={currentUserData.emailVerified ? 'Verified' : 'Unverified'} />
                </Space>
              </Space>
            </Col>
            <Col>
              <Text style={{ color: currentColors.text.tertiary, fontSize: '12px' }}>
                Last Login: {currentUserData.lastLogin ? dayjs(currentUserData.lastLogin).format('MMM DD, YYYY HH:mm') : 'Never'}
              </Text>
            </Col>
          </Row>
        </Card>
      )}

      {/* Main User Management Card */}
      <Card
        style={{
          backgroundColor: currentColors.background.primary,
          borderColor: currentColors.border.primary,
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, color: currentColors.text.primary }}>
              User Management
            </Title>
            <Text style={{ color: currentColors.text.secondary }}>
              Manage system users, roles, and permissions • {filteredUsers.length} of {users.length} users
            </Text>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<ClearOutlined />}
                onClick={clearFilters}
                style={{
                  borderColor: currentColors.border.primary,
                  color: currentColors.text.secondary,
                }}
              >
                Clear Filters
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => fetchUsers(pagination.current, pagination.pageSize)}
                style={{
                  borderColor: currentColors.border.primary,
                  color: currentColors.text.primary,
                }}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Search and Filter Section */}
        <Card
          size="small"
          style={{
            backgroundColor: currentColors.background.secondary,
            borderColor: currentColors.border.secondary,
            marginBottom: '24px',
          }}
          title={
            <Space>
              <FilterOutlined style={{ color: currentColors.primary['500'] || currentColors.primary[500] }} />
              <Text strong>Search & Filters</Text>
            </Space>
          }
        >
          <Row gutter={[16, 24]}>
            {/* First Row - Search, Role, Status */}
            <Col xs={24} sm={8} md={8} lg={8}>
              <div>
                <Text strong style={{ color: currentColors.text.primary, marginBottom: '4px', display: 'block' }}>
                  Search Users
                </Text>
                <Input
                  placeholder="Username, name, or email..."
                  prefix={<SearchOutlined />}
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  allowClear
                />
              </div>
            </Col>
            <Col xs={24} sm={8} md={8} lg={8}>
              <div>
                <Text strong style={{ color: currentColors.text.primary, marginBottom: '4px', display: 'block' }}>
                  User Role
                </Text>
                <DeselectableMultiSelect
                  placeholder="Select roles..."
                  style={{ width: '100%' }}
                  value={filters.role}
                  onChange={(value) => handleFilterChange('role', value)}
                  options={availableRoles.map(role => ({
                    value: role,
                    label: role
                  }))}
                  allowClear
                  maxTagCount={2}
                  renderOption={(option, isSelected) => (
                    <Space>
                      <Tag color={getRoleColor(option.value)} style={{ margin: 0 }}>
                        {option.label}
                      </Tag>
                      {isSelected && <span style={{ color: '#1890ff', fontSize: '12px' }}>✓</span>}
                    </Space>
                  )}
                  renderTag={(option, onClose) => (
                    <Tag
                      color={getRoleColor(option.value)}
                      closable
                      onClose={onClose}
                      style={{ marginRight: 3 }}
                    >
                      {option.label}
                    </Tag>
                  )}
                />
              </div>
            </Col>
            <Col xs={24} sm={8} md={8} lg={8}>
              <div>
                <Text strong style={{ color: currentColors.text.primary, marginBottom: '4px', display: 'block' }}>
                  Account Status
                </Text>
                <DeselectableMultiSelect
                  placeholder="Select statuses..."
                  style={{ width: '100%' }}
                  value={filters.status}
                  onChange={(value) => handleFilterChange('status', value)}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' }
                  ]}
                  allowClear
                  maxTagCount={2}
                  renderOption={(option, isSelected) => (
                    <Space>
                      <Badge
                        status={option.value === 'active' ? 'success' : 'error'}
                        text={option.label}
                      />
                      {isSelected && <span style={{ color: '#1890ff', fontSize: '12px' }}>✓</span>}
                    </Space>
                  )}
                  renderTag={(option, onClose) => (
                    <Tag
                      color={option.value === 'active' ? 'green' : 'red'}
                      closable
                      onClose={onClose}
                      style={{ marginRight: 3 }}
                    >
                      {option.label}
                    </Tag>
                  )}
                />
              </div>
            </Col>

            {/* Second Row - Email Verification, Registration Date */}
            <Col xs={24} sm={8} md={8} lg={8}>
              <div>
                <Text strong style={{ color: currentColors.text.primary, marginBottom: '4px', display: 'block' }}>
                  Email Verification
                </Text>
                <Select
                  placeholder="All email statuses"
                  style={{ width: '100%' }}
                  value={filters.emailVerified}
                  onChange={(value) => handleFilterChange('emailVerified', value)}
                  allowClear
                >
                  <Option value="verified">
                    <Badge status="success" text="Email Verified" />
                  </Option>
                  <Option value="unverified">
                    <Badge status="warning" text="Email Unverified" />
                  </Option>
                </Select>
              </div>
            </Col>
            <Col xs={24} sm={16} md={16} lg={16}>
              <div>
                <Text strong style={{ color: currentColors.text.primary, marginBottom: '4px', display: 'block' }}>
                  Registration Date Range
                </Text>
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  placeholder={['Start date', 'End date']}
                  value={filters.dateRange}
                  onChange={(dates) => handleFilterChange('dateRange', dates)}
                  format="MMM DD, YYYY"
                />
              </div>
            </Col>
          </Row>
        </Card>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            total: filteredUsers.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
          }}
          onChange={handleTableChange}
          style={{
            backgroundColor: currentColors.background.primary,
          }}
        />
      </Card>

      {/* Role Update Modal */}
      <Modal
        title="Update User Role"
        open={roleModalVisible}
        onOk={handleUpdateRole}
        onCancel={() => {
          setRoleModalVisible(false);
          setSelectedUser(null);
          setSelectedRole('');
        }}
        okText="Update Role"
        cancelText="Cancel"
      >
        {selectedUser && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>User: </Text>
              <Text>{selectedUser.firstName} {selectedUser.lastName} (@{selectedUser.username})</Text>
            </div>
            <div>
              <Text strong>Current Role: </Text>
              {selectedUser.roles?.map(role => (
                <Tag key={role.id} color="blue">{role.name}</Tag>
              ))}
            </div>
            <div>
              <Text strong>New Role: </Text>
              <Select
                value={selectedRole}
                onChange={setSelectedRole}
                style={{ width: '100%' }}
                placeholder="Select a role"
              >
                {availableRoles.map(role => (
                  <Option key={role} value={role}>{role}</Option>
                ))}
              </Select>
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default AdminUserManagement;
