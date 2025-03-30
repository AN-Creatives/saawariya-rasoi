
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string | null;
  role: 'admin' | 'editor' | 'viewer';
  address?: string | null;
  phone?: string | null;
}

// Helper function to ensure role is one of the allowed values
const validateRole = (role: string): 'admin' | 'editor' | 'viewer' => {
  if (role === 'admin' || role === 'editor' || role === 'viewer') {
    return role;
  }
  return 'viewer'; // Default fallback
};

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[useAuth] Hook initialized');
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('[useAuth] Auth state changed:', event, !!currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          console.log('[useAuth] User authenticated, fetching profile');
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();
          
          if (error) {
            console.error('[useAuth] Error fetching profile:', error);
          }
          
          if (profileData) {
            console.log('[useAuth] Profile loaded:', profileData);
            setProfile({
              id: profileData.id,
              full_name: profileData.full_name,
              role: validateRole(profileData.role),
              address: profileData.address,
              phone: profileData.phone
            });
          } else {
            console.log('[useAuth] No profile found for user');
            setProfile(null);
          }
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
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        console.log('[useAuth] Found existing user session, fetching profile');
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single();
        
        if (error) {
          console.error('[useAuth] Error fetching profile for existing session:', error);
        }
        
        if (profileData) {
          console.log('[useAuth] Existing profile loaded:', profileData);
          setProfile({
            id: profileData.id,
            full_name: profileData.full_name,
            role: validateRole(profileData.role),
            address: profileData.address,
            phone: profileData.phone
          });
        } else {
          console.log('[useAuth] No profile found for existing user');
        }
      } else {
        console.log('[useAuth] No existing session found');
      }
      
      setLoading(false);
    });

    return () => {
      console.log('[useAuth] Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log('[useAuth] Signing out user');
    await supabase.auth.signOut();
  };

  const isAuthenticated = !!session && !!user;
  console.log('[useAuth] Authentication state:', { isAuthenticated, loading, hasUser: !!user, hasSession: !!session });
  
  const isAdmin = !!profile && profile.role === 'admin';
  const isEditor = !!profile && (profile.role === 'editor' || profile.role === 'admin');

  return {
    session,
    user,
    profile,
    loading,
    signOut,
    isAuthenticated,
    isAdmin,
    isEditor
  };
}
