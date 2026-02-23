import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
  caption?: string;
}

export interface Author {
  name: string;
  slug: { current: string };
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface CategoryWithPosts extends Category {
  posts: PostCard[];
}

export interface PostCard {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  author?: Pick<Author, "name" | "slug" | "image">;
  categories?: Category[];
}

export interface PostFull extends PostCard {
  body: PortableTextBlock[];
  author?: Author;
}
