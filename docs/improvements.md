# Recommended Improvements

## Visual & UX Enhancements

- **Lightbox/modal for gallery images** — Click-to-expand with keyboard navigation and swipe support
- **Image lazy loading with blur placeholders** — Generate blurDataURL for each image via Next.js Image `placeholder="blur"`
- **Page transition animations** — Smooth route transitions using framer-motion `AnimatePresence`
- **Instagram feed integration** — Pull recent posts via Instagram Basic Display API or embed widget

## Content & Marketing

- **Testimonials/reviews section** — Social proof carousel with client quotes and event photos
- **Pricing calculator or packages page** — Help clients self-qualify before reaching out
- **Blog/portfolio case studies** — Detailed event write-ups for SEO and storytelling

## SEO & Performance

- **Structured data for local business** — JSON-LD schema with business hours, service area, reviews
- **Image optimization pipeline** — Automated WebP/AVIF conversion, responsive srcset generation
- **Sitemap and robots.txt** — Auto-generated via Next.js config
- **Open Graph images** — Auto-generated OG images per page using `next/og`

## Accessibility

- **Reduced-motion media query** — Disable scroll-expansion animation and carousel auto-advance for users who prefer reduced motion
- **Focus management** — Visible focus rings on interactive elements, skip-to-content link
- **Alt text audit** — Descriptive alt text for all portfolio images

## Analytics & Conversion

- **Event tracking for CTA clicks** — Track "Book Your Event", "Book Now", contact form submissions
- **Conversion funnel analysis** — Scroll depth tracking on homepage hero
- **A/B test hero images** — Measure which carousel images drive more conversions

## Technical

- **Progressive Web App (PWA) support** — Offline-capable with service worker and manifest
- **Contact form validation** — Client-side validation with error messages before submission
- **Rate limiting on contact API** — Prevent spam submissions
- **Email confirmation** — Auto-reply to client after form submission
