
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('AuthGuard mounted');
    
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log('AuthGuard session check:', !!data.session);
      setAuthenticated(!!data.session);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('AuthGuard auth state changed:', event, !!session);
        setAuthenticated(!!session);
        setLoading(false);
      }
    );

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!authenticated) {
    console.log('AuthGuard redirecting to /auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log('AuthGuard rendering children');
  return <>{children}</>;
};

export default AuthGuard;
