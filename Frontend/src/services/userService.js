import api from './api';

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getNotifications: () => api.get('/admin/notifications'),
  markNotificationsRead: () => api.post('/admin/notifications/read'),
};

export default userService;
