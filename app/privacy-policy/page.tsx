import { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How DentrixApps collects and uses data for AI chatbot assistants for salons, gyms, and dental practices.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: absoluteUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = "July 14, 2026";

  return (
    <main className="min-h-screen bg-black text-[oklch(0.8_0_0)] font-mono selection:bg-[oklch(0.85_0.3_150/0.3)] selection:text-[oklch(0.85_0.3_150)]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-4 text-[oklch(0.85_0.3_150)] text-xs">
            <span className="animate-pulse">●</span>
            <span>SYSTEM_LEGAL_PROCEDURE // PRIVACY_POLICY</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[oklch(1_0_0)] tracking-tighter">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[oklch(0.85_0.3_150/0.6)] font-semibold uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="relative border border-dashed border-white/10 p-6 md:p-10 bg-white/[0.02] backdrop-blur-sm">
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[01]</span>{" "}
                Overview
              </h2>
              <p className="leading-relaxed">
                DentrixApps LLC (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) is a limited liability company registered in
                the State of Wyoming, United States. We are committed to
                protecting your privacy. This Privacy Policy explains how your
                personal information is collected, used, and disclosed by
                DentrixApps LLC. This Privacy Policy applies to our website
                (dentrixapps.com) and its associated subdomains.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[02]</span> Data
                Collection
              </h2>
              <p className="leading-relaxed mb-4">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>Contact us via email or contact forms.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>Request a custom quote for our services.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>Interact with our AI assistant chat interface.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[03]</span> Use of
                Information
              </h2>
              <p className="leading-relaxed">
                The information we collect is used solely for the purpose of
                communicating with you regarding your inquiries, providing our
                AI chatbot and lead-capture services for salons, gyms, and dental practices, and
                improving our digital platforms. We do not use your data for
                automated profiling or targeted advertising without explicit
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[04]</span> Data
                Sharing
              </h2>
              <p className="leading-relaxed">
                We do not sell, trade, or otherwise transfer your personally
                identifiable information to outside parties without your
                consent, except as required by law or as necessary to provide
                our services (e.g., processing payments via PayPal, sending
                emails via Resend). These third parties are bound by
                confidentiality agreements and are not permitted to use your
                data for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[05]</span> Data
                Security
              </h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures including
                256-bit SSL encryption, secure server infrastructure, and
                access controls to protect your personal information. All
                AI chat conversations are encrypted in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[06]</span> Your
                Rights
              </h2>
              <p className="leading-relaxed">
                You have the right to request access to, correction of, or
                deletion of your personal data held by us. To exercise these
                rights, contact us at ceo@dentrixapps.com. We will respond to
                your request within 30 days as required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[07]</span>{" "}
                Cookies
              </h2>
              <p className="leading-relaxed">
                We use minimal cookies necessary for the operation of our
                website. We do not use tracking cookies or third-party
                advertising cookies. You can control cookie settings through
                your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[08]</span>{" "}
                Contact
              </h2>
              <p className="leading-relaxed">
                For privacy-related inquiries, contact us at:
              </p>
              <p className="mt-4 text-[oklch(0.85_0.3_150)]">
                DentrixApps LLC
                <br />
                Email: ceo@dentrixapps.com
                <br />
                Location: Cheyenne, Wyoming, United States
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm text-white/30 hover:text-[oklch(0.85_0.3_150)] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
