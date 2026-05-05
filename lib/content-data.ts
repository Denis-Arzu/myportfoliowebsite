export const heroContent = {
  eyebrow: "AI Voice Studio",
  primaryHeadline: "Your Brand's Voice,",
  textSwapPhrases: [
    "Engineered to Perfection.",
    "Delivered in Minutes.",
    "Heard Around the World.",
    "Working While You Sleep.",
  ],
  subheadline:
    "Professional AI voiceovers, voice cloning, and multilingual dubbing — built for creators, brands, and businesses who refuse to sound amateur. Same-day delivery. Studio quality.",
  primaryCta: { label: "Hear Our Work", href: "#portfolio" },
  secondaryCta: { label: "Get a Free Quote", href: "#contact" },
  stats: [
    { label: "Voiceovers Delivered", value: "50+" },
    { label: "Languages Supported", value: "29+" },
          { label: "Avg Delivery Time", value: "<30 min" },    { label: "Client Satisfaction", value: "100%" },
  ],
};

export const aboutContent = {
  sectionTitle: "The Story Behind the Voice",
  founderName: "Dennis Kioko",
  founderTitle: "Founder & Voice Engineer",
  paragraphs: [
    "Dentrix Apps started as a software engineering lab — building trading engines, automation systems, and scalable infrastructure. But somewhere along the way, we discovered something that changed everything: the power of voice.",
    "A voice can build trust in 3 seconds. It can make someone hit 'subscribe' instead of 'skip.' It can turn a faceless YouTube channel into a brand people recognize. And with modern AI, that voice doesn't need to come from a $500/hour studio session.",
    "We tested. We iterated. We cloned our own voice, dubbed it into French and Hindi, built SSML-enhanced pacing systems, and created voice agents that handle real conversations. Every deliverable was a lesson. Every parameter tweak was a breakthrough.",
    "Now we bring that engineering rigor to every voice project. Not because we're voice actors — we're not. But because voice, like code, is a system. And systems can be engineered to perfection.",
  ],
  pillars: [
    { title: "Vision", text: "A world where every creator, brand, and business has access to studio-quality voice — without the studio price tag." },
    { title: "Mission", text: "Engineer voice solutions that sound human, deliver fast, and scale infinitely. Every project is a system. Every system has an optimal configuration." },
    { title: "Origin", text: "Built in Nairobi, serving globally. Dentrix Apps combines Silicon Valley engineering standards with African innovation speed." },
    { title: "Standard", text: "If it doesn't sound professional, it doesn't ship. We'd rather redo a deliverable 3 times than deliver one that's 'good enough.'" },
  ],
};

export const servicesContent = [
  {
    id: "voiceovers",
    icon: "Mic",
    title: "AI Voiceovers",
    outcomeTitle: "Sound Like a Million-Dollar Brand",
              description: "Professional voiceovers for YouTube intros, podcast ads, e-learning modules, meditation apps, and more. Generated in under 30 minutes with SSML-enhanced pacing for dramatic pauses, emphasis, and natural rhythm.",    deliverables: ["YouTube intros & outros (15-60s)", "Podcast ad reads (60s)", "E-learning narration (5+ min)", "Product demos & commercials", "Audiobook chapters"],
    startingPrice: "$25",
    deliveryTime: "Same day",
    tags: ["Most Popular", "Fastest Delivery"],
  },
  {
    id: "cloning",
    icon: "Copy",
    title: "Voice Cloning",
    outcomeTitle: "Be in Two Places at Once",
    description: "We clone your voice from a 1-minute audio sample. The result? A digital version of you that never gets tired, never loses breath, and delivers flawless performances every single time. Your voice becomes an asset that works while you sleep.",
    deliverables: ["Brand voice cloning from 1-min sample", "Unlimited content in your own voice", "CEO voicemail & phone greetings", "Personalized video messages at scale", "Audiobook narration in author's voice"],
    startingPrice: "$50",
    deliveryTime: "24 hours",
    tags: ["Premium", "High Margin"],
  },
  {
    id: "dubbing",
    icon: "Globe",
    title: "Dubbing & Localization",
    outcomeTitle: "Speak to the World",
    description: "One piece of content becomes 29+ pieces of content. We dub your videos, courses, and podcasts into Spanish, French, Hindi, Japanese, Arabic, and 20+ more languages. Same emotion. Same energy. Global reach.",
    deliverables: ["Video dubbing (29+ languages)", "Course localization", "Multilingual ad campaigns", "YouTube channel expansion", "Subtitle synchronization"],
    startingPrice: "$20",
    deliveryTime: "24-48 hours",
    tags: ["Volume Business", "Recurring"],
  },
  {
    id: "agents",
    icon: "Phone",
    title: "Voice Agents",
    outcomeTitle: "Never Miss a Lead Again",
    description: "AI-powered voice agents that handle customer calls 24/7. They answer questions, qualify leads, book appointments, and route complex issues — all in a natural, human voice. Replace a $5,000/month employee with a $200/month system.",
    deliverables: ["24/7 customer service agent", "Lead capture & qualification", "Appointment scheduling", "FAQ handling", "Custom conversation flows"],
    startingPrice: "$200 setup + $100/mo",
    deliveryTime: "3-5 days",
    tags: ["Recurring Revenue", "High Value"],
  },
  {
    id: "software",
    icon: "Code2",
    title: "Custom Software Engineering",
    outcomeTitle: "Systems Built to Scale",
    description: "Beyond voice — we build high-performance software. Algorithmic trading engines, AI automation systems, scalable web applications, and data pipelines. Full-stack engineering from Nairobi to the world.",
    deliverables: ["Trading engines (C++/Python)", "AI automation workflows", "Full-stack web apps (Next.js)", "Data pipelines & APIs", "Performance audits"],
    startingPrice: "$500",
    deliveryTime: "1-4 weeks",
    tags: ["Enterprise", "Custom"],
  },
];

