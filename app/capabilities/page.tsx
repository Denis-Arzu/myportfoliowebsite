'use client';

import React from 'react';

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">Capabilities</h1>
        <p className="text-zinc-400">We offer a range of capabilities: algorithmic trading engines, data pipelines, AI automation, and scalable Next.js apps.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 bg-[#111113] rounded-xl border border-white/[0.06]">Capability #{i + 1}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
