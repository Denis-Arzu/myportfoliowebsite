import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { MovingBorderBtn } from '@/components/ui/moving-border';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="md:px-3 lg:px-15 py-15">
      {/* Responsive Container */}
      <div className="text-white min-h-[60vh] flex flex-col lg:flex-row-reverse items-center justify-between">
        
        {/* Right Section with Decorative Icons */}
        <div className="mb-10 relative flex justify-center md:justify-start mx-auto lg:order-first">
          <div className="absolute top-0 left-0 mb-10">
            <MovingBorderBtn className="flex flex-shrink items-center justify-center p-4 hover:scale-105 transition-transform">
              <span className="text-base text-gray-300">
                {"📢Let me "}
                <span className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  craft your ideas into reality!
                </span>
              </span>
            </MovingBorderBtn>
          </div>

          {/* Shape Wrapper */}
          <div className="ml-10 inset-0 mt-10 lg:w-87 lg:h-87 relative w-56 h-56 space-y-4 -rotate-[30deg]">
            {/* Upper Group */}
            <div className="flex w-30">
              <h1 className="lg:text-9xl text-8xl animate-pulse">💡</h1>
            </div>

            {/* Lower Group */} 
            <div className="flex gap-1 -translate-x-6 lg:translate-x-0">
              <h1 className="lg:text-9xl text-8xl animate-pulse">🧠</h1>
              <h1 className="lg:text-9xl text-8xl animate-pulse">🧩</h1>
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
                  name: "Web Developer",
                  designation: "Always available for work",
                  image: "/images/home/denis-profile-image.png"
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
            {"Based in Kenya, I'm a Frontend developer passionate about building modern web applications that users love."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
