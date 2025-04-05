import React from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import { About } from "./components/about";
import AboutSectitle from "./components/aboutsectitle";

const Page = () => {
  return (
    <div className="relative min-h-[400vh] overflow-hidden text-foreground p-2">
      {/* Background color layer */}
      <div className="absolute inset-0 dark:bg-black bg-white" />
      
      {/* Grid background layer */}
      <div className="absolute inset-0 dark:bg-grid-white/[0.05] bg-grid-black/[0.2] z-0" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto p-5">
          <Navbar />
          <HeroSection />
        </div>
        <div className="h-10 xl:h-32 bg-gradient-to-t from-black absolute -bottom-5 left-0 xl:bottom-0 w-full"></div>
      </div>
      
      <AboutSectitle />
      <div className="p-3 border border-green-600 text-orange-300 relative z-10">
        <About />
      </div>
    </div>
  );
};

export default Page;