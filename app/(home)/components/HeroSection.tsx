"use client";

import Link from 'next/link'
import { ArrowRight, Clock, Calendar, Globe } from 'lucide-react'
import { LightRays } from '@react-bits/LightRays-JS-CSS'
import ScrollProgress from './ScrollProgress'

// COMPLETE REWRITE - Clean, working, premium
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0A0A0B] overflow-hidden">
      <ScrollProgress />
      {/* Light beams background (premium) */}
      <div style={{ position: 'absolute', width: '1080px', height: '1080px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#06B6D4"
          raysSpeed={0.4}
          lightSpread={2.5}
          rayLength={2.8}
          pulsating={false}
          fadeDistance={2.4}
          saturation={1}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
        />
      </div>
      {/* Premium background */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(59,130,246,.25), transparent 40%),' +
                      'radial-gradient(circle at 70% 0, rgba(99,102,241,.25), transparent 40%),' +
                      'radial-gradient(circle at 50% 60%, rgba(56,189,248,.15), transparent 60%)',
          zIndex: -1
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 7vw, 90px)', lineHeight: 1.04, fontWeight: 700, margin: 0 }}>
          <span style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Custom software for trading, automation, and AI
          </span>
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.125rem', marginTop: 20, maxWidth: 640 }}>
          High-performance engines, scalable data pipelines, and AI automation that grow with your business.
        </p>
        <div style={{ marginTop: 28 }}>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, background: '#3B82F6', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
            Discuss Your Project
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
