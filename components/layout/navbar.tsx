"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.25);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-10 w-10 shrink-0">
          <Image
            src="/images/logo.png"
            alt="LM Designs & Balloons Co."
            fill
            className={`object-contain transition-all duration-500 ${
              isTransparent ? "brightness-0 invert" : ""
            }`}
            sizes="40px"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === l.href
                    ? isTransparent
                      ? "text-white"
                      : "text-charcoal"
                    : isTransparent
                      ? "text-white/70 hover:text-white"
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
              className={`text-xs tracking-[0.2em] uppercase px-6 py-2 transition-all duration-300 ${
                isTransparent
                  ? "border border-white/40 text-white hover:bg-white/10"
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
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                pathname === l.href
                  ? "text-charcoal"
                  : "text-charcoal-light hover:text-charcoal"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-xs tracking-[0.2em] uppercase bg-charcoal text-white px-6 py-3 text-center hover:bg-black transition-colors"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
