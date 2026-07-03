import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="brand-icon">🛒</span>
              <div>
                <h3 className="footer-title">M.S Grocery Store</h3>
                <p className="footer-tagline">Fresh Groceries Delivered with Trust</p>
              </div>
            </div>
            <p className="footer-desc">
              Your trusted neighborhood provision store, now online. Quality products at fair prices, delivered to your doorstep.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/profile">My Account</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <FiMapPin size={16} />
                <span>123 Main Street, Tirupati, AP 517501</span>
              </div>
              <div className="contact-item">
                <FiPhone size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <FiMail size={16} />
                <span>info@msgrocerystore.com</span>
              </div>
              <div className="contact-item">
                <FiClock size={16} />
                <span>Mon–Sat: 7AM – 9PM</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><FaFacebook size={20} /></a>
              <a href="#" className="social-link" aria-label="Instagram"><FaInstagram size={20} /></a>
              <a href="#" className="social-link" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="#" className="social-link" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} M.S Grocery Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
