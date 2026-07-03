import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import orderService from '../../services/orderService';
import userService from '../../services/userService';
import { ORDER_STATUSES } from '../../utils/constants';
import toast from 'react-hot-toast';
import './AdminPages.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // Mark notifications as read when visiting orders page
    userService.markNotificationsRead().catch(() => {});
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      toast.success(`Order #${orderId} updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => ORDER_STATUSES.find(s => s.value === status)?.color || '#6B7280';

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading orders...</div>;

  return (
    <div className="admin-orders">
      <h2 className="admin-section-title">All Orders ({orders.length})</h2>

      <div className="orders-list">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            className="admin-order-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div className="admin-order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <span className="order-date">{new Date(order.orderDate).toLocaleString('en-IN')}</span>
              </div>
              <span className="table-badge" style={{ background: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>
                {order.status}
              </span>
            </div>

            <div className="admin-order-customer">
              <div><strong>Customer:</strong> {order.customerName}</div>
              <div><strong>Phone:</strong> {order.customerPhone}</div>
              <div><strong>Address:</strong> {order.deliveryAddress}</div>
            </div>

            <div className="admin-order-items">
              <h4>Items:</h4>
              {order.items?.map((item) => (
                <div key={item.id} className="admin-order-item">
                  <span>{item.productName} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="admin-order-total">
                <strong>Total: ₹{order.totalAmount}</strong>
              </div>
            </div>

            <div className="admin-order-actions">
              <label>Update Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                className="form-input status-select"
                style={{ borderColor: getStatusColor(order.status) }}
              >
                {ORDER_STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
