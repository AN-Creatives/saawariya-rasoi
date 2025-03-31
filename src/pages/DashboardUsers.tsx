
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Eye, Loader2, User, ShieldAlert } from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

const DashboardUsers = () => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<string>('');
  const pageSize = 10;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all user profiles
  const fetchUsers = async () => {
    const startIndex = (page - 1) * pageSize;
    
    try {
      // Get all profiles
      const { data: profiles, count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('role', { ascending: true })
        .order('created_at', { ascending: false })
        .range(startIndex, startIndex + pageSize - 1);

      if (error) throw error;
      
      return { 
        users: profiles as UserProfile[], 
        totalCount: count || 0 
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load user data',
      });
      return { users: [], totalCount: 0 };
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', page],
    queryFn: fetchUsers,
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);
      
      if (error) throw error;
      return { userId, role };
    },
    onSuccess: (data) => {
      toast({
        title: 'Role updated',
        description: `User role has been updated to ${data.role}`,
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setRoleDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update user role',
      });
    },
  });

  const handleUpdateRole = () => {
    if (selectedUser && newRole) {
      updateRoleMutation.mutate({
        userId: selectedUser.id,
        role: newRole
      });
    }
  };

  const openRoleDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setRoleDialogOpen(true);
  };

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0;

  const viewUserDetails = (user: UserProfile) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500 hover:bg-red-600">Admin</Badge>;
      case 'editor':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Editor</Badge>;
      case 'customer':
        return <Badge className="bg-green-500 hover:bg-green-600">Customer</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">{role}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all registered users and their roles
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Showing all registered users across all roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isError ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                Error loading users. Please try again.
              </div>
            ) : data && data.users.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No users found.
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableCaption>List of all registered users</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data && data.users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.full_name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {getRoleBadge(user.role)}
                          </TableCell>
                          <TableCell>
                            {formatDate(user.created_at)}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => viewUserDetails(user)}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => openRoleDialog(user)}>
                              <ShieldAlert className="h-4 w-4 mr-1" /> Role
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

      {/* User Details Modal */}
      {selectedUser && (
        <AlertDialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">
                User Details
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-foreground">
                  <div>
                    <p className="text-muted-foreground text-sm">Name</p>
                    <p className="font-medium">{selectedUser.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Role</p>
                    <p className="font-medium">{getRoleBadge(selectedUser.role)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Registration Date</p>
                    <p className="font-medium">{formatDate(selectedUser.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Phone</p>
                    <p className="font-medium">{selectedUser.phone || "Not provided"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground text-sm">ID</p>
                    <p className="font-medium text-xs truncate">{selectedUser.id}</p>
                  </div>
                </div>
                {selectedUser.address && (
                  <div>
                    <p className="text-muted-foreground text-sm">Address</p>
                    <p className="font-medium">{selectedUser.address}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Role Management Dialog */}
      {selectedUser && (
        <AlertDialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update User Role</AlertDialogTitle>
              <AlertDialogDescription>
                Change the role for {selectedUser.full_name || "this user"}. This will modify their permissions in the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="py-4">
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleUpdateRole}
                disabled={updateRoleMutation.isPending}
              >
                {updateRoleMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Updating...
                  </>
                ) : (
                  "Update Role"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DashboardLayout>
  );
};

export default DashboardUsers;
