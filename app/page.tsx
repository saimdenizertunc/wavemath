import { getFeaturedPost, getAllPosts } from "@/lib/sanity/fetch";
import CinematicHero from "@/components/CinematicHero";
import PostCard from "@/components/PostCard";

export const revalidate = 3600;

export default async function HomePage() {
  const [featuredPost, posts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(9),
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
