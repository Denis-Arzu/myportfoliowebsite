import { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for DentrixApps AI chatbot assistants for salons, gyms, and dental practices.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: absoluteUrl("/terms-of-service"),
  },
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-[oklch(0.8_0_0)] font-mono selection:bg-[oklch(0.85_0.3_150/0.3)] selection:text-[oklch(0.85_0.3_150)]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-4 text-[oklch(0.85_0.3_150)] text-xs">
            <span className="animate-pulse">●</span>
            <span>SYSTEM_LEGAL_PROCEDURE // TERMS_OF_SERVICE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[oklch(1_0_0)] tracking-tighter">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[oklch(0.85_0.3_150/0.6)] font-semibold uppercase tracking-widest">
            Last Updated: January 1, 2026
          </p>
        </div>

        <div className="space-y-10 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the DentrixApps website and services, you
              agree to be bound by these Terms of Service. If you do not agree,
              do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              2. Description of Service
            </h2>
            <p>
              DentrixApps provides AI chatbot assistant services for
              businesses. We build custom AI assistants trained on your
              business data and host them on our platform. The service includes
              a one-time setup fee followed by a recurring monthly hosting fee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              3. Pricing and Payment
            </h2>
            <p>
              The standard setup fee is $299 (one-time). The standard monthly
              hosting fee is $97/month. Landing page setup is $499 (one-time).
              All fees are in USD. By subscribing, you authorize us to charge
              the applicable fees on a recurring basis. You may cancel at any
              time - upon cancellation, your AI assistant will be taken offline
              and no further charges will be incurred.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              4. Free Demo
            </h2>
            <p>
              We offer a free demo of our AI assistant before any payment is
              required. The demo is a live version of the assistant built from
              your website data. No credit card is required for the demo. If
              you choose not to proceed after the demo, no payment is due.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              5. User Responsibilities
            </h2>
            <p>
              You are responsible for providing accurate business information
              for the AI assistant. You agree not to use the service for any
              unlawful purpose or in violation of any applicable laws or
              regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              6. Intellectual Property
            </h2>
            <p>
              The DentrixApps platform, including its software, design, and
              branding, is owned by DentrixApps LLC. The AI assistant content
              trained on your business data remains your property.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              DentrixApps LLC shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use
              of the service. Our total liability is limited to the amount paid
              by you in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              8. Cancellation
            </h2>
            <p>
              You may cancel your subscription at any time. Cancellation takes
              effect immediately - your AI assistant is taken offline and no
              further charges are incurred. You retain any lead data captured
              prior to cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              9. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting. Continued use of the
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4">
              10. Contact
            </h2>
            <p>
              For questions about these terms, contact us at:
              ceo@dentrixapps.com
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
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
