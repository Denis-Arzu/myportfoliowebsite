"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, X, Activity, MessageCircle } from "lucide-react";

// Use dynamic import for the SDK to avoid SSR issues if used directly
// However, since this component itself is dynamically imported in page.tsx,
// we can use standard imports here if the package supports it.
import { useConversation } from "@elevenlabs/react";

export const VoiceAgentWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [outputFrequency, setOutputFrequency] = useState<number>(0);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      setError(null);
    },
    onDisconnect: () => {
      console.log("Disconnected");
      setOutputFrequency(0);
    },
    onError: (err: any) => {
      console.error("Conversation Error:", err);
      // Specifically handle negotiation timeout
      if (err instanceof Error && err.message.includes("negotiation")) {
        setError("Connection timeout. Please refresh or try again.");
      } else {
        setError(err instanceof Error ? err.message : String(err));
      }
    },
  });

  const { status, isSpeaking, startSession, endSession, getOutputByteFrequencyData } = conversation;

  // Real-time animation loop for the waveform
  useEffect(() => {
    if (status !== "connected") return;

    let rafId: number;
    const updateFrequency = () => {
      const data = getOutputByteFrequencyData();
      // Calculate average frequency for simple visualization
      const sum = data.reduce((a, b) => a + b, 0);
      const avg = sum / data.length;
      setOutputFrequency(avg);
      rafId = requestAnimationFrame(updateFrequency);
    };

    rafId = requestAnimationFrame(updateFrequency);
    return () => cancelAnimationFrame(rafId);
  }, [status, getOutputByteFrequencyData]);

  const handleToggleSession = useCallback(async () => {
    setError(null);
    if (status === "connected") {
      await endSession();
    } else {
      try {
        // Precise microphone request
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
            sampleRate: 44100,
          }
        });
        
        stream.getTracks().forEach(track => track.stop());
        
        await startSession({
          agentId: "agent_4001kqw0pj09f788pg9n9xcmtmwt",
        });
      } catch (err) {
        console.error("Failed to start session:", err);
        if (err instanceof Error) {
          if (err.name === "NotAllowedError") setError("Microphone access denied.");
          else if (err.message.includes("negotiation")) setError("Negotiation failed. Try a stable network.");
          else setError(err.message);
        } else {
          setError("Connection failed.");
        }
      }
    }
  }, [status, startSession, endSession]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Listen for custom event to open the widget
  useEffect(() => {
    const handleOpenWidget = () => setIsOpen(true);
    window.addEventListener("open-voice-agent", handleOpenWidget);
    return () => window.removeEventListener("open-voice-agent", handleOpenWidget);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[300] pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[380px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${status === "connected" ? "bg-brand-green animate-pulse" : (status === "connecting" ? "bg-yellow-500" : "bg-white/20")}`} />
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                  {status === "connected" ? "System Live" : (status === "connecting" ? "Establishing..." : "AI Voice Studio")}
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/40 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col items-center justify-center gap-8 min-h-[320px]">
              {/* Central Animation */}
              <div className="relative">
                <div className={`absolute inset-0 bg-brand-green/20 blur-3xl rounded-full transition-opacity duration-500 ${status === "connected" ? "opacity-100" : "opacity-0"}`} />
                
                <motion.div 
                  className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${status === "connected" ? "border-brand-green bg-brand-green/10" : "border-white/10 bg-white/5"}`}
                  animate={status === "connected" ? { scale: [1, 1.02 + (outputFrequency / 200), 1] } : {}}
                >
                  {status === "connected" ? (
                    <div className="flex items-center gap-1.5 h-10">
                      {[0, 1, 2, 3, 4].map((i) => {
                        const freqValue = outputFrequency * (1 - Math.abs(i - 2) * 0.2);
                        return (
                          <motion.div
                            key={i}
                            className="w-1 bg-brand-green rounded-full shadow-[0_0_10px_oklch(0.55_0.18_145/0.5)]"
                            animate={{ 
                              height: isSpeaking ? [12, Math.max(12, freqValue * 0.8), 12] : [8, 12, 8],
                              opacity: isSpeaking ? [0.6, 1, 0.6] : 0.4
                            }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <Mic size={40} className="text-white/20" />
                  )}
                </motion.div>
              </div>

              {/* Status & Action */}
              <div className="text-center space-y-5 w-full">
                <div className="space-y-1.5">
                  <h4 className="text-lg font-semibold text-white tracking-tight">
                    {status === "connected" ? "Studio Connection Established" : "Interactive Voice Demo"}
                  </h4>
                  <p className="text-xs text-white/40 px-4 leading-relaxed font-mono uppercase tracking-tight">
                    {status === "connected" 
                      ? "Conversation active. Zero-latency stream enabled."
                      : "Start a live conversation with our engineered AI agent."}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <p className="text-[10px] text-red-400 font-mono uppercase tracking-tighter text-center">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  <button
                    onClick={handleToggleSession}
                    disabled={status === "connecting"}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      status === "connected" 
                        ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" 
                        : "bg-white text-black hover:bg-gray-200 disabled:opacity-50"
                    }`}
                  >
                    {status === "connecting" ? (
                      <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Negotiating...</span>
                    ) : status === "connected" ? (
                      <><X size={18} /> End Connection</>
                    ) : (
                      <><MessageCircle size={18} /> Connect to Agent</>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-white/[0.02] text-center border-t border-white/5">
              <p className="text-[9px] text-white/20 uppercase tracking-widest font-mono">
                SECURE WEBRTC TUNNEL · ELEVENLABS AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open voice agent"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.55_0.18_145)] to-[oklch(0.52_0.24_264)] opacity-90" />
        <div className="absolute inset-0 bg-[oklch(0.55_0.18_145)]/30 blur-xl group-hover:opacity-100 opacity-60 transition-opacity" />
        <motion.div 
          className="absolute inset-0 border-2 border-white/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 text-white">
          {isOpen ? <X size={24} /> : (status === "connected" ? <Activity size={24} className="animate-pulse" /> : <Mic size={24} />)}
        </div>
      </motion.button>
    </div>
  );
};
