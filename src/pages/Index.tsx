
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedMenu from '@/components/FeaturedMenu';
import Testimonials from '@/components/Testimonials';
import DeliveryContent from '@/components/DeliveryContent';
import TakeawayContent from '@/components/TakeawayContent';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard } from 'lucide-react';

const Index = () => {
  const { mode } = useOrderMode();
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect admin users to dashboard
  useEffect(() => {
    if (!loading && isAuthenticated && isAdmin) {
      console.log('[Index] Admin user detected, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-6 py-8">
        {mode === 'delivery' ? <DeliveryContent /> : <TakeawayContent />}
        
        {isAuthenticated && isAdmin && (
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/dashboard">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </Button>
          </div>
        )}
      </div>
      <FeaturedMenu />
      <Testimonials />
    </Layout>
  );
};

export default Index;
