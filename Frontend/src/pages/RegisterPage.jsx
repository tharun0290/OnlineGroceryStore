import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card glass"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <span className="auth-icon">🛒</span>
          <h1>Create Account</h1>
          <p>Join M.S Grocery Store today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <FiUser className="input-icon" />
              <input type="text" name="name" className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input type="email" name="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input type="password" name="password" className="form-input" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required minLength={6} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <div className="input-with-icon">
                <FiPhone className="input-icon" />
                <input type="tel" name="phone" className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <div className="input-with-icon">
              <FiMapPin className="input-icon" />
              <input type="text" name="address" className="form-input" placeholder="Your delivery address" value={form.address} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
            <FiArrowRight />
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
