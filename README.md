# WaveMath — Where Ideas Flow

A premium editorial blog platform built with **Next.js 16**, **Sanity CMS**, **Tailwind CSS v4**, and **Framer Motion**. Features cinematic parallax heroes, scroll-triggered animations, an embedded headless CMS studio, and AI-powered content generation — all wrapped in a warm, typographic design system.

> Built as a modern full-stack blog starter and portfolio showcase demonstrating React Server Components, incremental static regeneration, GROQ queries, structured data, and animation-driven UI.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | [Next.js](https://nextjs.org) (App Router) | 16.1.6 |
| UI Library | [React](https://react.dev) | 19 |
| Language | [TypeScript](https://typescriptlang.org) (strict mode) | 5 |
| CMS | [Sanity](https://sanity.io) (headless CMS, GROQ) | 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) (v4 — `@theme` config) | 4 |
| Animation | [Framer Motion](https://motion.dev) | 12 |
| Rich Text | [@portabletext/react](https://github.com/portabletext/react-portabletext) | 6 |
| Syntax Highlighting | [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) (Prism) | 16 |
| Typography | [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) | 0.5 |
| Deployment | [Vercel](https://vercel.com) | — |

## Key Features

### Content & CMS
- **Sanity Studio** embedded at `/studio` — manage posts, authors, and categories without leaving the app
- **GROQ queries** with parameterized fetching, server-side caching via `unstable_cache`, and 1-hour ISR revalidation
- **Portable Text** renderer with custom block components for code snippets, alert boxes, and responsive images
- **Content schemas** for posts (with featured flag), authors (with bio), categories, and rich block content
- **Seed script** to bootstrap sample content — authors, categories, and editorial posts
- **AI content generation** script using the Claude API (Anthropic SDK) to write and publish posts directly to Sanity

### Design & Animation
- **Cinematic full-screen hero** with Framer Motion parallax scrolling (`useScroll` + `useTransform`)
- **Scroll-triggered post cards** with staggered entrance animations (`useInView` + motion variants)
- **Adaptive sticky header** that transitions from transparent to solid on scroll (`useMotionValueEvent`)
- **Full-screen overlay navigation** with staggered link reveals and `AnimatePresence` exit transitions
- **Custom design token system** in Tailwind CSS v4 using `@theme {}` blocks (no `tailwind.config.ts`)
- **Dual-font typography** — Playfair Display (serif headings) + Inter (sans-serif body) via `next/font/google`

### Performance & SEO
- **React Server Components** — pages render on the server with zero client JS by default
- **Incremental Static Regeneration** — `revalidate = 3600` on all routes, `generateStaticParams` for blog posts
- **JSON-LD structured data** on every blog post (`BlogPosting` schema with author, publisher, image)
- **Dynamic Open Graph & Twitter Card metadata** generated per-post with `generateMetadata`
- **Automatic sitemap.xml** and **robots.txt** generation via Next.js metadata API
- **Optimized images** through `next/image` with Sanity CDN (`cdn.sanity.io`) and responsive `sizes`
- **Code splitting** — client components (`"use client"`) isolated to interactive elements only

### Developer Experience
- **TypeScript strict mode** end-to-end — Sanity schemas, GROQ result types, component props
- **Tailwind CSS v4** with `@theme` design tokens and `@plugin` directives in `globals.css`
- **ESLint v9** flat config with `eslint-config-next` core web vitals rules
- **PostCSS** pipeline with `@tailwindcss/postcss`
- **Path aliases** — `@/*` maps to project root via `tsconfig.json`
- **Graceful fallback** — `isSanityConfigured()` guard prevents 401 errors when credentials aren't set

## Project Structure

```
wavemath/
├── app/
│   ├── layout.tsx                 # Root layout — fonts, header, footer
│   ├── page.tsx                   # Home — cinematic hero + topic chips + post grid
│   ├── globals.css                # Tailwind v4 @theme tokens + @plugin typography
│   ├── blog/[slug]/
│   │   ├── page.tsx               # Post page — hero image, portable text, JSON-LD
│   │   └── loading.tsx            # Skeleton loader (React Suspense)
│   ├── categories/page.tsx        # All categories listing
│   ├── category/[slug]/page.tsx   # Filtered posts by category
│   ├── studio/
│   │   ├── layout.tsx             # Bare layout (no header/footer)
│   │   └── [[...tool]]/page.tsx   # Embedded Sanity Studio (catch-all route)
│   ├── sitemap.ts                 # Dynamic XML sitemap
│   └── robots.ts                  # robots.txt generation
├── components/
│   ├── CinematicHero.tsx          # Full-screen parallax hero with motion entrance
│   ├── Header.tsx                 # Adaptive sticky header (transparent → solid)
│   ├── FullScreenNav.tsx          # Overlay nav with staggered link animation
│   ├── PostCard.tsx               # Scroll-triggered card with staggered delay
│   ├── CustomPortableText.tsx     # Sanity rich text renderer
│   └── portable-text/
│       ├── AlertBox.tsx           # Info / warning / success callout blocks
│       ├── CodeSnippet.tsx        # Syntax-highlighted code with Prism theme
│       └── PostImage.tsx          # Responsive image block
├── lib/sanity/
│   ├── client.ts                  # Sanity client (browser + server instances)
│   ├── fetch.ts                   # Cached data fetchers with ISR tags
│   ├── queries.ts                 # GROQ queries (featured, all posts, by slug, categories)
│   ├── types.ts                   # TypeScript types for PostCard, PostFull, Category
│   └── image.ts                   # Sanity image URL builder
├── sanity/
│   ├── env.ts                     # Environment variable validation
│   └── schemas/
│       ├── post.ts                # Post schema (title, slug, body, featured, categories)
│       ├── author.ts              # Author schema (name, slug, image, bio)
│       ├── category.ts            # Category schema (title, slug, description)
│       ├── blockContent.ts        # Rich text schema (alertBox, codeSnippet, image)
│       └── index.ts               # Schema barrel export
├── scripts/
│   ├── seed.ts                    # Seed Sanity with sample editorial content
│   └── generate-post.ts           # AI post generation with Claude (Anthropic SDK)
├── sanity.config.ts               # Sanity Studio config (structure + vision plugins)
├── next.config.ts                 # Next.js config (Sanity CDN image domain)
├── tailwind.css → globals.css     # Tailwind v4 (no tailwind.config.ts)
├── postcss.config.mjs             # PostCSS with @tailwindcss/postcss
├── tsconfig.json                  # TypeScript strict, path aliases
├── eslint.config.mjs              # ESLint v9 flat config
└── .env.example                   # Environment variable template
```

## Design System

The visual language uses a warm, editorial color palette with dual-font typography:

### Colors

| Token      | Hex       | CSS Class        | Usage                            |
|------------|-----------|------------------|----------------------------------|
| **cream**  | `#fefbf9` | `bg-cream`       | Page backgrounds                 |
| **sand**   | `#f7e1cd` | `bg-sand`        | Cards, secondary surfaces        |
| **umber**  | `#8b685d` | `text-umber`     | Muted text, borders, dates       |
| **coffee** | `#614841` | `text-coffee`    | Accents, category pills, links   |
| **espresso** | `#261c1a` | `text-espresso` | Primary text, dark backgrounds  |

### Typography

| Font | Family | Role | CSS Variable |
|------|--------|------|--------------|
| **Playfair Display** | Serif | Headings, hero text, logo | `--font-playfair` |
| **Inter** | Sans-serif | Body text, UI elements | `--font-inter` |

Both fonts are loaded via `next/font/google` with `display: "swap"` for optimal web performance (no FOUT/FOIT).

## Getting Started

### Prerequisites

- **Node.js** 18+
- A [Sanity.io](https://sanity.io) project (free tier available)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/wavemath.git
cd wavemath
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
```

Fill in your credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development Server

```bash
npm run dev
```

| URL | Description |
|-----|-------------|
| [localhost:3000](http://localhost:3000) | Blog frontend |
| [localhost:3000/studio](http://localhost:3000/studio) | Sanity Studio CMS |

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Next.js dev server with Turbopack |
| `build` | `npm run build` | Production build with static page generation |
| `start` | `npm start` | Serve production build |
| `lint` | `npm run lint` | Run ESLint checks |
| `seed` | `npm run seed` | Seed Sanity with sample posts, authors, categories |
| `generate` | `npm run generate "topic"` | Generate a blog post with Claude AI |

### AI Content Generation

The `generate` script uses the **Anthropic Claude API** to write editorial blog posts and publish them directly to Sanity:

```bash
# Requires ANTHROPIC_API_KEY and SANITY_API_WRITE_TOKEN in .env.local
npm run generate "the intersection of mathematics and music"
```

Claude generates a structured JSON response with a title, excerpt, and multi-section body, which is then converted to Sanity's Portable Text format and published.

## Deployment

### Vercel (Recommended)

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add environment variables from `.env.local` to the Vercel project settings
4. Deploy — Next.js is auto-detected

### Other Platforms

Any platform supporting Node.js 18+ and Next.js App Router:

```bash
npm run build
npm start
```

## Architecture Highlights

- **No `tailwind.config.ts`** — Tailwind CSS v4 moves configuration into CSS using `@theme {}` blocks and `@plugin` directives, keeping the design system co-located with styles
- **Server-first rendering** — only components with interactivity (`useScroll`, `useInView`, `useState`) are marked `"use client"`; everything else renders on the server
- **Graceful degradation** — when Sanity credentials aren't configured, all fetch functions return empty results instead of throwing, so the app renders with placeholder content
- **Cache invalidation** — `unstable_cache` with named tags (`post`, `category`) enables targeted revalidation; ISR revalidates every hour
- **Portable Text extensibility** — custom types (`alertBox`, `codeSnippet`) are defined in both the Sanity schema and the React renderer, making it easy to add new block types

## License

MIT
