import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductImageUrl } from '../utils/productImages';
import { SERVER_URL } from '../utils/constants';
import './ProductCard.css';

const API_URL = SERVER_URL;

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product.id, 1);
  };

  const imageUrl = getProductImageUrl(product, API_URL);

  return (
    <motion.div
      className="product-card card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.name} className="product-image" loading="lazy" />
        {!product.available && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
        <span className="product-category-tag">{product.category?.replace('_', ' ')}</span>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description?.substring(0, 60)}{product.description?.length > 60 ? '...' : ''}</p>
        
        <div className="product-bottom">
          <span className="product-price">₹{product.price}</span>
          <button
            className={`btn btn-primary btn-sm add-cart-btn ${!product.available ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.available}
          >
            <FiShoppingCart size={14} />
            {product.available ? 'Add' : 'Unavailable'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
