
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, ImageIcon, ShoppingBag, BarChart, Users } from 'lucide-react';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [contentCount, setContentCount] = useState<number | null>(null);
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [ordersCount, setOrdersCount] = useState<number | null>(null);
  const [customersCount, setCustomersCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [contentResult, postsResult, ordersResult, customersResult] = await Promise.all([
          supabase.from('content').select('id', { count: 'exact', head: true }),
          supabase.from('posts').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id', { count: 'exact', head: true }),
          supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'customer')
        ]);
        
        setContentCount(contentResult.count);
        setPostsCount(postsResult.count);
        setOrdersCount(ordersResult.count);
        setCustomersCount(customersResult.count);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {profile?.full_name || 'Admin'}. Manage your restaurant website and business here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Orders</CardTitle>
            <CardDescription>Manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold">{ordersCount || 0}</div>
                <p className="text-sm text-muted-foreground">Delivery & takeaway orders</p>
                <Button className="mt-4 w-full" asChild>
                  <Link to="/dashboard/orders">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Manage Orders
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Customers</CardTitle>
            <CardDescription>View customer information</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold">{customersCount || 0}</div>
                <p className="text-sm text-muted-foreground">Registered customers</p>
                <Button className="mt-4 w-full" asChild variant="outline">
                  <Link to="/dashboard/customers">
                    <Users className="mr-2 h-4 w-4" /> View Customers
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Content Sections</CardTitle>
            <CardDescription>Manage website content</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold">{contentCount || 0}</div>
                <p className="text-sm text-muted-foreground">Total content sections</p>
                <Button className="mt-4 w-full" asChild>
                  <Link to="/dashboard/content">
                    <FileText className="mr-2 h-4 w-4" /> Manage Content
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Analytics</CardTitle>
            <CardDescription>Business performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">-</div>
            <p className="text-sm text-muted-foreground">View sales and metrics</p>
            <Button className="mt-4 w-full" asChild variant="outline">
              <Link to="/dashboard/analytics">
                <BarChart className="mr-2 h-4 w-4" /> View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <CardDescription>Last 5 orders received</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Button className="w-full" asChild>
                <Link to="/dashboard/orders">
                  <ShoppingBag className="mr-2 h-4 w-4" /> View All Orders
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Website Management</CardTitle>
            <CardDescription>Manage your website content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline" asChild>
              <Link to="/dashboard/posts">
                <FileText className="mr-2 h-4 w-4" /> Blog Posts
              </Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/dashboard/media">
                <ImageIcon className="mr-2 h-4 w-4" /> Media Library
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
