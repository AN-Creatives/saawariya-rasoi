
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ModeToggle from '../ModeToggle';

type NavLinkItem = {
  name: string;
  path: string;
};

interface DesktopNavigationProps {
  navLinks: NavLinkItem[];
}

const DesktopNavigation = ({ navLinks }: DesktopNavigationProps) => {
  return (
    <div className="hidden md:flex items-center justify-between flex-1 ml-6">
      <div className="flex items-center gap-6">
        <nav className="flex items-center space-x-1">
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
        
        {/* Mode Toggle positioned to the right of nav links */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default DesktopNavigation;
