/**
 * Home Page Component
 *
 * The main landing page for the portfolio website.
 *
 * Architecture:
 * - Single-page application (SPA) structure
 * - All sections on one page for easy navigation
 * - Smooth scrolling between sections via navigation
 *
 * Component Structure:
 * - Navigation: Fixed header with smooth scroll links
 * - Hero: Landing section with name, title, and CTAs
 * - About: Personal introduction and background
 * - Skills: Technical competencies organized by category
 * - Projects: Portfolio showcase with project cards
 * - Contact: Form for direct communication
 *
 * Design Philosophy:
 * - Mobile-first responsive design
 * - Minimal, clean aesthetic
 * - Accessibility-first approach
 * - Performance-optimized (lazy loading, animations)
 *
 * SEO Considerations:
 * - Semantic HTML structure (proper heading hierarchy)
 * - Descriptive section IDs for anchor links
 * - Metadata defined in layout.tsx
 * - Content structured for search engine crawling
 */

import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { ProgressBar } from '@/components/ProgressBar';

export default function Home() {
  return (
    /**
     * Main Container
     *
     * min-h-screen ensures full viewport height
     * bg-background uses our custom CSS variable for theming
     */
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation Bar */}
      <Navigation />

      {/* Progress Bar Navigation - Shows scroll progress and section indicators */}
      <ProgressBar />

      {/* Main Content Sections */}
      <main>
        {/* Landing Section - First impression */}
        <Hero />

        {/* About Section - Personal introduction */}
        <About />

        {/* Skills Section - Technical capabilities */}
        <Skills />

        {/* Projects Section - Portfolio showcase */}
        <Projects />

        {/* Contact Section - Communication channel */}
        <Contact />
      </main>

      {/* Footer - Optional: Add copyright, social links, etc. */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Timothy Lee. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
