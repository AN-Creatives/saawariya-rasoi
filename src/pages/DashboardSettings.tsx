
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

const DashboardSettings = () => {
  const { isAdmin } = useAuth();
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const { toast } = useToast();

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex h-[500px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground mt-2">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleDatabaseReset = () => {
    // In a real app, this would connect to a secure endpoint to reset data
    // For this demo, we'll just show a success message
    toast({
      title: "Success",
      description: "Database has been reset to initial state",
    });
    setConfirmResetOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">
          Advanced configuration options for administrators.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>
              Configure global website settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage site-wide settings like site name, contact information, and SEO metadata.
            </p>
            <Button>Manage Site Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, remove, or update user accounts and set roles and permissions.
            </p>
            <Button>Manage Users</Button>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader className="text-destructive">
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-destructive/80">
              Potentially dangerous operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Reset database to initial state. This will delete all content and cannot be undone.
            </p>
            <Button 
              variant="destructive" 
              onClick={() => setConfirmResetOpen(true)}
            >
              Reset Database
            </Button>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={confirmResetOpen} onOpenChange={setConfirmResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
              This action is irreversible
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all database content to its initial state. All content, posts, and media will be permanently deleted.
              <br /><br />
              <span className="font-semibold">This action cannot be undone.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDatabaseReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Reset Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default DashboardSettings;
