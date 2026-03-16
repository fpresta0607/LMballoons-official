# LM Balloons — Warm Glow Visual Enhancement

**Date:** 2026-03-15
**Status:** Draft

## Problem

The LM Balloons website has solid structure and layout but feels static. There are no scroll-triggered animations, no glow/shimmer effects that evoke the LED balloon aesthetic, basic hover interactions, and mobile spacing issues that waste screen real estate. The site needs to feel more alive and premium without being flashy.

## Design Decisions

- **Approach:** Pure CSS + Intersection Observer (no new dependencies)
- **Aesthetic:** Soft warm glow (rose-amber LED ambiance, not sparkle/glitter)
- **Scroll animations:** Subtle fade-in-up, trigger once, 0.7s duration
- **Hover effects:** Glow + lift on images/cards, warm shadow on buttons
- **Hero:** Minor tweaks only (mobile sizing, timing, subtle glow accent)
- **Scope:** All pages — homepage, gallery, about, contact, footer

## 1. Warm Glow System

### Colors

Rose-amber tones that bridge the existing rose (#E8D5CC) toward warm LED light. Pure gold/orange would clash with the cream/rose palette.

Add to `:root` in `app/globals.css` (alongside existing `--color-*` variables):

```css
:root {
  /* existing color vars... */
  --glow-warm: rgba(232, 190, 160, 0.4);
  --glow-warm-strong: rgba(232, 190, 160, 0.6);
  --glow-warm-subtle: rgba(232, 190, 160, 0.2);
}
```

### Utility Classes

Add after the existing keyframes in `app/globals.css`:

```css
@layer utilities {
  .glow-warm {
    box-shadow: 0 4px 20px var(--glow-warm), 0 0 40px var(--glow-warm-subtle);
  }
  .glow-warm-hover {
    box-shadow: 0 8px 30px var(--glow-warm-strong), 0 0 60px var(--glow-warm);
  }
}
```

**Note:** `hover:glow-warm` and `hover:glow-warm-hover` work as Tailwind classes because `@layer utilities` automatically enables variant support (hover:, focus:, responsive) in Tailwind 3.4+ JIT. No plugin or safelist needed.

### Application

| Element | Resting | Hover |
|---------|---------|-------|
| Gallery images | none | glow-warm-hover + -translate-y-1.5 |
| Service cards | none | glow-warm + -translate-y-1 |
| Pillar cards (about) | none | glow-warm + -translate-y-1 |
| CTA buttons (solid) | none | shadow-[0_4px_20px_rgba(232,190,160,0.4)] |
| Hero CTA (outlined) | none | shadow-[0_0_20px_rgba(255,255,255,0.15)] |
| Hero text area | radial glow accent (15% opacity) | n/a |

## 2. Scroll Animation System

### Architecture

The system has three layers:

1. **`hooks/use-in-view.ts`** — Intersection Observer hook returning `{ ref, isInView }`
2. **`components/ui/scroll-reveal.tsx`** — Client component wrapper for use in server-component pages
3. **CSS classes in `globals.css`** — The actual animation styles

### Nesting contract

`ScrollReveal` sets `data-in-view="true"` on **itself** (the wrapper element). All `.scroll-fade` elements must be **descendants** (children or deeper) of the `ScrollReveal` wrapper. The CSS selector `[data-in-view="true"] .scroll-fade` targets descendants, NOT the wrapper itself. This means:

```tsx
{/* CORRECT: scroll-fade on children of ScrollReveal */}
<ScrollReveal>
  <h2 className="scroll-fade">Title</h2>
  <p className="scroll-fade stagger-2">Subtitle</p>
</ScrollReveal>

{/* WRONG: scroll-fade on ScrollReveal itself — will not animate */}
<ScrollReveal className="scroll-fade">Content</ScrollReveal>
```

For client component pages (homepage, gallery), call `useInView()` directly and set `data-in-view` on a wrapper div manually:

```tsx
const { ref, isInView } = useInView();
<div ref={ref} data-in-view={isInView}>
  <h2 className="scroll-fade">Title</h2>
</div>
```

### Hook: `hooks/use-in-view.ts`

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}
```

**Note on rootMargin:** The -60px bottom margin means elements just below the fold on initial page load won't animate until the user scrolls slightly. This is intentional — it prevents the first section from animating instantly on load (which feels redundant). If an edge case arises, pass `rootMargin: "0px"` to that specific hook call.

### Wrapper: `components/ui/scroll-reveal.tsx`

```tsx
"use client";

