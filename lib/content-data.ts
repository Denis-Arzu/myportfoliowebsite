/** Site copy — Dentrix Apps (real estate AI chatbots) */

export const heroContent = {
  headline: "Your real estate website is losing leads right now.",
  headlineAccent: "Let's fix that with AI.",
  subheadline:
    "We build custom AI assistants for real estate agents — and prove they work by showing yours live on your site before you pay a dollar. One setup, $29/month, zero risk.",
  primaryCta: { label: "Talk to us", href: "/contact" },
  secondaryCta: { label: "Talk to AI Agent", action: "chat" as const },
};

export const contactContent = {
  heading: "Drop us your clean thoughts",
  subheading:
    "Tell us about your market and website. We'll scope your chatbot and show you a live preview on your site.",
  serviceTypes: [
    { value: "chatbot", label: "AI website chatbot for my listings" },
    { value: "preview", label: "Proof-before-pay preview on my site" },
    { value: "crm", label: "Lead capture & CRM integration" },
    { value: "other", label: "Something else" },
  ],
  budgetRanges: [
    { value: "exploring", label: "Just exploring" },
    { value: "under-500", label: "Under $500 / month" },
    { value: "500-1500", label: "$500 – $1,500 / month" },
    { value: "1500-plus", label: "$1,500+ / month" },
    { value: "undisclosed", label: "Prefer to discuss on a call" },
  ],
  trustSignals: [
    "Preview your chatbot on your site before you commit",
    "Built for real estate — listings, buyers, and lead qualification",
    "Typical response within 1 hour on business days",
  ],
  contactMethods: [
    { type: "email" as const, label: "ceo@dentrixapps.com" },
    {
      type: "calendly" as const,
      label: "Book a discovery call",
      href: "https://calendly.com/dentrixapps/30min",
    },
  ],
};
