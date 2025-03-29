
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { menuItems } from '@/data/menuData';

// Filter popular items for the featured menu
const featuredItems = [
  {
    id: 1,
    name: "Thekua",
    description: "Traditional Purwanchal sweet delicacy, perfect with evening tea",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    popular: true
  },
  {
    id: 13,
    name: "Nimona",
    description: "Authentic Purwanchal-style green pea curry with special spices",
    price: "₹219",
    takeawayPrice: "₹197",
    category: "Saawariya Specialty",
    veg: true,
    popular: true
  },
  {
    id: 21,
    name: "Vrat Special Thali",
    description: "Sabudana Khichdi + Aloo Jeera + Aloo Vada + Curd - perfect for fasting days",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true,
    popular: true
  },
  {
    id: 30,
    name: "Veg Special Thali",
    description: "Paneer ki Sabji + Daal + Rice + Roti/Paratha + Sweet - our complete meal",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Combos",
    veg: true,
    popular: true
  }
];

const FeaturedMenu = () => {
  const { mode } = useOrderMode();
  const zomatoLink = "https://link.zomato.com/xqzv/rshare?id=75078797305635b1";
  
  return (
    <section className="py-16 bg-secondary/30 px-6 smooth-appear" style={{ animationDelay: '0.4s' }}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div className="space-y-2 mb-6 md:mb-0">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              Our Specialties
            </span>
            <h2 className="text-3xl font-semibold">Purwanchal Favorites</h2>
            <p className="text-muted-foreground max-w-lg">
              Explore our most loved dishes, prepared with authentic Purwanchal recipes and the goodness of homemade cooking.
            </p>
          </div>
          <Link 
            to="/menu" 
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View Full Menu
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row gap-4 glass-morphism rounded-xl overflow-hidden hover-lift"
            >
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-1">
                        {item.name}
                        {/* Only render quantity if it exists on the item */}
                        {'quantity' in item && (
                          <span className="text-sm text-muted-foreground ml-2">
                            ({(item as any).quantity})
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-1 text-primary text-xs mb-2">
                        <Flame size={12} />
                        <span>Customer Favorite</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {mode === 'delivery' ? item.price : item.takeawayPrice || item.price}
                      </p>
                      {mode === 'takeaway' && item.takeawayPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {item.price}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  )}
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                  {item.subcategory && (
                    <span className="text-xs text-muted-foreground"> &bull; {item.subcategory}</span>
                  )}
                </div>
                
                <div className="flex justify-end mt-4">
                  {mode === 'delivery' ? (
                    <a 
                      href={zomatoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
                    >
                      Order Now
                    </a>
                  ) : (
                    <a 
                      href="tel:+919651573635"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105"
                    >
                      Order Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
