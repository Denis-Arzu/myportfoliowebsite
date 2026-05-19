import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const CALENDLY = "https://calendly.com/dentrixapps/30min";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto bg-[#050506]">
      {/* ── Ambient green glow ─────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.18_145/0.25)] to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[oklch(0.55_0.18_145/0.04)] blur-[80px] rounded-full pointer-events-none" />

      {/* ── CTA strip ──────────────────────────────────────────────────── */}
      <div className="relative border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white/80">
              See it in action
            </p>
            <p className="text-xs text-white/30 mt-1">
              Watch our AI chatbot respond to real estate inquiries live.
            </p>
          </div>
          <a
            href="https://bot.dentrixapps.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── Trust bar ──────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            { label: "256-bit SSL Encrypted" },
            { label: "US-Based LLC" },
            { label: "CCPA Compliant" },
            { label: "$200 One-Time · No Subscriptions" },
          ].map(({ label }) => (
            <span
              key={label}
              className="relative inline-flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-[0.18em]"
            >
              <span className="w-1 h-1 rounded-full bg-brand-green/70" />
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main footer grid ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {/* Col 1 — Company (spans 2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/home/dentrixappslogoicon.webp"
              alt="Dentrix Apps LLC"
              width={36}
              height={36}
              className="opacity-80"
            />
            <span className="text-sm font-semibold text-white/60 tracking-tight">
              Dentrix Apps
            </span>
          </div>
          <p className="text-xs text-white/30 leading-relaxed max-w-[280px]">
            AI chatbots for real estate agents — built on your site{" "}
            <span className="text-white/50">before</span> you pay.
          </p>
          <div className="space-y-1.5 text-[11px] text-white/25 font-mono">
            <p>Dentrix Apps LLC · Cheyenne, WY</p>
            <a
              href="mailto:support@dentrixapps.com"
              className="block text-brand-green/70 hover:text-brand-green transition-colors"
            >
              support@dentrixapps.com
            </a>
            <p className="text-white/12 pt-0.5">Mon–Fri · 9 AM–5 PM MT</p>
          </div>
        </div>

        {/* Col 2 — Product */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.18em]">
            Product
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              href="https://bot.dentrixapps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-brand-green transition-colors w-fit"
            >
              Live Demo
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </Link>
            {[
              // { label: "How It Works", href: "/#how-it-works" },
              // { label: "Pricing", href: "/#pricing" },
              { label: "Contact Us", href: "/contact" },
              // { label: "FAQ", href: "/#faq" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="group inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors w-fit"
              >
                {label}
                <span className="w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 — Legal */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.18em]">
            Legal
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
              { label: "Do Not Sell My Info", href: "/do-not-sell" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="group inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors w-fit"
              >
                {label}
                <span className="w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4 — Get In Touch */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.18em]">
            Connect
          </p>
          <div className="flex flex-col gap-2.5">
            <a
              href="mailto:support@dentrixapps.com"
              className="group inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-brand-green transition-colors w-fit"
            >
              Email Us
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="relative group inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/70 border border-white/10 rounded-lg hover:border-brand-green/40 hover:text-brand-green transition-all duration-200 w-fit"
            >
              <span>Book a Call</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <p className="text-[10px] text-white/15 leading-relaxed pt-1">
              Response within 2 hrs · Business days
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/20">
          <p>© {year} Dentrix Apps LLC · All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="w-1 h-1 rounded-full bg-brand-green/50" />
            <p>Registered in Wyoming</p>
            <span className="w-1 h-1 rounded-full bg-brand-green/50" />
            <p>Built for real estate</p>
          </div>
        </div>
      </div>
    </footer>
  );
}