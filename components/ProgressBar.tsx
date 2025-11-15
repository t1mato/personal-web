/**
 * Progress Bar Navigation Component
 *
 * A fixed navigation bar that shows scroll progress and allows quick jumping between sections.
 *
 * Features:
 * - Shows current section based on scroll position
 * - Clickable dots to jump to any section
 * - Smooth scroll behavior
 * - Visual progress indicator
 * - Tooltip labels on hover
 * - Responsive design (hides on mobile if needed)
 *
 * Technical Implementation:
 * - Uses IntersectionObserver to detect which section is in view
 * - Tracks scroll position with event listeners
 * - Fixed positioning at top of viewport
 * - Smooth scroll with native CSS scroll-behavior
 * - Active state management for current section
 *
 * Sections Tracked:
 * - Home, About, Skills, Projects, Contact
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function ProgressBar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Create intersection observer to detect which section is in view
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is at center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="fixed top-20 right-8 z-50 hidden lg:flex flex-col gap-3">
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;

        return (
          <div key={section.id} className="relative group">
            {/* Tooltip label */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-foreground text-background px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                {section.label}
              </div>
              {/* Arrow pointing to dot */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-foreground rotate-45" />
            </div>

            {/* Navigation dot */}
            <Link
              href={`#${section.id}`}
              className={`
                block w-3 h-3 rounded-full border-2 transition-all duration-300
                ${
                  isActive
                    ? 'bg-accent border-accent scale-125'
                    : 'bg-transparent border-foreground/30 hover:border-accent hover:scale-110'
                }
              `}
              aria-label={`Go to ${section.label}`}
            />

            {/* Connecting line (not shown for last item) */}
            {index < sections.length - 1 && (
              <div
                className={`
                  absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-3 transition-colors duration-300
                  ${
                    sections.findIndex((s) => s.id === activeSection) > index
                      ? 'bg-accent'
                      : 'bg-foreground/20'
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
