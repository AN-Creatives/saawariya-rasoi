
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, ShoppingBag, User } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from '@/components/Layout';

interface Order {
  id: string;
  order_type: 'delivery' | 'takeaway';
  total_price: number;
  payment_status: string;
  order_date: string;
  order_status?: string;
  delivery_status?: string;
}

const CustomerDashboard = () => {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'delivery' | 'takeaway'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let query = supabase
          .from('orders')
          .select('*')
          .eq('user_id', profile?.id || '')
          .order('order_date', { ascending: false });
        
        if (activeTab !== 'all') {
          query = query.eq('order_type', activeTab);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (profile?.id) {
      fetchOrders();
    }
  }, [profile, activeTab]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'out_for_delivery':
      case 'ready_for_pickup':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {profile?.full_name || 'Customer'}. View your order history and manage your profile.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{profile?.full_name || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{profile?.phone || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{profile?.address || 'Not set'}</p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/customer/profile">
                  <User className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Recent Orders</CardTitle>
              <CardDescription>Your most recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="mb-4">
                <Link to="/order">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Place New Order
                </Link>
              </Button>
              
              <Tabs value={activeTab} onValueChange={(value) => {
                setActiveTab(value as 'all' | 'delivery' | 'takeaway');
              }}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Orders</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery</TabsTrigger>
                  <TabsTrigger value="takeaway">Takeaway</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab}>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">You don't have any orders yet.</p>
                      <Button className="mt-4" asChild>
                        <Link to="/menu">Browse Menu</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{formatDate(order.order_date)}</TableCell>
                              <TableCell className="capitalize">{order.order_type}</TableCell>
                              <TableCell>
                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                  getStatusBadgeClass(order.order_type === 'delivery' 
                                    ? order.delivery_status || 'pending'
                                    : order.order_status || 'pending')
                                }`}>
                                  {order.order_type === 'delivery' 
                                    ? (order.delivery_status || 'Pending').replace(/_/g, ' ')
                                    : (order.order_status || 'Pending').replace(/_/g, ' ')}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">₹{Number(order.total_price).toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
