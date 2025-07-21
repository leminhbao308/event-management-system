import ApiService from './ApiService';

class UserService {
  /**
   * Get current user profile
   */
  async getCurrentProfile() {
    const response = await ApiService.get('/users/profile');
    return response;
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId) {
    const response = await ApiService.get(`/users/${userId}`);
    return response;
  }

  /**
   * Update current user profile
   */
  async updateProfile(profileData) {
    const response = await ApiService.put('/users/profile', profileData);
    return response;
  }

  /**
   * Change password
   */
  async changePassword(passwordData) {
    const response = await ApiService.put('/users/change-password', passwordData);
    return response;
  }

  /**
   * Deactivate current user account
   */
  async deactivateAccount() {
    const response = await ApiService.delete('/users/deactivate');
    return response;
  }

  // Admin operations
  /**
   * Get all users with pagination (admin only)
   */
  async getAllUsers(params = {}) {
    const searchParams = new URLSearchParams();

    if (params.page !== undefined) searchParams.append('page', params.page);
    if (params.size !== undefined) searchParams.append('size', params.size);
    if (params.sort) searchParams.append('sort', params.sort);

    const queryString = searchParams.toString();
    const url = `/users/admin/all${queryString ? `?${queryString}` : ''}`;

    const response = await ApiService.get(url);
    return response;
  }

  /**
   * Toggle user active status (admin only)
   */
  async toggleUserStatus(userId) {
    const response = await ApiService.put(`/users/admin/${userId}/toggle-status`);
    return response;
  }

  /**
   * Update user role (admin only)
   */
  async updateUserRole(userId, roleName) {
    const searchParams = new URLSearchParams();
    searchParams.append('roleName', roleName);

    const response = await ApiService.put(`/users/admin/${userId}/update-role?${searchParams.toString()}`);
    return response;
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId) {
    const response = await ApiService.delete(`/users/admin/${userId}`);
    return response;
  }
}

export default new UserService();
