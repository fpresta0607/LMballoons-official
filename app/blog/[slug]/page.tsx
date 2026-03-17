import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | LM Designs & Balloons Co.`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: `https://www.lmballoons.com${post.image}`, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | LM Designs & Balloons Co.`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    image: `https://www.lmballoons.com${post.image}`,
    author: {
      "@type": "Organization",
      name: "LM Designs & Balloons Co.",
      url: "https://www.lmballoons.com",
    },
    publisher: {
      "@type": "Organization",
      name: "LM Designs & Balloons Co.",
      url: "https://www.lmballoons.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />
      </section>

      {/* Article */}
      <article className="bg-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-charcoal-light hover:text-charcoal transition-colors mb-8"
          >
            <ArrowLeft size={12} />
            All Posts
          </Link>

          {/* Title + date */}
          <p className="text-xs tracking-[0.2em] uppercase text-charcoal-light mb-3">
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight mb-8">
            {post.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-charcoal-light
              prose-headings:font-serif prose-headings:text-charcoal
              prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-rose/50
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-base prose-p:sm:text-lg
              prose-a:text-charcoal prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-charcoal-light
              prose-ul:my-6 prose-ul:space-y-2 prose-ul:pl-6
              prose-ol:my-6 prose-ol:space-y-2 prose-ol:pl-6
              prose-li:text-base prose-li:sm:text-lg prose-li:text-charcoal-light prose-li:leading-[1.8]
              prose-strong:text-charcoal prose-strong:font-semibold
              prose-em:text-charcoal-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* CTA */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Book Your Event
          </h2>
          <p className="text-charcoal-light mb-8 max-w-md mx-auto">
            Ready to bring your vision to life? Let&apos;s chat about your event.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light hover:shadow-[0_4px_20px_rgba(232,190,160,0.4)] transition-all"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
