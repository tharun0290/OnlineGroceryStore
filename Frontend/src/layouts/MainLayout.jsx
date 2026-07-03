import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import WhatsAppButton from '../components/WhatsAppButton';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh' }}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
