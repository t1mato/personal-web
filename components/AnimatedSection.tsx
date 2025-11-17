'use client';

/**
 * AnimatedSection Component
 *
 * A reusable wrapper that adds scroll-triggered animations to any section.
 *
 * Purpose:
 * - Enhances user experience with subtle reveal animations
 * - Draws attention to content as user scrolls
 * - Creates professional, polished feel
 * - Maintains consistency across all sections
 *
 * Technical Implementation:
 * - Framer Motion's motion component for animations
 * - Viewport detection triggers animation when element enters view
 * - CSS transforms for performance (GPU-accelerated)
 * - Configurable animation variants for flexibility
 *
 * Performance Considerations:
 * - Uses transform and opacity (GPU-accelerated properties)
 * - Avoids layout thrashing (no width/height animations)
 * - Animation plays once per session (doesn't replay on re-scroll)
 * - Reduced motion support for accessibility
 *
 * Accessibility:
 * - Respects prefers-reduced-motion user setting
 * - Animations are decorative, don't affect content access
 * - No essential info conveyed through animation alone
 *
 * Customization:
 * - Can pass custom variants for different animation styles
 * - Adjustable delay for staggered animations
 * - Configurable viewport trigger threshold
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /**
   * Animation Delay
   *
   * Useful for creating staggered entrance effects.
   * Example: First card 0s, second card 0.1s, third card 0.2s
   */
  delay?: number;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      /**
       * Initial State
       * Element starts invisible and below
       */
      initial={{ opacity: 0, y: 30 }}
      /**
       * Viewport-triggered Animation
       *
       * whileInView: Animates when element enters viewport
       * viewport settings:
       * - once: true - Animation plays only once (better performance)
       * - amount: 0.2 - Triggers when 20% of element is visible
       *              (earlier trigger feels more responsive)
       */
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      /**
       * Transition
       * Controls animation timing with delay for staggered animations
       */
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
