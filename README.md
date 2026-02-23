# WaveMath

A premium editorial blog built with Next.js 16, Sanity CMS, and Framer Motion. Cinematic design with parallax heroes, scroll-triggered animations, and a warm typographic palette.

## Tech Stack

- **Next.js 16** — App Router, React Server Components, ISR
- **React 19** — latest concurrent features
- **Sanity v5** — headless CMS with embedded studio at `/studio`
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **Framer Motion** — parallax scroll, staggered reveals, page transitions
- **TypeScript** — strict mode, end-to-end type safety

## Features

- Full-screen cinematic hero with parallax scrolling
- Scroll-triggered post card animations with staggered delays
- Adaptive sticky header that morphs on scroll
- Full-screen overlay navigation
- Blog post pages with JSON-LD structured data
- Custom Portable Text rendering (code blocks, alert boxes, images)
- Category filtering and browsing
- Automatic sitemap and robots.txt generation
- AI-powered content generation via Claude API
- Sanity Studio embedded at `/studio`

## Project Structure

```
app/
  layout.tsx              root layout — fonts, header, footer
  page.tsx                home — hero + topic chips + post grid
  globals.css             Tailwind v4 theme (design tokens)
  blog/[slug]/page.tsx    individual post with JSON-LD
  categories/page.tsx     all categories listing
  category/[slug]/page.tsx  filtered posts by category
  studio/                 embedded Sanity Studio
components/
  CinematicHero.tsx       parallax hero with motion entrance
  Header.tsx              adaptive sticky header
  FullScreenNav.tsx       full-screen overlay navigation
  PostCard.tsx            animated post card
  CustomPortableText.tsx  rich text renderer
  portable-text/          custom block components
lib/sanity/               data layer (client, queries, types, fetch, image)
sanity/schemas/           CMS content models
scripts/
  seed.ts                 seed Sanity with sample data
  generate-post.ts        AI content generation with Claude
```

## Design

The visual language pairs **Playfair Display** (serif headings) with **Inter** (body text) on a warm tonal palette:

| Token    | Hex       | Usage                  |
|----------|-----------|------------------------|
| cream    | `#fefbf9` | backgrounds            |
| sand     | `#f7e1cd` | cards, secondary bg    |
| umber    | `#8b685d` | muted text, borders    |
| coffee   | `#614841` | accents, categories    |
| espresso | `#261c1a` | primary text, dark bg  |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity.io](https://sanity.io) project (free tier works)

### Setup

```bash
# install dependencies
npm install

# create environment file
cp .env.example .env.local
```

Add your credentials to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000) for the blog and [localhost:3000/studio](http://localhost:3000/studio) for the CMS.

### Content Scripts

```bash
# seed sample data
npm run seed

# generate a post with AI (requires ANTHROPIC_API_KEY + SANITY_API_WRITE_TOKEN)
npm run generate "the intersection of mathematics and music"
```

## Deployment

Deploy to [Vercel](https://vercel.com) and add the environment variables from `.env.local` to your project settings.

## License

MIT
