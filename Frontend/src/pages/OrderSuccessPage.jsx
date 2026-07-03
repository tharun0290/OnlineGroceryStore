import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiPackage } from 'react-icons/fi';
import './OrderSuccessPage.css';

export default function OrderSuccessPage() {
  return (
    <div className="order-success container page-transition">
      <motion.div className="success-card card" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
          <FiCheckCircle size={80} className="success-icon" />
        </motion.div>
        <h1>Order Placed Successfully! 🎉</h1>
        <p>Your order has been placed and the store has been notified. We'll get your groceries ready as soon as possible!</p>
        <div className="success-actions">
          <Link to="/" className="btn btn-primary btn-lg"><FiHome /> Back to Home</Link>
          <Link to="/profile" className="btn btn-outline btn-lg"><FiPackage /> Track Orders</Link>
        </div>
      </motion.div>
    </div>
  );
}
