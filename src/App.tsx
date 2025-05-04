import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DriverMode from './pages/DriverMode';
import PassengerMode from './pages/PassengerMode';
import TransactionHistory from './pages/TransactionHistory';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import PaymentConfirmation from './pages/PaymentConfirmation';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header showBack={location.pathname !== '/'} />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/driver" element={<DriverMode />} />
          <Route path="/passenger" element={<PassengerMode />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-md py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} LocalPay. Powered by MiniPay & Mento.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;