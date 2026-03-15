"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent only on homepage when not scrolled and mobile menu is closed
  const isTransparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/90 backdrop-blur-sm border-b border-rose"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span
            className={`font-serif text-xl font-bold tracking-widest uppercase transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-charcoal"
            }`}
          >
            LM
          </span>
          <span
            className={`text-[9px] tracking-[0.25em] uppercase transition-colors duration-300 ${
              isTransparent ? "text-white/70" : "text-charcoal-light"
            }`}
          >
            Designs &amp; Balloons Co.
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-charcoal-light hover:text-charcoal"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`text-sm tracking-widest uppercase px-5 py-2 transition-all duration-300 ${
                isTransparent
                  ? "border border-white/50 text-white hover:bg-white/10"
                  : "bg-charcoal text-white hover:bg-black"
              }`}
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            isTransparent ? "text-white" : "text-charcoal"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-rose px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-charcoal-light hover:text-charcoal transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-sm tracking-widest uppercase bg-charcoal text-white px-5 py-2 text-center hover:bg-black transition-colors"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
