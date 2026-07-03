import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import productService from '../../services/productService';
import { getProductImageUrl } from '../../utils/productImages';
import { CATEGORIES, SERVER_URL } from '../../utils/constants';
import toast from 'react-hot-toast';
import './AdminPages.css';

const API_URL = SERVER_URL;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'RICE', description: '', price: '', quantity: '', available: true });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productService.getAll();
      setProducts(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setForm({ name: product.name, category: product.category, description: product.description || '', price: product.price, quantity: product.quantity, available: product.available });
    } else {
      setEditingProduct(null);
      setForm({ name: '', category: 'RICE', description: '', price: '', quantity: '', available: true });
    }
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, formData);
        toast.success('Product updated!');
      } else {
        await productService.create(formData);
        toast.success('Product created!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.delete(id);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <h2 className="admin-section-title">Manage Products</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <FiPlus /> Add Product
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={getProductImageUrl(product, API_URL)}
                    alt={product.name}
                    className="table-thumb"
                  />
                </td>
                <td><strong>{product.name}</strong></td>
                <td>{product.category?.replace('_', ' ')}</td>
                <td className="amount">₹{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <span className={`table-badge ${product.available ? 'badge-success' : 'badge-error'}`}>
                    {product.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="action-btn edit" onClick={() => openModal(product)}><FiEdit2 /></button>
                    <button className="action-btn delete" onClick={() => handleDelete(product.id)}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal glass" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="modal-header">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input className="form-input" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (₹)</label>
                    <input type="number" step="0.01" className="form-input" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-input" value={form.quantity} onChange={(e) => setForm({...form, quantity: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Availability</label>
                    <select className="form-input" value={form.available} onChange={(e) => setForm({...form, available: e.target.value === 'true'})}>
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-input" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} />
                </div>
                <div className="form-group">
                  <label className="form-label">Product Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="form-input" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
