import apiService, { ApiError } from './ApiService.js';

class AuthService {
  constructor () {
    this.tokenRefreshPromise = null;
    this.isRefreshing = false;

    // Token storage keys
    this.ACCESS_TOKEN_KEY = 'access_token';
    this.REFRESH_TOKEN_KEY = 'refresh_token';
    this.USER_DATA_KEY = 'user_data';
    this.TOKEN_EXPIRY_KEY = 'token_expiry';

    // Setup automatic token refresh
    this.setupTokenRefresh();
  }

  // Authentication Methods
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);

      if (response.success && response.data) {
        this.setTokens(response.data);
        this.setUserData(response.data);
        return response.data;
      }

      throw new ApiError(response.message || 'Login failed', 401);
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  async register(userData) {
    return await apiService.post('/auth/register', userData);
  }

  async logout() {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await apiService.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  async refreshToken() {
    if (this.isRefreshing) {
      return this.tokenRefreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearAuth();
      throw new ApiError('No refresh token available', 401);
    }

    this.isRefreshing = true;
    this.tokenRefreshPromise = this._performTokenRefresh(refreshToken);

    try {
      const result = await this.tokenRefreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.tokenRefreshPromise = null;
    }
  }

  async _performTokenRefresh(refreshToken) {
    try {
      const response = await apiService.post('/auth/refresh', { refreshToken });

      if (response.success && response.data) {
        this.setTokens(response.data);
        this.setUserData(response.data);
        return response.data;
      }

      throw new ApiError(response.message || 'Token refresh failed', 401);
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  // Token Management
  setTokens(tokenData) {
    const { token, refreshToken } = tokenData;

    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);

    // Calculate and store token expiry (assuming 24 hours for access token)
    const expiryTime = Date.now() + (23 * 60 * 60 * 1000); // 23 hours to be safe
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  setUserData(userData) {
    const { username, email, roles } = userData;
    const userInfo = { username, email, roles };
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userInfo));
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getUserData() {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  getTokenExpiry() {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    return expiry ? parseInt(expiry) : null;
  }

  clearAuth() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  // Authentication State Checks
  isAuthenticated() {
    const token = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    return !!(token && refreshToken);
  }

  isTokenExpired() {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;

    // Check if token expires in next 5 minutes
    const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
    return expiry <= fiveMinutesFromNow;
  }

  shouldRefreshToken() {
    return this.isAuthenticated() && this.isTokenExpired() && !this.isRefreshing;
  }

  hasRole(role) {
    const userData = this.getUserData();
    return userData?.roles?.includes(role) || false;
  }

  hasAnyRole(roles) {
    const userData = this.getUserData();
    if (!userData?.roles) return false;
    return roles.some(role => userData.roles.includes(role));
  }

  // Automatic Token Refresh Setup
  setupTokenRefresh() {
    // Check token expiry every minute
    setInterval(() => {
      if (this.shouldRefreshToken()) {
        this.refreshToken().catch(() => {
          // If refresh fails, user will be redirected to login
          this.clearAuth();
          window.dispatchEvent(new CustomEvent('auth:logout'));
        });
      }
    }, 60000); // 1 minute

    // Also check on page focus
    window.addEventListener('focus', () => {
      if (this.shouldRefreshToken()) {
        this.refreshToken().catch(() => {
          this.clearAuth();
          window.dispatchEvent(new CustomEvent('auth:logout'));
        });
      }
    });
  }

  // Request Interceptor for Automatic Token Refresh
  async makeAuthenticatedRequest(requestFn) {
    try {
      // First, check if we need to refresh the token
      if (this.shouldRefreshToken()) {
        await this.refreshToken();
      }

      return await requestFn();
    } catch (error) {
      // If we get 401, try to refresh token once
      if (error.isUnauthorized() && !this.isRefreshing) {
        try {
          await this.refreshToken();
          return await requestFn();
        } catch (refreshError) {
          this.clearAuth();
          window.dispatchEvent(new CustomEvent('auth:logout'));
          throw refreshError;
        }
      }
      throw error;
    }
  }
}

export default new AuthService();
