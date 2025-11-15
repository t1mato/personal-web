'use client';

/**
 * ThemeToggle Component
 *
 * A button that toggles between light and dark modes with smooth icon transitions.
 *
 * Features:
 * - Three-state cycle: System → Light → Dark → System
 * - Visual feedback: Icons change based on current theme
 * - Smooth transitions: Icon rotation and opacity animations
 * - Persistent preference: Choice saved to localStorage via next-themes
 *
 * Technical Implementation:
 * - useTheme hook from next-themes provides theme state and setter
 * - useState + useEffect pattern handles hydration safely (prevents mismatch errors)
 * - mounted state ensures component only renders after client-side hydration
 * - This prevents "flash of wrong theme" and React hydration errors
 *
 * Why useState for mounted?
 * - Server can't access localStorage (SSR vs client discrepancy)
 * - Rendering nothing until mounted prevents hydration mismatch
 * - After mount, we can safely read and display the correct theme
 *
 * Accessibility:
 * - aria-label provides context for screen readers
 * - Keyboard accessible (button is natively focusable)
 * - Clear visual focus states for keyboard navigation
 */

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /**
   * Set mounted to true after component mounts
   *
   * This ensures theme toggle only renders on client-side after hydration.
   * Without this, server-rendered HTML won't match client-rendered HTML
   * (server doesn't know user's theme preference from localStorage).
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Cycle through theme options
   *
   * Theme cycle: light → dark → light (simple toggle)
   * Alternative: Could add 'system' option for three-way toggle
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Return empty div during SSR to prevent hydration mismatch
  // Once mounted, this prevents layout shift by maintaining button space
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for light mode */}
      <Sun
        className={`absolute w-5 h-5 text-foreground transition-all duration-300 ${
          theme === 'dark'
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        }`}
      />

      {/* Moon icon for dark mode */}
      <Moon
        className={`absolute w-5 h-5 text-foreground transition-all duration-300 ${
          theme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
}
