// import { Icon } from 'lucide-react';
import React from 'react'
import { SiTiktok,SiGmail, SiGithub, SiWhatsapp } from "react-icons/si";

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
     },

     

     {
        name: 'tiktok',
        url: 'https://www.tiktok.com/@denis_webdev',
        icon: <SiTiktok />
     }
     

   ] ;




  return (
    <nav className='pt-1 flex justify-between items-center position-fixed'>
        <h1 className="hover:cursor-pointer mb-6 text-xl font-bold text-gray-400 tracking-wider flex items-center gap-1 pt-3 pl-4">
        
            <span className="hover:animate-bounce bg-gradient-to-r from-orange-500 to-green-500 text-transparent bg-clip-text -rotate-2">👨🏻‍💻Denis WebDev</span>
        </h1>
        <div className="pr-4 flex tracking-wider items-center justify-end gap-4">
            {socialLinks.map((social, index) => (
                <a
                    href={social.url}
                    key={index}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-1.5xl text-gray-400 hover:text-green-500 transition-colors duration-400 hover:scale-110 transform"
                >
                    {social.icon}
                </a>
            ))}
        </div>
    </nav>
  );
}
