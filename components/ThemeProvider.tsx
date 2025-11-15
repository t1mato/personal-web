'use client';

/**
 * ThemeProvider Component
 *
 * Wraps the application with next-themes ThemeProvider to enable dark/light mode functionality.
 *
 * Implementation Notes:
 * - Uses 'use client' directive because next-themes relies on client-side localStorage and window object
 * - attribute="class" ensures theme changes apply via className (dark/light) on the html element
 * - enableSystem={true} allows automatic detection of user's OS preference (prefers-color-scheme)
 * - defaultTheme="system" respects the user's system preference on first visit
 * - disableTransitionOnChange prevents jarring CSS transitions when theme switches
 *
 * Usage:
 * Wrap this provider around the app's children in the root layout.tsx file
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
