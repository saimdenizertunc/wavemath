import { getFeaturedPost, getAllPosts, getAllCategories } from "@/lib/sanity/fetch";
import Link from "next/link";
import CinematicHero from "@/components/CinematicHero";
import PostCard from "@/components/PostCard";

export const revalidate = 3600;

export default async function HomePage() {
  const [featuredPost, posts, categories] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(9),
    getAllCategories(),
  ]);

  return (
    <>
      {featuredPost ? (
        <CinematicHero post={featuredPost} />
      ) : (
        <div className="h-screen bg-espresso flex items-end pb-16 px-6">
          <div className="max-w-5xl">
            <h1 className="font-serif text-5xl md:text-7xl font-black text-cream leading-tight mb-4">
              Welcome to WaveMath
            </h1>
            <p className="text-cream/70 text-xl max-w-2xl">
              A premium editorial blog exploring ideas at the intersection of
              creativity, technology, and culture.
            </p>
          </div>
        </div>
      )}

      <section className="bg-sand border-y border-umber/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-espresso mb-2">
                Explore Topics
              </h2>
              <p className="text-espresso/70">
                Dive deep into specific themes merging art and mathematics.
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center text-sm font-semibold text-coffee hover:text-espresso transition-colors mt-4 md:mt-0 uppercase tracking-wider"
            >
              All Topics &rarr;
            </Link>
          </div>

          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  className="bg-cream border border-umber/10 text-espresso px-6 py-3 rounded-full hover:bg-espresso hover:text-cream shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="font-serif font-bold text-lg">{category.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-umber italic">No topics found.</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl font-bold text-espresso mb-12">
          Latest Stories
        </h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-umber">
              Stories are on their way.
            </p>
            <p className="text-espresso/50 mt-2">
              Head to{" "}
              <a href="/studio" className="underline hover:text-coffee">
                /studio
              </a>{" "}
              to start publishing.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
