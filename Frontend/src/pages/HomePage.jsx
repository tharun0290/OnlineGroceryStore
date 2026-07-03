import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTruck, FiShield, FiClock, FiStar } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/SkeletonLoader';
import productService from '../services/productService';
import { CATEGORIES } from '../utils/constants';
import './HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productService.getAll();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.filter(p => p.available).slice(0, 8);
  const newArrivals = [...products].reverse().slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="floating-icons">
            {['🥕', '🍎', '🥛', '🌶️', '🍌', '🧅', '☕', '🍅'].map((icon, i) => (
              <motion.span
                key={i}
                className="floating-icon"
                animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 25}%` }}
              >
                {icon}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="container hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-badge">🛒 Your Trusted Provisions Store</span>
            <h1 className="hero-title">
              Fresh Groceries,<br />
              <span className="hero-highlight">Delivered with Trust</span>
            </h1>
            <p className="hero-subtitle">
              Quality provisions at fair prices from your neighborhood M.S Grocery store. Browse, order, and get it delivered right to your doorstep.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/categories" className="btn btn-outline btn-lg">
                Browse Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section container">
        <div className="trust-grid">
          {[
            { icon: <FiTruck />, title: 'Fast Delivery', desc: 'Same day delivery' },
            { icon: <FiShield />, title: 'Quality Assured', desc: 'Fresh & genuine products' },
            { icon: <FiClock />, title: 'Open Daily', desc: '7 AM – 9 PM' },
            { icon: <FiStar />, title: 'Best Prices', desc: 'Fair & competitive' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="trust-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="trust-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/categories" className="section-link">View All <FiArrowRight /></Link>
        </div>
        <div className="categories-scroll">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.value}
              className="category-chip"
              style={{ background: cat.color }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/products?category=${cat.value}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="category-emoji">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="section-link">View All <FiArrowRight /></Link>
        </div>
        {loading ? (
          <ProductSkeleton count={8} />
        ) : (
          <div className="grid grid-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="promo-banner container">
        <motion.div
          className="promo-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="promo-content">
            <span className="promo-badge">🎉 Special Offer</span>
            <h2>Free Delivery on Orders Above ₹500</h2>
            <p>Order your daily essentials today and get them delivered for free!</p>
            <Link to="/products" className="btn btn-primary btn-lg">Order Now <FiArrowRight /></Link>
          </div>
          <div className="promo-decoration">
            <span className="promo-emoji">🛍️</span>
          </div>
        </motion.div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="section container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <div className="grid grid-4">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
