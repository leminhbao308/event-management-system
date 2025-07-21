# Authentication Flow Implementation

## Overview

This implementation provides a comprehensive authentication system with the following features:

### ✅ **Implemented Features:**

1. **JWT Token Management**

   - Automatic access token refresh
   - Secure token storage in localStorage
   - Token expiry detection and handling

2. **Authentication Flow**

   - Login/Register pages with validation
   - Protected routes with role-based access
   - Automatic redirect after login/logout
   - Session persistence across page refreshes

3. **Error Handling**

   - Graceful error handling for API calls
   - User-friendly error messages
   - Automatic retry on token refresh failures

4. **Security Best Practices**
   - Automatic token refresh before expiry
   - Request interceptors for seamless API calls
   - Role-based access control
   - Secure logout with token cleanup

## 🔄 **Authentication Flow**

```
User Login → Store Tokens → Access Protected Routes
     ↓
Token Near Expiry → Auto Refresh → Continue Session
     ↓
Refresh Token Expired → Force Logout → Redirect to Login
```

## 📁 **File Structure**

```
src/
├── services/
│   ├── ApiService.js          # Base API service with error handling
│   ├── AuthService.js         # Authentication service with token management
│   └── ApiInterceptor.js      # Request interceptor for auto-refresh
├── context/
│   └── AuthContext.jsx        # React context for auth state management
├── hooks/
│   └── useAuth.js            # Custom hook for auth context
├── components/
│   └── ProtectedRoute.jsx    # Route protection component
├── pages/
│   ├── Login.jsx             # Login page with form validation
│   ├── Register.jsx          # Registration page
│   ├── Dashboard.jsx         # Protected dashboard
│   └── Unauthorized.jsx     # 403 error page
└── App.jsx                   # Main app with routing setup
```

## 🚀 **Usage Examples**

### Basic Authentication

```jsx
import { useAuth } from "./hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      Welcome, {user.username}!<button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes

```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute roles={["ADMIN"]}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

### API Calls with Auto-Refresh

```jsx
import apiService from "./services/ApiService";

// API calls automatically handle token refresh
const data = await apiService.get("/protected-endpoint");
```

## ⚙️ **Configuration**

### Environment Variables (.env.development)

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_TOKEN_REFRESH_THRESHOLD=300000  # 5 minutes
VITE_TOKEN_CHECK_INTERVAL=60000      # 1 minute
```

## 🔧 **Installation**

1. **Install Dependencies:**

```bash
npm install react-router-dom
```

2. **Start the Application:**

```bash
npm run dev
```

## 🎯 **Best Practices Implemented**

1. **Token Security:**

   - Tokens stored in localStorage (consider httpOnly cookies for production)
   - Automatic cleanup on logout
   - Expiry-based refresh strategy

2. **User Experience:**

   - Loading states during authentication
   - Error messages with clear feedback
   - Seamless navigation after auth state changes

3. **Error Handling:**

   - Graceful degradation on auth failures
   - Automatic retry mechanisms
   - User-friendly error messages

4. **Performance:**
   - Minimal re-renders with context optimization
   - Efficient token refresh timing
   - Background token validation

## 🔄 **Token Refresh Strategy**

The system implements a proactive token refresh strategy:

1. **Automatic Checks:** Every 60 seconds
2. **Expiry Detection:** 5 minutes before actual expiry
3. **Page Focus:** Checks on window focus
4. **API Calls:** Before each protected request

## 🛡️ **Security Considerations**

### Current Implementation:

- ✅ JWT tokens with expiry
- ✅ Role-based access control
- ✅ Automatic token cleanup
- ✅ Request interceptors

### Production Recommendations:

- 🔄 Use httpOnly cookies instead of localStorage
- 🔄 Implement CSRF protection
- 🔄 Add rate limiting
- 🔄 Use secure headers
- 🔄 Implement refresh token rotation

## 📊 **Testing the Implementation**

1. **Register a new user** at `/register`
2. **Login** at `/login`
3. **Access protected routes** like `/dashboard`
4. **Test role-based access** at `/admin` (requires ADMIN role)
5. **Verify auto-refresh** by waiting and monitoring network tab
6. **Test logout** functionality

## 🚨 **Troubleshooting**

### Common Issues:

1. **CORS Errors:**

   - Ensure backend allows frontend origin
   - Check preflight requests

2. **Token Refresh Failures:**

   - Verify refresh token endpoint
   - Check token expiry times

3. **Routing Issues:**
   - Ensure React Router is properly configured
   - Check route protection logic

### Debug Mode:

Enable browser dev tools and check:

- Network tab for API calls
- Application tab for localStorage tokens
- Console for auth-related logs

This implementation provides a robust, production-ready authentication system that handles all common scenarios including token refresh, role-based access, and graceful error handling.
