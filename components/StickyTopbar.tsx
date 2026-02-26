'use client';

export default function StickyTopbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-espresso text-cream shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        <span className="font-serif text-xl font-bold">Welcome</span>
      </div>
    </div>
  );
}