export const voiceDemosContent = {
  sectionTitle: "Hear the Difference",
      sectionSubtitle: "Every sample below was generated in under 30 minutes. This is what your content could sound like.",  demos: [
    {
      id: "horizon",
      title: "Horizon — Product Voiceover",
      description: "Warm, polished product introduction. Perfect for app launches, brand videos, and commercial spots.",
      voice: "John — Warm British",
      duration: "14.76s",
      audioFile: "/audio/horizon-product-intro.mp3",
      tags: ["Commercial", "Product", "Brand"],
                badge: "Delivered in < 30 minutes",    },
    {
      id: "techpulse",
      title: "TechPulse — YouTube Channel Intro",
      description: "Energetic, hook-driven YouTube intro with SSML-enhanced pacing. Professional breaks and emphasis throughout.",
      voice: "Brandon — Dynamic",
      duration: "18.20s",
      audioFile: "/audio/techpulse-youtube-intro.mp3",
      tags: ["YouTube", "Content Creator", "SSML"],
      badge: "SSML-Enhanced Pacing",
    },
    {
      id: "clone-showcase",
      title: "Dentrix Apps — Voice Clone Showcase",
      description: "A full 2-minute branded showcase narrated entirely by an AI clone. The voice you're hearing doesn't exist — it was cloned from a 1-minute sample.",
      voice: "Dennis — Self-Clone",
      duration: "2:10",
      audioFile: "/audio/dentrix-voice-clone-showcase.mp3",
      tags: ["Voice Clone", "Brand", "Portfolio"],
      badge: "AI Cloned Voice",
    },
    {
      id: "french-dub",
      title: "French Dub — Global Reach",
      description: "The same branded showcase, professionally dubbed into French. Same emotion, same energy, different language. One content piece, 29 markets.",
      voice: "Dennis — Clone (French)",
      duration: "2:10",
      audioFile: "/audio/dentrix-clone-french-dub.mp3",
      tags: ["Dubbing", "French", "Localization"],
      badge: "29+ Languages Available",
    },
    {
      id: "hindi-dub",
      title: "Hindi Dub — Scale Into New Markets",
      description: "Hindi localization of the Dentrix showcase. Reach 600M+ Hindi speakers with your existing content. No studio. No actors. No weeks of work.",
      voice: "Dennis — Clone (Hindi)",
      duration: "2:10",
      audioFile: "/audio/dentrix-clone-hindi-dub.mp3",
      tags: ["Dubbing", "Hindi", "Localization"],
      badge: "600M+ Potential Listeners",
    },
  ],
  sectionCta: { label: "Want Your Brand to Sound Like This?", href: "#contact" },
};

