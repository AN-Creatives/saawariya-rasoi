
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string | null;
  role: 'admin' | 'editor' | 'viewer';
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
    console.log("useAuth hook initializing");
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, !!currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();
          
          if (profileData) {
            // Only set admin role if the email matches the designated admin email
            const role = profileData.role;
            const isDesignatedAdmin = currentSession.user.email === 'saawariyarasoi12@gmail.com';
            
            setProfile({
              id: profileData.id,
              full_name: profileData.full_name,
              // Override role to admin only if it's the designated admin email
              role: isDesignatedAdmin && role === 'admin' ? 'admin' : validateRole(role)
            });
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("Initial session check:", !!currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single();
        
        if (profileData) {
          // Only set admin role if the email matches the designated admin email
          const role = profileData.role;
          const isDesignatedAdmin = currentSession.user.email === 'saawariyarasoi12@gmail.com';
          
          setProfile({
            id: profileData.id,
            full_name: profileData.full_name,
            // Override role to admin only if it's the designated admin email
            role: isDesignatedAdmin && role === 'admin' ? 'admin' : validateRole(role)
          });
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log("Signing out user");
    await supabase.auth.signOut();
  };

  const isAdmin = !!profile && profile.role === 'admin' && user?.email === 'saawariyarasoi12@gmail.com';
  const isEditor = !!profile && (profile.role === 'editor' || profile.role === 'admin');

  return {
    session,
    user,
    profile,
    loading,
    signOut,
    isAuthenticated: !!user,
    isAdmin,
    isEditor
  };
}
