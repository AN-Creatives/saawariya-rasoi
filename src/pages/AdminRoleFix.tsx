
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminRoleFix = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const email = 'saawariyarasoi12@gmail.com';

  const handleFixAdminRole = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First, get the current authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        throw new Error('Could not get current user: ' + authError.message);
      }
      
      if (!user) {
        throw new Error('No authenticated user found. Please sign in first.');
      }
      
      console.log('Current user:', user);
      
      // Check if the email matches the target admin email
      if (user.email !== email) {
        throw new Error(`You must be signed in as ${email} to perform this operation.`);
      }
      
      // Update the profile with admin role
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      setSuccess(true);
      toast({
        title: "Success!",
        description: "Your account has been updated to admin role. Please sign out and sign in again.",
      });
    } catch (error: any) {
      console.error('Error fixing admin role:', error);
      setError(error.message || 'An unexpected error occurred');
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'An unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth?type=admin';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Role Fix</CardTitle>
          <CardDescription>
            Fix admin privileges for {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success ? (
            <Alert>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Admin role has been assigned successfully! Please sign out and sign in again.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This utility will update the role of the user to 'admin' in the profiles table.
                After running this fix, you'll need to sign out and sign in again for the changes to take effect.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={handleFixAdminRole} 
            disabled={loading || success}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fixing Admin Role...
              </>
            ) : success ? (
              'Role Updated!'
            ) : (
              'Fix Admin Role'
            )}
          </Button>
          
          {success && (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={handleSignOut}
            >
              Sign Out Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminRoleFix;
