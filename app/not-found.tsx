import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050506] text-white">
      <div className="text-center px-6">
        <p className="text-6xl font-light tracking-tight mb-4">404</p>
        <h1 className="text-xl font-light text-white/60 mb-8">
          This page could not be found.
        </h1>
        <a
          href="/"
          className="inline-flex items-center px-5 py-2.5 bg-brand-green text-white text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
