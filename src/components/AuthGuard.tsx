
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
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("AuthGuard: Checking authentication");
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      console.log("AuthGuard: Session retrieved", !!session);
      
      if (session) {
        const userEmail = session.user.email;
        console.log("AuthGuard: User email", userEmail);
        
        // Check if user is admin (has the specific email)
        const isAdminUser = userEmail === 'saawariyarasoi12@gmail.com';
        console.log("AuthGuard: Is admin?", isAdminUser);
        
        setIsAdmin(isAdminUser);
        setAuthenticated(true);
      } else {
        setIsAdmin(false);
        setAuthenticated(false);
      }
      
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AuthGuard: Auth state changed", event);
        
        if (session) {
          const userEmail = session.user.email;
          console.log("AuthGuard: User email updated", userEmail);
          
          // Check if user is admin (has the specific email)
          const isAdminUser = userEmail === 'saawariyarasoi12@gmail.com';
          console.log("AuthGuard: Is admin updated?", isAdminUser);
          
          setIsAdmin(isAdminUser);
          setAuthenticated(true);
        } else {
          setIsAdmin(false);
          setAuthenticated(false);
        }
        
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
    console.log("AuthGuard: Not authenticated, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    console.log("AuthGuard: Not admin, redirecting to /");
    return <Navigate to="/" replace />;
  }

  console.log("AuthGuard: Authentication passed, rendering children");
  return <>{children}</>;
};

export default AuthGuard;
