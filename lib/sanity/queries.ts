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

export const allCategoriesQuery = `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

export const categoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      ${postCardFields}
    }
  }
`;
