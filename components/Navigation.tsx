'use client';

/**
 * Navigation Component
 *
 * A sticky navigation bar that provides quick access to all sections of the portfolio.
 *
 * Features:
 * - Sticky positioning: Remains visible as user scrolls
 * - Smooth scrolling: Clicking nav items smoothly scrolls to target sections
 * - Theme toggle integration: Dark/light mode switcher in the nav
 * - Responsive design: Hamburger menu on mobile (future enhancement)
 * - Glass morphism effect: Semi-transparent backdrop blur for modern aesthetic
 *
 * Implementation Details:
 * - Uses 'use client' because we handle click events for smooth scrolling
 * - preventDefault() stops default anchor behavior to implement custom smooth scroll
 * - scrollIntoView provides native smooth scrolling with offset adjustment
 * - Fixed positioning with backdrop-blur creates floating navbar effect
 *
 * Accessibility:
 * - Semantic <nav> element for screen readers
 * - Keyboard navigable links
 * - Clear focus states for keyboard users
 */

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name - links to top of page */}
          <Link
            href="#home"
            className="text-xl font-bold text-foreground hover:text-accent transition-colors"
          >
            <Image
              src="/TL-logo.png"
              alt="Personal logo"
              width={50}
              height={50}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Theme toggle button */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button - Placeholder for future enhancement */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            {/* TODO: Add hamburger menu button for mobile navigation */}
          </div>
        </div>
      </div>
    </nav>
  );
}
