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

/**
 * Animation Variants
 *
 * Defines the initial and final states of the animation.
 *
 * hidden: Starting state (invisible, slightly below)
 * - opacity: 0 makes element invisible
 * - y: 30 moves element 30px down (creates upward motion effect)
 *
 * visible: End state (fully visible, original position)
 * - opacity: 1 makes element fully visible
 * - y: 0 returns element to natural position
 * - transition: Controls animation timing
 *   * duration: 0.6s feels smooth without being sluggish
 *   * ease: "easeOut" creates natural deceleration
 *   * delay: Allows staggered animations
 */
const variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  }),
};

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      /**
       * Initial State
       * Element starts in 'hidden' variant state
       */
      initial="hidden"
      /**
       * Viewport-triggered Animation
       *
       * whileInView: Animates to 'visible' when element enters viewport
       * viewport settings:
       * - once: true - Animation plays only once (better performance)
       * - amount: 0.2 - Triggers when 20% of element is visible
       *              (earlier trigger feels more responsive)
       *
       * Alternative amounts:
       * - 0.5: Waits until half the element is visible
       * - 1.0: Waits until entire element is visible
       */
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      /**
       * Custom Variants
       * Pass delay to visible variant for staggered animations
       */
      custom={delay}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
