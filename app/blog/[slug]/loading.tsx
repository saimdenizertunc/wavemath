export default function PostLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="h-[60vh] bg-sand animate-pulse" />

      <div className="max-w-3xl mx-auto px-6 pb-24">
        {/* Category pill */}
        <div className="mt-10 mb-6 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-sand animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-3 mb-6">
          <div className="h-10 bg-sand rounded animate-pulse w-full" />
          <div className="h-10 bg-sand rounded animate-pulse w-4/5" />
        </div>

        {/* Author bar */}
        <div className="flex items-center gap-4 pb-8 mb-8 border-b border-umber/20">
          <div className="w-12 h-12 rounded-full bg-sand animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-sand rounded animate-pulse" />
            <div className="h-3 w-24 bg-sand rounded animate-pulse" />
          </div>
        </div>

        {/* Body lines */}
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-sand rounded animate-pulse ${
                i % 5 === 4 ? "w-3/4" : "w-full"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
