
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Edit, FileText, ImageIcon, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const [contentCount, setContentCount] = useState<number | null>(null);
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [ordersCount, setOrdersCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [contentResult, postsResult, ordersResult] = await Promise.all([
          supabase.from('content').select('id', { count: 'exact', head: true }),
          supabase.from('posts').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id', { count: 'exact', head: true })
        ]);
        
        setContentCount(contentResult.count);
        setPostsCount(postsResult.count);
        setOrdersCount(ordersResult.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {profile?.full_name || 'User'}. Manage your restaurant website content here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Content Sections</CardTitle>
            <CardDescription>Manage website content sections</CardDescription>
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
                    <Edit className="mr-2 h-4 w-4" /> Manage Content
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Blog Posts</CardTitle>
            <CardDescription>Manage blog articles</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold">{postsCount || 0}</div>
                <p className="text-sm text-muted-foreground">Published and draft posts</p>
                <Button className="mt-4 w-full" asChild>
                  <Link to="/dashboard/posts">
                    <FileText className="mr-2 h-4 w-4" /> Manage Posts
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

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
            <CardTitle className="text-lg">Media Library</CardTitle>
            <CardDescription>Manage images and files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">-</div>
            <p className="text-sm text-muted-foreground">Uploaded media files</p>
            <Button className="mt-4 w-full" asChild>
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

export default Dashboard;
