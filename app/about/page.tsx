import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import type { Metadata } from "next";

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
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal max-w-xl leading-tight">
            Made with Passion &amp; Precision
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-charcoal-light leading-relaxed mb-5">
              LM Designs &amp; Balloons Co. was born from a simple belief: that
              every event, no matter the size, deserves décor that feels
              intentional and extraordinary.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-5">
              What started as a creative passion quickly grew into a full-service
              balloon design studio. Today, we partner with families, businesses,
              and event planners across the area to create stunning, custom
              balloon installations that elevate any space.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              We&apos;re proud to be a trusted name in the events community.
              Follow along on Instagram{" "}
              <a
                href="https://www.instagram.com/lmdesignsandco/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal underline hover:text-charcoal-light transition-colors"
              >
                @lmdesignsandco
              </a>{" "}
              to see our latest work.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/images/StPatricksGarland.jpeg"
              alt="LM Designs balloon artistry"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
              What Sets Us Apart
            </p>
            <h2 className="font-serif text-4xl text-charcoal">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div key={p.number} className="p-8 bg-white border border-rose">
                <p className="font-serif text-4xl text-rose mb-4">{p.number}</p>
                <h3 className="font-serif text-xl text-charcoal mb-3">{p.title}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Stay Inspired
          </p>
          <h2 className="font-serif text-4xl text-charcoal mb-6">
            Follow Our Journey
          </h2>
          <p className="text-charcoal-light max-w-md mx-auto mb-8">
            See our latest creations, behind-the-scenes moments, and event
            highlights on Instagram.
          </p>
          <a
            href="https://www.instagram.com/lmdesignsandco/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-black transition-colors"
          >
            <Instagram size={16} />
            @lmdesignsandco
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cream py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Let&apos;s Create Something Beautiful Together
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-black transition-colors mt-4"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
