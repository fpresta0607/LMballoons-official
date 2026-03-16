"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Hero } from "@/components/ui/hero";
import { useInView } from "@/hooks/use-in-view";

const services = [
  {
    icon: <Sparkles size={28} />,
    title: "Custom Balloon Designs",
    desc: "Arches, garlands, centerpieces, columns, and sculptures, built from scratch around your colors, theme, and vision.",
  },
  {
    icon: <Star size={28} />,
    title: "Event Decor and Setup",
    desc: "Full-service styling for birthdays, baby showers, milestone celebrations, and everything in between. We handle delivery, setup, and breakdown.",
  },
];

const featuredImages = [
  { src: "/images/generated/BalloonGarlandBackdrop.png", alt: "Balloon garland backdrop" },
  { src: "/images/generated/BirthdayPartyArch.png", alt: "Birthday party arch" },
  { src: "/images/generated/LEDcenterpiece3.png", alt: "LED centerpiece display" },
  { src: "/images/generated/LedCenterpiece2.png", alt: "LED centerpiece design" },
  { src: "/images/generated/ValentinesCenterpiece.png", alt: "Valentine's centerpiece" },
  { src: "/images/generated/ValentinesPillar.png", alt: "Valentine's pillar display" },
];

export default function HomePage() {
  const servicesView = useInView();
  const galleryView = useInView();
  const aboutView = useInView();
  const ctaView = useInView();

  return (
    <>
      <Hero
        imageSrc="/images/generated/LEDCenterpiece_Home.png"
        imageAlt="Elegant LED balloon centerpieces at a dinner table"
        title="Balloons & Event Decor"
        tagline="Custom Balloon Artistry for Every Celebration"
      />

      {/* Services */}
      <section className="py-12 md:py-20 bg-white">
        <div ref={servicesView.ref} data-in-view={servicesView.isInView} className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4 scroll-fade">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
              What We Do
            </p>
            <h2 className="font-serif text-4xl text-charcoal">Every Balloon. Every Event.</h2>
          </div>
          <p className="text-center text-charcoal-light max-w-xl mx-auto mb-8 md:mb-14 scroll-fade stagger-2">
            Custom designs, full event styling, setup and delivery. If it involves balloons, we do it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`p-8 border border-rose transition-all duration-500 hover:border-charcoal hover:glow-warm hover:-translate-y-1 group text-center scroll-fade stagger-${i + 3}`}
              >
                <div className="text-charcoal-light group-hover:text-charcoal transition-colors mb-4 flex justify-center">
                  {s.icon}
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3">{s.title}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-12 md:py-20 bg-cream">
        <div ref={galleryView.ref} data-in-view={galleryView.isInView} className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-14 scroll-fade">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
              Our Work
            </p>
            <h2 className="font-serif text-4xl text-charcoal">Featured Designs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {featuredImages.map((img, i) => (
              <div
                key={i}
                className={`transition-all duration-500 hover:-translate-y-1.5 hover:glow-warm-hover group scroll-fade stagger-${i + 1}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 scroll-fade stagger-7">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal hover:text-white transition-colors"
            >
              See All Media
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-12 md:py-20 bg-white">
        <div ref={aboutView.ref} data-in-view={aboutView.isInView} className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex items-center justify-center scroll-fade">
            <div className="relative w-52 h-52 md:w-64 md:h-64 drop-shadow-[0_20px_50px_rgba(61,50,48,0.18)]">
              <Image
                src="/images/logo.png"
                alt="LM Designs & Balloons Co. logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="scroll-fade stagger-2">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
              About Us
            </p>
            <h2 className="font-serif text-4xl text-charcoal mb-6 leading-snug">
              Meet Lindsey &amp; Marina
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We&apos;re Lindsey and Marina, the duo behind LM Designs, with a shared
              passion for design, celebration, and making people smile. What started
              as a love for beautiful events has grown into something we pour our
              hearts into every single day.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-8">
              We&apos;ve been dreaming up custom designs for years, and we still
              get just as excited about every new event. Whether it&apos;s your
              birthday, your big launch, or any milestone worth celebrating, we
              can&apos;t wait to meet you and make your moment truly special.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-charcoal border-b border-charcoal pb-1 hover:text-charcoal-light hover:border-charcoal-light transition-colors"
            >
              Learn More
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-cream py-12 md:py-20">
        <div ref={ctaView.ref} data-in-view={ctaView.isInView} className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-charcoal mb-4 scroll-fade">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-charcoal-light mb-10 text-lg max-w-xl mx-auto scroll-fade stagger-2">
            Tell us about your vision and we&apos;ll create something extraordinary.
          </p>
          <div className="scroll-fade stagger-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)] transition-all"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
