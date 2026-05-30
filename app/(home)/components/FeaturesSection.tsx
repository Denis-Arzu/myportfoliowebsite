"use client";

import { motion } from "motion/react";
import { MessageCircle, UserPlus, Calendar, Palette, Brain, Code } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Answers Questions 24/7",
    description: "Your assistant never sleeps. Visitors get instant, accurate answers about your services, pricing, hours, and policies - even at 2 AM when your front desk is closed.",
  },
  {
    icon: UserPlus,
    title: "Captures Leads Automatically",
    description: "When a visitor shares their email or phone, we capture it and email it to you instantly. Hit Reply in your inbox to respond directly to the lead. No dashboard required.",
  },
  {
    icon: Calendar,
    title: "Drives Bookings",
    description: "Your assistant doesn't just answer questions - it actively encourages visitors to book appointments, schedule tours, or come in for consultations. Every conversation is a conversion opportunity.",
  },
  {
    icon: Palette,
    title: "Branded to Your Business",
    description: "Your assistant matches your brand - your colors, your logo, your voice. A salon assistant sounds warm and luxurious. A gym assistant sounds energetic and motivating. A dental assistant sounds professional and reassuring.",
  },
  {
    icon: Brain,
    title: "Knows Your Business",
    description: "We train the AI on your actual website data - your services, pricing, team, hours, location, and FAQs. It doesn't guess. It knows. And it never makes up information.",
  },
  {
    icon: Code,
    title: "One Line of Code",
    description: "Adding the assistant to your website takes 2 minutes. We give you a single line of HTML. Paste it. Done. Works on WordPress, Shopify, Wix, Squarespace, and any website platform.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const featureEasing = [0.22, 1, 0.36, 1] as const;

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: featureEasing } },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            What Your AI Assistant Does
          </h2>
          <p className="mt-4 text-base text-white/40 max-w-lg mx-auto">
            Six capabilities that turn website visitors into paying customers.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={featureVariants}
                className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
