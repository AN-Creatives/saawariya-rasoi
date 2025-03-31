
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string | null;
  role: 'admin' | 'editor' | 'viewer' | 'customer';
  phone: string | null;
  address: string | null;
}

// Helper function to ensure role is one of the allowed values
const validateRole = (role: string): 'admin' | 'editor' | 'viewer' | 'customer' => {
  if (role === 'admin' || role === 'editor' || role === 'viewer' || role === 'customer') {
    return role;
  }
  return 'viewer'; // Default fallback
};

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile - extracted to reuse
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('[useAuth] Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('[useAuth] Error fetching profile:', error);
        return null;
      }
      
      if (data) {
        console.log('[useAuth] Profile loaded:', data);
        const validatedProfile = {
          id: data.id,
          full_name: data.full_name,
          role: validateRole(data.role),
          phone: data.phone || null,
          address: data.address || null
        };
        setProfile(validatedProfile);
        return validatedProfile;
      } else {
        console.log('[useAuth] No profile found for user');
        return null;
      }
    } catch (e) {
      console.error('[useAuth] Exception fetching profile:', e);
      return null;
    }
  };

  useEffect(() => {
    console.log('[useAuth] Hook initialized');
    let mounted = true;
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('[useAuth] Auth state changed:', event, !!currentSession);
        
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          console.log('[useAuth] User authenticated, fetching profile');
          // Use setTimeout to prevent recursion issues
          setTimeout(() => {
            if (mounted) {
              fetchUserProfile(currentSession.user.id);
            }
          }, 0);
        } else {
          console.log('[useAuth] No user session, clearing profile');
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('[useAuth] Existing session check:', !!currentSession);
      
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        console.log('[useAuth] Found existing user session, fetching profile');
        await fetchUserProfile(currentSession.user.id);
      } else {
        console.log('[useAuth] No existing session found');
      }
      
      setLoading(false);
    });

    return () => {
      console.log('[useAuth] Cleaning up subscription');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Manually refresh the user profile - can be called when needed
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signOut = async () => {
    console.log('[useAuth] Signing out user');
    await supabase.auth.signOut();
  };

  const isAuthenticated = !!session && !!user;
  console.log('[useAuth] Authentication state:', { isAuthenticated, loading, hasUser: !!user, hasSession: !!session, role: profile?.role });
  
  // User role checks with null safety
  const isAdmin = !!profile && profile.role === 'admin';
  const isEditor = !!profile && (profile.role === 'editor' || profile.role === 'admin');
  const isCustomer = !!profile && profile.role === 'customer';

  // Updated with additional profile fields and refreshProfile function
  return {
    session,
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
    isAuthenticated,
    isAdmin,
    isEditor,
    isCustomer
  };
}
