import api from './api';

export const cartService = {
  getCart: () => api.get('/cart'),
  addItem: (productId, quantity) => api.post('/cart', { productId, quantity }),
  removeItem: (id) => api.delete(`/cart/${id}`),
  clearCart: () => api.delete('/cart'),
};

export default cartService;
