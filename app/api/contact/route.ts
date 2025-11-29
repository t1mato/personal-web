/**
 * Contact Form API Route
 *
 * Handles form submissions from the contact form component.
 *
 * Architecture:
 * - Next.js Route Handler (App Router pattern)
 * - POST endpoint at /api/contact
 * - Returns JSON responses with appropriate status codes
 *
 * Security Measures Implemented:
 * - Server-side validation (never trust client input)
 * - Input sanitization to prevent XSS attacks
 * - Rate limiting should be added (TODO: implement in production)
 * - CORS is handled by Next.js (same-origin by default)
 *
 * Future Enhancements:
 * - Email service integration (SendGrid, Resend, AWS SES)
 * - Rate limiting with Redis or Vercel KV
 * - Spam detection with honeypot field or reCAPTCHA
 * - Database logging for record keeping
 * - Email notification to your inbox
 *
 * Current Implementation:
 * - Validates incoming data
 * - Logs to console (for development/testing)
 * - Returns success response
 * - In production, you'd integrate with an email service here
 */

import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import { Resend } from 'resend';

/**
 * Validation Schema
 *
 * Server-side validation schema matches client-side for consistency.
 *
 * Why duplicate validation?
 * - Client-side validation can be bypassed (browser tools, curl, Postman)
 * - Server is the source of truth for data integrity
 * - Defense in depth: validation at every layer
 */
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST Handler
 *
 * Processes incoming contact form submissions.
 *
 * Response Codes:
 * - 200: Success (message processed)
 * - 400: Bad Request (validation failed)
 * - 405: Method Not Allowed (non-POST request)
 * - 500: Internal Server Error (unexpected error)
 *
 * @param request - Next.js request object with form data
 * @returns JSON response with status and message
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();

    /**
     * Zod Validation
     *
     * safeParse() returns { success, data } or { success, error }
     * This prevents throwing errors and allows graceful error handling
     */
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      // Validation failed: return 400 with error details
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Extract validated data
    const { name, email, message } = validationResult.data;

    /**
     * Sanitize Input
     *
     * Basic sanitization to prevent XSS attacks.
     * Removes potentially harmful characters while preserving message content.
     *
     * Note: If storing in database, use parameterized queries.
     * If sending via email, use email service's built-in sanitization.
     */
    const sanitizedName = name.trim().replace(/[<>]/g, '');
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim().replace(/[<>]/g, '');

    /**
     * Send Email via Resend
     *
     * Sends the contact form submission to your email address.
     * The 'from' address must be a verified domain in Resend.
     * Using onboarding@resend.dev for testing (Resend's test domain).
     */
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Resend's test domain - replace with your verified domain
        to: 'timlee.dev@gmail.com',
        replyTo: sanitizedEmail, // User's email for easy replies
        subject: `Portfolio Contact from ${sanitizedName}`,
        text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        `,
      });

      // Log successful submission
      console.log('Contact form submission received and emailed:');
      console.log('Name:', sanitizedName);
      console.log('Email:', sanitizedEmail);
      console.log('Timestamp:', new Date().toISOString());
    } catch (emailError) {
      // Log email error but don't expose to user
      console.error('Failed to send email:', emailError);
      // Continue to success response - form was submitted successfully
    }

    /**
     * TODO: Database Logging (Optional)
     *
     * Store submissions for record keeping:
     * ```
     * await db.contactSubmissions.create({
     *   data: {
     *     name: sanitizedName,
     *     email: sanitizedEmail,
     *     message: sanitizedMessage,
     *     submittedAt: new Date(),
     *   }
     * });
     * ```
     */

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully! Thank you for reaching out.',
      },
      { status: 200 }
    );
  } catch (error) {
    /**
     * Error Handling
     *
     * Catches unexpected errors (JSON parsing, network issues, etc.)
     * Logs error for debugging but returns generic message to user
     * (don't expose internal error details)
     */
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/**
 * Other Methods Handler
 *
 * Returns 405 Method Not Allowed for non-POST requests.
 * Good practice to explicitly handle unsupported methods.
 */
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
