/**
 * AI content agent — Claude generates a blog post and publishes it to Sanity.
 * Run with: npx tsx scripts/generate-post.ts "your topic here"
 *
 * Requires:
 *   SANITY_API_WRITE_TOKEN  — Sanity Editor token
 *   ANTHROPIC_API_KEY       — from console.anthropic.com
 *
 * Install Anthropic SDK first: npm install @anthropic-ai/sdk
 */

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "next-sanity";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function textBlock(text: string, key: string, style = "normal") {
  return {
    _type: "block",
    _key: key,
    style,
    children: [{ _type: "span", _key: `${key}-span`, text }],
  };
}

interface GeneratedPost {
  title: string;
  excerpt: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    quote?: string;
  }>;
}

async function generatePost(topic: string): Promise<GeneratedPost> {
  console.log(`🤖 Generating post about: "${topic}"\n`);

  const message = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Write a premium editorial blog post for WaveMath — a thoughtful blog about creativity, technology, and culture.

Topic: "${topic}"

Return ONLY valid JSON with this exact shape:
{
  "title": "compelling headline (max 10 words)",
  "excerpt": "one-paragraph teaser (2–3 sentences)",
  "sections": [
    {
      "heading": "section heading",
      "paragraphs": ["paragraph 1", "paragraph 2"],
      "quote": "optional pull-quote (or omit)"
    }
  ]
}

Requirements:
- 3–4 sections
- Each section has 1–2 paragraphs of 3–5 sentences
- Tone: intellectual, warm, precise — like The Atlantic meets a design magazine
- At least one section should have a quote
- No markdown, only plain text in the JSON values`,
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Claude didn't return valid JSON");
  return JSON.parse(jsonMatch[0]);
}

async function publishToSanity(post: GeneratedPost, topic: string) {
  const slug = slugify(post.title);
  const id = `post-ai-${slug}-${Date.now()}`;
  const body = [];
  let keyIndex = 0;

  for (const section of post.sections) {
    body.push(textBlock(section.heading, `h-${keyIndex++}`, "h2"));

    for (const para of section.paragraphs) {
      body.push(textBlock(para, `p-${keyIndex++}`));
    }

    if (section.quote) {
      body.push(textBlock(`"${section.quote}"`, `q-${keyIndex++}`, "blockquote"));
    }
  }

  await sanity.createOrReplace({
    _id: id,
    _type: "post",
    title: post.title,
    slug: { current: slug },
    excerpt: post.excerpt,
    publishedAt: new Date().toISOString(),
    featured: false,
    body,
  });

  return slug;
}

async function main() {
  const topic = process.argv[2];
  if (!topic) {
    console.error('Usage: npx tsx scripts/generate-post.ts "your topic"');
    process.exit(1);
  }

  try {
    const generated = await generatePost(topic);
    console.log(`📝 Title: ${generated.title}`);
    console.log(`📄 Sections: ${generated.sections.length}\n`);

    const slug = await publishToSanity(generated, topic);
    console.log(`✅ Published! View at: http://localhost:3000/blog/${slug}`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ Error:", message);
    process.exit(1);
  }
}

main();
