import { SkillCard } from "@/components/ui/skill-card";
import { SiNextdotjs, SiReact, SiTypescript, SiPython, SiNodedotjs, SiFlutter, SiCplusplus } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { ReactNode } from "react";
import { FaChartLine, FaServer } from "react-icons/fa";

// Update icon type to match skill-card.tsx
type Skill = {
  type: string;
  icon: ReactNode;
  description: string;
  mainProficiency: number;
  technologies: {
    name: string;
    icon: ReactNode;
    description: string;
    proficiency: number;
  }[];
}

const skillsData: Skill[] = [
    // Full-Stack & AI Development
    {
      type: "Full-Stack & AI Development",
      icon: <CgWebsite />,
      description: "Building scalable SaaS platforms, AI-powered web apps, and mobile applications (Flutter). I construct robust architectures that drive business value and deliver seamless user experiences.",
      mainProficiency: 90,
      technologies: [
        {
          name: "Next.js",
          icon: <SiNextdotjs className="text-black dark:text-white" />,
          description: "Advanced proficiency in Next.js with deep understanding of App Router, Server Components, API Routes, and TypeScript integration.",
          proficiency: 90,
        },
        {
          name: "React",
          icon: <SiReact className="text-blue-500" />,
          description: "Solid experience building interactive UIs with React, hooks, context API, and state management using modern patterns.",
          proficiency: 85,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-blue-700" />,
          description: "Strong command of TypeScript in web apps, including types, generics, interfaces, and type safety in complex components.",
          proficiency: 80,
        },
        {
          name: "Python",
          icon: <SiPython className="text-yellow-500" />,
          description: "Building scalable backend services, automations, and integrating AI models.",
          proficiency: 85,
        },
        {
          name: "Node.js",
          icon: <SiNodedotjs className="text-green-500" />,
          description: "Creating fast, scalable server-side applications and RESTful APIs.",
          proficiency: 80,
        },
        {
          name: "Flutter",
          icon: <SiFlutter className="text-cyan-500" />,
          description: "Developing cross-platform mobile applications with native performance and expressive UIs.",
          proficiency: 75,
        }
      ],
    },

    // Algorithmic Trading & Automation
    {
        type: "Algorithmic Trading & Automation",
        icon: <FaChartLine className="text-green-500" />,
        description: "Developing high-frequency trading engines, Expert Advisors (EAs), and automated financial bots. Specializing in bridging robust backend infrastructure with real-time market data APIs for platforms like Deriv.",
        mainProficiency: 88,
        technologies: [
          {
            name: "C++",
            icon: <SiCplusplus className="text-blue-600" />,
            description: "Building ultra-low latency core trading engines and Expert Advisors (EAs).",
            proficiency: 90,
          },
          {
            name: "Python",
            icon: <SiPython className="text-yellow-500" />,
            description: "Data analysis, quantitative modeling, and AI-driven algorithmic logic.",
            proficiency: 85,
          },
          {
            name: "System Architecture",
            icon: <FaServer className="text-gray-500" />,
            description: "Designing robust VPS deployments, message queuing (ZMQ), and low-latency execution environments.",
            proficiency: 85,
          }
        ],
      }
];

export const SkillsSection = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {skillsData.map((skill, index) => (
            <div key={index} className="w-full max-w-sm">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};