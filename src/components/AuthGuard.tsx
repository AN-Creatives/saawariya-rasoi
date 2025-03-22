
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  console.log('[AuthGuard] Current state:', { loading, isAuthenticated, path: location.pathname });

  // Always show loading state when authentication is being checked
  if (loading) {
    console.log('[AuthGuard] Loading authentication state...');
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  // Redirect to auth page if not authenticated
  if (!isAuthenticated) {
    console.log('[AuthGuard] Not authenticated, redirecting to /auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Allow access to children if authenticated
  console.log('[AuthGuard] Authenticated, rendering children');
  return <>{children}</>;
};

export default AuthGuard;
