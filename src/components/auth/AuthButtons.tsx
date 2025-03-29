
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Skeleton } from '../ui/skeleton';

const AuthButtons = () => {
  const { loading, isAuthenticated, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignUp = () => {
    navigate('/auth?tab=signup');
  };

  if (loading) {
    return <Skeleton className="h-9 w-24 rounded-full" />;
  }

  if (isAuthenticated) {
    return (
      <div className="hidden md:flex items-center gap-2 ml-4">
        {isAdmin && (
          <Button
            variant="default"
            size="sm"
            className="gap-2"
            onClick={() => navigate('/dashboard')}
          >
            <User size={16} />
            Dashboard
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              <LogOut size={16} className="mr-2" />
              Log out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will need to log in again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSignOut}>Log out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center ml-4">
      <Button
        variant="default"
        size="sm"
        className="bg-saawariya-red hover:bg-saawariya-darkred"
        onClick={handleSignIn}
      >
        <LogIn size={16} className="mr-2" />
        Login / Sign up
      </Button>
    </div>
  );
};

export default AuthButtons;
