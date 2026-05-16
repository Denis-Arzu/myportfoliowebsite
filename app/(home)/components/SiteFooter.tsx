import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/home/dentrixappslogoicon.webp"
            alt="Dentrix Apps logo"
            width={28}
            height={28}
            className="opacity-80"
          />
          <p className="text-xs text-white/30 max-w-xs text-center sm:text-left">
            AI chatbots for real estate agents — built on your site before you pay.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/35">
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">
            Terms
          </Link>
        </div>
        <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">
          © {year} Dentrix Apps
        </p>
      </div>
    </footer>
  );
}