import { useInView } from "@/hooks/use-in-view";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

export function ScrollReveal({ children, className = "", as: Tag = "div" }: ScrollRevealProps) {
  const { ref, isInView } = useInView();
  return (
    <Tag ref={ref} data-in-view={isInView} className={className}>
      {children}
    </Tag>
  );
}
```

### CSS

```css
/* Scroll-triggered fade-in */
.scroll-fade {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

[data-in-view="true"] .scroll-fade {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays for grid children (transition-delay, 80ms apart) */
.stagger-1 { transition-delay: 0ms; }
.stagger-2 { transition-delay: 80ms; }
.stagger-3 { transition-delay: 160ms; }
.stagger-4 { transition-delay: 240ms; }
.stagger-5 { transition-delay: 320ms; }
.stagger-6 { transition-delay: 400ms; }
.stagger-7 { transition-delay: 480ms; }
.stagger-8 { transition-delay: 560ms; }
.stagger-9 { transition-delay: 640ms; }
```

### Per-page usage

- **Homepage (`app/page.tsx`):** Currently a server component. Add `"use client"` (it has no `metadata` export — metadata is in `layout.tsx`). Call `useInView()` per section. One observer per section; individual items within each section get `scroll-fade stagger-{i+1}` classes.
- **Gallery (`app/gallery/page.tsx`):** Already a client component. Call `useInView()` on the grid wrapper. Individual image tiles get `scroll-fade stagger-{i+1}` where `i` is the index into the `filtered` array (not the full `images` array — this ensures stagger sequence has no gaps after filtering). Add `key={active}` to the grid wrapper div so that filter changes remount it, resetting the observer and re-triggering animations.
- **About/Contact (server components, export `metadata`):** Wrap each animated section in `<ScrollReveal>`. Children get `scroll-fade` classes.

## 3. Hover Effects

### Gallery images — outer/inner div pattern

`overflow-hidden` clips box-shadow, so glow must be on an outer wrapper. The `onClick` and `cursor-pointer` move to the **outer div** (glow+lift container). The "Book This Style" link's `e.stopPropagation()` already handles the click-through correctly since it stops propagation from reaching any parent onClick.

**Homepage featured gallery** (no onClick, no overlay text):

```tsx
{/* Outer: glow + lift */}
<div className="transition-all duration-500 hover:-translate-y-1.5 hover:glow-warm-hover group">
  {/* Inner: image crop */}
  <div className="relative aspect-square overflow-hidden">
    <Image ... className="object-cover transition-transform duration-500 group-hover:scale-105" />
    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
  </div>
</div>
```

**Gallery page** (has onClick for lightbox + "Book This Style" link):

```tsx
{/* Outer: glow + lift + click handler */}
<div
  className="transition-all duration-500 hover:-translate-y-1.5 hover:glow-warm-hover group cursor-pointer"
  onClick={() => setLightboxIndex(i)}
>
  {/* Inner: image crop */}
  <div className="relative aspect-square overflow-hidden">
    <Image ... className="object-cover transition-transform duration-500 group-hover:scale-105" />
    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-end p-4">
      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full">
        <Link
          href={`/contact?style=${encodeURIComponent(img.alt)}`}
          onClick={(e) => e.stopPropagation()}
          className="..."
        >
          Book This Style
        </Link>
      </div>
    </div>
  </div>
</div>
```

### Service cards

Replace current classes with (use `duration-500`, not `duration-400` which is not a default Tailwind value):

```
p-8 border border-rose transition-all duration-500
hover:border-charcoal hover:glow-warm hover:-translate-y-1
group text-center
```

### About page pillar cards

Add to existing classes:

```
transition-all duration-500 hover:glow-warm hover:-translate-y-1
```

### CTA buttons

**Solid (charcoal):** Replace `hover:bg-black` with:
```
hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)]
```

**Outlined (hero):** Add:
```
hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
```

## 4. Hero Tweaks

**File:** `components/ui/hero.tsx`

| Property | Current (verified from code) | New |
|----------|------------------------------|-----|
| h1 sizing | `text-5xl md:text-7xl lg:text-9xl` | `text-3xl sm:text-5xl md:text-7xl lg:text-9xl` |
| Tagline | `text-xs md:text-sm` | No change needed (already small enough) |
| Height | `h-screen` | `h-[100svh]` (svh handles mobile address bar; supported Chrome 108+, Safari 15.4+, Firefox 101+) |
| Ken Burns | 20s, scale(1.05) | 25s, scale(1.06) |
| Fade-in delays | 0.3s / 0.6s / 0.9s @ 0.8s duration | 0.4s / 0.65s / 0.9s @ 1s duration |
| Glow accent | none | Radial gradient div (see below) |

### Warm glow accent

Add between the overlay div and the content div in hero.tsx. Must sit above the black overlay but below the text content:

```tsx
{/* Full overlay for contrast */}
<div className="absolute inset-0 bg-black/40" />

