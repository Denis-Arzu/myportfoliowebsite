"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DoNotSellPage() {
  const [optedOut, setOptedOut] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("dnt-opt-out") === "true";
    }
    return false;
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleOptOut = () => {
    window.localStorage.setItem("dnt-opt-out", "true");
    setOptedOut(true);
  };

  const handleRevoke = () => {
    window.localStorage.removeItem("dnt-opt-out");
    setOptedOut(false);
  };

  // Show nothing until we read localStorage (avoid hydration flash)
  if (!hydrated) return null;

  return (
    <main className="min-h-screen bg-black text-[oklch(0.8_0_0)] font-mono selection:bg-[oklch(0.85_0.3_150/0.3)] selection:text-[oklch(0.85_0.3_150)]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-4 text-[oklch(0.85_0.3_150)] text-xs">
            <span className="animate-pulse">●</span>
            <span>CCPA_COMPLIANCE // DO_NOT_SELL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[oklch(1_0_0)] tracking-tighter">
            Do Not Sell or Share My Personal Information
          </h1>
          <p className="mt-4 text-sm text-[oklch(0.85_0.3_150/0.6)] font-semibold uppercase tracking-widest">
            California Consumer Privacy Act (CCPA) Request
          </p>
        </div>

        <div className="relative border border-dashed border-white/10 p-6 md:p-10 bg-white/[0.02] backdrop-blur-sm">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[01]</span> Your Rights Under CCPA
              </h2>
              <p className="leading-relaxed mb-4">
                The California Consumer Privacy Act (CCPA) gives California residents
                the right to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of
                their personal information. While Dentrix Apps does not sell personal
                information for monetary consideration, we respect your right to
                ensure your data is never shared in ways that could be considered a
                &ldquo;sale&rdquo; under California law.
              </p>
              <p className="leading-relaxed">
                By submitting this opt-out request, you instruct Dentrix Apps to:
              </p>
              <ul className="list-none space-y-2 ml-4 mt-4">
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>Not sell or share your personal information to third parties</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>Limit the use of your data for cross-context behavioral advertising</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>Retain this preference for future visits to our website</span>
                </li>
              </ul>
            </section>

            <section className="bg-[oklch(0.85_0.3_150/0.05)] border border-[oklch(0.85_0.3_150/0.2)] p-6">
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-6 uppercase tracking-widest">
                Opt-Out Preference
              </h2>

              {optedOut ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[oklch(0.85_0.3_150)] text-2xl">✓</span>
                    <p className="text-[oklch(0.85_0.3_150)] font-bold">
                      Your opt-out preference has been saved.
                    </p>
                  </div>
                  <p className="leading-relaxed mb-6">
                    We have recorded your request to opt out of the sale or sharing
                    of your personal information. This preference will be honored
                    on this browser for future visits.
                  </p>
                  <button
                    onClick={handleRevoke}
                    className="border border-white/20 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/40 transition-all"
                  >
                    Revoke Opt-Out
                  </button>
                </div>
              ) : (
                <div>
                  <p className="leading-relaxed mb-6">
                    Click the button below to exercise your right to opt out of the
                    sale or sharing of your personal information under the CCPA.
                    This preference will be stored in your browser.
                  </p>
                  <button
                    onClick={handleOptOut}
                    className="border border-[oklch(0.85_0.3_150/0.5)] px-6 py-3 text-[oklch(0.85_0.3_150)] font-bold hover:bg-[oklch(0.85_0.3_150/0.1)] transition-all"
                  >
                    Opt Out of Sale/Sharing
                  </button>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[02]</span> Global Privacy Control (GPC)
              </h2>
              <p className="leading-relaxed">
                If your browser broadcasts a Global Privacy Control (GPC) signal,
                Dentrix Apps automatically honors it as an opt-out request. You do
                not need to take additional action if GPC is enabled. The privacy
                banner on our site will confirm when GPC has been detected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[03]</span> Contact for Questions
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this process or wish to submit a
                request that cannot be handled via this page, please contact us at:
              </p>
              <a
                href="mailto:ceo@dentrixapps.com"
                className="text-[oklch(0.85_0.3_150)] font-bold decoration-2 underline-offset-4 hover:underline mt-4 inline-block"
              >
                ceo@dentrixapps.com
              </a>
            </section>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-center sm:text-left text-xs text-[oklch(0.8_0_0/0.5)]">
          <Link
            href="/"
            className="hover:text-[oklch(0.85_0.3_150)] transition-colors"
          >
            {"<"} RETURN_TO_ROOT
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-[oklch(0.85_0.3_150)] transition-colors"
          >
            VIEW_PRIVACY_POLICY {">"}
          </Link>
        </div>
      </div>
    </main>
  );
}