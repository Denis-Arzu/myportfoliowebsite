"use client";
import React from 'react';
import { SiGmail, SiGithub, SiWhatsapp } from "react-icons/si";
import { motion } from 'framer-motion';

export default function Navbar() {
    const socialLinks = [
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

    const sections = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center py-5">
                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-gray-400 tracking-wider flex items-center gap-1">
                        <span className="bg-gradient-to-r from-orange-500 to-green-500 text-transparent bg-clip-text -rotate-2">
                            {"</>"} Denis WebDev
                        </span>
                    </h1>

                    {/* Section Navigation */}
                    <div className="flex space-x-6 mt-3 sm:mt-0">
                        {sections.map((section) => (
                            <motion.a
                                key={section.name}
                                href={section.href}
                                className="relative text-blue-500 hover:text-green-400 px-2 py-1 text-sm font-medium transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {section.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400"
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
                            <a
                                href={social.url}
                                key={index}
                                aria-label={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-1.5xl text-blue-400 hover:text-green-500 transition-colors duration-400 hover:scale-110 transform"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
