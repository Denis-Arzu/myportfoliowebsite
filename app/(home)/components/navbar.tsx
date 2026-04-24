"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SiGmail, SiGithub, SiWhatsapp } from "react-icons/si";
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'motion/react';
import { Magnetic } from '@/components/ui/magnetic';
import Loader from './loader';

interface SocialLink { name: string; url: string; icon: React.ReactNode }
interface Section { name: string; href: string; isExternal?: boolean }

/* ─── Animation Variants ──────────────────────────────────────────────── */

const menuVariants: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 28,
      stiffness: 320,
      staggerChildren: 0.07,
      delayChildren: 0.15
    }
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 450,
      staggerChildren: 0.04,
      staggerDirection: -1
    }
  }
};

const itemVariants: Variants = {
  initial: { y: 30, opacity: 0, filter: "blur(4px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: 20, opacity: 0, filter: "blur(4px)" }
};

/* ─── Navbar Component ────────────────────────────────────────────────── */

const Navbar: React.FC<{ isBackMode?: boolean; onBack?: () => void }> = ({ isBackMode = false, onBack }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isNavigatingToProducts, setIsNavigatingToProducts] = useState(false);
  const { scrollY } = useScroll();

  const navWidth = useTransform(scrollY, [0, 100], ["95%", "90%"]);
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsReloading(true);
  };

  const handleLoaderDone = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/Denis-Arzu', icon: <SiGithub /> },
    { name: 'WhatsApp', url: 'https://wa.me/254111480091', icon: <SiWhatsapp /> },
    { name: 'Email', url: 'mailto:ceo@dentrixapps.com', icon: <SiGmail /> },
  ];

  const sections: Section[] = [
    { name: 'Home', href: '#home' },
    { name: 'Methodology', href: '#methodology' },
    { name: 'About', href: '#about' },
    { name: 'Capabilities', href: '#skills' },
    { name: 'Products', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  /* ─── Navigation Handler ─────────────────────────────────────────────── */
  const handleNavigation = useCallback((section: Section) => {
    setMenuOpen(false);

    if (section.isExternal) {
      // Products → show loader, then navigate
      setIsNavigatingToProducts(true);
      return;
    }

    // For hash links: smooth scroll after sidebar closes
    setTimeout(() => {
      const target = document.querySelector(section.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350); // Wait for sidebar exit animation
  }, []);

  const handleProductsLoaderDone = () => {
    router.push('/products');
  };

  return (
    <>
      {/* Products transition loader */}
      {isNavigatingToProducts && <Loader onDone={handleProductsLoaderDone} />}

      <motion.nav
        style={{
          width: navWidth,
          opacity: navOpacity,
          background: scrolled ? "oklch(0.08 0.01 285 / 0.85)" : "oklch(0.08 0.01 285 / 0.15)",
          backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(12px) saturate(120%)",
          WebkitBackdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(12px) saturate(120%)",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.03)",
          boxShadow: scrolled ? "0 20px 50px -15px oklch(0 0 0 / 0.8)" : "none",
          borderRadius: scrolled ? "2rem" : "1rem",
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 max-w-5xl z-[200] transition-all duration-500"
      >
        <ScrollProgress />

        <div className="max-w-full mx-auto px-6 py-3.5 lg:py-4">
          <div className="flex items-center justify-between pointer-events-auto">

            <a href="/" onClick={handleLogoClick} className="flex items-center group shrink-0">
              <div className="relative w-32 h-8 sm:w-36 sm:h-9 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/home/dentrixappslg.png"
                  alt="Dentrix Apps Logo"
                  width={144}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </a>

            {isReloading && <Loader onDone={handleLoaderDone} />}

            {/* Desktop Sections */}
            <div className="hidden lg:flex items-center gap-7 ml-auto mr-8">
              {sections.map((section) => (
                <a
                  key={section.name}
                  href={section.href}
                  onClick={(e) => {
                    if (section.isExternal) {
                      e.preventDefault();
                      handleNavigation(section);
                    }
                  }}
                  className="relative text-gray-400 hover:text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 group/link"
                >
                  {section.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[oklch(0.55_0.18_145)] transition-all duration-300 group-hover/link:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop Socials */}
            <div className="hidden lg:flex items-center gap-4">
              {socialLinks.map((social) => (
                <Magnetic key={social.name} strength={0.3}>
                  <a
                    href={social.url}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-gray-400 hover:text-white transition-all p-2 rounded-xl hover:bg-white/5"
                  >
                    {social.icon}
                  </a>
                </Magnetic>
              ))}
            </div>

            {/* Mobile Toggle */}
            {isBackMode ? (
              <BackButton onClick={onBack || (() => {})} />
            ) : (
              <div className="flex lg:hidden items-center">
                <AnimatedMenuButton
                  isOpen={menuOpen}
                  onClick={() => setMenuOpen(!menuOpen)}
                />
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ── Full-Screen Sidebar Overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 w-full h-[100dvh] z-[9999] flex flex-col justify-center px-8 sm:px-12"
            style={{
              background: "oklch(0.05 0.01 285 / 0.97)",
              backdropFilter: "blur(60px) saturate(200%)",
              WebkitBackdropFilter: "blur(60px) saturate(200%)",
            }}
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none grid-background" />

            {/* Close button (top-right, always accessible) */}
            <div className="absolute top-6 right-6 z-10">
              <AnimatedMenuButton
                isOpen={true}
                onClick={() => setMenuOpen(false)}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <motion.span
                variants={itemVariants}
                className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2"
              >
                Navigation
              </motion.span>
              {sections.map((section, idx) => (
                <motion.button
                  key={section.name}
                  variants={itemVariants}
                  onClick={() => handleNavigation(section)}
                  className="text-left text-4xl sm:text-6xl font-black tracking-tighter text-white hover:text-[oklch(0.55_0.18_145)] transition-colors duration-300 flex items-center gap-4 group"
                >
                  <span className="text-base sm:text-xl font-mono text-gray-600 group-hover:text-[oklch(0.55_0.18_145)] transition-colors">
                    /0{idx + 1}
                  </span>
                  {section.name}
                  {section.isExternal && (
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[oklch(0.55_0.18_145)] transition-colors ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Sidebar Footer */}
            <motion.div
              variants={itemVariants}
              className="mt-12 sm:mt-16 pt-8 border-t border-white/5 flex flex-col gap-6"
            >
              <div className="flex gap-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    variants={itemVariants}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-2xl transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <motion.p variants={itemVariants} className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
                Dentrix Apps · Engineering Excellence
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Back Button ────────────────────────────────────────────────────── */

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Magnetic strength={0.3}>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-12 h-12 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-[oklch(0.55_0.18_145)/0.4] rounded-2xl shadow-2xl hover:shadow-[0_0_24px_oklch(0.55_0.18_145)/0.3] transition-all duration-300 group"
        aria-label="Go back to home"
        style={{ boxShadow: '0 8px 32px oklch(0 0 0 / 0.4)' }}
      >
        {/* Animated SVG Arrow with glow */}
        <svg 
          className="w-5 h-5 text-white group-hover:text-[oklch(0.55_0.18_145)] transition-colors duration-300 drop-shadow-lg group-hover:drop-shadow-[0_0_12px_oklch(0.55_0.18_145)/0.6]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <defs>
            <radialGradient id="arrow-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="oklch(0.55 0.18 145 / 0.9)" />
              <stop offset="70%" stopColor="oklch(0.55 0.18 145 / 0.3)" />
              <stop offset="100%" stopColor="oklch(0.55 0.18 145 / 0)" />
            </radialGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0, opacity: 0.7 }}
            animate={{ pathLength: 1, opacity: 1 }}
            whileHover={{ pathLength: [1, 1.05, 1], strokeWidth: [2.5, 3, 2.5] }}
            strokeWidth={2.5}
            strokeLinecap="round" 
            strokeLinejoin="round"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            d="M15 19l-7-7 7-7"
          />
          {/* Animated trail glow circle */}
          <motion.circle
            cx="11" 
            cy="12" 
            r="7"
            fill="none"
            stroke="url(#arrow-glow)"
            strokeWidth="1.5"
            opacity={0.3}
            className="group-hover:opacity-70"
            initial={{ pathLength: 0, scale: 0.5 }}
            whileHover={{ 
              pathLength: 1, 
              scale: [0.8, 1.1, 0.8], 
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.6 
            }}
          />
        </svg>
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-[oklch(0.55_0.18_145)/0.1] blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </Magnetic>
  );
};

/* ─── Animated Menu Button ─────────────────────────────────────────────── */

const AnimatedMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={`relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 rounded-full ${isOpen ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-5 h-0.5 bg-current rounded-full"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-5 h-0.5 bg-current rounded-full"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-5 h-0.5 bg-current rounded-full"
      />
    </button>
  );
};

/* ─── Scroll Progress ─────────────────────────────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 rounded-t-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 via-[oklch(0.55_0.18_145)] to-cyan-400"
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      />
    </div>
  );
}

export default Navbar;
