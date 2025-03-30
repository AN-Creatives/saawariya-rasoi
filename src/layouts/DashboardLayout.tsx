
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ShoppingBag,
  User,
  Clock,
  Home,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isCustomerView?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  isCustomerView = false
}) => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/auth');
  };

  const getName = () => {
    if (profile?.full_name) return profile.full_name;
    return user?.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  const adminMenuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
    },
    {
      name: 'Content',
      icon: <FileText size={20} />,
      path: '/dashboard/content',
    },
    {
      name: 'Blog Posts',
      icon: <FileText size={20} />,
      path: '/dashboard/posts',
    },
    {
      name: 'Orders',
      icon: <ShoppingBag size={20} />,
      path: '/dashboard/orders',
    },
    {
      name: 'Media',
      icon: <ImageIcon size={20} />,
      path: '/dashboard/media',
    },
    ...(isAdmin ? [
      {
        name: 'Settings',
        icon: <Settings size={20} />,
        path: '/dashboard/settings',
      },
    ] : []),
  ];

  const customerMenuItems = [
    {
      name: 'Dashboard',
      icon: <Home size={20} />,
      path: '/customer',
    },
    {
      name: 'My Profile',
      icon: <User size={20} />,
      path: '/customer/profile',
    },
    {
      name: 'My Orders',
      icon: <ShoppingBag size={20} />,
      path: '/customer/orders',
    },
    {
      name: 'Activity',
      icon: <Clock size={20} />,
      path: '/customer/activity',
    }
  ];

  const menuItems = isCustomerView ? customerMenuItems : adminMenuItems;

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-background shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center space-x-2 py-6">
            <Link to="/" className="text-2xl font-bold">
              Saawariya Rasoi
            </Link>
          </div>

          <Separator />

          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{getName()}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {profile?.role || 'User'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={isCustomerView ? "/customer/profile" : "/dashboard/profile"}>Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/">Go to Website</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
