
import GradientOverlay from '../components/gradientoverlay';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const PricingPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-secondary-950 text-white' : 'bg-primary-600 text-white'}`}>
      <section className="relative py-32 px-8 min-h-[90vh] flex items-center">
        <GradientOverlay />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold mb-6">Pricing</h1>
          <p className="text-xl md:text-2xl mb-8 text-secondary-200 dark:text-secondary-300">
            Choose the plan that fits your needs and start mastering your finances today.
          </p>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Free Plan */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">Free</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">Get started with basic features for free.</p>
              <p className="text-4xl font-bold mb-6">$0<span className="text-lg">/month</span></p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Budget Tracking</li>
                <li>✔️ Savings Goals</li>
                <li>❌ Advanced Analytics</li>
                <li>❌ AI Mentor Support</li>
              </ul>
              <button className="bg-white text-primary-600 dark:text-secondary-900 px-6 py-3 rounded-lg font-medium hover:bg-accent-600 hover:text-white transition-all duration-300 w-full">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">Pro</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">Unlock advanced features and tools.</p>
              <p className="text-4xl font-bold mb-6">$9<span className="text-lg">/month</span></p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Budget Tracking</li>
                <li>✔️ Savings Goals</li>
                <li>✔️ Advanced Analytics</li>
                <li>❌ AI Mentor Support</li>
              </ul>
              <button className="bg-white text-primary-600 dark:text-secondary-900 px-6 py-3 rounded-lg font-medium hover:bg-accent-600 hover:text-white transition-all duration-300 w-full">
                Upgrade to Pro
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">Premium</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">Access all features, including AI mentorship.</p>
              <p className="text-4xl font-bold mb-6">$19<span className="text-lg">/month</span></p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Budget Tracking</li>
                <li>✔️ Savings Goals</li>
                <li>✔️ Advanced Analytics</li>
                <li>✔️ AI Mentor Support</li>
              </ul>
              <button className="bg-white text-primary-600 dark:text-secondary-900 px-6 py-3 rounded-lg font-medium hover:bg-accent-600 hover:text-white transition-all duration-300 w-full">
                Go Premium
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
