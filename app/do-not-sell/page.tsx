"use client";

import { useState } from "react";
import Link from "next/link";

export default function DoNotSell() {
  const [opted, setOpted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("dentrix_do_not_sell") === "true";
  });

  const handleOptOut = () => {
    window.localStorage.setItem("dentrix_do_not_sell", "true");
    // Also set a cookie so server-side reads are possible if needed
    document.cookie =
      "dentrix_do_not_sell=true; path=/; max-age=31536000; SameSite=Lax";
    setOpted(true);
  };

  const lastUpdated = "July 14, 2026";

  return (
    <main className="min-h-screen bg-black text-[oklch(0.8_0_0)] font-mono selection:bg-[oklch(0.85_0.3_150/0.3)] selection:text-[oklch(0.85_0.3_150)]">
      <div className="max-w-4xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-4 text-[oklch(0.85_0.3_150)] text-xs">
            <span className="animate-pulse">●</span>
            <span>SYSTEM_LEGAL_PROCEDURE // PRIVACY_RIGHTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[oklch(1_0_0)] tracking-tighter">
            Your Privacy Rights
          </h1>
          <p className="mt-4 text-sm text-[oklch(0.85_0.3_150/0.6)] font-semibold uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="relative border border-dashed border-white/10 p-6 md:p-10 bg-white/[0.02] backdrop-blur-sm">
          <div className="space-y-12">

            {/* Section 1 — CCPA Explanation */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[01]</span> California Privacy Rights (CCPA)
              </h2>
              <p className="leading-relaxed">
                Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents have the right to opt out of the &quot;sale&quot; or &quot;sharing&quot; of their personal information. This right also extends to consumers in other states with similar privacy laws (Colorado, Connecticut, Virginia, and others).
              </p>
            </section>

            {/* Section 2 — Our Position */}
            <section className="bg-[oklch(0.85_0.3_150/0.05)] border border-[oklch(0.85_0.3_150/0.2)] p-6">
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 uppercase tracking-widest">
                Our Position on Data Sales
              </h2>
              <p className="leading-relaxed mb-4">
                <strong className="text-[oklch(1_0_0)]">
                  Dentrix Apps LLC does not sell your personal information to third parties.
                </strong>{" "}
                We do not sell, rent, or trade your name, email address, phone number, or any other personal data to outside companies for their commercial benefit.
              </p>
              <p className="leading-relaxed">
                We may use third-party analytics services (such as site traffic measurement) and infrastructure providers (such as our hosting platform) that receive limited technical data as part of delivering our service. These are service providers — not data buyers. We do not receive payment in exchange for your data.
              </p>
            </section>

            {/* Section 3 — What data we collect */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[02]</span> What Data We Collect
              </h2>
              <ul className="list-none space-y-2 ml-4">
                {[
                  "Contact form submissions (name, email, company, project details)",
                  "Chat session content (questions you ask our AI assistant)",
                  "Basic analytics data (page views, referral source — no personal identifiers)",
                  "Cookies required for site functionality (session preferences)",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[oklch(0.85_0.3_150)] shrink-0">/</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4 — Opt-out mechanism */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[03]</span> Opt-Out of Data Sharing
              </h2>
              <p className="leading-relaxed mb-6">
                Even though we do not sell your data, you may use the button below to formally record your preference that your data not be shared with any third-party service providers (including analytics and infrastructure providers). This preference will be saved to your browser.
              </p>

              {opted ? (
                <div className="border border-[oklch(0.85_0.3_150/0.4)] bg-[oklch(0.85_0.3_150/0.08)] p-6 text-center">
                  <p className="text-[oklch(0.85_0.3_150)] font-bold text-lg mb-2">
                    ✓ Opt-Out Recorded
                  </p>
                  <p className="text-sm text-[oklch(0.8_0_0/0.6)] leading-relaxed">
                    Your preference has been saved. We will not share your data with third-party analytics or non-essential service providers from this browser. This preference is stored locally and will persist until you clear your browser data.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOptOut}
                  className="
                    px-8 py-4 border border-[oklch(0.85_0.3_150/0.5)]
                    bg-[oklch(0.85_0.3_150/0.08)]
                    text-[oklch(0.85_0.3_150)] font-bold uppercase tracking-widest
                    hover:bg-[oklch(0.85_0.3_150/0.15)] hover:border-[oklch(0.85_0.3_150/0.8)]
                    transition-all duration-200 w-full sm:w-auto
                  "
                >
                  Opt Out of Data Sharing
                </button>
              )}
            </section>

            {/* Section 5 — Contact for formal requests */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[04]</span> Formal Data Requests
              </h2>
              <p className="leading-relaxed mb-4">
                To submit a formal request to know, delete, or correct your personal information — or to request a list of all third parties with whom your data has been shared — email us at:
              </p>
              <a
                href="mailto:ceo@dentrixapps.com"
                className="text-[oklch(0.85_0.3_150)] font-bold decoration-2 underline-offset-4 hover:underline"
              >
                ceo@dentrixapps.com
              </a>
              <p className="mt-4 text-sm text-[oklch(0.8_0_0/0.5)] leading-relaxed">
                We will respond to verifiable consumer requests within 45 days as required by CCPA. No fee is charged for submitting a request. Dentrix Apps LLC is operated in the State of Wyoming, United States.
              </p>
            </section>

          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-xs text-[oklch(0.8_0_0/0.5)]">
          <Link href="/privacy-policy" className="hover:text-[oklch(0.85_0.3_150)] transition-colors">
            &lt; PRIVACY_POLICY
          </Link>
          <Link href="/" className="hover:text-[oklch(0.85_0.3_150)] transition-colors">
            RETURN_TO_ROOT &gt;
          </Link>
        </div>
      </div>
    </main>
  );
}
