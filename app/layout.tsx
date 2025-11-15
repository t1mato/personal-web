/**
 * Root Layout Component
 *
 * The main layout wrapper for the entire application.
 *
 * Key Features:
 * - Custom fonts: Geist (sans-serif) and Geist Mono (monospace) for clean, modern typography
 * - Theme provider integration: Enables dark/light mode switching across the app
 * - SEO optimization: Comprehensive metadata for search engines and social sharing
 *
 * Technical Notes:
 * - suppressHydrationWarning on <html>: Required for next-themes to prevent hydration mismatch
 *   errors when the theme is restored from localStorage on client mount
 * - Font variables are applied globally via CSS custom properties for flexible usage
 * - antialiased class ensures smooth font rendering across browsers
 */

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Space Grotesk: Modern geometric sans-serif with character
// Perfect for tech portfolios with its clean, contemporary look
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Inter: Industry-standard font used by GitHub, Figma, and Fortune 500 companies
// Clean, highly readable, and perfect for showcasing technical skills
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Timothy Lee | Software Engineer",
  description: "Portfolio website of an aspiring software engineer showcasing projects, skills, and experience.",
  keywords: ["software engineer", "developer", "portfolio", "web development", "full stack"],
  authors: [{ name: "Timothy Lee" }],
  creator: "Timothy Lee",
  // Open Graph metadata for social media previews (LinkedIn, Twitter, Facebook)
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Timothy Lee - Portfolio",
    title: "Timothy Lee | Software Engineer",
    description: "Portfolio website showcasing software engineering projects and skills",
  },
  // Twitter Card metadata for enhanced Twitter/X previews
  twitter: {
    card: "summary_large_image",
    title: "Timothy Lee | Software Engineer",
    description: "Portfolio website showcasing software engineering projects and skills",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: Prevents console warnings when next-themes
    // modifies the class attribute before React hydration completes
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {/* ThemeProvider must wrap all content to provide theme context */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
