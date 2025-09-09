'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#estimator', label: 'Cost Estimator' },
  { href: '#payment', label: 'Payment' },
  { href: '#about', label: 'About Us' },
  { href: '#team', label: 'Team' },
  { href: '#social-media', label: 'Social Media' },
  { href: '#appointment', label: 'Appointment' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-auto"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <rect width="100" height="100" rx="15" fill="url(#logoGradient)" />
            <text
              x="50%"
              y="50%"
              dy=".3em"
              textAnchor="middle"
              fontSize="50"
              fontWeight="bold"
              fill="white"
            >
              SA
            </text>
          </svg>
          <span className="text-2xl font-bold gradient-text">SarAfra Technologies</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground font-medium transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="#appointment" className="hidden md:block">
          <Button className="btn-primary font-medium rounded-full" size="sm">Get Started</Button>
        </a>

        {/* Mobile Menu Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          id="mobile-menu-button"
          aria-label="Toggle mobile menu"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden bg-background shadow-lg transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block px-4 py-2 text-muted-foreground hover:bg-muted/50 transition duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <div className="px-4 pt-2">
          <a href="#appointment" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
             <Button className="btn-primary font-medium rounded-full w-full">Get Started</Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
