import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this data to a server
    console.log("Form submitted:", formData);
    
    // For demo purposes, simulate a successful submission
    setFormStatus('success');
    
    // Reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Reset the status after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 smooth-appear">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-brand">
              Contact <span className="brand-text-gradient">Us</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to place a bulk order? We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 smooth-appear" style={{ animationDelay: '0.2s' }}>
              <div className="glass-morphism rounded-xl p-6 h-full">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground text-sm">
                        Saawariya Rasoi<br />
                        Kanpur, Uttar Pradesh<br />
                        India
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground text-sm">
                        +91 96515 73635
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm">
                        saawariyarasoi12@gmail.com
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Clock className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium text-foreground">Hours:</span> 08:00 AM - 10:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1693.0391079789068!2d80.34033676217005!3d26.461697496647647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c38d71b739aef%3A0x8dfabc7fa62e4abe!2sSunrise%20Arcade!5e0!3m2!1sen!2sin!4v1720536747776!5m2!1sen!2sin!4v1720536747776!5m2!1sen!2sin" 
                    width="100%" 
                    height="200" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Restaurant location"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2 smooth-appear" style={{ animationDelay: '0.3s' }}>
              <div className="glass-morphism rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="text-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Send us a Message</h2>
                    <p className="text-sm text-muted-foreground">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
                
                {formStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    There was an error sending your message. Please try again.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="+91 1234567890"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject <span className="text-primary">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Bulk Order">Bulk Order</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Catering">Catering Service</option>
                        <option value="Complaint">Complaint</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-105 w-full md:w-auto"
                  >
                    Send Message
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="smooth-appear" style={{ animationDelay: '0.4s' }}>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold font-brand">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find quick answers to common questions about our services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-morphism rounded-xl p-6">
                <h3 className="font-medium mb-2">Do you serve non-vegetarian food?</h3>
                <p className="text-muted-foreground text-sm">
                  No, we are a 100% vegetarian restaurant specializing in authentic Purwanchal and traditional Indian cuisine.
                </p>
              </div>
              
              <div className="glass-morphism rounded-xl p-6">
                <h3 className="font-medium mb-2">How can I place a bulk order?</h3>
                <p className="text-muted-foreground text-sm">
                  For bulk orders, please contact us at least 24 hours in advance. You can call us or fill out the contact form with your requirements.
                </p>
              </div>
              
              <div className="glass-morphism rounded-xl p-6">
                <h3 className="font-medium mb-2">Do you offer special menu for religious fasts?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we have a special "Vrat Special" menu that features Satvik food prepared according to fasting requirements.
                </p>
              </div>
              
              <div className="glass-morphism rounded-xl p-6">
                <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major payment methods including cash, credit/debit cards, and UPI payments. For online orders through Zomato, you can use their supported payment methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
