import { Suspense } from "react";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ui/contact-form";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Book Your Balloon Decor | Chicagoland",
  description:
    "Book LM Designs & Balloons Co. for custom balloon garlands, arches, LED centerpieces, and event styling in Schaumburg, Elmhurst, Naperville, and Chicagoland.",
  openGraph: {
    title: "Book Your Balloon Decor | LM Designs & Balloons Co.",
    description:
      "Book custom balloon decorations for your next event. Serving Schaumburg, Elmhurst, Naperville, and Chicago's western suburbs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Balloon Decor | LM Designs & Balloons Co.",
    description:
      "Book custom balloon decorations for your next event. Serving Chicagoland's western suburbs.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-cream py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal leading-tight max-w-lg">
            Let&apos;s Plan Your Perfect Event
          </h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-12 md:py-20 bg-white">
        <ScrollReveal className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-2 scroll-fade">
            <Suspense>
              <ContactForm />
            </Suspense>

            {/* Prefer email */}
            <div className="mt-8 pt-8 border-t border-rose">
              <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-2">
                Prefer Email?
              </p>
              <a
                href="mailto:LM.Designs.Balloons.Co@gmail.com"
                className="text-sm text-charcoal hover:text-charcoal-light transition-colors underline"
              >
                LM.Designs.Balloons.Co@gmail.com
              </a>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="space-y-8 scroll-fade stagger-2">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-5">
                Contact Info
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <Instagram size={18} className="text-charcoal-light mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-charcoal-light mb-1">
                      Instagram
                    </p>
                    <a
                      href="https://www.instagram.com/lmdesignsandco/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-charcoal hover:text-charcoal-light transition-colors underline"
                    >
                      @lmdesignsandco
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Facebook size={18} className="text-charcoal-light mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-charcoal-light mb-1">
                      Facebook
                    </p>
                    <a
                      href="https://www.facebook.com/people/LM-Designs-Balloons-Co/61586605825525/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-charcoal hover:text-charcoal-light transition-colors underline"
                    >
                      LM Designs & Balloons Co.
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-charcoal-light mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-charcoal-light mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:LM.Designs.Balloons.Co@gmail.com"
                      className="text-sm text-charcoal hover:text-charcoal-light transition-colors"
                    >
                      LM.Designs.Balloons.Co@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-charcoal-light mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-charcoal-light mb-1">
                      Serving Area
                    </p>
                    <p className="text-sm text-charcoal">
                      Chicagoland, IL
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-cream border border-rose">
              <p className="font-serif text-lg text-charcoal mb-2">
                Booking Tips
              </p>
              <ul className="text-sm text-charcoal-light space-y-2 leading-relaxed">
                <li>• Book at least 2&ndash;3 weeks ahead</li>
                <li>• Include your venue address</li>
                <li>• Share your event start and end times</li>
                <li>• Tell us your colors, theme, or any inspo</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
