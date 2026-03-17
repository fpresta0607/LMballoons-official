"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Hero } from "@/components/ui/hero";
import { useInView } from "@/hooks/use-in-view";
import { Testimonials } from "@/components/ui/testimonials";

const services = [
  {
    icon: <Sparkles size={28} />,
    title: "Custom Balloon Designs",
    desc: "Garlands, centerpieces, columns, custom backdrops, and more, built from scratch around your colors, theme, and vision.",
  },
  {
    icon: <Star size={28} />,
    title: "Event Decor and Setup",
    desc: "Full-service styling for birthdays, showers, milestone celebrations, and everything in between. We handle delivery, setup, and breakdown.",
  },
];

const featuredImages = [
  { src: "/images/generated/BalloonGarlandBackdrop.png", alt: "Custom balloon garland backdrop for events in Chicagoland" },
  { src: "/images/generated/BirthdayPartyArch.png", alt: "Birthday party balloon arch by LM Designs" },
  { src: "/images/generated/LEDcenterpiece3.png", alt: "LED balloon centerpiece display" },
  { src: "/images/generated/LedCenterpiece2.png", alt: "Glowing LED balloon centerpiece design" },
  { src: "/images/generated/StPatricksGarland.png", alt: "St. Patrick's Day balloon garland display" },
  { src: "/images/generated/ValentinesPillar.png", alt: "Valentine's balloon pillar display" },
];

const faqs = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve Chicago\u2019s western suburbs including Schaumburg, Elmhurst, Itasca, Naperville, Oak Brook, Addison, Lombard, Villa Park, Glen Ellyn, Wheaton, and surrounding Chicagoland areas.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 2\u20133 weeks in advance to ensure availability, especially during peak event seasons. For larger installations, earlier booking is recommended.",
  },
  {
    question: "What types of events do you decorate for?",
    answer:
      "We decorate for birthdays, weddings, baby showers, bridal showers, corporate events, graduations, anniversaries, grand openings, and any celebration that calls for something special.",
  },
  {
    question: "How much do balloon decorations cost?",
    answer:
      "Pricing depends on the scope of your event, the type of installation, and design complexity. Contact us with your event details for a personalized quote.",
  },
  {
    question: "Do you offer LED balloon displays?",
    answer:
      "Yes! LED balloon centerpieces and displays are one of our specialties. They add a stunning glow to any event and are perfect for evening celebrations.",
  },
  {
    question: "How do I book LM Designs & Balloons Co.?",
    answer:
      "Simply fill out our contact form with your event details, and we\u2019ll get back to you within 24\u201348 hours to discuss your vision and provide a quote.",
  },
  {
    question: "Can I customize my balloon colors and design?",
    answer:
      "Absolutely! Every installation is fully custom. We work with you to match your colors, theme, and overall vision for a one-of-a-kind design.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function HomePage() {
  const servicesView = useInView();
  const galleryView = useInView();
  const aboutView = useInView();
  const faqView = useInView();
  const ctaView = useInView();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero
        imageSrc="/images/generated/LEDCenterpiece_Home.png"
        imageAlt="Elegant LED balloon centerpieces at a dinner table"
        title="Balloons & Event Decor"
        tagline="Boutique Custom Balloon Decorating in Chicagoland"
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
            Custom balloon displays, setup, and delivery — designed to make your event unforgettable.
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
            <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_20px_50px_rgba(61,50,48,0.18)]">
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
              LM Designs &amp; Balloons Co. is a boutique balloon decorating
              service in Chicagoland, serving Schaumburg, Elmhurst, Itasca,
              Naperville, and the western suburbs. Lindsey and Marina specialize
              in custom balloon garlands, arches, centerpieces, LED displays,
              and full event styling.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-8">
              Whether it&apos;s a birthday, baby shower, wedding, corporate
              event, or any milestone worth celebrating, we bring your vision to
              life with precision, creativity, and a personal touch.
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

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-white">
        <div ref={faqView.ref} data-in-view={faqView.isInView} className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-14 scroll-fade">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
              Common Questions
            </p>
            <h2 className="font-serif text-4xl text-charcoal">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`p-6 border border-rose scroll-fade stagger-${Math.min(i + 1, 9)}`}
              >
                <h3 className="font-serif text-lg text-charcoal mb-2">{faq.question}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">{faq.answer}</p>
              </div>
            ))}
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
