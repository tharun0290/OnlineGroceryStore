export const SERVER_URL = `http://${window.location.hostname}:8080`;
export const API_BASE_URL = `${SERVER_URL}/api/v1`;

export const CATEGORIES = [
  { value: 'RICE', label: 'Rice', icon: '🍚', color: '#F5E6D3' },
  { value: 'DAL', label: 'Dal', icon: '🫘', color: '#FAE3D9' },
  { value: 'OIL', label: 'Oil', icon: '🫒', color: '#FFF3CD' },
  { value: 'SPICES', label: 'Spices', icon: '🌶️', color: '#FFE0E0' },
  { value: 'DRY_FRUITS', label: 'Dry Fruits', icon: '🥜', color: '#E8D5B7' },
  { value: 'SNACKS', label: 'Snacks', icon: '🍿', color: '#FCE4EC' },
  { value: 'DAIRY', label: 'Dairy', icon: '🥛', color: '#E3F2FD' },
  { value: 'BEVERAGES', label: 'Beverages', icon: '☕', color: '#F3E5F5' },
  { value: 'VEGETABLES', label: 'Vegetables', icon: '🥬', color: '#E8F5E9' },
  { value: 'FRUITS', label: 'Fruits', icon: '🍎', color: '#FFF8E1' },
  { value: 'HOUSEHOLD_ITEMS', label: 'Household', icon: '🏠', color: '#E0F2F1' },
];

export const ORDER_STATUSES = [
  { value: 'PLACED', label: 'Placed', color: '#3B82F6' },
  { value: 'ACCEPTED', label: 'Accepted', color: '#8B5CF6' },
  { value: 'PREPARING', label: 'Preparing', color: '#F59E0B' },
  { value: 'READY', label: 'Ready', color: '#10B981' },
  { value: 'DELIVERED', label: 'Delivered', color: '#16A34A' },
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CATEGORIES: '/categories',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
};
