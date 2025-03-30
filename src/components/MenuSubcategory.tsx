
import React, { useState } from 'react';
import { MenuItem } from '@/data/menuData';
import { Flame, Info, Clock, Tag, ChevronRight } from 'lucide-react';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Card, CardContent } from './ui/card';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface MenuSubcategoryProps {
  title: string;
  items: MenuItem[];
  zomatoLink: string;
}

const MenuSubcategory = ({ title, items, zomatoLink }: MenuSubcategoryProps) => {
  const { mode } = useOrderMode();
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  const handleTakeawayWhatsapp = (item: MenuItem) => {
    // Format the message for WhatsApp with the item details
    const message = `Hello Saawariya Rasoi, I would like to place a takeaway order for ${item.name}`;
    
    // Create the WhatsApp URL with the phone number and pre-filled message
    const whatsappUrl = `https://wa.me/919651573635?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleImageLoad = (itemId: number) => {
    setLoadedImages(prev => ({ ...prev, [itemId]: true }));
  };
  
  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-xl font-medium mb-4 text-primary">{title}</h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none"
          >
            {/* Item Image */}
            <div className="relative h-48 bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages[item.id] ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(item.id)}
                  onError={(e) => {
                    // Fallback gradient if image fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                  <div className="text-center px-4">
                    <h4 className="text-xl font-bold text-primary/80">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm text-primary/60 mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Show placeholder until image loads */}
              {item.image && !loadedImages[item.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                  <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>
                </div>
              )}
              
              {item.popular && (
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1 z-10">
                  <Flame size={12} />
                  Popular
                </div>
              )}
              
              {mode === 'takeaway' && item.takeawayPrice && (
                <div className="absolute right-0 top-0 bg-red-500 text-white p-2 rounded-bl-lg font-bold z-10">
                  10% OFF
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-medium">
                    {item.name}
                    {item.quantity && <span className="text-sm text-muted-foreground ml-2">({item.quantity})</span>}
                  </h4>
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
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
              )}
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                {mode === 'delivery' ? (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>30-45 mins</span>
                  </div>
                ) : (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>15-20 mins</span>
                  </div>
                )}
                
                <div className="flex justify-end">
                  {mode === 'delivery' ? (
                    <a 
                      href={zomatoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105 flex items-center"
                    >
                      Order
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  ) : (
                    <button 
                      onClick={() => handleTakeawayWhatsapp(item)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105 flex items-center"
                    >
                      Order Now
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuSubcategory;
