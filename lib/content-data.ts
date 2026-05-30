/** Site copy - DentrixApps (AI chatbot assistants for salons, gyms & dental practices) */

export const heroContent = {
  eyebrow: "AI Assistants for Salons, Gyms & Dental Practices",
  headline: "Your Competitor Just Answered a Call You Missed. We Make Sure That Never Happens Again.",
  subheadline:
    "Every missed call is a client walking to your competitor. We build an AI assistant that knows your services, your pricing, your team - and answers every question before they even think about calling someone else. Built from your website. Live today.",
  primaryCta: { label: "See It Live", action: "scroll_to_demos" as const },
  secondaryCta: { label: "Talk to Our AI", action: "open_chat_overlay" as const },
  tertiaryCta: { label: "Get Yours Built", action: "navigate_to_contact" as const },
};

export const contactContent = {
  heading: "Get Your AI Assistant Built Today",
  subheading:
    "Tell us about your business. We'll build your assistant from your website and send you a live demo link within 24 hours. No commitment. No credit card. Just proof.",
  industries: [
    { value: "salon", label: "Salon & Spa" },
    { value: "gym", label: "Gym & Fitness" },
    { value: "dental", label: "Dental Practice" },
  ],
  trustSignals: [
    "Same-day build - we use your website data",
    "Live demo before you pay a cent",
    "One line of code to go live",
  ],
  contactMethods: [
    { type: "email" as const, label: "ceo@dentrixapps.com" },
  ],
};
