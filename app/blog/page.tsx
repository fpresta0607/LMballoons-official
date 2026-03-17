import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero Header with Background */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image
          src="/images/blog/blog-section-hero.png"
          alt="Luxury balloon installation in a grand venue"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-3">
            Tips &amp; Guides
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            Blog
          </h1>
          <p className="text-white/80 mt-4 max-w-lg mx-auto">
            Planning tips, color guides, and ideas to help you create
            unforgettable balloon decor for your next event.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-charcoal-light mb-2">
                  {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="font-serif text-xl text-charcoal mb-2 group-hover:text-charcoal-light transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-charcoal-light leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-charcoal group-hover:gap-2.5 transition-all">
                  Read More
                  <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-charcoal-light mb-8 max-w-md mx-auto">
            Get in touch and let&apos;s bring your balloon decor vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)] transition-all"
          >
            Book Your Event
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
