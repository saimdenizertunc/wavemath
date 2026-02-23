import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { getAllCategories, getCategoryBySlug } from "@/lib/sanity/fetch";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export const revalidate = 3600;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((cat) => ({ slug: cat.slug.current }));
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) return {};

    return {
        title: `${category.title} | WaveMath`,
        description: category.description || `Read articles about ${category.title} on WaveMath.`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-sand text-espresso">
            {/* Header */}
            <header className="py-20 px-6 border-b border-umber/20 bg-cream">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="mb-6">
                        <Link
                            href="/categories"
                            className="inline-flex items-center text-sm font-medium text-coffee hover:text-espresso transition-colors uppercase tracking-wider"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            All Topics
                        </Link>
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-espresso mb-6">
                        {category.title}
                    </h1>
                    {category.description && (
                        <p className="text-xl text-espresso/70 max-w-2xl mx-auto">
                            {category.description}
                        </p>
                    )}
                    <div className="mt-8 text-sm text-umber font-medium uppercase tracking-wider">
                        {category.posts?.length || 0} {category.posts?.length === 1 ? 'Article' : 'Articles'}
                    </div>
                </div>
            </header>

            {/* Posts Grid */}
            <main className="max-w-7xl mx-auto px-6 py-20">
                {category.posts && category.posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.posts.map((post, index) => (
                            <PostCard key={post._id} post={post} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-cream rounded-2xl max-w-3xl mx-auto">
                        <p className="font-serif text-2xl text-umber mb-4">
                            No stories published in this topic yet.
                        </p>
                        <p className="text-espresso/50">
                            Check back soon or explore other topics.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
