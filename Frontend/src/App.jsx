import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md)',
              },
              success: { iconTheme: { primary: 'var(--primary)', secondary: 'white' } },
              error: { iconTheme: { primary: 'var(--error)', secondary: 'white' } }
            }}
          />
          
          <Routes>
            {/* Main Shop Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              
              {/* Protected Shop Routes */}
              <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="order-success" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              
              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
