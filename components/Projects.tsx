/**
 * Projects Component
 *
 * Showcase of portfolio projects - the core proof of your abilities.
 *
 * Strategic Importance:
 * - Most critical section for technical evaluation
 * - Demonstrates practical application of skills
 * - Shows problem-solving approach and code quality
 * - Provides tangible evidence of capabilities
 *
 * Project Selection Criteria:
 * - Choose 3-6 best projects (quality over quantity)
 * - Prioritize projects with live demos
 * - Include projects that show diverse skills
 * - Highlight projects with real-world impact
 * - Feature recent work (shows current skill level)
 *
 * Content Requirements per Project:
 * - Clear, descriptive title
 * - Concise description (2-3 sentences) explaining:
 *   * What it does
 *   * Why you built it
 *   * What problem it solves
 * - Technology stack used
 * - Links to:
 *   * Live demo (if available)
 *   * GitHub repository (if public)
 *
 * Design Considerations:
 * - Card-based layout for visual separation
 * - Hover effects to indicate interactivity
 * - Tech stack badges for quick scanning
 * - Clear CTAs (View Live, View Code)
 * - Consistent card heights for clean grid
 */

import { ExternalLink, Github } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import Image from 'next/image';
import {
  SiReact,
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiDocker,
  SiPython,
  SiCplusplus,
  SiMysql,
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiCss3,
  SiRailway,
  SiQt,
  SiMongoose,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiAndroidstudio,
  SiGooglecloud,
  SiHtml5,
  SiClerk,
} from 'react-icons/si';
import { IconType } from 'react-icons';

/**
 * Technology icon mapping
 * Maps technology names to their corresponding icons and brand colors
 *
 * This allows for flexible matching - if a technology doesn't have an icon,
 * it will gracefully fall back to text-only display
 */
interface TechIcon {
  icon: IconType;
  color: string;
}

const techIconMap: Record<string, TechIcon> = {
  'React': { icon: SiReact, color: '#61DAFB' },
  'Express.js': { icon: SiExpress, color: '#000000' },
  'Express': { icon: SiExpress, color: '#000000' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  'SQL': { icon: SiMysql, color: '#4479A1' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Framer Motion': { icon: SiFramer, color: '#0055FF' },
  'CSS': { icon: SiCss3, color: '#1572B6' },
  'Railway': { icon: SiRailway, color: '#0B0D0E' },
  'QML': { icon: SiQt, color: '#41CD52' },
  'Mongoose': { icon: SiMongoose, color: '#880000' },
  'Flutter': { icon: SiFlutter, color: '#02569B' },
  'Dart': { icon: SiDart, color: '#0175C2' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'Android Studio': { icon: SiAndroidstudio, color: '#3DDC84' },
  'Gemini API': {icon: SiGooglecloud, color: '#4285F4'},
  'HTML': {icon: SiHtml5, color: '#E34C26'},
  'Clerk': {icon: SiClerk, color: ''}
};

/**
 * Helper function to get icon data for a technology
 * Returns undefined if no icon mapping exists for the technology
 */
const getTechIcon = (techName: string): TechIcon | undefined => {
  return techIconMap[techName];
};

/**
 * Project data structure
 * Type definition ensures consistency across all projects
 */
interface Project {
  title: string;
  description: string;
  technologies: string[];
  thumbnail?: string; // Optional: project preview image
  liveUrl?: string; // Optional: some projects may not have live demos
  githubUrl?: string; // Optional: some projects may be private
}

/**
 * Project data array
 * Update this with your actual projects
 */
const projects: Project[] = [
  {
    title: 'Talk Talk Goose',
    description:
      "A full-stack AI chatbot application enabling real-time conversations with Google's Gemini AI model, featuring multimodal support for text and images with optimized streaming performance.",
    technologies: ['React', 'Express.js', 'MongoDB', 'Node.js', 'Gemini API', 'Docker', 'Railway'],
    thumbnail: '/projects/talk-talk-goose.png', // Add your project thumbnail here
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/t1mato/talktalkgoose',
  },
  {
    title: 'Lockheed Martin UAV Drone Research Project',
    description:
      'A collaborative task management tool with real-time updates, drag-and-drop functionality, team collaboration features, and deadline reminders.',
    technologies: ['QML', 'Python', 'C++', 'SQL'],
    thumbnail: '/lockheed-martin.jpg',
    githubUrl: 'https://github.com/UAVGCSTeam/GCS',
  },
  {
    title: 'BroncoBites',
    description:
      'A smart meal planning application tailored for Cal Poly Pomona students. Designed for personalized suggestions from campus dining halls and markets that can match the user\'s fitness goals.',
    technologies: ['TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS', 'MongoDB', 'Clerk', 'Docker'],
    thumbnail: '/broncobites-banner.png', // Add your project thumbnail here
    liveUrl: 'https://broncobites.com',
    githubUrl: 'https://github.com/YuAreMySunshine/BroncoBites',
  },
  {
    title: 'Epic Pomona Website',
    description:
      'A personal portfolio website built with Next.js featuring dark mode, smooth animations, contact form, and responsive design across all devices.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    thumbnail: '/epic-banner.png', // Add your project thumbnail here
    liveUrl: 'https://epicpomona.com',
    githubUrl: 'https://github.com/jaroonl/epicpomona',
  },
  {
    title: 'Verdant',
    description:
      'A personal finance mobile app that helps you take control of your spending with intuitive budget management and expense tracking.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Android Studio'],
    thumbnail: '/projects/verdant.png', // Add your project thumbnail here
    liveUrl: 'https://play.google.com/store/apps/details?id=com.timlee.verdant&hl=en_US&pli=1',
    githubUrl: 'https://github.com/t1mato/verdant-app',
  },
];

export function Projects() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedSection>
          <h2 id="projects" className="text-3xl sm:text-4xl font-bold text-foreground mb-16 text-center">
            Featured Projects
          </h2>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={0.1 + index * 0.1}>
              <div className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-accent-warm/70 transition-all duration-300 flex flex-col h-full">
              {/* Project Thumbnail */}
              {project.thumbnail && (
                <div className="relative w-full h-48 bg-secondary">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                {/* Project Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {project.title}
                </h3>

              {/* Project Description */}
              <p className="text-foreground/70 mb-4 flex-grow leading-relaxed">
                {project.description}
              </p>

              {/* Technology Stack
                  Displayed as small badges with logos for easy scanning
                  Icons are shown when available, otherwise text-only
                  Using flex-wrap to handle overflow gracefully
              */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => {
                  const techIcon = getTechIcon(tech);
                  return (
                    <span
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1 bg-secondary text-foreground/70 rounded-md text-xs font-medium border border-border"
                    >
                      {/* Show icon if available */}
                      {techIcon && (
                        <techIcon.icon size={16} style={{ color: techIcon.color }} />
                      )}
                      {/* Technology name */}
                      {tech}
                    </span>
                  );
                })}
              </div>

                {/* Action Links
                    Conditional rendering: only show links that exist
                    Using target="_blank" and rel="noopener noreferrer" for security
                */}
                <div className="flex gap-4 mt-auto">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors border border-border"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
            </AnimatedSection>
          ))}
        </div>

        {/* More Projects CTA */}
        <AnimatedSection delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-muted mb-4">
              Want to see more? Check out my GitHub for additional projects and contributions.
            </p>
            <a
              href="https://github.com/t1mato"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
