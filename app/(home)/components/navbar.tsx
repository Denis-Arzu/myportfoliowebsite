"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

type NavbarProps = {
  minimal?: boolean;
  isBackMode?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ minimal = false, isBackMode = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navWidth = useTransform(scrollY, [0, 100], ["95%", "90%"]);
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        style={{
          width: minimal ? "100%" : navWidth,
          opacity: minimal ? 1 : navOpacity,
          background: scrolled
            ? "oklch(0.08 0.01 285 / 0.85)"
            : "oklch(0.08 0.01 285 / 0.15)",
          backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(12px) saturate(120%)",
          WebkitBackdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(12px) saturate(120%)",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.03)",
          borderRadius: minimal ? "0" : scrolled ? "2rem" : "1rem",
        }}
        className={`${minimal ? "relative mb-8" : "fixed top-4 left-1/2 -translate-x-1/2 max-w-5xl"} z-[200] w-full transition-all duration-500`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative w-32 h-8 sm:w-36 sm:h-9 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/home/dentrixappslg.webp"
                alt="Dentrix Apps"
                width={144}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                  pathname === link.href ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex sm:hidden items-center gap-2">
            {isBackMode ? (
              <button
                type="button"
                onClick={() => router.push("/")}
                className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg border border-white/10 text-white text-xs font-semibold uppercase tracking-wider"
                aria-expanded={menuOpen}
              >
                Menu
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 sm:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white/50 text-sm uppercase tracking-widest"
          >
            Close
          </button>
          <nav className="flex flex-col gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-semibold text-white tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
