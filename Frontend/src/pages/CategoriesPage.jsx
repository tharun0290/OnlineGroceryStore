import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../utils/constants';
import './CategoriesPage.css';

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="categories-page container page-transition">
      <h1 className="section-title">Shop by Category</h1>
      <p className="section-subtitle">Browse our wide selection of quality provisions</p>

      <div className="categories-grid">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.value}
            className="category-card"
            style={{ background: cat.color }}
            onClick={() => navigate(`/products?category=${cat.value}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="cat-emoji">{cat.icon}</span>
            <h3 className="cat-name">{cat.label}</h3>
            <span className="cat-browse">Browse →</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
