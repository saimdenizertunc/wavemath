import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StickyTopbar from "@/components/StickyTopbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "WaveMath — Where Ideas Flow",
    template: "%s | WaveMath",
  },
  description:
    "WaveMath is a premium editorial blog exploring ideas at the intersection of creativity, technology, and culture.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WaveMath",
    title: "WaveMath — Where Ideas Flow",
    description:
      "A premium editorial blog exploring ideas at the intersection of creativity, technology, and culture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaveMath — Where Ideas Flow",
    description:
      "A premium editorial blog exploring ideas at the intersection of creativity, technology, and culture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-cream text-espresso pt-16" suppressHydrationWarning>
        <StickyTopbar />
        <Header />
        <main>{children}</main>
        <footer className="bg-espresso text-cream/60 py-12 mt-24">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-serif text-xl text-cream">WaveMath</span>
            <p className="text-sm">
              © {new Date().getFullYear()} WaveMath. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}