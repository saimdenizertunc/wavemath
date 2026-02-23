import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import CustomPortableText from "@/components/CustomPortableText";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const ogImage = post.mainImage?.asset?._ref
    ? urlForImage(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const heroImageSrc = post.mainImage?.asset?._ref
    ? urlForImage(post.mainImage).width(1600).height(900).fit("crop").auto("format").url()
    : null;

  const authorImageSrc =
    post.author?.image?.asset?._ref
      ? urlForImage(post.author.image).width(80).height(80).fit("crop").url()
      : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    ...(heroImageSrc && { image: heroImageSrc }),
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "WaveMath",
      url: siteUrl,
    },
    url: `${siteUrl}/blog/${post.slug.current}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero image — 60vh */}
      <div className="relative h-[60vh] overflow-hidden">
        {heroImageSrc ? (
          <Image
            src={heroImageSrc}
            alt={post.mainImage?.alt ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-espresso" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(38,28,26,0.5) 100%)",
          }}
        />
      </div>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-6 pb-24">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 mb-6">
            {post.categories.map((cat) => (
              <span
                key={cat.slug.current}
                className="bg-coffee text-cream text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl font-black text-espresso leading-tight mb-6">
          {post.title}
        </h1>

        {/* Author meta bar */}
        <div className="flex items-center gap-4 pb-8 mb-8 border-b border-umber/20">
          {authorImageSrc && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={authorImageSrc}
                alt={post.author!.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            {post.author && (
              <p className="font-semibold text-espresso">{post.author.name}</p>
            )}
            <p className="text-sm text-umber">{formatDate(post.publishedAt)}</p>
          </div>
        </div>

        {/* Body */}
        {post.body && <CustomPortableText value={post.body} />}
      </article>
    </>
  );
}
