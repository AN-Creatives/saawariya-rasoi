
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useOrderMode } from '@/contexts/OrderModeContext';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  // Separate component for auth button to avoid conditional rendering issues
  const AuthButton = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-full font-medium text-sm">
          Loading...
        </div>
      );
    }
    
    if (user) {
      return (
        <Button 
          onClick={signOut}
          className="flex items-center gap-2 px-4 py-2 bg-saawariya-red text-white rounded-full font-medium text-sm transition-all hover:brightness-105 hover-lift"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      );
    }
    
    return (
      <Link 
        to="/auth" 
        className="flex items-center gap-2 px-4 py-2 bg-saawariya-red text-white rounded-full font-medium text-sm transition-all hover:brightness-105 hover-lift"
      >
        <LogIn size={16} />
        <span>Login</span>
      </Link>
    );
  };

  // Mobile version of the auth button
  const MobileAuthButton = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-300 text-gray-600 rounded-full font-medium w-full mt-4">
          Loading...
        </div>
      );
    }
    
    if (user) {
      return (
        <Button 
          onClick={() => {
            signOut();
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-saawariya-red text-white rounded-full font-medium w-full mt-4 hover:brightness-105"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      );
    }
    
    return (
      <Link 
        to="/auth" 
        className="flex items-center justify-center gap-2 px-8 py-3 bg-saawariya-red text-white rounded-full font-medium w-full mt-4 hover:brightness-105"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <LogIn size={18} />
        <span>Login</span>
      </Link>
    );
  };

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
            
            {/* Auth Button - Always visible on desktop */}
            <div className="hidden md:block">
              <AuthButton />
            </div>
            
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
          
          {/* Mobile Auth Button */}
          <MobileAuthButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
