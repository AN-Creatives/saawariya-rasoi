
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  customerOnly?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  adminOnly = false, 
  customerOnly = false 
}) => {
  const { loading, isAuthenticated, isAdmin, isCustomer, profile } = useAuth();
  const location = useLocation();
  
  console.log('[AuthGuard] Current state:', { loading, isAuthenticated, isAdmin, isCustomer, path: location.pathname, adminOnly, customerOnly, profile });

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

  // Handle missing profile case - create one if needed
  if (!profile) {
    console.log('[AuthGuard] No profile exists for authenticated user, showing loading');
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Setting up user profile...</span>
      </div>
    );
  }

  // Check for admin access if adminOnly is true
  if (adminOnly && !isAdmin) {
    console.log('[AuthGuard] Not an admin, redirecting to customer dashboard');
    return <Navigate to="/customer/profile" state={{ from: location }} replace />;
  }

  // Check for customer-only pages
  if (customerOnly && isAdmin) {
    console.log('[AuthGuard] Admin accessing customer page, redirecting to admin dashboard');
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // Allow access to children if authenticated and has proper permissions
  console.log('[AuthGuard] Authenticated with proper permissions, rendering children');
  return <>{children}</>;
};

export default AuthGuard;
