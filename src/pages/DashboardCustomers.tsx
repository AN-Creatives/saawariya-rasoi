
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useToast } from '@/components/ui/use-toast';
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Eye, Loader2 } from 'lucide-react';

interface CustomerProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  email?: string; // From auth.users
}

const DashboardCustomers = () => {
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
  const pageSize = 10;
  const { toast } = useToast();

  // Fetch customer profiles
  const fetchCustomers = async () => {
    const startIndex = (page - 1) * pageSize;
    
    try {
      // First get profiles with role 'customer'
      const { data: profiles, count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('role', 'customer')
        .order('created_at', { ascending: false })
        .range(startIndex, startIndex + pageSize - 1);

      if (error) throw error;

      // For each profile, get the email from auth (if possible using the current admin privileges)
      // Note: We might not be able to get emails directly due to Supabase security model
      // This is just for UI display, the profiles data is secured by RLS
      
      return { 
        customers: profiles as CustomerProfile[], 
        totalCount: count || 0 
      };
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load customer data',
      });
      return { customers: [], totalCount: 0 };
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['customers', page],
    queryFn: fetchCustomers,
  });

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0;

  const viewCustomerDetails = (customer: CustomerProfile) => {
    setSelectedCustomer(customer);
    setCustomerDetailsOpen(true);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage registered customers
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Customers</CardTitle>
            <CardDescription>
              Showing all users with the customer role
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isError ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                Error loading customers. Please try again.
              </div>
            ) : data && data.customers.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No customers found.
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableCaption>List of registered customers</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data && data.customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">
                            {customer.full_name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {formatDate(customer.created_at)}
                          </TableCell>
                          <TableCell>
                            {customer.phone || "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => viewCustomerDetails(customer)}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-4">
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
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <AlertDialog open={customerDetailsOpen} onOpenChange={setCustomerDetailsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">
                Customer Details
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-foreground">
                  <div>
                    <p className="text-muted-foreground text-sm">Name</p>
                    <p className="font-medium">{selectedCustomer.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Registration Date</p>
                    <p className="font-medium">{formatDate(selectedCustomer.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Phone</p>
                    <p className="font-medium">{selectedCustomer.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">ID</p>
                    <p className="font-medium text-xs truncate">{selectedCustomer.id}</p>
                  </div>
                </div>
                {selectedCustomer.address && (
                  <div>
                    <p className="text-muted-foreground text-sm">Address</p>
                    <p className="font-medium">{selectedCustomer.address}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DashboardLayout>
  );
};

export default DashboardCustomers;
