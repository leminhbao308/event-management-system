import authService from './AuthService.js';
import { ApiError } from './ApiService.js';

class ApiInterceptor {
  constructor (apiService) {
    this.apiService = apiService;
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Override the original request method
    const originalRequest = this.apiService.request.bind(this.apiService);

    this.apiService.request = async (endpoint, options = {}) => {
      // Create a request function that we can retry
      const makeRequest = () => originalRequest(endpoint, options);

      // Use auth service's authenticated request method for protected endpoints
      if (!this.apiService.isPublicEndpoint(endpoint) && authService.isAuthenticated()) {
        return await authService.makeAuthenticatedRequest(makeRequest);
      }

      return await makeRequest();
    };
  }
}

export default ApiInterceptor;
