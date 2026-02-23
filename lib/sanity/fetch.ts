import { unstable_cache } from "next/cache";
import { serverClient } from "./client";
import {
  featuredPostQuery,
  allPostsQuery,
  postBySlugQuery,
  allPostSlugsQuery,
  allCategoriesQuery,
  categoryBySlugQuery,
} from "./queries";
import type { PostCard, PostFull, Category, CategoryWithPosts } from "./types";

// Guard: returns true when Sanity project ID is a real value (not placeholder)
function isSanityConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(id && id !== "your-project-id" && id.length > 4);
}

export const getFeaturedPost = unstable_cache(
  async (): Promise<PostCard | null> => {
    if (!isSanityConfigured()) return null;
    try {
      return await serverClient.fetch(featuredPostQuery);
    } catch {
      return null;
    }
  },
  ["featured-post"],
  { tags: ["post"], revalidate: 3600 }
);

export const getAllPosts = unstable_cache(
  async (limit = 9): Promise<PostCard[]> => {
    if (!isSanityConfigured()) return [];
    try {
      return await serverClient.fetch(allPostsQuery, { limit });
    } catch {
      return [];
    }
  },
  ["all-posts"],
  { tags: ["post"], revalidate: 3600 }
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<PostFull | null> => {
    if (!isSanityConfigured()) return null;
    try {
      return await serverClient.fetch(postBySlugQuery, { slug });
    } catch {
      return null;
    }
  },
  ["post-by-slug"],
  { tags: ["post"], revalidate: 3600 }
);

export const getAllPostSlugs = unstable_cache(
  async (): Promise<{ slug: string }[]> => {
    if (!isSanityConfigured()) return [];
    try {
      return await serverClient.fetch(allPostSlugsQuery);
    } catch {
      return [];
    }
  },
  ["all-post-slugs"],
  { tags: ["post"], revalidate: 3600 }
);

export const getAllCategories = unstable_cache(
  async (): Promise<Category[]> => {
    if (!isSanityConfigured()) return [];
    try {
      return await serverClient.fetch(allCategoriesQuery);
    } catch {
      return [];
    }
  },
  ["all-categories"],
  { tags: ["category"], revalidate: 3600 }
);

export const getCategoryBySlug = unstable_cache(
  async (slug: string): Promise<CategoryWithPosts | null> => {
    if (!isSanityConfigured()) return null;
    try {
      return await serverClient.fetch(categoryBySlugQuery, { slug });
    } catch {
      return null;
    }
  },
  ["category-by-slug"],
  { tags: ["category"], revalidate: 3600 }
);
