import React from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import { About } from "./components/about";
import AboutSectitle from "./components/aboutsectitle";
import Myskillssectitle from "./components/Myskillssectitle";
import { SkillsSection } from "./components/Myskills";
import Loader from "./components/loader";

const Page = () => {
  return (
    <>
      <Loader />
      <div className="relative min-h-[300vh] overflow-hidden text-foreground p-1">
        {/* Dark background */}
        <div className="relative inset-0 bg-gray-900" />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto p-5">
            <Navbar />
            <div className="mt-24"> {/* Add margin-top to account for fixed navbar */}
              <div id="home">
                <HeroSection />
              </div>
            </div>
          </div>
          <div className="h-10 xl:h-32 bg-gradient-to-t from-black absolute -bottom-5 left-0 xl:bottom-0 w-full"></div>
        </div>
        
        <div id="about">
            <AboutSectitle />
            <div className="p-3 border border-green-600 text-orange-300 relative z-10 ml-10 mr-10">
              <About />
            </div>
            <div className="h-10 xl:h-32 bg-gradient-to-t from-black relative mt-10 w-full"></div>
        </div>

        <div id="skills">
          <Myskillssectitle />
          <SkillsSection />
        </div>
      </div>
    </>
  );
};

export default Page;