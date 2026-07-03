import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';
import { getProductImageUrl } from '../utils/productImages';
import { SERVER_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import './ProductDetailPage.css';

const API_URL = SERVER_URL;

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productService.getById(id);
        setProduct(data);
      } catch (err) {
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    addToCart(product.id, qty);
  };

  if (loading) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading...</div>;
  if (!product) return null;

  const imageUrl = getProductImageUrl(product, API_URL);

  return (
    <div className="product-detail container page-transition">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <div className="detail-grid">
        <motion.div className="detail-image-wrap" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <img src={imageUrl} alt={product.name} className="detail-image" />
          {!product.available && <div className="out-of-stock-overlay"><span>Out of Stock</span></div>}
        </motion.div>

        <motion.div className="detail-info" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="detail-category">{product.category?.replace('_', ' ')}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-price">₹{product.price}</p>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Availability</span>
              <span className={`badge ${product.available ? 'badge-success' : 'badge-error'}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Stock</span>
              <span>{product.quantity} units</span>
            </div>
          </div>

          {product.available && (
            <div className="detail-actions">
              <div className="qty-control">
                <button onClick={() => setQty(Math.max(1, qty - 1))}><FiMinus /></button>
                <span className="qty-value">{qty}</span>
                <button onClick={() => setQty(qty + 1)}><FiPlus /></button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                <FiShoppingCart /> Add to Cart — ₹{(product.price * qty).toFixed(2)}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
