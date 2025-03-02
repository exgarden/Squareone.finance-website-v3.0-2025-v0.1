import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import { ThemeProvider } from './context/ThemeContext';

import { AccountProvider } from './context/AccountContext';

export function App() {
  useEffect(() => {
    // Include required fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider>
      <AccountProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/dashboard" element={</Layout><Dashboard /></Layout>} />
            <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
            <Route path="/features" element={<Layout><FeaturesPage /></Layout>} />
          </Routes>
        </Router>
      </AccountProvider>
    </ThemeProvider>
  );
}

export default App;
