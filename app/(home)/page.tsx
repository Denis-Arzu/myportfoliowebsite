import React from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import { About } from "./components/about";
import AboutSectitle from "./components/aboutsectitle";
import Myskillssectitle from "./components/Myskillssectitle";

const Page = () => {
  return (
    <div className="relative min-h-[250vh] overflow-hidden text-foreground p-1">
      {/* Dark background */}
      <div className="relative inset-0 bg-gray-900" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto p-5">
          <Navbar />
          <HeroSection />
        </div>
        <div className="h-10 xl:h-32 bg-gradient-to-t from-black absolute -bottom-5 left-0 xl:bottom-0 w-full"></div>
      </div>
      
      <div>
          <AboutSectitle />
      
               <div className="p-3 border border-green-600 text-orange-300 relative z-10 ml-10 mr-10">
        
            <About />
         </div>
      </div>

      <div>
        <Myskillssectitle />
        
      </div>
    </div>
  );
};

export default Page;