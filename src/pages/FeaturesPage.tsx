import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import GradientOverlay from '../components/GradientOverlay';

const FeaturesPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-secondary-950 text-white' : 'bg-primary-600 text-white'}`}>
      <section className="relative py-32 px-8 min-h-[90vh] flex items-center">
        <GradientOverlay />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold mb-6">Features</h1>
          <p className="text-xl md:text-2xl mb-8 text-secondary-200 dark:text-secondary-300">
            Discover the powerful tools and features that make SquareOne the ultimate platform for financial education.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Feature 1: Crafted for Teens */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">Crafted for Teens</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">
                Our platform is specifically designed to make financial learning fun and easy for teenagers.
              </p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Interactive lessons</li>
                <li>✔️ Engaging content</li>
                <li>✔️ Teen-friendly design</li>
              </ul>
            </div>

            {/* Feature 2: High-Quality Content */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">High-Quality Content</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">
                SquareOne offers research-backed lessons that teach essential money management skills.
              </p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Expert-created lessons</li>
                <li>✔️ Real-world applications</li>
                <li>✔️ Updated regularly</li>
              </ul>
            </div>

            {/* Feature 3: Personalized Learning */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">Personalized Learning</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">
                Our AI mentors adapt to each student’s learning style, offering tailored lessons and feedback.
              </p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Custom learning paths</li>
                <li>✔️ Real-time feedback</li>
                <li>✔️ Adaptive lessons</li>
              </ul>
            </div>

            {/* Feature 4: All Essential Tools */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">All Essential Tools</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">
                Teens get access to all the tools they need to practice what they learn.
              </p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Budget planners</li>
                <li>✔️ Savings calculators</li>
                <li>✔️ Goal-setting features</li>
              </ul>
            </div>

            {/* Feature 5: Optimized Learning */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">Optimized Learning</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">
                Our platform is optimized for speed, ensuring quick access to lessons and tools on any device.
              </p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Fast and responsive</li>
                <li>✔️ Works on all devices</li>
                <li>✔️ Seamless experience</li>
              </ul>
            </div>

            {/* Feature 6: AI Mentor Support */}
            <div className="bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-accent-600 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-4">AI Mentor Support</h2>
              <p className="text-lg mb-6 text-secondary-200 dark:text-secondary-300">
                Our AI mentor is here to guide you through your investment journey with personalized support.
              </p>
              <ul className="text-left space-y-3 mb-8 text-secondary-200 dark:text-secondary-300">
                <li>✔️ Real-time support</li>
                <li>✔️ Personalized guidance</li>
                <li>✔️ Adaptive learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;