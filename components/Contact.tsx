'use client';

/**
 * Contact Component
 *
 * A form that allows visitors to send messages directly from the portfolio.
 *
 * Strategic Value:
 * - Reduces friction in the hiring/collaboration process
 * - Demonstrates form handling and validation skills
 * - Provides direct communication channel
 * - Shows attention to UX details (error handling, loading states)
 *
 * Technical Implementation:
 * - React Hook Form: Efficient form state management with minimal re-renders
 * - Zod: Runtime type checking and validation with TypeScript integration
 * - zodResolver: Bridges Zod schemas with React Hook Form
 *
 * Form Validation Strategy:
 * - Client-side validation for immediate feedback (better UX)
 * - Server-side validation in API route (security requirement)
 * - Type-safe validation schema shared between client and server
 * - Progressive enhancement: works without JS (fallback to native validation)
 *
 * User Experience Considerations:
 * - Real-time validation feedback on blur
 * - Clear error messages with specific guidance
 * - Loading state during submission
 * - Success/error feedback after submission
 * - Disabled state prevents duplicate submissions
 *
 * Security Considerations:
 * - Input sanitization happens server-side
 * - Rate limiting should be implemented in API route
 * - Email is validated format-wise (prevents basic injection)
 * - Consider adding honeypot field for bot prevention
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * Validation Schema
 *
 * Defines the structure and validation rules for the contact form.
 *
 * Validation Rules Explained:
 * - name: 2-50 chars (filters out single char submissions, prevents abuse)
 * - email: Valid email format (RFC 5322 compliant via Zod)
 * - message: 10-1000 chars (ensures meaningful messages, prevents spam)
 *
 * TypeScript Integration:
 * - z.infer extracts TypeScript type from Zod schema
 * - Ensures type safety between validation and form handling
 */
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  // Form submission state management
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * React Hook Form setup
   *
   * Configuration:
   * - resolver: Integrates Zod validation
   * - mode: 'onBlur' validates when user leaves field (balances UX and performance)
   * - reValidateMode: 'onChange' provides real-time feedback after first validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  /**
   * Form submission handler
   *
   * Flow:
   * 1. Validate data (handled by React Hook Form + Zod)
   * 2. Send data to API route
   * 3. Handle response (success or error)
   * 4. Update UI accordingly
   *
   * Error Handling:
   * - Network errors (fetch failures)
   * - Server errors (500, etc.)
   * - Validation errors (400)
   * - Rate limiting (429)
   *
   * @param data - Validated form data from React Hook Form
   */
  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('loading');
      setErrorMessage('');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle HTTP error responses
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      // Success: Reset form and show success message
      setSubmitStatus('success');
      reset();

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      // Error: Display error message to user
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <h2 id="contact" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          Get In Touch
        </h2>
        <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
          I'll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-secondary/30 border border-border rounded-xl p-8 space-y-6"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-accent'
              }`}
              placeholder="Your name"
            />
            {/* Error Message - Only shown when validation fails */}
            {errors.name && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-accent'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register('message')}
              rows={6}
              className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                errors.message
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-accent'
              }`}
              placeholder="Your message..."
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button
              Disabled during submission to prevent duplicate sends
              Shows loading state with different text
          */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitStatus === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <p>Message sent successfully! I'll get back to you soon.</p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p>{errorMessage || 'Failed to send message. Please try again.'}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
