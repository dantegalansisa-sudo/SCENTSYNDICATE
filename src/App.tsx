import { useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/Store';
import Header, { TabBar } from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import { About, Checkout, Contact, FAQ, Sets } from './pages/Content';
import NotFound from './pages/NotFound';
import { EASE } from './utils';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: EASE.out }}
    >
      {children}
    </motion.main>
  );
}

function Shell() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  const onProduct = location.pathname.startsWith('/product/');

  return (
    <div className={`app${onProduct ? ' app--pdp' : ''}`}>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/shop" element={<Page><Shop /></Page>} />
          <Route path="/collections/:id" element={<Page><Shop /></Page>} />
          <Route path="/product/:id" element={<Page><Product /></Page>} />
          <Route path="/sets" element={<Page><Sets /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/faq" element={<Page><FAQ /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/checkout" element={<Page><Checkout /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      {!onProduct && <TabBar />}
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </MotionConfig>
  );
}
