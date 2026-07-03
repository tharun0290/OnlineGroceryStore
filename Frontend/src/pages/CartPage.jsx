import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { getProductImageUrl } from '../utils/productImages';
import { SERVER_URL } from '../utils/constants';
import './CartPage.css';

const API_URL = SERVER_URL;

export default function CartPage() {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  if (!loading && cartItems.length === 0) {
    return (
      <div className="container page-transition">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3 className="empty-state-title">Your cart is empty</h3>
          <p className="empty-state-text">Add some fresh products to your cart!</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            <FiShoppingBag /> Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container page-transition">
      <h1 className="section-title">Shopping Cart ({cartCount} items)</h1>

      <div className="cart-layout">
        <div className="cart-items">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="cart-item card"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
              >
                <img
                  src={getProductImageUrl({ imageUrl: item.productImageUrl, name: item.productName || 'Product' }, API_URL)}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.productName}</h3>
                  <p className="cart-item-price">₹{item.productPrice}</p>
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}><FiMinus /></button>
                  <motion.span key={item.quantity} initial={{ scale: 1.3 }} animate={{ scale: 1 }}>{item.quantity}</motion.span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}><FiPlus /></button>
                </div>
                <div className="cart-item-subtotal">
                  <motion.span key={item.subtotal} initial={{ scale: 1.2 }} animate={{ scale: 1 }}>
                    ₹{item.subtotal?.toFixed(2) || (item.productPrice * item.quantity).toFixed(2)}
                  </motion.span>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                  <FiTrash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div className="cart-summary card" layout>
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cartCount} items)</span>
            <motion.span key={cartTotal} initial={{ scale: 1.2 }} animate={{ scale: 1 }}>₹{cartTotal.toFixed(2)}</motion.span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-delivery">{cartTotal >= 500 ? 'FREE' : '₹30.00'}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{(cartTotal + (cartTotal >= 500 ? 0 : 30)).toFixed(2)}</span>
          </div>
          {cartTotal < 500 && (
            <p className="free-delivery-hint">Add ₹{(500 - cartTotal).toFixed(2)} more for free delivery!</p>
          )}
          <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
