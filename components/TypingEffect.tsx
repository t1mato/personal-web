/**
 * Typing Effect Component
 *
 * Creates a realistic typewriter animation that cycles through different phrases.
 *
 * Features:
 * - Types out text character by character
 * - Backspaces to delete previous text
 * - Cycles through an array of phrases infinitely
 * - Blinking cursor for realism
 * - Configurable typing speed and pause duration
 *
 * Technical Implementation:
 * - useState for tracking current text and phrase index
 * - useEffect with intervals for animation timing
 * - CSS animation for cursor blink
 * - Cleanup on unmount to prevent memory leaks
 *
 * Customization:
 * - Adjust typingSpeed for faster/slower typing
 * - Adjust deletingSpeed for backspace speed
 * - Adjust pauseDuration for pause between phrases
 * - Change phrases array to show different text
 */

'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number; // milliseconds per character
  deletingSpeed?: number; // milliseconds per character when deleting
  pauseDuration?: number; // milliseconds to pause after completing phrase
  className?: string;
}

export function TypingEffect({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
}: TypingEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    // If paused, wait before starting to delete
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    // If we've finished typing the phrase, pause
    if (!isDeleting && currentText === currentPhrase) {
      setIsPaused(true);
      return;
    }

    // If we've finished deleting, move to next phrase
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    // Type or delete one character
    const timer = setTimeout(
      () => {
        if (isDeleting) {
          // Remove one character
          setCurrentText((prev) => prev.slice(0, -1));
        } else {
          // Add one character
          setCurrentText((prev) => currentPhrase.slice(0, prev.length + 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    currentText,
    currentPhraseIndex,
    isDeleting,
    isPaused,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className={className}>
      {currentText}
      {/* Blinking cursor */}
      <span className="animate-pulse ml-1 text-[#000000]">|</span>
    </span>
  );
}
