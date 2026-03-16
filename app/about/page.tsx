import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "About | LM Designs & Balloons Co.",
  description:
    "Learn about LM Designs & Balloons Co., our story, values, and passion for bespoke balloon artistry.",
};

const pillars = [
  {
    number: "01",
    title: "Artistry First",
    desc: "Every installation is a work of art. We obsess over color, proportion, and texture to ensure each design is visually stunning from every angle.",
  },
  {
    number: "02",
    title: "Personal Touch",
    desc: "We take the time to understand your vision, your story, and the feeling you want to create, then we bring it to life with precision and care.",
  },
  {
    number: "03",
    title: "Reliable and Professional",
    desc: "From the first inquiry to the final installation, we show up on time, communicate clearly, and deliver exactly what we promise.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-cream py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal max-w-xl leading-tight">
            Made with Passion &amp; Precision
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-20 bg-white">
        <ScrollReveal className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="scroll-fade">
            <p className="text-charcoal-light leading-relaxed mb-5">
              LM Designs &amp; Balloons Co. transforms spaces through custom
              balloon installations crafted for celebrations, brand moments,
              and environments that demand something extraordinary.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-5">
              Every installation starts with you. We collaborate closely with
              each client to bring a vision to life that feels intentional,
              elevated, and completely one of a kind.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              Follow along on Instagram{" "}
              <a
                href="https://www.instagram.com/lmdesignsandco/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal underline hover:text-charcoal-light transition-colors"
              >
                @lmdesignsandco
              </a>{" "}
              to see our work.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden scroll-fade stagger-2">
            <Image
              src="/images/generated/LEDcenterpiece3.png"
              alt="LM Designs balloon artistry"
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Pillars */}
      <section className="py-12 md:py-20 bg-cream">
        <ScrollReveal className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-14 scroll-fade">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
              What Sets Us Apart
            </p>
            <h2 className="font-serif text-4xl text-charcoal">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div
                key={p.number}
                className={`p-8 bg-white border border-rose transition-all duration-500 hover:glow-warm hover:-translate-y-1 scroll-fade stagger-${i + 2}`}
              >
                <p className="font-serif text-4xl text-rose mb-4">{p.number}</p>
                <h3 className="font-serif text-xl text-charcoal mb-3">{p.title}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Instagram CTA */}
      <section className="py-12 md:py-20 bg-white">
        <ScrollReveal className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3 scroll-fade">
            Stay Inspired
          </p>
          <h2 className="font-serif text-4xl text-charcoal mb-6 scroll-fade stagger-2">
            Follow Our Journey
          </h2>
          <p className="text-charcoal-light max-w-md mx-auto mb-8 scroll-fade stagger-3">
            See our latest creations, behind-the-scenes moments, and event
            highlights on Instagram.
          </p>
          <div className="scroll-fade stagger-4">
            <a
              href="https://www.instagram.com/lmdesignsandco/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)] transition-all"
            >
              <Instagram size={16} />
              @lmdesignsandco
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cream py-12 md:py-16">
        <ScrollReveal className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4 scroll-fade">
            Let&apos;s Create Something Beautiful Together
          </h2>
          <div className="scroll-fade stagger-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)] transition-all mt-4"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
