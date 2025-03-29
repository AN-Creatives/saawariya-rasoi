
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import ModeToggle from '../ModeToggle';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, LogIn, LogOut } from 'lucide-react';

type NavLinkItem = {
  name: string;
  path: string;
};

interface MobileNavigationProps {
  navLinks: NavLinkItem[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignIn: () => void;
  handleSignUp: () => void;
  handleSignOut: () => void;
}

const MobileNavigation = ({ 
  navLinks,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleSignIn,
  handleSignUp,
  handleSignOut,
}: MobileNavigationProps) => {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  
  return (
    <>
      <button 
        className="block md:hidden text-foreground"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Navigation Overlay */}
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
          
          <div className="md:hidden mt-4 mb-6">
            <ModeToggle />
          </div>
          
          {loading ? (
            <div className="h-12 w-full bg-gray-200 animate-pulse rounded-full"></div>
          ) : isAuthenticated ? (
            <>
              {isAdmin && (
                <Button
                  variant="default"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/dashboard';
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
            <>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={() => {
                  handleSignIn();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogIn size={18} className="mr-2" />
                Log in
              </Button>
              <Button
                variant="default"
                className="w-full flex items-center justify-center gap-2 bg-saawariya-red hover:bg-saawariya-darkred"
                onClick={() => {
                  handleSignUp();
                  setIsMobileMenuOpen(false);
                }}
              >
                <User size={18} />
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
