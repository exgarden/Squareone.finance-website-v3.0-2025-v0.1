import { Check } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const AboutPage = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`min-h-screen py-24 px-8 ${theme === 'dark' ? 'dark bg-secondary-950 text-white' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-6 text-secondary-900 dark:text-white">About SquareOne</h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Our mission is to empower the next generation with the knowledge, tools, and confidence to make informed financial decisions.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-8 text-secondary-900 dark:text-white text-center">Our Story</h2>
          <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm rounded-2xl shadow-sm p-12">
            <p className="text-secondary-700 dark:text-secondary-300 mb-6 text-lg">
              SquareOne was founded with the vision of transforming financial education for teenagers. We recognized that traditional financial tools were either too complex or not engaging enough for young learners.
            </p>
            <p className="text-secondary-700 dark:text-secondary-300 mb-6 text-lg">
              Our team of financial experts and educators came together to create a platform that simplifies financial concepts and makes learning about money management fun and practical.
            </p>
            <p className="text-secondary-700 dark:text-secondary-300 text-lg">
              Today, SquareOne is a trusted platform for teens and their families, helping them build a strong foundation for financial success.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-8 text-secondary-900 dark:text-white text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">Empowerment</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                We believe in empowering teens to take control of their financial futures.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">Accessibility</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Financial education should be available to everyone. We strive to create content that is easy to understand and accessible to all teens.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">Innovation</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                We continuously innovate our platform to ensure our lessons are engaging and relevant.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">Integrity</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                We provide trustworthy, accurate information that teens can rely on throughout their financial journey.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-8 text-secondary-900 dark:text-white text-center">Why Choose SquareOne?</h2>
          <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm rounded-2xl shadow-sm p-12">
            <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <div className="flex items-start mb-6">
                  <div className="bg-secondary-100 dark:bg-secondary-700 p-1 rounded-full mr-3 mt-0.5">
                    <Check size={16} className="text-secondary-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-secondary-900 dark:text-white">Crafted for Teens</h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Our platform is specifically designed to make financial learning fun and easy for teenagers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="bg-secondary-100 dark:bg-secondary-700 p-1 rounded-full mr-3 mt-0.5">
                    <Check size={16} className="text-secondary-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-secondary-900 dark:text-white">High-Quality Content</h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      We offer research-backed lessons that teach essential money management skills.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start mb-6">
                  <div className="bg-secondary-100 dark:bg-secondary-700 p-1 rounded-full mr-3 mt-0.5">
                    <Check size={16} className="text-secondary-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-secondary-900 dark:text-white">Personalized Learning</h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Our AI mentors adapt to each student’s learning style, offering tailored lessons and feedback.
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="bg-secondary-100 dark:bg-secondary-700 p-1 rounded-full mr-3 mt-0.5">
                    <Check size={16} className="text-secondary-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-secondary-900 dark:text-white">Real-Time Support</h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      With real-time feedback and support, students can ask questions and receive immediate help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;