
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Flame, Filter, X, Map, Camera } from 'lucide-react';
import MenuSubcategory from '@/components/MenuSubcategory';
import SocialLinks from '@/components/SocialLinks';
import { categories, menuItems } from '@/data/menuData';

const Menu = () => {
  const { mode } = useOrderMode();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const zomatoLink = "https://link.zomato.com/xqzv/rshare?id=75078797305635b1";
  const googleMapsLink = "https://maps.app.goo.gl/8LbpcKic2gpU9s1p9";
  
  // Set loading state to simulate data fetching
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Filter menu items based on selected filters
  const filteredItems = menuItems.filter(item => {
    // Category filter
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }
    
    // Veg-only filter - all items are veg so this is redundant but kept for future options
    if (showVegOnly && !item.veg) {
      return false;
    }
    
    // Popular-only filter
    if (showPopularOnly && !item.popular) {
      return false;
    }
    
    return true;
  });
  
  // Group items by subcategory if they have one
  const groupedItems = filteredItems.reduce((acc, item) => {
    const key = item.subcategory || 'default';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);
  
  // Define the custom order for subcategories
  const subcategoryOrder = [
    'default', // Specialty items (no subcategory)
    'Vrat Meal Combo',
    'Vrat Snacks',
    'Vrat Sweet',
    'Meal Combos',
    'Paratha Combos',
    'Thali'
  ];
  
  // Sort the keys based on the custom order
  const sortedSubcategories = Object.keys(groupedItems).sort((a, b) => {
    const indexA = subcategoryOrder.indexOf(a);
    const indexB = subcategoryOrder.indexOf(b);
    
    // If both are in the custom order, use that order
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only one is in the custom order, prioritize it
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    // Otherwise, use alphabetical order
    return a.localeCompare(b);
  });
  
  const resetFilters = () => {
    setSelectedCategory("All");
    setShowVegOnly(false);
    setShowPopularOnly(false);
  };
  
  const handleOrderButtonClick = () => {
    if (mode === 'delivery') {
      // Open Zomato link for delivery
      window.open(zomatoLink, '_blank');
    } else {
      // For takeaway mode, open WhatsApp
      const message = `Hello Saawariya Rasoi, I would like to place a takeaway order`;
      const whatsappUrl = `https://wa.me/919651573635?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 smooth-appear">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              {mode === 'delivery' ? 'Available for Delivery' : 'Available for Takeaway'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-brand">
              Our <span className="brand-text-gradient">Menu</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our authentic dishes from Purwanchal, prepared with traditional recipes.
              {mode === 'takeaway' && " Enjoy 10% off on all takeaway orders!"}
            </p>
            <p className="text-sm mt-2 text-primary font-medium">
              Located in Kanpur, Uttar-Pradesh, India
            </p>
          </div>
          
          <div className="mb-8 smooth-appear" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-muted hover:bg-muted/80 text-foreground/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="popular-only"
                    checked={showPopularOnly}
                    onChange={() => setShowPopularOnly(!showPopularOnly)}
                    className="rounded border-muted-foreground h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label htmlFor="popular-only" className="text-sm flex items-center gap-1">
                    <Flame size={14} className="text-primary" />
                    Popular Items
                  </label>
                </div>
                
                {(selectedCategory !== "All" || showPopularOnly) && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                    Reset
                  </button>
                )}
              </div>
            </div>
            
            {/* Loading state */}
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-64 bg-gray-200 rounded-xl"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Render subcategories in custom order */}
                {sortedSubcategories.length > 0 ? (
                  sortedSubcategories.map((subcategory) => (
                    <MenuSubcategory 
                      key={subcategory} 
                      title={subcategory !== 'default' ? subcategory : ''} 
                      items={groupedItems[subcategory]}
                      zomatoLink={zomatoLink}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No items match your filters. Please try different criteria.</p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="mt-16 glass-morphism p-6 rounded-xl smooth-appear" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 font-brand">Find Us</h2>
                <p className="text-muted-foreground mb-4">
                  Visit our restaurant in Kanpur, Uttar-Pradesh, India or place your order online.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
                  >
                    <Map size={16} />
                    View on Google Maps
                  </a>
                  <button 
                    onClick={handleOrderButtonClick}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:brightness-105"
                  >
                    Order Now
                  </button>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <h3 className="text-lg font-medium mb-2">Connect With Us</h3>
                <SocialLinks className="justify-center md:justify-end" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
