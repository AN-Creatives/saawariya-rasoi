
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderModeProvider } from "@/contexts/OrderModeContext";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Auth from "./pages/Auth";
import AdminSetup from "./pages/AdminSetup";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardContent from "./pages/DashboardContent";
import DashboardPosts from "./pages/DashboardPosts";
import DashboardMedia from "./pages/DashboardMedia";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardOrders from "./pages/DashboardOrders";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrderModeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin-setup" element={<AdminSetup />} />
            
            {/* Customer Dashboard Routes */}
            <Route path="/customer" element={<AuthGuard customerOnly={true}><CustomerDashboard /></AuthGuard>} />
            <Route path="/customer/profile" element={<AuthGuard customerOnly={true}><CustomerProfile /></AuthGuard>} />
            
            {/* Protected Dashboard Routes - Admin Only */}
            <Route path="/dashboard" element={<AuthGuard adminOnly={true}><AdminDashboard /></AuthGuard>} />
            <Route path="/dashboard/content" element={<AuthGuard adminOnly={true}><DashboardContent /></AuthGuard>} />
            <Route path="/dashboard/posts" element={<AuthGuard adminOnly={true}><DashboardPosts /></AuthGuard>} />
            <Route path="/dashboard/media" element={<AuthGuard adminOnly={true}><DashboardMedia /></AuthGuard>} />
            <Route path="/dashboard/profile" element={<AuthGuard><DashboardProfile /></AuthGuard>} />
            <Route path="/dashboard/settings" element={<AuthGuard adminOnly={true}><DashboardSettings /></AuthGuard>} />
            <Route path="/dashboard/orders" element={<AuthGuard adminOnly={true}><DashboardOrders /></AuthGuard>} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OrderModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
