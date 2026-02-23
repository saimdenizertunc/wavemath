import { getAllCategories } from "@/lib/sanity/fetch";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Categories | WaveMath",
    description: "Explore all topics and categories on WaveMath.",
};

export default async function CategoriesPage() {
    const categories = await getAllCategories();

    return (
        <div className="min-h-screen bg-sand text-espresso">
            {/* Header */}
            <header className="py-20 px-6 border-b border-umber/20">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-espresso mb-6">
                        Topics
                    </h1>
                    <p className="text-xl text-espresso/70 max-w-2xl mx-auto">
                        Browse our collection of articles across various subjects connecting mathematics, art, and technology.
                    </p>
                </div>
            </header>

            {/* Categories Grid */}
            <main className="max-w-5xl mx-auto px-6 py-20">
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                href={`/category/${category.slug.current}`}
                                className="group block p-8 bg-cream rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-umber/10"
                            >
                                <h2 className="font-serif text-2xl font-bold text-espresso mb-3 group-hover:text-coffee transition-colors">
                                    {category.title}
                                </h2>
                                {category.description ? (
                                    <p className="text-espresso/70 text-sm leading-relaxed line-clamp-3">
                                        {category.description}
                                    </p>
                                ) : (
                                    <p className="text-espresso/50 text-sm">
                                        Explore posts in {category.title}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-cream rounded-2xl">
                        <p className="font-serif text-2xl text-umber">No categories found.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
