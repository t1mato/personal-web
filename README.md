# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and a fully functional contact form.

## Features

- **Modern Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Dark Mode**: Seamless theme switching with next-themes
- **Smooth Animations**: Framer Motion scroll animations for enhanced UX
- **Responsive Design**: Mobile-first approach, looks great on all devices
- **Contact Form**: Validated form with React Hook Form and Zod
- **SEO Optimized**: Comprehensive metadata and semantic HTML
- **Type-Safe**: Full TypeScript coverage with strict mode
- **Professional Comments**: Detailed documentation throughout the codebase

## Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework

### Libraries
- **next-themes**: Dark/light mode management
- **Framer Motion**: Smooth scroll-triggered animations
- **React Hook Form**: Performant form handling
- **Zod**: TypeScript-first schema validation
- **Lucide React**: Beautiful, consistent icons

## Project Structure

```
personal-web/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── layout.tsx                # Root layout with metadata and theme provider
│   ├── page.tsx                  # Home page integrating all sections
│   └── globals.css               # Global styles and theme variables
├── components/
│   ├── About.tsx                 # About Me section
│   ├── AnimatedSection.tsx       # Reusable scroll animation wrapper
│   ├── Contact.tsx               # Contact form with validation
│   ├── Hero.tsx                  # Landing section
│   ├── Navigation.tsx            # Fixed navbar with smooth scroll
│   ├── Projects.tsx              # Portfolio projects showcase
│   ├── Skills.tsx                # Technical skills grid
│   ├── ThemeProvider.tsx         # next-themes wrapper
│   └── ThemeToggle.tsx           # Dark/light mode toggle button
├── public/
│   └── README-RESUME.txt         # Instructions for adding resume
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Customization Guide

### 1. Personal Information

#### Update Your Name and Info
- **Metadata**: Edit `app/layout.tsx` (lines 35-54) to update SEO metadata
- **Hero Section**: Edit `components/Hero.tsx` to update name, title, tagline
- **About Section**: Edit `components/About.tsx` to write your bio
- **Footer**: Edit `app/page.tsx` (line 73) to update copyright

#### Social Links
Update in `components/Hero.tsx` (lines 55-77):
- GitHub: Replace `https://github.com/yourusername`
- LinkedIn: Replace `https://linkedin.com/in/yourusername`
- Email: Replace `your.email@example.com`

### 2. Skills

Edit `components/Skills.tsx` (lines 38-50) to update your skills:

```typescript
const skillsData = {
  Languages: ['JavaScript', 'TypeScript', 'Python'],  // Add your languages
  'Frontend Development': ['React', 'Next.js'],       // Add your frameworks
  // ... add more categories as needed
};
```

### 3. Projects

Edit `components/Projects.tsx` (lines 61-90) to showcase your projects:

```typescript
const projects: Project[] = [
  {
    title: 'Your Project Name',
    description: 'Brief description of what it does...',
    technologies: ['Next.js', 'TypeScript', 'etc'],
    liveUrl: 'https://your-demo.com',      // Optional
    githubUrl: 'https://github.com/...',    // Optional
    featured: true,                         // Highlights the project
  },
  // Add more projects...
];
```

### 4. Resume Download

1. Place your resume PDF in the `public/` folder
2. Name it `resume.pdf`
3. The download button will automatically work
4. See `public/README-RESUME.txt` for details

### 5. Contact Form

The contact form is functional out of the box, but currently logs to console.

#### To Enable Email Sending:

**Option 1: Resend (Recommended)**

```bash
npm install resend
```

Update `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In POST function:
await resend.emails.send({
  from: 'contact@yourdomain.com',
  to: 'your@email.com',
  subject: `Portfolio Contact: ${sanitizedName}`,
  text: `From: ${sanitizedName} (${sanitizedEmail})\n\n${sanitizedMessage}`,
});
```

Add to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

**Option 2: Other Email Services**
- SendGrid
- AWS SES
- Nodemailer

See detailed instructions in `app/api/contact/route.ts` (lines 69-88)

### 6. Colors and Theme

Edit `app/globals.css` (lines 23-41) to customize colors:

```css
:root {
  --background: #ffffff;      /* Light mode background */
  --foreground: #171717;      /* Light mode text */
  --accent: #3b82f6;          /* Accent color for CTAs */
  /* ... */
}

.dark {
  --background: #0a0a0a;      /* Dark mode background */
  --foreground: #ededed;      /* Dark mode text */
  --accent: #60a5fa;          /* Dark mode accent */
  /* ... */
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click

Vercel automatically:
- Builds your Next.js app
- Provides HTTPS
- Handles routing
- Offers preview deployments

### Other Platforms

- **Netlify**: Similar to Vercel, great for Next.js
- **AWS Amplify**: Enterprise-grade deployment
- **Docker**: See [Next.js Docker docs](https://nextjs.org/docs/deployment#docker-image)

### Environment Variables

If you add email integration or other services, add environment variables in your deployment platform:

```
RESEND_API_KEY=your_key_here
```

## Performance Optimizations

✅ **Already Implemented**:
- Image optimization with Next.js Image component
- CSS optimized with Tailwind CSS
- Animations use GPU-accelerated properties (transform, opacity)
- Reduced motion support for accessibility
- Tree-shaking and code splitting

📈 **Further Improvements**:
- Add image assets for projects (use WebP format)
- Implement ISR (Incremental Static Regeneration) if needed
- Add analytics (Vercel Analytics, Google Analytics)
- Consider lazy loading for images

## Accessibility

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible states
- Respects `prefers-reduced-motion`
- Color contrast meets WCAG AA standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal use. Feel free to fork and customize for your own portfolio.

## Credits

Built by Timothy Lee using:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## Support

For issues or questions:
1. Check the comments in the code (they're comprehensive!)
2. Review Next.js documentation
3. Open an issue on GitHub

---

**Note**: Remember to replace placeholder content (GitHub links, email, project details) with your actual information before deploying!
