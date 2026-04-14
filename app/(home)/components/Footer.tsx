"use client";
import Image from 'next/image';
import React from 'react';
import { Magnetic } from '@/components/ui/magnetic';
import { SiGithub, SiWhatsapp, SiGmail } from 'react-icons/si';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[oklch(1_0_0/0.1)] overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[oklch(0.08_0.02_285)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/home/dentrixappslogoicon.png"
                  alt="Dentrix Logo"
                  width={40}
                  height={40}
                  sizes="40px"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight">
                <span className="text-[oklch(0.55_0.18_145)]">DENTRIX</span>
                <span className="text-white ml-2 text-xl font-bold tracking-[0.2em] uppercase opacity-80">Apps</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Engineering high-leverage AI platforms and ultra-low-latency financial systems built to define the frontier.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold tracking-wide uppercase text-xs mb-2">Company</h4>
            <Magnetic strength={0.2} className="w-fit">
              <a href="#about" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors block">About Us</a>
            </Magnetic>
            <Magnetic strength={0.2} className="w-fit">
              <a href="#methodology" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors block">Methodology</a>
            </Magnetic>
            <Magnetic strength={0.2} className="w-fit">
              <a href="#standards" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors block">Engineering Standards</a>
            </Magnetic>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold tracking-wide uppercase text-xs mb-2">Capabilities</h4>
            <Magnetic strength={0.2} className="w-fit">
              <a href="#skills" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors block">AI Intelligence Lab</a>
            </Magnetic>
            <Magnetic strength={0.2} className="w-fit">
              <a href="#skills" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors block">Quantitative Systems</a>
            </Magnetic>
            <Magnetic strength={0.2} className="w-fit">
              <a href="#skills" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors block">Scalable Infrastructure</a>
            </Magnetic>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold tracking-wide uppercase text-xs mb-2">Engage</h4>
            <div className="flex gap-4">
              <Magnetic strength={0.4}>
                <a href="https://github.com/Denis-Arzu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all outline-none">
                  <SiGithub className="w-5 h-5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a href="https://wa.me/254111480091" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all outline-none">
                  <SiWhatsapp className="w-5 h-5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a href="mailto:hello@dentrixapps.com" className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all outline-none">
                  <SiGmail className="w-5 h-5" />
                </a>
              </Magnetic>
            </div>
            <Magnetic strength={0.2} className="w-fit">
              <a href="https://wa.me/254111480091" target="_blank" rel="noopener noreferrer" className="inline-flex mt-2 items-center justify-center text-xs font-semibold px-5 py-2.5 rounded-full bg-[oklch(0.55_0.18_145)] text-black hover:bg-[oklch(0.62_0.18_145)] transition-colors">
                Initiate Project
              </a>
            </Magnetic>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[oklch(1_0_0/0.05)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {currentYear} Dentrix Apps LLC. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500 font-mono items-center">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Systems Operational</span>
            <span>·</span>
            <span>Architected in Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
