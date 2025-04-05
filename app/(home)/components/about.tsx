import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function About() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{"Who am I and what’s my background in web development?"}</AccordionTrigger>
          <AccordionContent>
          I have a strong foundation in web development, with [2 years] of experience in building dynamic, user-friendly websites. My journey began with a passion for coding and design, leading me to training and work on a variety of projects ranging from startups to established brands.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{"Which programming languages and frameworks do I specialize in?"}</AccordionTrigger>
          <AccordionContent>
            I specialize in HTML, CSS, JavaScript, and and I’m proficient with modern frameworks like React and Next.js. I also have experience with CSS tools such as Tailwind CSS to create efficient and scalable web solutions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{"What’s my process for collaborating with clients and stakeholders?"}</AccordionTrigger>
          <AccordionContent>
          My approach starts with understanding your vision and business goals. I believe in transparent communication and iterative feedback, ensuring every stage of the project—from initial planning and wireframing to final deployment—is aligned with your expectations. This collaborative process guarantees a successful, tailor-made solution.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>{"Is there a limit to the number of projects I can handle?"}</AccordionTrigger>
          <AccordionContent>
          Yes, I limit the number of projects I take on to ensure I can give each client the attention and dedication they deserve. I believe in quality over quantity, and I’m committed to delivering exceptional results.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>{"Is there anything else that I do apart from web development?"}</AccordionTrigger>
          <AccordionContent>
          Yes, i also have experience in graphic design and video editing. I can help you create a professional and engaging visual identity for your brand.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  