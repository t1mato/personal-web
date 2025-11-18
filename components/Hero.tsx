/**
 * Hero Component
 *
 * The landing section - first thing visitors see when they arrive.
 *
 * Purpose:
 * - Create strong first impression
 * - Clearly communicate who you are and what you do
 * - Provide immediate CTAs (view work, get in contact)
 * - Set the visual tone for the rest of the site
 *
 * Design Strategy:
 * - Large, bold typography for name and title
 * - Brief, compelling tagline that conveys value
 * - Minimal visual clutter (focus on content)
 * - Strategic use of accent color for CTAs
 * - Sufficient whitespace for breathing room
 *
 * Best Practices:
 * - Keep tagline under 20 words for impact
 * - Use action-oriented CTA copy ("View My Work" vs "Projects")
 * - Ensure text contrast meets WCAG AA standards (4.5:1 minimum)
 * - Mobile-first responsive scaling for text sizes
 */

import Link from 'next/link';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { TypingEffect } from './TypingEffect';
import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16"
    >

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-32 items-center justify-items-center lg:justify-items-start">
          {/* Profile Image - Left Side */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Image container - clean and simple */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-linear-to-br from-accent/10 via-accent-warm/10 to-accent/5 border-4 border-background shadow-2xl overflow-hidden flex items-center justify-center">
                {/* Placeholder emoji - replace with <Image src="/profile.jpg" alt="Timothy Lee" fill className="object-cover" /> */}
                <span className="text-8xl sm:text-9xl lg:text-[10rem]">
                  <Image src="/me.jpg" alt="Timothy Lee" fill className="object-cover" />
                </span>
              </div>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="text-center lg:text-left space-y-6 w-full">
            {/* Greeting - Professional */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl text-muted font-medium">
                Hello, my name is
              </p>

              {/* Name - Clean and professional */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-accent tracking-tight">
                Timothy Lee
              </h1>
            </div>

            {/* Tagline with Typing Effect */}
            <div className="text-xl sm:text-2xl lg:text-3xl text-foreground/80 font-light max-w-3xl lg:mx-0 mx-auto leading-relaxed">
              <p className="flex items-center lg:justify-start justify-center flex-wrap gap-2">
                <span>Thinking about</span>
                <TypingEffect
                  phrases={[
                    'developing full-stack apps',
                    'playing volleyball',
                    'film photography',
                    'the next recipe to make',
                    'where to travel next',
                  ]}
                  className="text-accent-warm font-semibold"
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={1500}
                />
              </p>
            </div>

            {/* Call-to-Action Buttons - Enhanced */}
            <div className="flex flex-wrap lg:justify-start justify-center items-center gap-4 pt-6">
              {/* Primary CTA - View work */}
              <Link
                href="#projects"
                className="group relative px-8 py-4 bg-accent text-white rounded-2xl font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:scale-105 hover:-translate-y-1"
              >
                View My Work
              </Link>

              {/* Secondary CTA - Download Resume */}
              <a
                href="/resume.pdf"
                download="Timothy-Lee-Resume.pdf"
                className="group relative flex items-center gap-2 px-8 py-4 bg-accent-warm text-white rounded-2xl font-semibold hover:bg-accent-warm/90 transition-all duration-300 shadow-lg shadow-accent-warm/20 hover:shadow-2xl hover:shadow-accent-warm/30 hover:scale-105 hover:-translate-y-1"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Resume
              </a>

              {/* Tertiary CTA - Contact */}
              <Link
                href="#contact"
                className="relative px-8 py-4 bg-transparent text-foreground rounded-2xl font-semibold transition-all duration-300 border-2 border-accent/30 hover:border-accent hover:bg-accent/5 hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-accent/10"
              >
                Get In Touch
              </Link>
            </div>

            {/* Social Links - Clean Icons */}
            <div className="flex lg:justify-start justify-center items-center gap-6 pt-6">
              <a
                href="https://github.com/t1mato"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-accent-warm transition-colors duration-300 hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/tnlee1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-accent-warm transition-colors duration-300 hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:timlee.dev@gmail.com"
                className="text-foreground/70 hover:text-accent-warm transition-colors duration-300 hover:scale-110"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
