
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Clock } from 'lucide-react';

const CustomerDashboard = () => {
  const { profile } = useAuth();

  return (
    <DashboardLayout isCustomerView={true}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {profile?.full_name || 'Customer'}. Manage your account and orders here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update your contact details, address, and account settings
            </p>
            <Button className="w-full" asChild>
              <Link to="/customer/profile">
                <User className="mr-2 h-4 w-4" /> View Profile
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Orders</CardTitle>
            <CardDescription>Track your order history</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View status and details of your past and current orders
            </p>
            <Button className="w-full" asChild>
              <Link to="/customer/orders">
                <ShoppingBag className="mr-2 h-4 w-4" /> View Orders
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Your recent interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              See your recent orders and account activities
            </p>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/customer/activity">
                <Clock className="mr-2 h-4 w-4" /> View Activity
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
