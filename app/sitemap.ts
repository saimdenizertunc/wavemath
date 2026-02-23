import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const slugs = await getAllPostSlugs();

  const postEntries: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postEntries,
  ];
}
