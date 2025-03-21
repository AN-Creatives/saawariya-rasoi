import React, { useState } from 'react';
import { MenuItem } from '@/data/menuData';
import { Flame, Info, Clock, Tag, ChevronRight, Loader2 } from 'lucide-react';
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';

interface MenuSubcategoryProps {
  title: string;
  items: MenuItem[];
  zomatoLink: string;
}

const MenuSubcategory = ({ title, items, zomatoLink }: MenuSubcategoryProps) => {
  const { mode } = useOrderMode();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [selectedOrderType, setSelectedOrderType] = useState('normal');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  
  const handleTakeawayOrder = async (item: MenuItem) => {
    setSelectedItem(item);
    setShowCustomerForm(true);
  };

  const submitOrder = async () => {
    if (!selectedItem) return;
    
    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create order object
      const orderItem = {
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.takeawayPrice || selectedItem.price,
        quantity: 1
      };
      
      // Calculate total amount
      const totalAmount = orderItem.price * orderItem.quantity;
      
      // Save order to database
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          order_type: 'takeaway',
          order_items: [orderItem],
          total_amount: totalAmount,
          status: 'pending',
          order_notes: customerInfo.notes || null
        })
        .select();
      
      if (error) throw error;
      
      // Reset the form
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        notes: ''
      });
      setShowCustomerForm(false);
      
      // Show success toast
      toast({
        title: "Order Placed Successfully",
        description: "We'll contact you shortly to confirm your order.",
      });

      // Send notification to admin (this will be handled by the webhook function)
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        variant: "destructive",
        title: "Error placing order",
        description: error.message || "There was an error placing your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Item Image (Placeholder for now) */}
            <div className="relative h-40 bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-start p-4">
                  {item.popular && (
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Flame size={12} />
                      Popular
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-500">Top Rated</div>
                    <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                  </div>
                </div>
              )}
              
              {mode === 'takeaway' && item.takeawayPrice && (
                <div className="absolute right-0 top-0 bg-red-500 text-white p-2 rounded-bl-lg font-bold">
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
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
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
                    <Button
                      onClick={() => handleTakeawayOrder(item)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:brightness-105 flex items-center"
                    >
                      Order Now
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Information Dialog */}
      <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>
              Please provide your contact information to place your order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                placeholder="Your email address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                placeholder="Your phone number"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea 
                id="notes" 
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                placeholder="Any special instructions for your order"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Order Type</p>
              <RadioGroup 
                value={selectedOrderType} 
                onValueChange={setSelectedOrderType}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal Takeaway (15-20 min)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Express Takeaway (10 min)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCustomerForm(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={submitOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuSubcategory;
