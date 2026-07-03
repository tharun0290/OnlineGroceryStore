import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiGrid } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <motion.nav
        className={`navbar glass ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="navbar-container container">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🛒</span>
            <div className="brand-text">
              <span className="brand-name">M.S Grocery</span>
              <span className="brand-tagline">Store</span>
            </div>
          </Link>

          <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Products</Link>
            <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>Categories</Link>
            {isAdmin && (
              <Link to="/admin" className={`nav-link nav-admin ${location.pathname.startsWith('/admin') ? 'active' : ''}`}>
                <FiGrid size={16} /> Admin
              </Link>
            )}

            {/* Mobile-only auth links */}
            <div className="mobile-auth">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <button onClick={handleLogout} className="nav-link">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="nav-link">Register</Link>
                </>
              )}
            </div>
          </div>

          <div className="navbar-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <FiSearch size={20} />
            </button>

            <button className="nav-icon-btn" onClick={toggleDarkMode} aria-label="Toggle theme">
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {isAuthenticated && (
              <Link to="/cart" className="nav-icon-btn cart-btn">
                <FiShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      className="cart-badge"
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/profile" className="nav-icon-btn user-btn">
                  <FiUser size={20} />
                </Link>
                <button onClick={handleLogout} className="nav-icon-btn" aria-label="Logout" title="Logout">
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
              </div>
            )}

            <button className="nav-icon-btn hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="search-bar glass"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSearch} className="container search-form">
                <FiSearch size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                <button type="submit" className="btn btn-primary btn-sm">Search</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div className="navbar-spacer" />
    </>
  );
}
