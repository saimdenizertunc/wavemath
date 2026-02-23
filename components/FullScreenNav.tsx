"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Stories", href: "/" },
  { label: "About", href: "/about" },
];

export default function FullScreenNav({ isOpen, onClose }: FullScreenNavProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="full-screen-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-espresso flex flex-col items-center justify-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors p-2"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8l16 16M24 8L8 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Nav links */}
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              hidden: {},
            }}
          >
            <ul className="flex flex-col items-center gap-2">
              {navLinks.map((link) => (
                <motion.li
                  key={link.href + link.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-serif text-6xl md:text-8xl font-black text-cream hover:text-sand transition-colors duration-200 block py-2"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 text-cream/30 text-sm tracking-widest uppercase"
          >
            WaveMath — Where Ideas Flow
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
