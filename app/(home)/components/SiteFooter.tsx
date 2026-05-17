import Image from "next/image";
import Link from "next/link";

const CALENDLY = "https://calendly.com/dentrixapps/30min";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-auto bg-[#050506]">
      {/* ── Trust bar ───────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { icon: "🔒", label: "256-bit SSL Encrypted" },
            { icon: "🇺🇸", label: "US-Based LLC" },
            { icon: "🛡️", label: "CCPA Compliant" },
            { icon: "💰", label: "$200 One-Time · No Subscriptions" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono text-white/25 uppercase tracking-widest"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main footer grid ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 — Company */}
        <div className="flex flex-col gap-4">
          <Image
            src="/images/home/dentrixappslogoicon.webp"
            alt="Dentrix Apps LLC"
            width={32}
            height={32}
            className="opacity-70"
          />
          <p className="text-xs text-white/35 leading-relaxed max-w-[200px]">
            AI chatbots for real estate agents — built on your site before you
            pay.
          </p>
          <div className="space-y-1 text-[11px] text-white/20 font-mono">
            <p>Dentrix Apps LLC</p>
            <p>1621 Central Ave</p>
            <p>Cheyenne, WY 82001</p>
            <a
              href="mailto:support@dentrixapps.com"
              className="block hover:text-white/50 transition-colors"
            >
              support@dentrixapps.com
            </a>
            <a
              href="tel:+13072008300"
              className="block hover:text-white/50 transition-colors"
            >
              +1 (307) 200-8300
            </a>
            <p className="text-white/12 pt-1">Mon–Fri · 9 AM–5 PM MT</p>
          </div>
        </div>

        {/* Col 2 — Product */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.18em] mb-1">
            Product
          </p>
          {[
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Pricing — $200 One-Time", href: "/#pricing" },
            { label: "Live Demo", href: "/contact" },
            { label: "FAQ", href: "/#faq" },
            { label: "Contact Us", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs text-white/30 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Col 3 — Legal */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.18em] mb-1">
            Legal
          </p>
          {[
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms-of-service" },
            { label: "Do Not Sell My Info", href: "/do-not-sell" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs text-white/30 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Col 4 — Get In Touch */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.18em] mb-1">
            Get In Touch
          </p>
          <a
            href="mailto:support@dentrixapps.com"
            className="text-xs text-white/30 hover:text-white transition-colors"
          >
            support@dentrixapps.com
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-white/30 hover:text-white transition-colors"
          >
            Schedule a Call →
          </a>
          <p className="text-[11px] text-white/15 leading-relaxed pt-2">
            Response within 2 hours on business days.
          </p>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-white/15">
          <p>© {year} Dentrix Apps LLC · All rights reserved.</p>
          <p>
            Dentrix Apps LLC is a registered business in the State of Wyoming.
          </p>
          <p>Built for real estate professionals.</p>
        </div>
      </div>
    </footer>
  );
}
