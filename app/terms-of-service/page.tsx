import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dentrix Apps",
  description: "Terms of Service for Dentrix Apps - High-performance software engineering lab.",
  robots: "noindex, follow",
};

export default function TermsOfService() {
  const lastUpdated = "April 21, 2026";

  return (
    <main className="min-h-screen bg-black text-[oklch(0.8_0_0)] font-mono selection:bg-[oklch(0.85_0.3_150/0.3)] selection:text-[oklch(0.85_0.3_150)]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Terminal Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-4 text-[oklch(0.85_0.3_150)] text-xs">
            <span className="animate-pulse">●</span>
            <span>SYSTEM_LEGAL_PROCEDURE // TERMS_OF_SERVICE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[oklch(1_0_0)] tracking-tighter">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[oklch(0.85_0.3_150/0.6)] font-semibold uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Box with Terminal Styling */}
        <div className="relative border border-dashed border-white/10 p-6 md:p-10 bg-white/[0.02] backdrop-blur-sm">
          <div className="space-y-12">
            
            {/* Agreement to Terms */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[01]</span> Agreement
              </h2>
              <p className="leading-relaxed">
                By accessing or using the services provided by Dentrix Apps ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services or website.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[02]</span> Intellectual Property
              </h2>
              <p className="leading-relaxed mb-4">
                Unless otherwise agreed upon in a specific service contract:
              </p>
              <ul className="list-none space-y-4 ml-4">
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span><strong>Work Product Appearance:</strong> All unique deliverables, custom software, and designs specifically developed for a client are assigned to said client upon full and final payment.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span><strong>Retained Rights:</strong> Dentrix Apps retains all rights to its proprietary frameworks, base code libraries, and general methodologies used to create the deliverables.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[oklch(0.85_0.3_150)]">/</span>
                  <span><strong>Trademarks:</strong> All trademarks, logos, and service marks displayed on the site are our property or the property of other third parties.</span>
                </li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[03]</span> Liability Constraint
              </h2>
              <p className="leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, Dentrix Apps shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
              <div className="bg-white/5 border-l-2 border-[oklch(0.85_0.3_150)] p-4 text-sm italic">
                "Our maximum aggregate liability for any claim arising out of or relating to these terms or our services shall not exceed the total amount paid by you to us in the six (6) months preceding the claim."
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[04]</span> Governing Law
              </h2>
              <p className="leading-relaxed">
                These Terms and any action related thereto will be governed by the laws of the <strong>State of Delaware</strong> (United States) without regard to its conflict of laws provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Delaware.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[05]</span> Termination
              </h2>
              <p className="leading-relaxed">
                We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-xl font-bold text-[oklch(1_0_0)] mb-4 flex items-center gap-2">
                <span className="text-[oklch(0.85_0.3_150)]">[06]</span> Protocol Updates
              </h2>
              <p className="leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center text-xs text-[oklch(0.8_0_0/0.5)]">
          <a href="/privacy-policy" className="hover:text-[oklch(0.85_0.3_150)] transition-colors">
            &lt; RETURN_TO_PRIVACY_POLICY
          </a>
          <a href="/" className="hover:text-[oklch(0.85_0.3_150)] transition-colors">
            RETURN_TO_ROOT &gt;
          </a>
        </div>
      </div>
    </main>
  );
}
