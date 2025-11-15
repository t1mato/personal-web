/**
 * About Component
 *
 * Simple, clean layout with brief description, location, and a fun fact.
 *
 * Design Philosophy:
 * - Minimal and straightforward
 * - Brief, personal introduction
 * - Clean and professional
 */

import { AnimatedSection } from './AnimatedSection';
import { MapPin, GraduationCap } from 'lucide-react';

export function About() {
  return (
    <section
      className="py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <AnimatedSection>
          <h2 id="about" className="text-3xl sm:text-4xl font-bold mb-16 text-center text-foreground">
            About Me
          </h2>
        </AnimatedSection>

        {/* Main Content */}
        <AnimatedSection delay={0.2}>
          <div className="text-center space-y-12">
            {/* Brief description */}
            <p className="text-xl sm:text-2xl text-foreground/90 leading-relaxed font-light">
              I am a full-stack developer passionate about building clean, intuitive web applications that solve real problems.
            </p>

            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
              I enjoy learning new technologies and improving my skills through hands-on experiences. My focus currently is building software with the integration of AI.
            </p>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
              When I'm not working at my computer, I enjoy playing sports, learning new recipes, and taking film photography!
            </p>

            {/* Location & Education */}
            <div className="flex flex-col sm:flex-row justify-center items-start gap-6 sm:gap-12 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted uppercase tracking-wider mb-1">Location</p>
                  <p className="text-lg font-semibold text-foreground">Los Angeles, CA</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted uppercase tracking-wider mb-1">Education</p>
                  <p className="text-lg font-semibold text-foreground">Cal Poly Pomona</p>
                  <p className="text-base text-muted">B.S. Computer Science • 2026</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
