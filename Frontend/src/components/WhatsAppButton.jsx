import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi! I'd like to order from M.S Grocery Store"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 100,
        width: '56px', height: '56px', borderRadius: '50%',
        background: '#25D366', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.5)',
        textDecoration: 'none'
      }}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
