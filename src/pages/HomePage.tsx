import { ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim()) {
        alert('Please fill in all required fields.');
        return;
      }
  
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      // Send data to Google Sheets
      const response = await fetch('https://script.google.com/macros/s/AKfycbz91g-24PNGtqVAeq7IO5Kvyjkm1IInLKc8Q1lT_bKoApmh53XBB4on8a8kuI3VPnk/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Log the response for debugging
      console.log('Response:', response);
  
      // Parse the response
      const result = await response.json();
      console.log('Result:', result);
  
      if (result.status === "success") {
        // Reset form after successful submission
        setFormData({ name: '', email: '' });
        alert('Thank you for joining our waitlist!');
      } else {
        alert('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };


  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-secondary-950 text-white' : 'bg-white text-neutral-900'}`}>
      {/* Hero Section */}
      <section className="relative bg-primary-600 dark:bg-secondary-950 text-white py-32 px-8 min-h-[90vh] flex items-center">
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-800 opacity-90"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-accent-600/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-600/10 to-transparent"></div>
        
        {/* Gold accent line */}
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-accent-600 to-transparent transition-all duration-700 opacity-80 ${isScrolled ? 'opacity-0' : ''}`}></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
          {/* Subtle accent above headline */}
          <div className="flex justify-center">
            <div className="h-[1px] w-20 bg-accent-600 mb-12 opacity-80"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold mb-4 leading-tight tracking-tight">
            <span className="block">Master Money.</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-600 to-white">Build Wealth.</span>
            <span className="block">Own Your Future.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary-200 dark:text-secondary-300 max-w-2xl mx-auto font-light leading-relaxed">
            SquareOne equips the next generation with modern money skills to build wealth, navigate global finances, and create a life of financial freedom.
          </p>
          
          <div className="pt-10">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto transition-all duration-300 hover:shadow-2xl hover:shadow-accent-600/10">
              <div className="space-y-4 mb-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-6 py-4 border border-secondary-300 dark:border-secondary-600 bg-white/10 dark:bg-secondary-800/70 backdrop-blur-sm text-white placeholder-secondary-300 dark:placeholder-secondary-500 focus:outline-none focus:border-accent-600 transition-all duration-300 rounded-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address"
                    required
                    className="w-full px-6 py-4 border border-secondary-300 dark:border-secondary-600 bg-white/10 dark:bg-secondary-800/70 backdrop-blur-sm text-white placeholder-secondary-300 dark:placeholder-secondary-500 focus:outline-none focus:border-accent-600 transition-all duration-300 rounded-none"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="bg-white text-primary-600 dark:text-secondary-900 border border-white px-10 py-4 rounded-none font-medium hover:bg-accent-600 hover:border-accent-600 hover:text-white transition-all duration-300 text-lg uppercase tracking-wider w-full"
              >
                Join the Waitlist
              </button>
            </form>
            
            {/* Figma Prototype Button */}
            <div className="mt-8">
              <a 
                href="https://figma.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-accent-600 text-accent-600 px-8 py-3 rounded-none hover:bg-accent-600 hover:text-black transition-all duration-300 text-sm uppercase tracking-widest group"
              >
                <span>View Figma Prototype</span>
                <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 bg-white dark:bg-secondary-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 text-secondary-900 dark:text-white">The SquareOne Experience</h2>
            <p className="text-secondary-600 dark:text-secondary-300 text-lg max-w-2xl mx-auto">
              Sophisticated tools wrapped in a minimal interface, designed for those who appreciate quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 border border-secondary-100 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-500 transition-all">
              <h3 className="text-xl font-semibold mb-3 text-secondary-900 dark:text-white">Crafted for Teens</h3>
              <p className="text-secondary-600 dark:text-secondary-300">
                Our platform is specifically designed to make financial learning fun and easy for teenagers.
              </p>
            </div>
            
            <div className="p-8 border border-secondary-100 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-500 transition-all">
              <h3 className="text-xl font-semibold mb-3 text-secondary-900 dark:text-white">High-Quality Educational Content</h3>
              <p className="text-secondary-600 dark:text-secondary-300">
                SquareOne offers high-quality, research-backed lessons that teach essential money management skills.
              </p>
            </div>
            
            <div className="p-8 border border-secondary-100 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-500 transition-all">
              <h3 className="text-xl font-semibold mb-3 text-secondary-900 dark:text-white">All Essential Financial Tools</h3>
              <p className="text-secondary-600 dark:text-secondary-300">
                Teens get access to all the tools they need to practice what they learn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Mentor Support Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-secondary-50 to-white dark:from-secondary-800 dark:to-secondary-900 relative overflow-hidden">
        {/* Luxury accent elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-600/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-primary-600/5 dark:bg-primary-500/5 blur-3xl"></div>
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent-600/5 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-[1px] bg-accent-600"></span>
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold mb-6 text-secondary-900 dark:text-white relative">
                AI Mentor <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-500">Support</span>
              </h2>
            </div>
            <p className="text-secondary-600 dark:text-secondary-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Our AI mentor is here to guide you through your investment journey with sophisticated, personalized support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-['Playfair_Display'] font-semibold mb-6 text-secondary-900 dark:text-white">
                Elevate Your Financial Intelligence
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
                Learning with a mentor has always been the hallmark of exceptional education. Our AI-powered mentors provide bespoke guidance, ensuring a refined learning experience tailored to your individual preferences and pace.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm p-6 shadow-xl border-l-2 border-primary-500 dark:border-primary-400 rounded-sm hover:translate-x-1 transition-all duration-300 group">
                  <h4 className="font-semibold text-lg mb-2 text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Personalized Intelligence
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    Our AI mentors adapt with sophistication to your learning style, offering meticulously crafted lessons and nuanced feedback to ensure comprehensive understanding.
                  </p>
                </div>
                
                <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm p-6 shadow-xl border-l-2 border-primary-500 dark:border-primary-400 rounded-sm hover:translate-x-1 transition-all duration-300 group">
                  <h4 className="font-semibold text-lg mb-2 text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Responsive Engagement
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    With immediate, thoughtful responses and support, your questions receive prompt attention, creating an immersive and engaging learning experience.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-accent-600/20 dark:from-primary-600/10 dark:to-accent-600/10 rounded-lg transform rotate-3 scale-105 opacity-70 group-hover:rotate-2 transition-transform duration-500"></div>
              
              <div className="relative overflow-hidden rounded-lg transform group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                  alt="Professional using SquareOne's AI mentor" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ maxHeight: '500px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm font-light italic">
                    "The AI mentor's insights have transformed my approach to investment strategy."
                  </p>
                </div>
              </div>
              
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-accent-600/10 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-transparent border border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500 px-10 py-3 rounded-none font-medium hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-all duration-300 inline-flex items-center text-sm uppercase tracking-wider"
            >
              Experience the Difference
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-24 px-8 bg-primary-600 dark:bg-secondary-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6">Ready for financial clarity?</h2>
          <p className="text-xl text-secondary-200 dark:text-secondary-300 mb-10 max-w-2xl mx-auto">
            Join our exclusive community of individuals who value elegance in their financial management.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-primary-600 dark:text-secondary-900 px-10 py-4 rounded-none font-medium hover:bg-secondary-100 transition-colors inline-flex items-center text-lg uppercase tracking-wider mr-4"
          >
            Try Dashboard
            <ArrowRight size={18} className="ml-2" />
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-transparent border border-white text-white px-10 py-4 rounded-none font-medium hover:bg-white hover:text-primary-600 dark:hover:text-secondary-900 transition-colors inline-flex items-center text-lg uppercase tracking-wider mt-4 md:mt-0"
          >
            Contact Us
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};


export default HomePage;