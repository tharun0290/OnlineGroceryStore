import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiPackage } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import orderService from '../services/orderService';
import { ORDER_STATUSES } from '../utils/constants';
import toast from 'react-hot-toast';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          userService.getProfile(),
          orderService.getUserOrders(),
        ]);
        setProfile(profileRes.data);
        setOrders(ordersRes.data);
        setForm({ name: profileRes.data.name, phone: profileRes.data.phone, address: profileRes.data.address || '' });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const { data } = await userService.updateProfile(form);
      setProfile(data);
      setEditing(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const getStatusColor = (status) => ORDER_STATUSES.find(s => s.value === status)?.color || '#6B7280';

  if (loading) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="profile-page container page-transition">
      <div className="profile-layout">
        <motion.div className="profile-card card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="profile-avatar">{profile?.name?.[0]?.toUpperCase() || 'U'}</div>
          <h2>{profile?.name}</h2>
          <p className="profile-email">{profile?.email}</p>

          {editing ? (
            <div className="profile-form">
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Address</label><textarea className="form-input" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} rows={2} /></div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-primary" onClick={handleSave}><FiSave /> Save</button>
                <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="detail-row"><FiPhone /><span>{profile?.phone}</span></div>
              <div className="detail-row"><FiMapPin /><span>{profile?.address || 'No address set'}</span></div>
              <button className="btn btn-outline" onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          )}
        </motion.div>

        <div className="orders-section">
          <h2 className="section-title"><FiPackage /> My Orders</h2>
          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3 className="empty-state-title">No orders yet</h3>
              <p className="empty-state-text">Place your first order to see it here!</p>
            </div>
          ) : (
            orders.map((order, i) => (
              <motion.div key={order.id} className="order-card card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">{new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <span className="order-status-badge" style={{ background: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>
                    {order.status}
                  </span>
                </div>
                <div className="order-items-list">
                  {order.items?.map((item) => (
                    <div key={item.id} className="order-item-row">
                      <span>{item.productName} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">Total: ₹{order.totalAmount}</div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
