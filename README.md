# LM Designs & Balloons Co.

Portfolio and booking website for LM Designs & Balloons Co., a custom balloon design and event decoration business based in Chicagoland, IL.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 3.4 with custom color palette
- **Email:** Resend for transactional email delivery
- **Icons:** Lucide React
- **Fonts:** Playfair Display (headings) + Inter (body)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/sbollendorf24/LM-Balloons.git
cd LM-Balloons
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
LM-Balloons/
├── app/
│   ├── layout.tsx            # Root layout (Navbar + Footer)
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── contact/page.tsx      # Contact page
│   ├── gallery/page.tsx      # Gallery with category filters
│   ├── api/contact/route.ts  # Contact form API endpoint
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Responsive navigation bar
│   ├── Footer.tsx            # Site footer
│   └── ContactForm.tsx       # Booking inquiry form
├── public/images/            # Portfolio images and logo
├── tailwind.config.ts        # Custom theme (colors, fonts)
├── next.config.ts            # Next.js configuration
└── tsconfig.json             # TypeScript configuration
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero banner, services overview, featured gallery, about snippet, CTA |
| Gallery | `/gallery` | Filterable portfolio — Arches, Centerpieces, Backdrops, Events |
| About | `/about` | Brand story, values, Instagram CTA |
| Contact | `/contact` | Booking form with event type selection and email delivery |

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#F7EDEA` | Background |
| `rose` | `#E8D5CC` | Accents, borders |
| `charcoal` | `#3D3230` | Primary text |
| `charcoal-light` | `#6B5B59` | Secondary text |

## Contact Form

The contact form collects name, email, phone, event date, event type, and message. Submissions are sent via the Resend API to the business Gmail address. The form includes loading states, success/error feedback, and HTML5 validation.

## License

Private — All rights reserved.
