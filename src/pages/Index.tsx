
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
import { LayoutDashboard, User, Users } from 'lucide-react';

const Index = () => {
  const { mode } = useOrderMode();
  const { isAuthenticated, isAdmin, isCustomer, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect users based on roles
  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (isAdmin) {
        console.log('[Index] Admin user detected, redirecting to admin dashboard');
        navigate('/dashboard');
      } else if (isCustomer) {
        console.log('[Index] Customer user detected, redirecting to customer dashboard');
        navigate('/customer');
      }
    }
  }, [isAuthenticated, isAdmin, isCustomer, loading, navigate]);

  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-6 py-8">
        {mode === 'delivery' ? <DeliveryContent /> : <TakeawayContent />}
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {isAuthenticated && isAdmin && (
            <Button asChild variant="default" className="gap-2">
              <Link to="/dashboard">
                <LayoutDashboard size={18} />
                Admin Dashboard
              </Link>
            </Button>
          )}
          
          {isAuthenticated && isCustomer && (
            <Button asChild variant="outline" className="gap-2">
              <Link to="/customer">
                <User size={18} />
                My Account
              </Link>
            </Button>
          )}
          
          {!isAuthenticated && (
            <>
              <Button asChild variant="default" className="gap-2">
                <Link to="/auth">
                  <User size={18} />
                  Customer Login
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="gap-2">
                <Link to="/auth?type=admin">
                  <Users size={18} />
                  Admin Login
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <FeaturedMenu />
      <Testimonials />
    </Layout>
  );
};

export default Index;
