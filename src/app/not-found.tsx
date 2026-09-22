import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex-1 bg-white min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-6 font-inter px-4 max-w-md mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a465]">
          Error 404
        </p>
        <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-[#1a1a1a] font-cormorant uppercase">
          Page Not Found
        </h1>
        <p className="text-sm text-[#9a9a9a] leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to browsing our collections.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-[#1a1a1a] hover:bg-[#333333] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
          >
            Return Home
          </Link>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest font-bold text-[#c9a465] border-b border-[#c9a465] pb-0.5 hover:text-[#d4b87a] transition-all"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
