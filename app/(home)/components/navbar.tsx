import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SiGmail, SiGithub, SiWhatsapp } from "react-icons/si";
import { motion, AnimatePresence } from 'motion/react';
import { Magnetic } from '@/components/ui/magnetic';
import Loader from './loader';

interface SocialLink { name: string; url: string; icon: React.ReactNode }
interface Section { name: string; href: string }

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsReloading(true);
  };

  const handleLoaderDone = () => {
    window.location.href = '/';
  };

  // Scroll-triggered border & blur upgrade
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock for sidebar
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; }
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
        initial={{ x: 0 }}
        className={`fixed top-0 left-0 right-0 w-full lg:top-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-[95%] lg:max-w-5xl z-50 transition-all duration-300 rounded-none lg:rounded-full ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          background: scrolled
            ? "oklch(0.1 0.01 285 / 0.7)"
            : "oklch(0.08 0.005 285 / 0.15)",
          backdropFilter: scrolled ? "blur(64px) saturate(180%)" : "blur(20px) saturate(120%)",
          WebkitBackdropFilter: scrolled ? "blur(64px) saturate(180%)" : "blur(20px) saturate(120%)",
          border: scrolled
            ? "1px solid rgba(255, 255, 255, 0.12)"
            : "1px solid rgba(255, 255, 255, 0.04)",
          boxShadow: scrolled 
            ? "0 20px 50px -15px oklch(0 0 0 / 0.9), inset 0 1px 0 rgba(255,255,255,0.1)" 
            : "none"
        }}
      >
        {/* Scroll-progress bar */}
        <ScrollProgress />

        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3.5 lg:py-5">

            {/* 1. Logo (Always Left) */}
            <a 
              href="/" 
              onClick={handleLogoClick}
              className="flex items-center -ml-1 mt-1 group shrink-0" 
              aria-label="Home"
            >
              <div className="relative w-28 h-8 sm:w-36 sm:h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/home/dentrixappslg.png"
                  alt="Dentrix Apps Logo"
                  width={144}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </a>
            
            {isReloading && <Loader onDone={handleLoaderDone} />}

            {/* 2. Desktop Section Nav & Socials (Right Aligned) */}
            <div className="hidden lg:flex items-center gap-8 ml-auto">
              <div className="flex items-center gap-5">
              {sections.map((section) => (
                <motion.a
                  key={section.name}
                  href={section.href}
                  className="relative text-gray-400 hover:text-white px-2 py-1 text-sm font-medium transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-indigo-500 to-[oklch(0.55_0.18_145)]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {socialLinks.map((social) => (
                <Magnetic key={social.name} strength={0.4}>
                  <motion.a
                    href={social.url}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-gray-400 hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/8"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {social.icon}
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </div>

            {/* 4. Mobile Right Side (CTA + Hamburger) */}
            <div className="flex lg:hidden items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 text-white bg-trust-gradient hover:scale-105 rounded-full transition-all relative z-[60]"
                aria-label="Toggle mobile menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {menuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Full-screen Drawer (Side Up) */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 w-full h-[100dvh] bg-[oklch(0.08_0.005_285)] shadow-2xl z-[100] flex flex-col p-6 pt-8 lg:hidden overflow-y-auto"
            >
              {/* Close Header */}
              <div className="flex justify-end mb-10 text-white">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-col gap-6 px-2">
                {sections.map((section) => (
                  <motion.a
                    key={section.name}
                    href={section.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-bold tracking-tight text-gray-300 hover:text-[oklch(0.55_0.18_145)] transition-colors duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.name}
                  </motion.a>
                ))}
              </div>

              {/* Sidebar Footer / Socials */}
              <div className="mt-auto border-t border-white/10 pt-8 pb-6 flex flex-col gap-4">
                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold px-2">Connect</span>
                <div className="flex justify-start gap-4 px-2">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-white/5 rounded-xl"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollHeight === clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 rounded-t-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 via-[oklch(0.55_0.18_145)] to-cyan-400"
        style={{ scaleX: progress, transformOrigin: 'left' }}
      />
    </div>
  );
}

export default Navbar;
