"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import FullScreenNav from "./FullScreenNav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        animate={{
          backgroundColor: isScrolled
            ? "rgba(97, 72, 65, 0.97)"
            : "rgba(0,0,0,0)",
          paddingTop: isScrolled ? "12px" : "24px",
          paddingBottom: isScrolled ? "12px" : "24px",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif font-black text-2xl text-cream drop-shadow">
            WaveMath
          </Link>

          {/* Right: Nav links + hamburger */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-cream/80 hover:text-cream text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-cream/80 hover:text-cream text-sm font-medium transition-colors"
              >
                About
              </Link>
            </nav>

            <button
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
              className="text-cream/80 hover:text-cream transition-colors p-1"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6h18M3 12h12M3 18h18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
              <span className="sr-only">Stories</span>
            </button>
          </div>
        </div>
      </motion.header>

      <FullScreenNav isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
