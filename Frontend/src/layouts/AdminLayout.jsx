import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiPackage, FiShoppingBag, FiBell, FiMenu, FiX, FiHome, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import './AdminLayout.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await userService.getNotifications();
        setUnreadCount(data.unreadCount);
      } catch (err) {}
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: '/admin', icon: <FiGrid />, label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: <FiPackage />, label: 'Products' },
    { path: '/admin/orders', icon: <FiShoppingBag />, label: 'Orders' },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <span>🛒</span>
            {sidebarOpen && <span className="sidebar-brand-text">Admin Panel</span>}
          </Link>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item) ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
              {item.label === 'Orders' && unreadCount > 0 && (
                <motion.span
                  className="notification-dot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {sidebarOpen && unreadCount}
                </motion.span>
              )}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link">
            <FiHome /> {sidebarOpen && 'Back to Store'}
          </Link>
          <button className="sidebar-link" onClick={() => { logout(); navigate('/login'); }}>
            <FiLogOut /> {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header glass">
          <h2 className="admin-page-title">
            {navItems.find(i => isActive(i))?.label || 'Admin'}
          </h2>
          <div className="admin-header-right">
            <div className="admin-notification-bell" onClick={() => navigate('/admin/orders')}>
              <motion.div animate={unreadCount > 0 ? { rotate: [0, -15, 15, -10, 10, 0] } : {}} transition={{ duration: 0.5, repeat: unreadCount > 0 ? Infinity : 0, repeatDelay: 3 }}>
                <FiBell size={20} />
              </motion.div>
              {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
            </div>
            <span className="admin-user">👋 {user?.name}</span>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
