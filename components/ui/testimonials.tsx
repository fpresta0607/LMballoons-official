"use client";

import { useInView } from "@/hooks/use-in-view";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jessica M.",
    event: "Birthday Party",
    text: "Lindsey and Marina absolutely nailed it! The balloon garland was exactly what I envisioned for my daughter's birthday. They were professional, on time, and the setup was stunning. We got so many compliments!",
    rating: 5,
  },
  {
    name: "Rachel T.",
    event: "Baby Shower",
    text: "I cannot say enough good things about LM Designs. They transformed our venue into something magical. The attention to detail was incredible, and they made the whole process so easy. Highly recommend!",
    rating: 5,
  },
  {
    name: "Amanda K.",
    event: "Corporate Event",
    text: "We hired LM Designs for our company's grand opening and they exceeded all expectations. The LED centerpieces were a huge hit. Professional, creative, and so easy to work with!",
    rating: 5,
  },
];

export function Testimonials() {
  const view = useInView();

  return (
    <section className="py-12 md:py-20 bg-cream">
      <div ref={view.ref} data-in-view={view.isInView} className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-14 scroll-fade">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Client Love
          </p>
          <h2 className="font-serif text-4xl text-charcoal">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-8 bg-white border border-rose transition-all duration-500 hover:glow-warm hover:-translate-y-1 scroll-fade stagger-${i + 2}`}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-charcoal text-charcoal" />
                ))}
              </div>
              <p className="text-sm text-charcoal-light leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-charcoal">{t.name}</p>
                <p className="text-xs text-charcoal-light">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
