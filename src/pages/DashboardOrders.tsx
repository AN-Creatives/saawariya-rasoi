import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Eye, Trash2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Json } from '@/integrations/supabase/types';

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
type OrderType = 'delivery' | 'takeaway';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string | null;
  order_type: OrderType;
  order_items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  order_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface RawOrder {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string | null;
  order_type: string;
  order_items: Json;
  total_amount: number;
  status: string;
  order_notes: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const DashboardOrders = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'delivery' | 'takeaway'>('all');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const pageSize = 10;
  const { toast } = useToast();

  const fetchOrders = async ({ queryKey }: any) => {
    const [_, tab, status, pageNum] = queryKey;
    const startIndex = (pageNum - 1) * pageSize;
    
    let query = supabase
      .from('orders')
      .select('*', { count: 'exact' });
      
    if (tab !== 'all') {
      query = query.eq('order_type', tab);
    }
    
    if (status !== 'all') {
      query = query.eq('status', status);
    }
    
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(startIndex, startIndex + pageSize - 1);
      
    if (error) {
      throw new Error(error.message);
    }
    
    const transformedOrders: Order[] = (data as RawOrder[]).map(order => ({
      ...order,
      order_type: order.order_type as OrderType,
      status: order.status as OrderStatus,
      order_items: order.order_items as unknown as OrderItem[],
    }));
    
    return { orders: transformedOrders, totalCount: count || 0 };
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['orders', activeTab, statusFilter, page],
    queryFn: fetchOrders,
  });

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0;

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);
        
      if (error) throw error;
      
      refetch();
      
      toast({
        title: 'Order updated',
        description: `Order status changed to ${newStatus}`,
      });
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to update order: ${error.message}`,
      });
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
        
      if (error) throw error;
      
      refetch();
      
      toast({
        title: 'Order deleted',
        description: 'Order has been removed from the system',
      });
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setOrderDetailsOpen(false);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to delete order: ${error.message}`,
      });
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage customer delivery and takeaway orders
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value as 'all' | 'delivery' | 'takeaway');
          setPage(1);
        }}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Orders</TabsTrigger>
              <TabsTrigger value="takeaway">Takeaway Orders</TabsTrigger>
            </TabsList>

            <Select value={statusFilter} onValueChange={(value) => {
              setStatusFilter(value as OrderStatus | 'all');
              setPage(1);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="all" className="mt-4">
            <OrdersTable 
              isLoading={isLoading} 
              isError={isError} 
              orders={data?.orders || []} 
              viewOrderDetails={viewOrderDetails}
              deleteOrder={deleteOrder}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>

          <TabsContent value="delivery" className="mt-4">
            <OrdersTable 
              isLoading={isLoading} 
              isError={isError} 
              orders={data?.orders || []} 
              viewOrderDetails={viewOrderDetails}
              deleteOrder={deleteOrder}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>

          <TabsContent value="takeaway" className="mt-4">
            <OrdersTable 
              isLoading={isLoading} 
              isError={isError} 
              orders={data?.orders || []} 
              viewOrderDetails={viewOrderDetails}
              deleteOrder={deleteOrder}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>
        </Tabs>

        {!isLoading && !isError && data?.orders.length === 0 && (
          <div className="bg-background border rounded-lg py-10 text-center">
            <p className="text-muted-foreground">No orders found matching your filters</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {selectedOrder && (
        <AlertDialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl flex items-center justify-between">
                <span>Order Details</span>
                <Badge className={statusColors[selectedOrder.status]}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Badge>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mt-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-foreground font-medium">Customer Details</h3>
                      <div className="mt-2 space-y-2">
                        <p><span className="text-muted-foreground">Name:</span> {selectedOrder.customer_name}</p>
                        <p><span className="text-muted-foreground">Email:</span> {selectedOrder.email}</p>
                        <p><span className="text-muted-foreground">Phone:</span> {selectedOrder.phone}</p>
                        {selectedOrder.order_type === 'delivery' && (
                          <p><span className="text-muted-foreground">Address:</span> {selectedOrder.address}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium">Order Information</h3>
                      <div className="mt-2 space-y-2">
                        <p><span className="text-muted-foreground">Order Type:</span> {selectedOrder.order_type === 'delivery' ? 'Delivery' : 'Takeaway'}</p>
                        <p><span className="text-muted-foreground">Order Date:</span> {formatDate(selectedOrder.created_at)}</p>
                        <p><span className="text-muted-foreground">Last Updated:</span> {formatDate(selectedOrder.updated_at)}</p>
                        {selectedOrder.order_notes && (
                          <p><span className="text-muted-foreground">Notes:</span> {selectedOrder.order_notes}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-foreground font-medium mb-2">Order Items</h3>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.order_items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right">{item.quantity}</TableCell>
                              <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                            <TableCell className="text-right font-bold">₹{selectedOrder.total_amount.toFixed(2)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-foreground font-medium mb-2">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'].map((status) => (
                        <Button
                          key={status}
                          variant={selectedOrder.status === status ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateOrderStatus(selectedOrder.id, status as OrderStatus)}
                          disabled={selectedOrder.status === status}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-between items-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Order
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the order and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deleteOrder(selectedOrder.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DashboardLayout>
  );
};

interface OrdersTableProps {
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  viewOrderDetails: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const OrdersTable = ({ 
  isLoading, 
  isError, 
  orders, 
  viewOrderDetails,
  deleteOrder,
  updateOrderStatus
}: OrdersTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-md">
        Error loading orders. Please try again.
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>List of customer orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              {format(new Date(order.created_at), 'MMM dd, yyyy')}
              <div className="text-xs text-muted-foreground">
                {format(new Date(order.created_at), 'h:mm a')}
              </div>
            </TableCell>
            <TableCell>
              {order.customer_name}
              <div className="text-xs text-muted-foreground">{order.phone}</div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {order.order_type === 'delivery' ? 'Delivery' : 'Takeaway'}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge 
                className={statusColors[order.status]}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium">
              ₹{order.total_amount.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the order and cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => deleteOrder(order.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardOrders;