{/* Warm glow accent behind text */}
<div
  className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-[5]"
  style={{
    background: "radial-gradient(ellipse, rgba(232, 190, 160, 0.15) 0%, transparent 70%)"
  }}
/>

{/* Content — centered (z-10) */}
<div className="relative z-10 ...">
```

The `z-[5]` places it above the overlay (unstacked) but below the content (`z-10`). `pointer-events-none` ensures it doesn't block clicks. The ellipse is centered horizontally and positioned in the lower-center where the text sits.

### Hero CSS changes (in globals.css)

```css
.hero-ken-burns {
  animation: kenBurns 25s ease-in-out forwards;
}

@keyframes kenBurns {
  from { transform: scale(1); }
  to { transform: scale(1.06); }
}

.hero-fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 0.4s forwards;
}

.hero-fade-in-delayed-1 {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 0.65s forwards;
}

.hero-fade-in-delayed-2 {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 0.9s forwards;
}
```

## 5. Mobile Layout Fixes

| Fix | Current | New | Location |
|-----|---------|-----|----------|
| Section padding | `py-20` | `py-12 md:py-20` | All `<section>` tags across all pages |
| Page header h1 (gallery, about, contact) | `text-5xl md:text-6xl` | `text-4xl sm:text-5xl md:text-6xl` | `gallery/page.tsx:75`, `about/page.tsx`, `contact/page.tsx` |
| About story grid gap | `gap-16` | `gap-8 md:gap-16` | `about/page.tsx` |
| Contact grid gap | `gap-16` | `gap-8 lg:gap-16` | `contact/page.tsx` |
| Homepage about snippet gap | `gap-12` | `gap-8 md:gap-12` | `page.tsx:106` |
| Gallery grid gap | `gap-3` | `gap-2 sm:gap-3` | `gallery/page.tsx:102`, `page.tsx:76` |
| Footer grid | `grid-cols-1 md:grid-cols-3` | `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` | `footer.tsx` |
| Services subtitle mb | `mb-14` | `mb-8 md:mb-14` | `page.tsx:47` (services section paragraph) |
| Featured gallery header mb | `mb-14` | `mb-8 md:mb-14` | `page.tsx:70` ("Our Work" header div) |

**Deliberately excluded from mobile fixes:**
- Gallery filter bar: the `flex-wrap gap-2` pattern works acceptably on 375px. "Arches & Backdrops" wraps to a new line but is still tappable.
- About story section image: no hover effect added (it's a static brand photo, not a portfolio piece).
- Navbar and lightbox: already well-optimized for mobile.

## 6. Accessibility

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .scroll-fade {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .hero-fade-in,
  .hero-fade-in-delayed-1,
  .hero-fade-in-delayed-2 {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .hero-ken-burns {
    animation: none;
  }
}
```

