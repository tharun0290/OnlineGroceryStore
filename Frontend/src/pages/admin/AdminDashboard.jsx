import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiCheck, FiX, FiShoppingBag, FiTruck, FiClock } from 'react-icons/fi';
import { StatSkeleton, OrderSkeleton } from '../../components/SkeletonLoader';
import userService from '../../services/userService';
import orderService from '../../services/orderService';
import { ORDER_STATUSES } from '../../utils/constants';
import './AdminPages.css';

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    const duration = 1000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          userService.getDashboardStats(),
          orderService.getAllOrders(),
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = stats ? [
    { icon: <FiPackage />, label: 'Total Products', value: stats.totalProducts, color: '#3B82F6', bg: '#EFF6FF' },
    { icon: <FiCheck />, label: 'Available', value: stats.availableProducts, color: '#16A34A', bg: '#F0FDF4' },
    { icon: <FiX />, label: 'Unavailable', value: stats.unavailableProducts, color: '#EF4444', bg: '#FEF2F2' },
    { icon: <FiShoppingBag />, label: 'Total Orders', value: stats.totalOrders, color: '#8B5CF6', bg: '#F5F3FF' },
    { icon: <FiClock />, label: 'Pending', value: stats.pendingOrders, color: '#F59E0B', bg: '#FFFBEB' },
    { icon: <FiTruck />, label: 'Delivered', value: stats.deliveredOrders, color: '#10B981', bg: '#ECFDF5' },
  ] : [];

  const getStatusColor = (status) => ORDER_STATUSES.find(s => s.value === status)?.color || '#6B7280';

  return (
    <div className="admin-dashboard">
      <h2 className="admin-section-title">Dashboard Overview</h2>

      {loading ? <StatSkeleton count={6} /> : (
        <div className="stats-grid">
          {statCards.map((card, i) => (
            <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="stat-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
              <div className="stat-value" style={{ color: card.color }}><AnimatedCounter value={card.value} /></div>
              <div className="stat-label">{card.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      <h3 className="admin-section-title" style={{ marginTop: '32px' }}>Recent Orders</h3>
      {loading ? <OrderSkeleton count={5} /> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Phone</th><th>Amount</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>{order.customerName}</td>
                  <td>{order.customerPhone}</td>
                  <td className="amount">₹{order.totalAmount}</td>
                  <td><span className="table-badge" style={{ background: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>{order.status}</span></td>
                  <td className="date">{new Date(order.orderDate).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
