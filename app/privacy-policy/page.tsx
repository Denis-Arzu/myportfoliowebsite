import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dentrix Apps",
  description: "Privacy Policy for Dentrix Apps - High-performance software engineering lab.",
  robots: "noindex, follow",
};

export default function PrivacyPolicy() {
  const lastUpdated = "April 21, 2026";

  return (
    <main className="min-h-screen bg-black text-[oklch(0.8_0_0)] font-mono selection:bg-[oklch(0.85_0.3_150/0.3)] selection:text-[oklch(0.85_0.3_150)]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Terminal Header */}
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

        {/* Content Box with Terminal Styling */}
        <div className="relative border border-dashed border-white/10 p-6 md:p-10 bg-white/[0.02] backdrop-blur-sm">
          <div className="space-y-12">
            
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[01]</span> Overview
              </h2>
              <p className="leading-relaxed">
                Dentrix Apps ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Dentrix Apps. This Privacy Policy applies to our website (dentrixapps.com) and its associated subdomains.
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[02]</span> Data Collection
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
                  <span>Interact with us on social media platforms.</span>
                </li>
              </ul>
            </section>

            {/* Use of Information */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[03]</span> Use of Information
              </h2>
              <p className="leading-relaxed">
                The information we collect is used solely for the purpose of communicating with you regarding your inquiries, providing our specialized software engineering services, and improving our digital platforms. We do not use your data for automated profiling or targeted advertising without explicit consent.
              </p>
            </section>

            {/* Cookie Policy */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[04]</span> Cookie Policy
              </h2>
              <p className="leading-relaxed">
                We use essential cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            {/* Your CCPA Rights */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[05]</span> Your CCPA Rights
              </h2>
              <p className="leading-relaxed mb-4">
                Under the California Consumer Privacy Act (CCPA), California residents have specific rights regarding their personal information:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>The right to know what personal information is being collected.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>The right to request the deletion of personal information.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>The right to opt-out of the sale of personal information.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span>The right to non-discrimination for exercising privacy rights.</span>
                </li>
              </ul>
            </section>

            {/* Do Not Sell or Share */}
            <section className="bg-[oklch(0.85_0.3_150/0.05)] border border-[oklch(0.85_0.3_150/0.2)] p-6">
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 uppercase tracking-widest">
                Do Not Sell or Share My Personal Information
              </h2>
              <p className="leading-relaxed mb-6">
                <strong>Dentrix Apps does not sell your personal information.</strong> We do not share your private data with third parties for their own commercial gain. If you wish to formalize a request to ensure your data is never sold or shared, please contact us at:
              </p>
              <a 
                href="mailto:ceo@dentrixapps.com" 
                className="text-[oklch(0.85_0.3_150)] font-bold decoration-2 underline-offset-4 hover:underline"
              >
                ceo@dentrixapps.com
              </a>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[06]</span> Contact Procedure
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact our Data Protection Officer at 
                <a href="mailto:ceo@dentrixapps.com" className="ml-1 text-[oklch(0.85_0.3_150)] hover:underline">ceo@dentrixapps.com</a>.
              </p>
            </section>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center text-xs text-[oklch(0.8_0_0/0.5)]">
          <a href="/" className="hover:text-[oklch(0.85_0.3_150)] transition-colors">
            &lt; RETURN_TO_ROOT
          </a>
          <a href="/terms-of-service" className="hover:text-[oklch(0.85_0.3_150)] transition-colors">
            PROCEED_TO_TERMS_OF_SERVICE &gt;
          </a>
        </div>
      </div>
    </main>
  );
}
