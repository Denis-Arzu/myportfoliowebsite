"use client";

import React from 'react';

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">Our Methodology</h1>
        <p className="text-lg text-zinc-400 mb-8">How we engineer high-performance systems from concept to production.</p>
        <div className="space-y-6">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-semibold mb-2">Discovery & Architecture</h2>
            <p className="text-zinc-400">We begin with deep technical discovery to understand latency, throughput, and compliance before writing code.</p>
          </section>
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-semibold mb-2">Development & Testing</h2>
            <p className="text-zinc-400">Iterative development with CI, load testing, and failover validation across regions.</p>
          </section>
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-semibold mb-2">Deployment & Monitoring</h2>
            <p className="text-zinc-400">Zero-downtime deployments with real-time dashboards and alerting.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
