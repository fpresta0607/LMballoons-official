import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-rose">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl tracking-widest uppercase mb-2 text-charcoal">LM</p>
          <p className="text-xs tracking-[0.25em] uppercase text-charcoal-light mb-4">
            Designs &amp; Balloons Co.
          </p>
          <p className="text-sm text-charcoal-light leading-relaxed">
            Bringing your celebrations to life with handcrafted balloon artistry.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-charcoal-light mb-4">Navigate</p>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/media", label: "Media" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-charcoal-light mb-4">Follow Along</p>
          <div className="space-y-3">
            <a
              href="https://www.instagram.com/lmdesignsandco/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal transition-colors"
            >
              <Instagram size={16} />
              @lmdesignsandco
            </a>
            <a
              href="https://www.facebook.com/people/LM-Designs-Balloons-Co/61586605825525/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal transition-colors"
            >
              <Facebook size={16} />
              LM Designs & Balloons Co.
            </a>
          </div>
          <p className="mt-4 text-sm text-charcoal-light">
            For inquiries, fill out our{" "}
            <Link href="/contact" className="underline hover:text-charcoal transition-colors">
              contact form
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="border-t border-rose text-center py-4 text-xs text-charcoal-light tracking-widest uppercase">
        © {new Date().getFullYear()} LM Designs &amp; Balloons Co. All rights reserved.
      </div>
    </footer>
  );
}
