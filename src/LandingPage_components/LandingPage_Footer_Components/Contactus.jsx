import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LandingPage_Header from '../LandingPage_Header';
import ContactFormSubmit from './Contact_form_submit';
import useDispatchHeader from '../../customHooks/useDispatchHeader';

export default function ContactUs() {
  useDispatchHeader();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    Address: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error message when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/contact-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          age: '',
          email: '',
          Address: '',
          message: ''
        });
      } else {
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
     // console.error('Error:', error);
      setErrorMessage('An error occurred while sending the message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Contact Superchat - Get in Touch with Our Support Team</title>
        <meta name="description" content="Contact Superchat's customer support team for assistance. We're here to help with your queries, feedback, and support needs." />
        <meta name="keywords" content="Superchat contact, customer support, help desk, contact form, customer service, support team" />
        <meta property="og:title" content="Contact Superchat Support" />
        <meta property="og:description" content="Get in touch with Superchat's support team. We're here to help!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superchat.in/contact-us" />
        <link rel="canonical" href="https://superchat.in/contact-us" />
        
        {/* Schema.org markup for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ContactPage",
            "name": "Superchat Contact Page",
            "description": "Contact Superchat's customer support team for assistance",
            "url": "https://superchat.in/contact-us",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "",
              "contactType": "customer service",
              "availableLanguage": ["English", "Hindi"]
            }
          })}
        </script>
      </Helmet>

      <LandingPage_Header />
      
      <main role="main" className="py-12">
        {success ? (
          <ContactFormSubmit />
        ) : (
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Contact Us</h1>
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert">
                  {errorMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Contact form">
                {/* Name Field */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      className="peer w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-slate-700 focus:border-slate-500 placeholder-transparent"
                      placeholder="Name"
                      id="name"
                      onChange={handleChange}
                      value={formData.name}
                      aria-required="true"
                      aria-label="Your name"
                    />
                    <label 
                      htmlFor="name"
                      className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 
                               transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                               peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 
                               peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-slate-500"
                    >
                      Name
                    </label>
                  </div>
                </div>

                {/* Age Field */}
                <div>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      required
                      className="peer w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-slate-700 focus:border-slate-500 placeholder-transparent"
                      placeholder="Age"
                      id="age"
                      min={18}
                      onChange={handleChange}
                      value={formData.age}
                      aria-required="true"
                      aria-label="Your age"
                    />
                    <label 
                      htmlFor="age"
                      className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 
                               transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                               peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 
                               peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-slate-500"
                    >
                      Age (18+)
                    </label>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      className="peer w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-slate-700 focus:border-slate-500 placeholder-transparent"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                      value={formData.email}
                      aria-required="true"
                      aria-label="Your email address"
                    />
                    <label 
                      htmlFor="email"
                      className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 
                               transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                               peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 
                               peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-slate-500"
                    >
                      Email
                    </label>
                  </div>
                </div>

                {/* Address Field */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="Address"
                      required
                      className="peer w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-slate-700 focus:border-slate-500 placeholder-transparent"
                      placeholder="Address"
                      id="Address"
                      onChange={handleChange}
                      value={formData.Address}
                      aria-required="true"
                      aria-label="Your address"
                    />
                    <label 
                      htmlFor="Address"
                      className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 
                               transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                               peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 
                               peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-slate-500"
                    >
                      Address
                    </label>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <div className="relative">
                    <textarea
                      name="message"
                      required
                      rows={3}
                      className="peer w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-slate-700 focus:border-slate-500 placeholder-transparent"
                      placeholder="Message"
                      id="message"
                      onChange={handleChange}
                      value={formData.message}
                      aria-required="true"
                      aria-label="Your message"
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 
                               transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                               peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 
                               peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-slate-500"
                    >
                      Message
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-800 text-white py-3 rounded-md hover:bg-slate-700 
                           transition-colors duration-200 mt-6 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                           disabled:bg-slate-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}