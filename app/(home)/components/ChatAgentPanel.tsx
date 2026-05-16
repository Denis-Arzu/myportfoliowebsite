"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot } from "lucide-react";
import { sendChatMessage, type ChatMessage } from "@/app/actions/chat-agent";
import { CHAT_GREETING } from "@/lib/dentrix-knowledge";

const OPEN_EVENT = "open-chat-agent";

export function ChatAgentPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: CHAT_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setTimeout(() => inputRef.current?.focus(), 200);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages, scrollToBottom]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || pending) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setPending(true);
    scrollToBottom();

    try {
      const res = await sendChatMessage(text, nextHistory as any);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply, meta: { confidence: res.confidence, sources: res.sources } },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong. Please try again or use Talk to us on the Contact page.",
        },
      ]);
    } finally {
      setPending(false);
      scrollToBottom();
    }
  };

  const renderMessageContent = (content: string) =>
    content.split(/\n{2,}/).map((paragraph, idx) => (
      <p key={idx} className="mb-3 last:mb-0 whitespace-pre-wrap">
        {paragraph}
      </p>
    ));

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            role="dialog"
            aria-label="Dentrix Apps AI assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[500] w-[min(100vw-2rem,400px)] h-[min(85dvh,560px)] flex flex-col rounded-2xl border border-white/10 bg-[oklch(0.06_0.01_285)] shadow-2xl overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <motion.div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[oklch(0.75_0.15_145)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white tracking-tight">
                    Dentrix Assistant
                  </p>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest font-mono">
                    Real estate · AI chatbots
                  </p>
                </div>
              </motion.div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] min-w-[120px] rounded-[32px] px-5 py-4 text-sm leading-relaxed shadow-[0_0_0_1px_rgba(255,255,255,0.06)] ${
                      msg.role === "user"
                        ? "bg-white text-black"
                        : "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_45%),linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(15,23,42,0.72))] text-white border border-white/10"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-white/50">
                          <span className="inline-flex h-7 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
                            AI Assistant
                          </span>
                          <span className="text-white/30">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="space-y-4 text-sm text-white/85">
                          {renderMessageContent(msg.content)}
                        </div>
                        {msg.meta?.confidence && (
                          <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60">
                              <span className="rounded-full bg-white/10 px-2.5 py-1">Confidence: {String(msg.meta.confidence).toUpperCase()}</span>
                              {msg.meta?.sources && msg.meta.sources.length > 0 && (
                                <span className="text-white/40">Sources available</span>
                              )}
                            </div>
                            {msg.meta?.sources && msg.meta.sources.length > 0 && (
                              <div className="mt-3 space-y-3">
                                {msg.meta.sources.map((s: any, idx: number) => {
                                  const key = `${i}-${idx}`;
                                  return (
                                    <div key={idx} className="rounded-3xl border border-white/10 bg-slate-950/40 p-3">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
                                        }
                                        className="flex w-full items-center justify-between gap-3 text-left text-[12px] font-medium text-white/80 transition hover:text-white"
                                      >
                                        <span>{s.source ?? s.title ?? `Source ${idx + 1}`}</span>
                                        <span className="text-white/40">{expanded[key] ? "Hide" : "Show"}</span>
                                      </button>
                                      {expanded[key] && (
                                        <div className="mt-3 rounded-3xl border border-white/10 bg-white/5 p-3 text-[13px] leading-6 text-white/70">
                                          {s.snippet ?? "No evidence snippet available."}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                  </div>
                </motion.div>
              ))}
              {pending && (
                <div className="flex justify-start">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="rounded-2xl px-4 py-2.5 text-sm text-white/40 bg-white/[0.04] border border-white/8"
                  >
                    Thinking…
                  </motion.div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/8 bg-black/30">
              <div className="flex gap-2 items-end rounded-xl border border-white/10 bg-white/[0.03] p-2 focus-within:border-white/20 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder="Ask about Dentrix Apps…"
                  className="flex-1 bg-transparent text-sm text-white resize-none outline-none min-h-[40px] max-h-28 py-2 px-2 placeholder:text-white/25"
                  disabled={pending}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || pending}
                  className="p-2.5 rounded-lg bg-white text-black disabled:opacity-25 hover:bg-white/90 transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export function openChatAgent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}