**Note:** Hover transitions (glow, lift) are NOT disabled by reduced-motion. These are user-initiated (hover-triggered), not auto-playing animations. Per WCAG 2.1 SC 2.3.3, the reduced-motion preference targets motion that is not triggered by the user. Hover effects are a direct response to user action and are acceptable.

## 7. Files

### New (2)

| File | Purpose |
|------|---------|
| `hooks/use-in-view.ts` | Intersection Observer hook |
| `components/ui/scroll-reveal.tsx` | Client wrapper for server-component pages |

### Modified (7)

| File | Changes |
|------|---------|
| `app/globals.css` | Glow CSS custom properties in `:root`, glow utility classes in `@layer utilities`, scroll-fade + stagger CSS, hero animation timing changes, reduced-motion media query |
| `components/ui/hero.tsx` | h1 mobile sizing (`text-3xl sm:`), `h-[100svh]`, warm glow accent div, CTA hover glow |
| `app/page.tsx` | Add `"use client"`, `useInView()` per section (4 calls), gallery image outer/inner div restructure, service card hover glow, mobile spacing fixes |
| `app/gallery/page.tsx` | Image outer/inner div restructure (onClick on outer), `useInView()` on grid with `key={active}`, individual tiles get `scroll-fade stagger-{i}`, mobile spacing |
| `app/about/page.tsx` | `<ScrollReveal>` around story section, pillars section, instagram CTA, bottom CTA. Pillar card hover glow. Mobile spacing |
| `app/contact/page.tsx` | `<ScrollReveal>` around form section and CTA. Mobile spacing |
| `components/layout/footer.tsx` | Add `sm:grid-cols-2` breakpoint, reduce mobile gap |

### No new dependencies

## 8. Implementation Order

1. `app/globals.css` — all CSS foundation (glow, scroll-fade, stagger, hero timing, reduced-motion)
2. `hooks/use-in-view.ts` — create Intersection Observer hook
3. `components/ui/scroll-reveal.tsx` — create client wrapper component
4. `components/ui/hero.tsx` — mobile sizing, 100svh, glow accent, animation timing
5. `app/page.tsx` — "use client", scroll animations, hover restructure, mobile spacing
6. `app/gallery/page.tsx` — hover restructure, scroll animations with filter key, mobile spacing
7. `app/about/page.tsx` — ScrollReveal wrappers, pillar hover, mobile spacing
8. `app/contact/page.tsx` — ScrollReveal wrappers, mobile spacing
9. `components/layout/footer.tsx` — responsive grid fix

## 9. Verification

- Run `npm run dev` and test each page at 375px, 768px, and 1440px widths
- Scroll through homepage: each section should fade in as it enters viewport, with stagger on grids
- Gallery: change filter categories, verify images re-animate with stagger
- Hover over gallery images: warm glow + 6px lift visible, lightbox still opens on click
- Hover over service/pillar cards: warm glow + 4px lift
- Hover over CTA buttons: warm shadow appears
- Hero: text readable on 375px phone (`text-3xl`), Ken Burns smooth, warm glow accent visible behind text
- Test with `prefers-reduced-motion: reduce` (DevTools > Rendering > Emulate CSS media feature) — all auto-playing animations disabled, hover effects still work
- Check that "Book This Style" link on gallery hover still navigates correctly (stopPropagation works with outer div onClick)
