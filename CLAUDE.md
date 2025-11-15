# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev    # Start development server (uses port 3000, or next available)
npm run build  # Build for production
npm start      # Run production build
npm run lint   # Run ESLint
```

## Architecture Overview

### Next.js 16 App Router Structure

Single-page application with section-based navigation. All sections render on a single route (`/`):

```
app/
├── layout.tsx          # Root layout: metadata, fonts, ThemeProvider wrapper
├── page.tsx            # Main page: orchestrates all section components
├── globals.css         # Theme CSS variables, Tailwind config
└── api/contact/
    └── route.ts        # Contact form POST endpoint
```

**Component rendering order** (all on single page):
1. Navigation (fixed header)
2. Hero → About → Skills → Projects → Contact
3. Footer

### State Management

- **Theme**: Managed by `next-themes` (no manual state needed)
- **Forms**: Local state via React Hook Form in Contact component
- **No global state management library** - everything is component-local or library-managed

## Key Technical Patterns

### Theme System (next-themes + CSS Variables)

**Critical implementation detail**: Root `<html>` element must have `suppressHydrationWarning` prop to prevent hydration errors when next-themes injects the `.dark` class before React hydrates.

**How it works**:
1. `ThemeProvider` (from next-themes) wraps app in `app/layout.tsx`
2. Toggles `.dark` class on `<html>` element
3. CSS custom properties in `app/globals.css` respond to `.dark` class
4. `ThemeToggle` component uses `useTheme()` hook from next-themes
5. Mounted state pattern prevents SSR/client mismatch

**Customizing colors**: Edit CSS variables in `app/globals.css` (lines 23-41)

### Scroll Animations (Framer Motion)

**Pattern**: `AnimatedSection` wrapper component provides consistent scroll-triggered animations.

```tsx
<AnimatedSection delay={0.2}>
  <YourContent />
</AnimatedSection>
```

**Implementation notes**:
- Triggers when 20% of element is visible (`viewport={{ once: true, amount: 0.2 }}`)
- Fade-in + slide-up effect (opacity 0→1, y: 30→0)
- Stagger animations by passing incremental `delay` prop
- Uses GPU-accelerated properties for performance

### Form Validation (React Hook Form + Zod)

**Important**: Validation schema is duplicated in both client and server:
- Client: `components/Contact.tsx`
- Server: `app/api/contact/route.ts`

**Pattern**:
```typescript
const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

type FormData = z.infer<typeof schema>; // Type-safe inference
```

Must use `zodResolver` to bridge Zod with React Hook Form.

## Content Customization Quick Reference

### Personal Information
- **Name & Tagline**: `components/Hero.tsx` (lines 42-49)
- **Social Links**: `components/Hero.tsx` (lines 55-79)
- **Bio**: `components/About.tsx` (lines 47-65)
- **Quick Facts**: `components/About.tsx` (lines 73-101)
- **SEO Metadata**: `app/layout.tsx` (lines 35-54)

### Projects
**Location**: `components/Projects.tsx` (lines 58-92)

```typescript
const projects: Project[] = [
  {
    title: 'Project Name',
    description: '2-3 sentences explaining what it does',
    technologies: ['React', 'Node.js'],
    liveUrl: 'https://demo.com',      // Optional
    githubUrl: 'https://github.com/user/repo',  // Optional
    featured: true,  // Adds badge and accent border
  },
];
```

### Skills
**Location**: `components/Skills.tsx` (lines 38-58)

```typescript
const skillsData = {
  'Category Name': ['Skill 1', 'Skill 2'],
  // Add/remove categories as needed
};
```

**Currently Learning section**: Lines 101-121 (separate from main skills grid)

### Theme Colors
**Location**: `app/globals.css` (lines 23-41)

Edit CSS custom properties in `:root` (light mode) and `.dark` (dark mode) selectors.

## Integration Points

### Contact Form API

**Endpoint**: `POST /api/contact`
**File**: `app/api/contact/route.ts`

**Current behavior**: Validates input and logs to console

**To enable email sending**:
1. Install email service library (Resend recommended)
2. Add implementation at lines 106-127 (marked with TODO comments)
3. Add `RESEND_API_KEY` to environment variables

**Response codes**:
- 200: Success
- 400: Validation failed
- 405: Method not allowed
- 500: Server error

### Resume Download

**Setup**:
1. Place PDF file in `public/` folder
2. Name it `resume.pdf`
3. Download button in Hero section will work automatically

Public folder is served at root level (`/resume.pdf`).

## Important Non-Obvious Details

### Why suppressHydrationWarning on html?
next-themes modifies the `class` attribute before React hydration completes. Without this prop, you'll get hydration mismatch warnings in development.

### Why mounted state in ThemeToggle?
Server can't access localStorage (doesn't know user's theme preference). The mounted pattern prevents rendering the toggle until client-side, avoiding hydration mismatches.

### Why duplicate Zod schemas?
Client-side validation can be bypassed. Server-side validation is the security boundary. Keep them identical for consistency.

### Why AnimatedSection wrapper instead of direct Framer Motion?
Provides consistent animation behavior across all sections. Easier to maintain one animation pattern than duplicating motion props everywhere.

### Navigation smooth scrolling implementation
Custom `handleClick` function (not just CSS `scroll-behavior: smooth`) allows for offset adjustment to account for fixed navbar height.

## Dependencies

**Core**:
- next 16.0.2 (App Router)
- react 19.2.0
- typescript 5

**Key libraries**:
- next-themes (theme management)
- framer-motion (animations)
- react-hook-form (form state)
- zod (validation)
- lucide-react (icons)
- tailwindcss 4 (styling)

## Architecture Constraints

- No database integration
- No authentication/authorization
- No external data fetching (all content is static/hardcoded)
- Single-page application (no client-side routing)
- Designed for static export or SSR deployment
