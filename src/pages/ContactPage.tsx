import { Loader, Mail, MapPin, Phone, Send, X } from 'lucide-react';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [scriptUrl] = useState('https://script.google.com/macros/s/AKfycbyGCxoiWTM4H7M-0h6LL2CObiNuI5uOFassNvluYru8-ruz6qv_RiRVNHXuD_5lZ9c/exec'); // Your Google Script URL
  const [showErrorModal, setShowErrorModal] = useState(false); // For Google Sheets error

  // Load submissions from localStorage on component mount
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('contact_submissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      // Form validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }
  
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
  
      // Create new submission
      const newSubmission: ContactSubmission = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString()
      };
  
      // Add to submissions array
      const updatedSubmissions = [...submissions, newSubmission];
      setSubmissions(updatedSubmissions);
      
      // Save to localStorage
      localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
      
      // Send data to Google Sheets
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubmission),
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to send data to Google Sheets');
      }
  
      // Parse the response
      const result = await response.json();
      if (!result.success) {
        throw new Error('Failed to send data to Google Sheets');
      }
  
      // Show success state and reset form
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        if (err.message.includes('Google Sheets')) {
          setShowErrorModal(true); // Show error modal for Google Sheets failure
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-8 ${theme === 'dark' ? 'dark bg-secondary-950 text-white' : 'bg-white text-neutral-900'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-4 text-secondary-900 dark:text-white">Contact Us</h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-300">
            Have questions? We're here to help you on your financial journey.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-2 bg-primary-600 dark:bg-primary-700 text-white rounded-xl p-8">
            <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-6">Get in Touch</h2>
            <p className="mb-8 text-secondary-200 dark:text-secondary-300">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p>support@squareone.finance</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Office</h3>
                  <p>123 Finance Street<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div> 
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm rounded-xl shadow-sm p-8">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} />
                </div>
                <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-2 dark:text-white">Message Sent!</h2>
                <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                  Thank you for contacting us. We'll respond as soon as possible.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-secondary-900 dark:text-white">Send a Message</h2>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-300">
                    {error}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    disabled={isLoading}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    disabled={isLoading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Google Sheets Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-secondary-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-['Playfair_Display'] font-semibold text-secondary-900 dark:text-white">
                Submission Error
              </h3>
              <button 
                onClick={() => setShowErrorModal(false)}
                className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              Failed to send data to Google Sheets. Please check your Google Script URL and try again.
            </p>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
