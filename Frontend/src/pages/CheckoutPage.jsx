import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: user?.name || '',
    customerPhone: '',
    deliveryAddress: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) { toast.error('Cart is empty!'); return; }
    setLoading(true);
    try {
      await orderService.placeOrder(form);
      toast.success('Order placed successfully!');
      navigate('/order-success');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page container page-transition">
      <h1 className="section-title">Checkout</h1>

      <div className="checkout-layout">
        <motion.form className="checkout-form card" onSubmit={handlePlaceOrder} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h3>Delivery Details</h3>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <FiUser className="input-icon" />
              <input type="text" name="customerName" className="form-input" value={form.customerName} onChange={handleChange} required placeholder="Your full name" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-with-icon">
              <FiPhone className="input-icon" />
              <input type="tel" name="customerPhone" className="form-input" value={form.customerPhone} onChange={handleChange} required placeholder="+91 98765 43210" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Address</label>
            <div className="input-with-icon">
              <FiMapPin className="input-icon" />
              <textarea name="deliveryAddress" className="form-input" value={form.deliveryAddress} onChange={handleChange} required placeholder="Complete delivery address" rows={3} style={{ resize: 'vertical' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order — ₹${cartTotal.toFixed(2)}`}
            <FiArrowRight />
          </button>
        </motion.form>

        <motion.div className="checkout-summary card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <span className="checkout-item-name">{item.productName} × {item.quantity}</span>
                <span>₹{(item.productPrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total ({cartCount} items)</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
