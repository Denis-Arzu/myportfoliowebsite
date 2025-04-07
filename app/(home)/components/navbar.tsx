"use client";
import React from 'react';
import { SiGmail, SiGithub, SiWhatsapp } from "react-icons/si";
import { motion } from 'framer-motion';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface Section {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
    const socialLinks: SocialLink[] = [
        {
            name: 'GitHub',
            url: 'https://github.com/Denis-Arzu',
            icon: <SiGithub />
        },
        {
            name: 'WhatsApp',
            url: 'https://wa.me/254111480091',
            icon: <SiWhatsapp />
        },
        {
            name: 'Email',
            url: 'https://gmail.com',
            icon: <SiGmail />
        }
    ];

    const sections: Section[] = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-indigo-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center py-4">
                    {/* Logo */}
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold tracking-wider flex items-center gap-1"
                    >
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text -rotate-2 hover:rotate-0 transition-transform duration-300">
                            {"</>"} Denis WebDev
                        </span>
                    </motion.h1>

                    {/* Section Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mt-3 sm:mt-0 sm:gap-6">
                        {sections.map((section) => (
                            <motion.a
                                key={section.name}
                                href={section.href}
                                className="relative text-indigo-300 hover:text-purple-400 px-2 py-1 text-sm font-medium transition-all duration-300 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {section.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 mt-3 sm:mt-0">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                href={social.url}
                                key={index}
                                aria-label={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-indigo-300 hover:text-purple-400 transition-all duration-300 hover:scale-110 transform"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
