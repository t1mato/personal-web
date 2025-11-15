/**
 * Skills Component
 *
 * Displays technical skills organized by category with technology logos.
 *
 * Strategic Purpose:
 * - Quickly communicate technical competencies to recruiters
 * - Demonstrate breadth and depth of knowledge
 * - Use industry-standard terminology for ATS (Applicant Tracking Systems)
 * - Organize by logical categories for better comprehension
 * - Visual brand recognition through official technology logos
 *
 * Design Patterns:
 * - Card-based layout with category groupings (condensed spacing)
 * - Logo + name badges for instant recognition
 * - Consistent spacing and alignment
 * - Responsive grid that adapts to screen size
 *
 * Icon Implementation:
 * - Uses react-icons/si (Simple Icons) for 2,800+ tech logos
 * - Official brand colors for each technology
 * - 20px icon size for optimal visibility
 * - Tree-shakeable imports (~1-2 KB per icon)
 *
 * Content Guidelines:
 * - List technologies you're genuinely comfortable with
 * - Order by proficiency/relevance within each category
 * - Use official names matching icon library
 * - Include icon component, name, and brand color
 *
 * Categories Explained:
 * - Languages: Core programming languages you write in
 * - Frontend: UI/UX frameworks and libraries
 * - Backend: Server-side frameworks and runtime environments
 * - Database: Data storage and query technologies
 * - Tools: Development tools, version control, deployment platforms
 */

import { AnimatedSection } from './AnimatedSection';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiQt,
  SiDart,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiVuedotjs,
  SiFlutter,
  SiTailwindcss,
  SiMongoose,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
  SiAndroidstudio,
  SiFigma,
  SiNetlify,
  SiDocker,
  SiRailway,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';

/**
 * Skill data structure with icons and brand colors
 *
 * Structure:
 * - icon: React icon component from Simple Icons
 * - name: Display name (official technology name)
 * - color: Official brand color (hex code)
 *
 * Note: Colors are used for icon fill to maintain brand identity
 * Organized by category for ATS compatibility and logical grouping
 */
interface Skill {
  icon: IconType;
  name: string;
  color: string;
}

const skillsData: Record<string, Skill[]> = {
  Languages: [
    { icon: FaJava, name: 'Java', color: '#007396' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiPython, name: 'Python', color: '#3776AB' },
    { icon: SiCplusplus, name: 'C++', color: '#00599C' },
    { icon: SiHtml5, name: 'HTML', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS', color: '#1572B6' },
    { icon: SiMysql, name: 'SQL', color: '#4479A1' },
    { icon: SiDart, name: 'Dart', color: '#0175C2' },
  ],
  'Frameworks/Libraries': [
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiExpress, name: 'Express.js', color: '#000000' },
    { icon: SiVuedotjs, name: 'Vue.js', color: '#4FC08D' },
    { icon: SiFlutter, name: 'Flutter', color: '#02569B' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: SiMongoose, name: 'Mongoose', color: '#880000' },
  ],
  Databases: [
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
    { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E' },
  ],
  Tools: [
    { icon: SiGit, name: 'Git', color: '#F05032' },
    { icon: SiGithub, name: 'GitHub', color: '#181717' },
    { icon: SiQt, name: 'Qt Creator', color: '#41CD52' },
    { icon: SiAndroidstudio, name: 'Android Studio', color: '#3DDC84' },
    { icon: SiFigma, name: 'Figma', color: '#F24E1E' },
    { icon: SiNetlify, name: 'Netlify', color: '#00C7B7' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiRailway, name: 'Railway', color: '#0B0D0E' },
  ],
};

export function Skills() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedSection>
          <h2 id="skills" className="text-3xl sm:text-4xl font-bold text-foreground mb-16 text-center">
            Skills & Technologies
          </h2>
        </AnimatedSection>

        {/* Minimal Rows Layout - Each category in its own clean horizontal row */}
        <div className="space-y-16">

          {/* Languages Row */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-foreground/70 tracking-wide uppercase">
                Languages
              </h3>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                {skillsData.Languages.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-3 group cursor-default"
                  >
                    <skill.icon
                      size={44}
                      style={{ color: skill.color }}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium text-foreground/80">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Frameworks/Libraries Row */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-foreground/70 tracking-wide uppercase">
                Frameworks & Libraries
              </h3>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                {skillsData['Frameworks/Libraries'].map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-3 group cursor-default"
                  >
                    <skill.icon
                      size={44}
                      style={{ color: skill.color }}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium text-foreground/80">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Databases Row */}
          <AnimatedSection delay={0.3}>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-foreground/70 tracking-wide uppercase">
                Databases
              </h3>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                {skillsData.Databases.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-3 group cursor-default"
                  >
                    <skill.icon
                      size={44}
                      style={{ color: skill.color }}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium text-foreground/80">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Tools Row */}
          <AnimatedSection delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-foreground/70 tracking-wide uppercase">
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                {skillsData.Tools.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-3 group cursor-default"
                  >
                    <skill.icon
                      size={44}
                      style={{ color: skill.color }}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium text-foreground/80">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
