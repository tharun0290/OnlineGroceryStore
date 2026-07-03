import api from './api';

export const orderService = {
  placeOrder: (data) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders/user'),
  getAllOrders: () => api.get('/admin/orders'),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

export default orderService;
