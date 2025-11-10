import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { MovingBorderBtn } from '@/components/ui/moving-border';
import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="md:px-3 lg:px-15 py-15">
      {/* Responsive Container */}
      <div className="text-white min-h-[60vh] flex flex-col lg:flex-row-reverse items-center justify-between">
        
        {/* Right Section with Decorative Image */}
        <div className="mb-10 relative flex flex-col items-center md:items-start mx-auto lg:order-first">
          <div className="mb-6 z-20">
            <MovingBorderBtn className="flex flex-shrink items-center justify-center p-4 hover:scale-105 transition-transform">
              <span className="text-base text-gray-300">
                {"📢Let me "}
                <span className="font-bold bg-gradient-to-r from-orange-500 via-gray-500 to-green-500 text-transparent bg-clip-text">
                  craft your ideas into reality!
                </span>
              </span>
            </MovingBorderBtn>
          </div>

          {/* Image Wrapper */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/home/Generated Image November 10, 2025 - 8_37PM.png"
                alt="Denis Decorative Image"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="glow absolute top-[48%] right-1/2 z-10"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inset-0 flex items-center gap-4">
            <AnimatedTooltip 
              items={[
                {
                  id: 1,
                  name: "Full-Stack Web Apps Developer",
                  designation: "Always available for work",
                  image: "/images/home/Generated Image November 10, 2025 - 8_37PM.png"
                }
              ]}
            />
              
            <a
              href="https://wa.me/254111480091" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 hover:border-orange-400 bg-gray-700/50 font-medium transition-colors border border-gray-400 rounded-full p-2 duration-200 backdrop-blur-sm"
            >
              Get in touch ➜
            </a>
          </div>
          
          <h1 className="lg:text-5xl text-4xl max-w-md font-bold leading-tight">Hello and nice to meet you!👋</h1>
          <h2 className="text-2xl font-semibold underline underline-offset-8 decoration-4 decoration-green-500">{"I'm Denis."}</h2>
          <p className="text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
            {"Based in Kenya, I'm a full stack developer specializing in building modern web applications that users love."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
