"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Vortex } from '@/components/ui/vortex';
import { SplashCursor } from '@/components/ui/splash-cursor';
import { Magnetic } from '@/components/ui/magnetic';
import CaseStudies from '../(home)/components/CaseStudies';
import ActiveBuilds from '../(home)/components/ActiveBuilds';
import { Footer } from '../(home)/components/Footer';
import Loader from '../(home)/components/loader';

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const [pageReady, setPageReady] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsDesktop(window.innerWidth >= 1024);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <>
      <Loader onDone={() => setPageReady(true)} />

      <AnimatePresence mode="wait" onExitComplete={() => router.push('/')} >
        {pageReady && showProducts && (
          <motion.main
            key="products-main"
            className="relative min-h-screen text-foreground"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
              isDesktop
                ? {
                    y: "100%",
                    opacity: 0.95,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                  }
                : {
                    x: "-100%",
                    opacity: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Curtain transition layer */}
            <motion.div
              className="fixed inset-0 z-50 bg-gradient-to-l from-black via-black to-[oklch(0_0_0)] border-l border-[oklch(0.85_0.3_150/0.3)]"
              style={{ boxShadow: isDesktop ? '0 -30px 80px black' : '-30px 0 80px black' }}
              initial={isDesktop ? { y: '-100%' } : { x: '100%' }}
              exit={isDesktop ? { y: '100%' } : { x: '-100%' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
            {/* Main content */}
            <div className="relative z-10 min-h-screen">
              {/* ── Canvas background ─── */}
              <div className="fixed inset-0 bg-black" />
              <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                <Vortex particleCount={130} intensity={0.85} />
              </div>

              <SplashCursor intensity={0.4} />

              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="w-full flex items-center justify-between py-3.5 px-4 sm:px-5 rounded-2xl border border-[oklch(0.85_0.3_150/0.3)] bg-[oklch(0_0_0/0.92)]">
                  <a href="/" className="flex items-center group shrink-0">
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

                  <Magnetic strength={0.3}>
                    <motion.button
                      onClick={() => setShowProducts(false)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="relative w-12 h-12 bg-[oklch(0_0_0/0.9)] hover:bg-[oklch(0_0_0)] border border-[oklch(0.85_0.3_150/0.3)] hover:border-[oklch(0.85_0.3_150/0.55)] rounded-2xl shadow-2xl hover:shadow-[0_0_24px_oklch(0.85_0.3_150/0.3)] transition-all duration-300 group"
                      aria-label="Close products and go back home"
                      style={{ boxShadow: '0 8px 32px oklch(0 0 0 / 0.4)' }}
                    >
                      <svg
                        className="w-5 h-5 text-white group-hover:text-[oklch(0.85_0.3_150)] transition-colors duration-300 drop-shadow-lg group-hover:drop-shadow-[0_0_12px_oklch(0.85_0.3_150)/0.6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      </svg>
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-[oklch(0.85_0.3_150/0.08)]"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.button>
                  </Magnetic>
                </div>
              </div>

              {/* ── Products Content ─── */}
              <motion.div
                className="relative z-10 pt-16 sm:pt-18 lg:pt-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CaseStudies />
                <ActiveBuilds />
              </motion.div>

              {/* ── Footer ─── */}
              <div className="relative z-10">
                <Footer />
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsPage;