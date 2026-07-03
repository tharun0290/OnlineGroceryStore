import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="container page-transition" style={{ textAlign: 'center', padding: '80px 0' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <motion.div style={{ fontSize: '8rem', marginBottom: '16px' }} animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
          🛒
        </motion.div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary btn-lg"><FiHome /> Back to Home</Link>
      </motion.div>
    </div>
  );
}
