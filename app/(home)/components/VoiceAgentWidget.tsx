"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, X, Phone, Send, Maximize2, Minimize2 } from "lucide-react";
import { useConversation } from "@elevenlabs/react";
import { getConversationToken } from "@/app/actions/voice-agent";

export const VoiceAgentWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [outputFrequency, setOutputFrequency] = useState<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
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
      setError(err instanceof Error ? err.message : "Connection failed");
    },
  });

  const { 
    status, 
    isSpeaking, 
    startSession, 
    endSession, 
    sendUserMessage, 
    sendUserActivity,
    getOutputByteFrequencyData 
  } = conversation;

  // Animation loop for the frequency data
  useEffect(() => {
    if (status !== "connected") return;
    let rafId: number;
    const updateFrequency = () => {
      const data = getOutputByteFrequencyData();
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      setOutputFrequency(avg);
      rafId = requestAnimationFrame(updateFrequency);
    };
    rafId = requestAnimationFrame(updateFrequency);
    return () => cancelAnimationFrame(rafId);
  }, [status, getOutputByteFrequencyData]);

  const handleToggleVoice = useCallback(async () => {
    setError(null);
    if (status === "connected") {
      await endSession();
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // 1. Get Secure Conversation Token from our Backend Bridge
        const conversationToken = await getConversationToken();

        // 2. Start Session securely via WebRTC
        if (conversationToken) {
          await startSession({ 
            conversationToken,
            connectionType: "webrtc" 
          });
        } else {
          // If no token was returned, it means the API key is likely missing in .env.local
          setError("API Key missing. Please set ELEVENLABS_API_KEY in .env.local and restart.");
          console.error("Failed to fetch conversation token. Ensure ELEVENLABS_API_KEY is set in .env.local");
        }
        setIsExpanded(true); 
      } catch (err) {
        setError("Microphone required for voice studio.");
      }
    }
  }, [status, startSession, endSession]);

  const handleSendMessage = () => {
    if (!textInput.trim()) return;
    sendUserMessage(textInput);
    setTextInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* COMPACT STATE (Screenshot 1) */
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-auto bg-black p-3 rounded-[24px] border border-white/10 shadow-2xl flex items-center gap-4 min-w-[280px]"
          >
            {/* Metallic Icon */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-neutral-900">
              <div className="absolute inset-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#000,#fff,#000,#fff,#000)] opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
            </div>

            <div className="flex-1">
              <p className="text-white text-sm font-medium">Need help?</p>
              <button 
                onClick={() => handleToggleVoice()}
                className="mt-2 w-full bg-[#E5E5E5] hover:bg-white text-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all group"
              >
                <Phone size={16} className="fill-black" />
                <span className="text-xs font-bold tracking-tight">Ask anything</span>
              </button>
            </div>

            <button 
              onClick={() => setIsExpanded(true)}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <Maximize2 size={16} />
            </button>
          </motion.div>
        ) : (
          /* EXPANDED STATE (Screenshot 2) */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 40, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="pointer-events-auto w-[90vw] sm:w-[380px] bg-black rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Close/Collapse */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Large Metallic Icon Body */}
            <div className="p-12 flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-white/[0.03] to-transparent">
              <div className="relative">
                {/* Glow during speech */}
                <motion.div 
                  className="absolute inset-[-20px] bg-white/5 blur-3xl rounded-full"
                  animate={{ opacity: isSpeaking ? [0.2, 0.5, 0.2] : 0 }}
                />
                
                {/* The big circular metallic icon */}
                <div className="relative w-48 h-48 rounded-full overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl">
                  <motion.div 
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,#111,#eee,#111,#eee,#111)] opacity-30 mix-blend-overlay"
                    animate={{ rotate: status === "connected" ? 360 : 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
                  
                  {/* Phone Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      onClick={handleToggleVoice}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-5 rounded-[20px] shadow-xl transition-all ${
                        status === "connected" ? "bg-red-500 text-white" : "bg-white text-black"
                      }`}
                    >
                      {status === "connected" ? <X size={24} /> : <Phone size={24} fill="currentColor" />}
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]">
                  {status === "connected" ? "Live Voice Session" : "Dentrix AI Studio"}
                </p>
                {error && <p className="text-red-500 text-[10px] mt-2 font-mono uppercase">{error}</p>}
              </div>
            </div>

            {/* Text Chat Area */}
            <div className="p-6 pt-0">
              <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-4 focus-within:border-white/20 transition-all">
                <textarea
                  ref={inputRef}
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                    sendUserActivity();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Or send a message"
                  className="w-full bg-transparent text-white text-sm resize-none outline-none min-h-[60px] placeholder:text-white/20"
                />
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={handleSendMessage}
                    disabled={!textInput.trim()}
                    className="p-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl transition-all disabled:opacity-20"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/[0.02] text-center border-t border-white/5">
              <p className="text-[9px] text-white/10 uppercase tracking-widest font-mono">
                Conversational AI · ElevenLabs Powered
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
