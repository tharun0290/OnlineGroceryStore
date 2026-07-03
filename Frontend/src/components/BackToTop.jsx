import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed', bottom: '90px', right: '24px', zIndex: 100,
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)', cursor: 'pointer', border: 'none'
          }}
          aria-label="Back to top"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
