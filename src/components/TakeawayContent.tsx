
import React from 'react';
import { ArrowRight, Phone, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const TakeawayContent = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
          Takeaway Mode
        </span>
        <h2 className="text-3xl md:text-4xl font-medium leading-tight">
          Grab It Fresh – Pick Up Your Favorite Purwanchali Delights!
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Prefer to pick up your meal? Our Takeaway Service ensures your food is hot, fresh, and
          ready when you arrive. Ideal for quick bites or bulk orders for gatherings.
        </p>
      </section>

      {/* Takeaway Options */}
      <section className="glass-morphism rounded-2xl p-6 md:p-10 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-restaurant-50 text-restaurant-700 rounded-full text-xs font-medium">
              <Clock size={14} />
              Ready in 20 minutes
            </span>
            <h3 className="text-2xl md:text-3xl font-medium">Why Choose Our Takeaway Service?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span>Freshly Prepared Meals for Quick Pickup</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span>Customizable Orders (Choose Normal or Bulk Order)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span>Hassle-Free Collection at Your Preferred Time</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+911234567890" 
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-105 hover-lift"
              >
                <Phone size={16} />
                Order for Takeaway
              </a>
              <Link 
                to="/menu" 
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80"
              >
                View Menu
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden neo-shadow">
              <img 
                src="https://images.unsplash.com/photo-1625398407796-82650a8c9dd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Saawariya Rasoi takeaway" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-xl p-3">
              <div>
                <p className="text-xs text-muted-foreground">Preparation Time</p>
                <p className="font-medium">15-20 mins</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <p className="text-xs text-muted-foreground">Pickup Hours</p>
                <p className="font-medium">11AM - 10PM</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <p className="text-xs text-muted-foreground">Discount</p>
                <p className="font-medium">10% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Orders */}
      <section className="space-y-6">
        <h3 className="text-xl font-medium">Special Bulk Order Perks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-morphism rounded-xl overflow-hidden hover-lift flex flex-col">
            <div className="aspect-[3/2] relative">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Corporate catering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-xs text-foreground rounded-full text-xs font-medium">
                  Events
                </span>
              </div>
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-medium text-lg mb-2">Customizable menu for events</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Perfect for meetings, conferences, and celebrations. We offer customized menu options tailored to your specific needs.
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  24-hour advance booking required
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Customizable menu options
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Serving equipment available on request
                </li>
              </ul>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <a 
                href="tel:+911234567890" 
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80 text-sm"
              >
                <Phone size={14} />
                Order for Bulk Delivery
              </a>
            </div>
          </div>
          
          <div className="glass-morphism rounded-xl overflow-hidden hover-lift flex flex-col">
            <div className="aspect-[3/2] relative">
              <img 
                src="https://images.unsplash.com/photo-1529543544282-cdab85927b0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Party catering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-xs text-foreground rounded-full text-xs font-medium">
                  Packaging
                </span>
              </div>
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-medium text-lg mb-2">Special packaging for group orders</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Make your special occasions memorable with our party platters and family-style servings, perfect for gatherings of all sizes.
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  48-hour advance booking preferred
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Special dietary accommodations available
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-restaurant-500"></span>
                  Party platters and combo meals
                </li>
              </ul>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <a 
                href="tel:+911234567890" 
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80 text-sm"
              >
                <Phone size={14} />
                Order for Bulk Delivery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="glass-morphism rounded-2xl p-6 md:p-10 space-y-6">
        <h3 className="text-xl font-medium">Our Story</h3>
        <p className="text-muted-foreground">
          Founded by Shail Kumari, Saawariya Rasoi is inspired by the rich traditions of Purwanchali
          cuisine. Every dish carries the warmth of home-cooked food, prepared with pure vegetarian
          ingredients and authentic flavors.
        </p>
      </section>
    </div>
  );
};

export default TakeawayContent;
