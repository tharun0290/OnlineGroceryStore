import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/SkeletonLoader';
import productService from '../services/productService';
import { CATEGORIES } from '../utils/constants';
import './ProductsPage.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || '';
  const activeSearch = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (activeSearch) params.search = activeSearch;
        const { data } = await productService.getAll(params);
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, activeSearch]);

  const handleCategoryFilter = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === activeCategory) {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    setSearchParams(params);
  };

  return (
    <div className="products-page container page-transition">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title">
          {activeSearch ? `Results for "${activeSearch}"` : activeCategory ? CATEGORIES.find(c => c.value === activeCategory)?.label || 'Products' : 'All Products'}
        </h1>
        <p className="text-light">{products.length} products found</p>
      </motion.div>

      <div className="filter-bar">
        <button
          className={`filter-chip ${!activeCategory ? 'active' : ''}`}
          onClick={() => { const p = new URLSearchParams(searchParams); p.delete('category'); setSearchParams(p); }}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={`filter-chip ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(cat.value)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <ProductSkeleton count={8} />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No products found</h3>
          <p className="empty-state-text">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
