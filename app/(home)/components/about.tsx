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
        <AccordionTrigger>{"Who am I and what’s my background?"}</AccordionTrigger>
        <AccordionContent>
          I am the founder of Dentrix Apps, an entrepreneurial developer and algorithmic trader focused on escaping traditional paradigms by building high-leverage AI tools and financial tech.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{"What kind of software do I specialize in?"}</AccordionTrigger>
        <AccordionContent>
          I specialize in creating robust systems that scale and perform. My focus is on building <br />
          <span className="text-green-500">
            ✅ AI-powered SaaS platforms
          </span> <br />

          <span className="text-green-500">
            ✅ Algorithmic Trading Bots (EAs)
          </span> <br />

          <span className="text-green-500">
            ✅ Custom Business Management Systems
          </span> <br />

          <span className="text-green-500">
            ✅ Cross-platform Mobile Apps
          </span>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>{"Which programming languages and frameworks do I specialize in?"}</AccordionTrigger>
        <AccordionContent>
          I specialize in Next.js, React, TypeScript, Flutter (Dart), Python, C++, and Node.js to build powerful and scalable systems.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>{"What’s my process for collaborating with clients and stakeholders?"}</AccordionTrigger>
        <AccordionContent>
          My approach starts with understanding your vision and business goals. I believe in transparent communication and iterative feedback, ensuring every stage of the project—from initial planning and wireframing to final deployment—is aligned with your expectations. This collaborative process guarantees a successful, tailor-made solution.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>{"Is there a limit to the number of projects I can handle?"}</AccordionTrigger>
        <AccordionContent>
          Yes, I limit the number of projects I take on to ensure I can give each client the attention and dedication they deserve. I believe in quality over quantity, and I’m committed to delivering exceptional results.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>{"Is there anything else that I do apart from development?"}</AccordionTrigger>
        <AccordionContent>
          Yes, I also have a strong focus on financial literacy, high-ticket sales, and building comprehensive business architectures to ensure projects achieve real-world market success.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )

}
