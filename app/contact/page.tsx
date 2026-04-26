'use client';

import React, { useState } from 'react';
import { Send, Clock, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thank you! We'll respond within 12 hours.");
  };

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-2">Contact Us</h1>
          <p className="text-zinc-400">Tell us about your project and timeline.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-[#18181B] border border-white/[0.08] rounded-lg" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-[#18181B] border border-white/[0.08] rounded-lg" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Company</label>
              <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 bg-[#18181B] border border-white/[0.08] rounded-lg" placeholder="Your company" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Project Details</label>
              <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 bg-[#18181B] border border-white/[0.08] rounded-lg" placeholder="Tell us about your project..." />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
          <aside className="space-y-6">
            <div className="p-6 bg-[#111113] rounded-xl border border-white/[0.06]">
              <h3 className="mb-2 font-semibold">Response Time</h3>
              <div className="flex items-start gap-3 text-zinc-400">
                <Clock className="w-5 h-5 text-blue-500" />
                <p>We respond within 12 hours during business days.</p>
              </div>
            </div>
            <div className="p-6 bg-[#111113] rounded-xl border border-white/[0.06]">
              <h3 className="mb-2 font-semibold">Location</h3>
              <div className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-blue-500" />
                <p>Nairobi, Kenya — Serving globally</p>
              </div>
            </div>
            <div className="p-6 bg-[#111113] rounded-xl border border-white/[0.06]">
              <h3 className="mb-2 font-semibold">Email</h3>
              <p className="text-zinc-400">hello@dentrixapps.com</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
