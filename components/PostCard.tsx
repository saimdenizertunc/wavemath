"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { PostCard as PostCardType } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

interface PostCardProps {
  post: PostCardType;
  index?: number;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const imageSrc = post.mainImage?.asset?._ref
    ? urlForImage(post.mainImage).width(600).height(400).fit("crop").auto("format").url()
    : null;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="bg-sand rounded-2xl overflow-hidden flex flex-col group"
    >
      <Link href={`/blog/${post.slug.current}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={post.mainImage?.alt ?? post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-umber/20 flex items-center justify-center">
              <span className="font-serif text-umber/40 text-4xl">W</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((cat) => (
              <Link
                key={cat.slug.current}
                href={`/category/${cat.slug.current}`}
                className="bg-coffee text-cream text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wider hover:bg-sand hover:text-espresso transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.slug.current}`}>
          <h3 className="font-serif text-xl font-bold text-espresso mb-2 leading-snug group-hover:text-coffee transition-colors">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-sm text-espresso/70 line-clamp-3 leading-relaxed mb-4 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-umber/20">
          {post.author?.image?.asset?._ref && (
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={urlForImage(post.author.image).width(64).height(64).fit("crop").url()}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            {post.author && (
              <p className="text-xs font-semibold text-espresso truncate">
                {post.author.name}
              </p>
            )}
            <p className="text-xs text-umber">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
