import React from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import { About } from "./components/about";
import AboutSectitle from "./components/aboutsectitle";
import Myskillssectitle from "./components/Myskillssectitle";
import { SkillsSection } from "./components/Myskills";
import Loader from "./components/loader";
import ProjectsSection from './components/ProjectsSection';
import { motion } from 'framer-motion';

const Page: React.FC = () => {
  return (
    <>
      <Loader />
      <main className="relative min-h-[300vh] overflow-hidden text-foreground">
        {/* Background effects */}
        <div className="fixed inset-0 bg-black" />
        <div className="fixed inset-0 bg-gradient-to-b from-indigo-900/20 via-black to-purple-900/20" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
            <div className="mt-24">
              <div id="home">
                <HeroSection />
              </div>
            </div>
          </div>
          <div className="h-20 xl:h-32 bg-gradient-to-t from-black absolute -bottom-5 left-0 xl:bottom-0 w-full" />
        </div>
        
        <section id="about" className="relative py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutSectitle />
            
              <span className="text-sm text-indigo-400/70 italic font-light">
                {'Get to know me more'}
              </span>
          
            <div className="p-6 md:p-8 border border-indigo-500/20 rounded-xl backdrop-blur-sm bg-black/40 text-gray-300 relative z-10">
              <About />
            </div>
          </div>
          <div className="h-20 xl:h-32 bg-gradient-to-t from-black relative mt-10 w-full" />
        </section>

        <section id="skills" className="relative py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Myskillssectitle />
            <SkillsSection />
          </div>
          <div className="h-20 xl:h-32 bg-gradient-to-t from-black relative mt-10 w-full" />
        </section>

        <ProjectsSection />
      </main>
    </>
  );
};

export default Page;