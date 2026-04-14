"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SiGmail, SiGithub, SiWhatsapp } from "react-icons/si";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'motion/react';
import { Magnetic } from '@/components/ui/magnetic';
import Loader from './loader';

interface SocialLink { name: string; url: string; icon: React.ReactNode }
interface Section { name: string; href: string }

const menuVariants: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    y: "100%", 
    opacity: 0,
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 400,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 }
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [menuOpen]);

  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/Denis-Arzu', icon: <SiGithub /> },
    { name: 'WhatsApp', url: 'https://wa.me/254111480091', icon: <SiWhatsapp /> },
    { name: 'Email', url: 'mailto:hello@dentrixapps.com', icon: <SiGmail /> },
  ];

  const sections: Section[] = [
    { name: 'Home', href: '#home' },
    { name: 'Methodology', href: '#methodology' },
    { name: 'About', href: '#about' },
    { name: 'Capabilities', href: '#skills' },
    { name: 'Standards', href: '#standards' },
    { name: 'Products', href: '#projects' },
  ];

  return (
    <>
      <motion.nav
        style={{ 
          width: navWidth,
          opacity: navOpacity,
          background: scrolled || menuOpen ? "oklch(0.08 0.01 285 / 0.85)" : "oklch(0.08 0.01 285 / 0.15)",
          backdropFilter: scrolled || menuOpen ? "blur(32px) saturate(180%)" : "blur(12px) saturate(120%)",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(32px) saturate(180%)" : "blur(12px) saturate(120%)",
          border: scrolled || menuOpen ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.03)",
          boxShadow: scrolled ? "0 20px 50px -15px oklch(0 0 0 / 0.8)" : "none",
          borderRadius: scrolled || menuOpen ? "2rem" : "1rem",
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 max-w-5xl z-[100] transition-all duration-500"
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

            {/* Mobile / Universal Toggle */}
            <div className="flex lg:hidden items-center">
              <AnimatedMenuButton 
                isOpen={menuOpen} 
                onClick={() => setMenuOpen(!menuOpen)} 
              />
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 w-full h-[100dvh] bg-black/40 backdrop-blur-[40px] z-[90] flex flex-col justify-center px-10"
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-background" />
            
            <div className="flex flex-col gap-8">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Navigation</span>
              {sections.map((section) => (
                <motion.a
                  key={section.name}
                  variants={itemVariants}
                  href={section.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl sm:text-6xl font-black tracking-tighter text-white hover:text-[oklch(0.55_0.18_145)] transition-colors duration-300 flex items-center gap-4 group"
                >
                  <span className="text-xl font-mono text-gray-600 group-hover:text-[oklch(0.55_0.18_145)] transition-colors">/0{sections.indexOf(section) + 1}</span>
                  {section.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-6">
              <div className="flex gap-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    variants={itemVariants}
                    href={social.url}
                    className="text-gray-400 hover:text-white text-2xl transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <motion.p variants={itemVariants} className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
                Dentrix Apps · Engineering Excellence
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AnimatedMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 rounded-full ${isOpen ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
        className="w-5 h-0.5 bg-current rounded-full"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0 }}
        className="w-5 h-0.5 bg-current rounded-full"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
        className="w-5 h-0.5 bg-current rounded-full"
      />
    </button>
  );
};

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
