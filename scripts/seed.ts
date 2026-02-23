/**
 * Seed script — creates sample Author, Category, and Posts in Sanity.
 * Run with: npx tsx scripts/seed.ts
 * Requires SANITY_API_WRITE_TOKEN in .env.local with Editor permissions.
 */

import { createClient } from "next-sanity";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function seed() {
  console.log("🌱 Seeding Sanity...\n");

  // 1. Create Author
  const author = await client.createOrReplace({
    _id: "author-wavemath",
    _type: "author",
    name: "Alex Rivers",
    slug: { current: "alex-rivers" },
    bio: [
      {
        _type: "block",
        _key: "bio1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Writer and thinker exploring the edges of creativity and technology.",
          },
        ],
      },
    ],
  });
  console.log("✓ Author created:", author.name);

  // 2. Create Categories
  const categories = await Promise.all([
    client.createOrReplace({
      _id: "category-technology",
      _type: "category",
      title: "Technology",
      slug: { current: "technology" },
      description: "Exploring the digital frontier",
    }),
    client.createOrReplace({
      _id: "category-culture",
      _type: "category",
      title: "Culture",
      slug: { current: "culture" },
      description: "Ideas that shape how we live",
    }),
  ]);
  console.log("✓ Categories created:", categories.map((c) => c.title).join(", "));

  // 3. Create Posts
  const posts = [
    {
      _id: "post-the-wave-equation",
      _type: "post",
      title: "The Wave Equation of Modern Thought",
      slug: { current: "the-wave-equation-of-modern-thought" },
      featured: true,
      publishedAt: new Date().toISOString(),
      excerpt:
        "Ideas, like waves, carry energy across vast distances. The question is never whether a wave will reach shore — only how it will reshape the land when it does.",
      author: { _type: "reference", _ref: "author-wavemath" },
      categories: [{ _type: "reference", _ref: "category-culture" }],
      body: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Every great idea begins as a disturbance. A small perturbation in the fabric of the ordinary — barely noticeable at first, easy to dismiss. But ideas, like waves, carry energy across vast distances.",
            },
          ],
        },
        {
          _type: "block",
          _key: "b2",
          style: "h2",
          children: [{ _type: "span", _key: "s2", text: "The Nature of Propagation" }],
        },
        {
          _type: "block",
          _key: "b3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Waves don't move matter — they move energy through matter. This is the quiet truth that most people miss when they talk about influence. You are not transplanting your ideas into someone else's mind; you are creating a resonance.",
            },
          ],
        },
        {
          _type: "alertBox",
          _key: "alert1",
          type: "info",
          message:
            "The most powerful ideas are those that create resonance — they don't change minds, they reveal what was already true.",
        },
        {
          _type: "block",
          _key: "b4",
          style: "blockquote",
          children: [
            {
              _type: "span",
              _key: "s4",
              text: "\"The question is never whether a wave will reach shore — only how it will reshape the land when it does.\"",
            },
          ],
        },
      ],
    },
    {
      _id: "post-mathematics-of-beauty",
      _type: "post",
      title: "The Hidden Mathematics of Beautiful Design",
      slug: { current: "hidden-mathematics-of-beautiful-design" },
      featured: false,
      publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      excerpt:
        "Behind every piece of design that stops you in your tracks is a set of ratios, rhythms, and rules that your brain recognises before your conscious mind does.",
      author: { _type: "reference", _ref: "author-wavemath" },
      categories: [{ _type: "reference", _ref: "category-technology" }],
      body: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "The golden ratio is 1.618. The Fibonacci sequence is 1, 1, 2, 3, 5, 8, 13. These numbers appear in nautilus shells, sunflower spirals, and the proportions of the Parthenon. They also appear, quietly, in the best software interfaces ever built.",
            },
          ],
        },
        {
          _type: "codeSnippet",
          _key: "code1",
          language: "javascript",
          code: `// The golden ratio in CSS
const phi = 1.618;
const baseUnit = 16; // 1rem

const scale = {
  xs:   baseUnit / phi / phi,  // ~6px
  sm:   baseUnit / phi,         // ~10px
  base: baseUnit,               // 16px
  lg:   baseUnit * phi,         // ~26px
  xl:   baseUnit * phi * phi,   // ~42px
};`,
        },
        {
          _type: "block",
          _key: "b2",
          style: "h2",
          children: [{ _type: "span", _key: "s2", text: "Rhythm in Typography" }],
        },
        {
          _type: "block",
          _key: "b3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "A baseline grid is not a constraint — it is a promise. Every element on the page agrees to respect the same vertical rhythm, creating a reading experience that feels effortless even when the reader can't articulate why.",
            },
          ],
        },
      ],
    },
    {
      _id: "post-silence-as-design",
      _type: "post",
      title: "Silence as a Design Material",
      slug: { current: "silence-as-a-design-material" },
      featured: false,
      publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      excerpt:
        "The most underused element in any creative work is emptiness. What you choose not to include defines the work as much as what you do.",
      author: { _type: "reference", _ref: "author-wavemath" },
      categories: [{ _type: "reference", _ref: "category-culture" }],
      body: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "John Cage composed 4'33\" — four minutes and thirty-three seconds of a performer sitting at a piano, not playing. The audience provided the music: the rustling of programmes, someone coughing, the hum of the ventilation system. Cage was not being provocative. He was making a philosophical argument.",
            },
          ],
        },
        {
          _type: "alertBox",
          _key: "alert1",
          type: "success",
          message: "White space is not empty — it is the breath between words that makes speech intelligible.",
        },
        {
          _type: "block",
          _key: "b2",
          style: "blockquote",
          children: [
            {
              _type: "span",
              _key: "s2",
              text: "\"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.\" — Antoine de Saint-Exupéry",
            },
          ],
        },
      ],
    },
  ];

  for (const post of posts) {
    await client.createOrReplace(post);
    console.log(`✓ Post created: "${post.title}"`);
  }

  console.log("\n🎉 Done! Visit http://localhost:3000 to see your content.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
