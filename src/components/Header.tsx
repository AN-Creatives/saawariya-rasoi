import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { loading, isAuthenticated, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleAuthNavigation = (tab?: 'signin' | 'signup') => {
    navigate(`/auth${tab === 'signup' ? '?tab=signup' : ''}`);
  };

  console.log('[Header] Auth state:', { loading, isAuthenticated, isAdmin });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'py-2 glass-morphism border-b border-white/10' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'text-white bg-saawariya-red' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-secondary/50'
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <ModeToggle />
            
            {loading ? (
              <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-full"></div>
            ) : isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                {isAdmin && (
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2"
                    onClick={() => navigate('/dashboard')}
                  >
                    <User size={16} />
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} className="mr-2" />
                  Log out
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-saawariya-red hover:bg-saawariya-darkred"
                  >
                    <LogIn size={16} className="mr-2" />
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Welcome to Saawariya Rasoi</DialogTitle>
                    <DialogDescription>
                      Sign in to your account or create a new one to get started.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => handleAuthNavigation('signin')}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAuthNavigation('signup')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Create Account
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            <button 
              className="block md:hidden text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 glass-morphism backdrop-blur-md z-40 transition-opacity duration-300 md:hidden',
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                'px-8 py-3 rounded-full text-lg font-medium transition-all w-full text-center',
                isActive 
                  ? 'text-white bg-saawariya-red' 
                  : 'text-foreground/80 hover:text-foreground hover:bg-secondary/30'
              )}
            >
              {link.name}
            </NavLink>
          ))}
          
          {loading ? (
            <div className="h-12 w-full bg-gray-200 animate-pulse rounded-full"></div>
          ) : isAuthenticated ? (
            <>
              {isAdmin && (
                <Button
                  variant="default"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User size={18} />
                  Dashboard
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut size={18} className="mr-2" />
                Log out
              </Button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="w-full bg-saawariya-red hover:bg-saawariya-darkred"
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Welcome to Saawariya Rasoi</DialogTitle>
                  <DialogDescription>
                    Sign in to your account or create a new one to get started.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                      handleAuthNavigation('signin');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleAuthNavigation('signup');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Create Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
