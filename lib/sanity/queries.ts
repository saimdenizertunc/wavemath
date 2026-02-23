const postCardFields = `
  _id,
  title,
  slug,
  excerpt,
  mainImage { ..., "alt": alt },
  publishedAt,
  "author": author->{ name, slug, image },
  "categories": categories[]->{ title, slug }
`;

export const featuredPostQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0] {
    ${postCardFields}
  }
`;

export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    ${postCardFields}
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    ${postCardFields},
    body,
    "author": author->{ name, slug, image, bio }
  }
`;

export const allPostSlugsQuery = `
  *[_type == "post"] { "slug": slug.current }
`;
