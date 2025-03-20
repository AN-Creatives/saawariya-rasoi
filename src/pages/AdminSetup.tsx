
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdminUser } from '@/utils/createAdminUser';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const email = 'admin@saawariyarasoi.shop';
  const password = 'Saawariya@123';
  const fullName = 'Saawariya Admin';

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/auth');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleCreateAdmin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await createAdminUser(email, password, fullName);
      
      if (result.success) {
        setSuccess(true);
        toast({
          title: "Success!",
          description: "Admin account created successfully. Redirecting to login page...",
        });
      } else {
        setError(result.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        });
      }
    } catch (error: any) {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Saawariya Rasoi Admin Setup</CardTitle>
          <CardDescription>
            Create an admin account for the dashboard
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
                Admin account created successfully! Redirecting to login page...
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Password:</strong> {password}</p>
                <p><strong>Role:</strong> Admin</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Clicking the button below will create an admin account with these credentials.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleCreateAdmin} 
            disabled={loading || success}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Admin...
              </>
            ) : success ? (
              'Admin Created!'
            ) : (
              'Create Admin Account'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSetup;
