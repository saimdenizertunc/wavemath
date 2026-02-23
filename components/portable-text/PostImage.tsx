"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

interface PostImageProps {
  value: SanityImage;
}

export default function PostImage({ value }: PostImageProps) {
  if (!value?.asset?._ref) return null;

  const src = urlForImage(value).width(900).fit("max").auto("format").url();

  return (
    <motion.figure
      className="my-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image
          src={src}
          alt={value.alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-sm text-center text-umber italic">
          {value.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
