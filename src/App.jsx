import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './styles/App.css';
import ThemeProvider from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext.jsx';
import ApiInterceptor from './services/ApiInterceptor.js';
import apiService from './services/ApiService.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MainLayout from './layouts/mainLayout';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import useThemeContext from './hooks/useThemeContext';

// Initialize API interceptor
const _apiInterceptor = new ApiInterceptor(apiService);

function AppContent() {
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    // Apply theme data attribute to document root
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } />

        {/* Admin Only Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute roles={['ADMIN']}>
            <MainLayout>
              <div>Admin Panel - Coming Soon</div>
            </MainLayout>
          </ProtectedRoute>
        } />

        {/* Organizer Routes */}
        <Route path="/organizer/*" element={
          <ProtectedRoute roles={['ADMIN', 'ORGANIZER']}>
            <MainLayout>
              <div>Organizer Panel - Coming Soon</div>
            </MainLayout>
          </ProtectedRoute>
        } />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#f97316',
        },
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