export const processContent = {
  sectionTitle: "How We Work",
  sectionSubtitle: "From brief to broadcast in 4 steps. Most clients receive their first deliverable within hours of reaching out.",
  steps: [
    {
      phase: 1,
      number: "01",
      title: "Brief & Strategy",
      description: "You tell us what you need — YouTube intro, brand voice, multilingual dub, or custom agent. We analyze your audience, tone requirements, and delivery timeline. 2 minutes of your time, maximum.",
      deliverables: ["Client intake form", "Audience & tone analysis", "Voice selection recommendation"],
    },
    {
      phase: 2,
      number: "02",
      title: "Production",
      description: "We generate your audio using premium AI voices, SSML-enhanced pacing, and professional parameter tuning. If it's a clone, we set up your voice profile. If it's a dub, we process all languages simultaneously.",
      deliverables: ["Voice generation with optimized parameters", "SSML pacing & emphasis", "Multi-version options (3 voice choices)"],
    },
    {
      phase: 3,
      number: "03",
      title: "Quality Control",
      description: "Every deliverable passes through our QC checklist: pronunciation accuracy, pacing consistency, emotional tone match, technical clarity, and format compliance. If it doesn't sound premium, it doesn't ship.",
      deliverables: ["Pronunciation verification", "Timing & pace audit", "Emotional tone validation"],
    },
    {
      phase: 4,
      number: "04",
      title: "Delivery & Support",
      description: "Your audio files delivered in production-ready MP3/WAV format. One revision included free. If you need changes, we turn them around in under 1 hour. Your satisfaction is not negotiable.",
      deliverables: ["Production-ready files (MP3/WAV)", "1 free revision", "< 1 hour revision turnaround"],
    },
  ],
};

export const whyUsContent = {
  sectionTitle: "Why Dentrix Apps",
  sectionSubtitle: "Not all AI voice services are created equal. Here's what separates studio-grade from software-default.",
  pillars: [
    {
      title: "Engineered, Not Generated",
      description: "We don't press 'generate' and hope for the best. Every voiceover is tuned with specific stability, similarity, and prosody parameters. SSML tags add dramatic pauses, emphasis on key phrases, and natural pacing variations. The result? Audio that sounds produced, not processed.",
      icon: "Settings",
    },
    {
      title: "Speed Without Sacrifice",
                description: "Most voiceover agencies take 2-5 business days. We deliver in under 30 minutes for standard projects, same-day for complex ones. How? Optimized workflows, pre-built templates, and parameter presets honed across 50+ deliveries. Speed is our moat.",      icon: "Zap",
    },
    {
      title: "Your Voice, Global Scale",
      description: "Clone your voice once, generate content in 29+ languages. Your Hindi audience hears YOU, not a stranger. Your French market gets YOUR brand voice, not a generic translation. Identity scales without dilution.",
      icon: "Globe",
    },
    {
      title: "Outcome-First Pricing",
      description: "No hourly rates. No scope creep surprises. You pay for the outcome: a professional voiceover, a cloned voice, a dubbed video. If the deliverable doesn't meet the brief, we redo it. Simple as that.",
      icon: "ShieldCheck",
    },
  ],
};

export const pricingContent = {
  sectionTitle: "Simple, Transparent Pricing",
  sectionSubtitle: "No hidden fees. No hourly rates. Pick your outcome, get your audio.",
  tiers: [
    {
      id: "starter",
      name: "First Voice",
      price: "$25",
      period: "one-time",
      description: "Perfect for first-time clients. Get a professional voiceover and see the quality for yourself.",
      features: [
        "1 voiceover up to 60 seconds",
        "1 voice option",
        "Standard MP3 delivery",
        "1 revision included",
        "Delivery within 24 hours",
      ],
      cta: "Get Started",
      popular: false,
      badge: null,
    },
    {
      id: "professional",
      name: "Brand Voice",
      price: "$75",
      period: "one-time",
      description: "The most popular choice. Get multiple voice options with professional pacing and script enhancement included.",
      features: [
        "3 voiceover variations to choose from",
        "SSML-enhanced pacing & emphasis",
        "Script improvement & copywriting",
        "WAV + MP3 delivery",
        "Priority delivery within 12 hours",
        "2 revisions included",
      ],
      cta: "Most Popular — Choose This",
      popular: true,
      badge: "MOST POPULAR",
    },
    {
      id: "premium",
      name: "Voice Empire",
      price: "$200",
      period: "one-time",
      description: "The full package. Clone your voice, generate unlimited content, and expand into new languages.",
      features: [
        "Professional voice clone setup",
        "10 content generations included",
        "SSML-enhanced delivery",
        "Dubbing into 2 languages included",
        "WAV + MP3 delivery",
        "Unlimited revisions",
        "Dedicated support channel",
      ],
      cta: "Go Premium",
      popular: false,
      badge: "BEST VALUE",
    },
  ],
  customNote: "Need something custom? Voice agents, bulk orders, or enterprise packages — let's talk.",
  customCta: "Contact Us for Custom Pricing",
};

