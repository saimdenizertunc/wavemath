"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { PostCard } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

interface CinematicHeroProps {
  post: PostCard;
}

export default function CinematicHero({ post }: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const imageSrc = post.mainImage?.asset?._ref
    ? urlForImage(post.mainImage).width(1600).height(900).fit("crop").auto("format").url()
    : null;

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={post.mainImage?.alt ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-espresso" />
        )}
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 20%, rgba(38,28,26,0.6) 60%, rgba(38,28,26,0.88) 100%)",
        }}
      />

      {/* Content — lower third */}
      <div className="absolute inset-x-0 bottom-0 pb-16 px-6 md:px-12 max-w-5xl">
        {post.categories && post.categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-2 mb-4"
          >
            {post.categories.map((cat) => (
              <Link
                key={cat.slug.current}
                href={`/category/${cat.slug.current}`}
                className="bg-coffee/80 backdrop-blur-sm text-cream text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider hover:bg-cream hover:text-espresso transition-colors duration-200"
              >
                {cat.title}
              </Link>
            ))}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl font-black text-cream leading-tight mb-4"
        >
          {post.title}
        </motion.h1>

        {post.excerpt && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-cream/80 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
          >
            {post.excerpt}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center gap-2 bg-cream text-espresso font-semibold px-8 py-3.5 rounded-full hover:bg-sand transition-colors duration-200"
          >
            Read Article
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
