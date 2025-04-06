import { SkillCard } from "@/components/ui/skill-card";
import { SiAdobeaftereffects, SiAdobeaudition, SiDavinciresolve, SiNextdotjs, SiReact, SiTypescript, SiAdobeillustrator, SiCanva, SiAdobephotoshop } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { ReactNode } from "react";
import { FaObjectGroup, FaPaintBrush, FaVideo } from "react-icons/fa";
import { LiaCuttlefish } from "react-icons/lia";

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
    // Frontend Development
    {
      type: "Frontend Development",
      icon: <CgWebsite />,
      description: "Frontend web development is the practice of building the visual and interactive parts of a website or web application—the part users see and interact with directly. I build beautiful, responsive, and interactive websites using HTML, CSS, and JavaScript. With modern tools like React and Next.js, I turn designs into smooth, user-friendly experiences that work across all devices.",
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
      ],
    },

    // Video Editing
    {
        type: "Video Editing",
        icon: <FaVideo className="text-red-500" />,
        description:
          "Video editing is the art of shaping visuals, sound, and motion into a compelling story. I craft engaging video content that captures attention—whether it's short-form social clips, cinematic edits, or branded visuals. Using tools like DaVinci Resolve, After Effects, CapCut, and Adobe Audition, I blend creativity with precision to deliver high-quality videos that leave an impact.",
        mainProficiency: 88,
        technologies: [
          {
            name: "DaVinci Resolve",
            icon: <SiDavinciresolve className="text-orange-800" />,
            description:
              "Professional-grade color grading and video editing with advanced tools for cinematic storytelling and post-production workflows.",
            proficiency: 90,
          },
          {
            name: "Adobe After Effects",
            icon: <SiAdobeaftereffects className="text-purple-500" />,
            description:
              "Motion graphics and visual effects creation for intros, transitions, and dynamic video compositions.",
            proficiency: 85,
          },
          {
            name: "CapCut",
            icon: <LiaCuttlefish className="text-black" />,
            description:
              "Fast and flexible short-form video editing, ideal for social media content with trendy effects and transitions.",
            proficiency: 80,
          },
          {
            name: "Adobe Audition",
            icon: <SiAdobeaudition className="text-green-500" />,
            description:
              "Audio editing and sound design for voiceovers, background music, and audio cleanup in professional video projects.",
            proficiency: 75,
          },
        ],
      },
      
      //Graphics Design
      {
        type: "Graphic Design",
        icon: <FaPaintBrush className="text-pink-500" />,
        description:
          "Graphic design is the visual language of storytelling. I create stunning visuals that communicate ideas clearly and creatively—from social media content and branding assets to UI elements and marketing materials. With tools like Photoshop, Canva, and Illustrator, combined with UI/UX design principles, I blend creativity with strategy to deliver designs that are both beautiful and functional.",
        mainProficiency: 82,
        technologies: [
          {
            name: "Adobe Photoshop",
            icon: <SiAdobephotoshop className="text-blue-500" />,
            description:
              "Expertise in image editing, compositing, retouching, and digital design for both web and print media.",
            proficiency: 90,
          },
          {
            name: "Canva",
            icon: <SiCanva className="text-teal-400" />,
            description:
              "Fast, collaborative graphic creation for social media, presentations, and branding—perfect for quick, on-brand content.",
            proficiency: 85,
          },
          {
            name: "Adobe Illustrator",
            icon: <SiAdobeillustrator className="text-orange-500" />,
            description:
              "Vector design skills for logos, icons, illustrations, and scalable branding assets with precision and creativity.",
            proficiency: 80,
          },
          {
            name: "UI/UX Design",
            icon: <FaObjectGroup className="text-purple-600" />,
            description:
              "Understanding of layout, visual hierarchy, color theory, and user behavior to design intuitive, user-friendly interfaces across platforms.",
            proficiency: 78,
          },
        ],
      },
];

export const SkillsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {skillsData.map((skill, index) => (
        <SkillCard key={index} skill={skill} />
      ))}
    </div>
  );
};