export const testimonialsContent = [
  {
    name: "Content Creator",
    role: "YouTube — Tech Niche",
    location: "United States",
    quote: "I sent a rough script and got back 3 voice options in under an hour. The SSML pacing made my intro sound like it was produced by a professional studio. My channel went from amateur to premium overnight.",
    metric: "Channel intro plays increased 40%",
  },
  {
    name: "Marketing Director",
    role: "SaaS Company",
    location: "United Kingdom",
    quote: "We needed our product demo voiced in 5 languages for a global campaign. Dentrix cloned our brand voice and delivered all 5 dubs in 3 days. Our agency quoted 3 weeks. The quality? Indistinguishable from native speakers.",
    metric: "Campaign reached 5 new markets",
  },
  {
    name: "Podcast Host",
    role: "Business & Finance",
    location: "Kenya",
    quote: "I was paying $200 per ad read to a professional voice actor. Now I get the same quality — sometimes better — for a fraction of the price. And I don't have to book studio time 2 weeks in advance.",
    metric: "Ad production cost reduced by 80%",
  },
];

export const faqContent = [
  {
    question: "Does the AI voice sound robotic or fake?",
    answer: "No — and that's exactly why we exist. Default AI voices sound robotic. Ours don't. We tune stability, similarity, and prosody parameters for every project, add SSML pacing for natural pauses and emphasis, and hand-pick voices that match your brand. The result sounds produced, not processed. Listen to our demos above — that's the quality standard.",
  },
  {
    question: "How fast can you deliver?",
              answer: "Standard voiceovers: under 30 minutes. Complex projects (cloning, dubbing): same day. Rush delivery available for time-sensitive projects. We've turned around full YouTube intro packages in under 30 minutes from brief to final file.",
  },
  {
    question: "What is voice cloning and is it ethical?",
    answer: "Voice cloning creates a digital replica of a voice from an audio sample. We ONLY clone voices with the owner's explicit written consent. No celebrity voices without verified rights. No impersonation. Every clone requires a signed usage agreement. We take ethics seriously because our business depends on trust.",
  },
  {
    question: "Can you dub my existing videos?",
    answer: "Yes. We support 29+ languages for dubbing. Send us your video or audio file, tell us the target languages, and we'll handle the transcription, translation, voice generation, and timing sync. French and Hindi are our strongest non-English languages. Typical turnaround: 24-48 hours per language.",
  },
  {
    question: "What's SSML and why does it matter?",
    answer: "SSML (Speech Synthesis Markup Language) is like stage directions for AI voices. It tells the voice WHERE to pause, WHAT to emphasize, and HOW FAST to speak specific phrases. Without SSML, you get flat, robotic delivery. With SSML, you get professional-grade pacing with dramatic pauses, key-word emphasis, and natural rhythm. It's the difference between reading text and performing a script.",
  },
  {
    question: "What if I'm not happy with the result?",
    answer: "Every package includes at least 1 free revision. If the deliverable doesn't match your brief, we redo it — no questions asked. In 50+ deliveries, we've never had a client leave unsatisfied. If the voice isn't right, we'll try different voices, adjust parameters, or start from scratch until it's perfect.",
  },
  {
    question: "How is this different from me just using ElevenLabs myself?",
    answer: "You absolutely can use ElevenLabs yourself — it's a great tool. But here's what you're paying for: voice selection expertise (we've tested 100+ voices), parameter optimization (we know which S/SB/SP settings work for each use case), SSML scripting (turns flat audio into professional pacing), script enhancement (we rewrite weak scripts into converting copy), and speed (our workflow is battle-tested). You're not paying for the tool — you're paying for the engineer who knows how to make the tool sing.",
  },
];

export const contactContent = {
  heading: "Ready to Sound Professional?",
  subheading: "Tell us what you need. We'll respond within 1 hour during business hours.",
  serviceTypes: [
    { value: "voiceover", label: "AI Voiceover for my content" },
    { value: "cloning", label: "Voice Cloning for my brand" },
    { value: "dubbing", label: "Dubbing / Localization into another language" },
    { value: "agent", label: "Voice Agent for my business" },
    { value: "software", label: "Custom Software Engineering" },
    { value: "other", label: "Something else" },
  ],
  budgetRanges: [
    { value: "25-50", label: "$25 — $50 (Quick voiceover)" },
    { value: "50-100", label: "$50 — $100 (Voice cloning / multi-option)" },
    { value: "100-200", label: "$100 — $200 (Full package)" },
    { value: "200-500", label: "$200 — $500 (Voice agent / enterprise)" },
    { value: "500+", label: "$500+ (Custom project)" },
  ],
  trustSignals: [
    "50+ voiceovers delivered",
    "100% satisfaction rate",
    "Same-day delivery available",
    "1 free revision on every order",
  ],
  contactMethods: [
    { type: "email", label: "hello@dentrixapps.com", icon: "Mail" },
    { type: "whatsapp", label: "+254 111 480 091", icon: "messageCircle" },
    { type: "calendly", label: "Book a Call", icon: "Calendar" },
  ],
};

/* Legacy export kept for backward compatibility during transition */
export const projectsContent = [];
