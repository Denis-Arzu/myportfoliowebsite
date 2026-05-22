"use client";

/**
 * SpaceChatOverlay — immersive full-screen chat.
 *
 * Desktop:  hidden 1px input captures keystrokes. Text mirrors at centre.
 *           Escape closes. Hint bar at bottom.
 *
 * Mobile:   visible input bar above keyboard (uses visualViewport to track
 *           available height). Send button in bar. Close button top-right.
 *           Stage repositions itself above the keyboard rather than hiding
 *           behind it.
 *
 * Phase machine:
 *   greeting → typing → waiting → answer → done
 *
 * Answer stays on screen in "done" until the user begins their NEXT message —
 * only then does it archive to the history ghost strip at the top.
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, ArrowUp } from "lucide-react";
import { sendChatMessage, type ChatMessage } from "@/app/actions/chat-agent";

// ─── Types ────────────────────────────────────────────────────────────────

type Phase =
  | "greeting" // greeting visible, hidden input ready
  | "typing" // user composing
  | "waiting" // request in flight
  | "answer" // typewriting response
  | "done"; // answer fully shown, waiting for next input

interface Exchange {
  question: string;
  answer: string;
}

// ─── Typewriter ───────────────────────────────────────────────────────────

function useTypewriter(text: string, active: boolean, speedMs = 16) {
  const [displayed, setDisplayed] = useState("");
  const [finished, setFinished] = useState(false);
  // Persist the last fully-typed string so callers can read it
  // even after `active` flips to false (which would otherwise reset displayed).
  const completedRef = useRef("");

  useEffect(() => {
    if (!active || !text) {
      // Do NOT wipe displayed here — callers in "done" phase still need it.
      // Only reset finished so a new run starts clean.
      setFinished(false);
      return;
    }
    // New text arriving: reset and start typing
    completedRef.current = "";
    setDisplayed("");
    setFinished(false);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (i >= text.length) {
        completedRef.current = text;
        setFinished(true);
        return;
      }
      i++;
      setDisplayed(text.slice(0, i));
      const jitter = speedMs * (0.7 + Math.random() * 0.6);
      timer = setTimeout(tick, Math.max(6, jitter));
    }

    timer = setTimeout(tick, 110);
    return () => clearTimeout(timer);
  }, [text, active, speedMs]);

  return { displayed, finished, completed: completedRef.current };
}

// ─── Visual viewport hook (keyboard-aware height on mobile) ───────────────

function useVisualViewport() {
  const [vpHeight, setVpHeight] = useState<number | null>(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => setVpHeight(vv.height);
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  return vpHeight;
}

// ─── Touch / mobile detection ─────────────────────────────────────────────

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

// ─── Breathing cursor ─────────────────────────────────────────────────────

function Cursor({ dim = false, reduced = false }: { dim?: boolean; reduced?: boolean }) {
  return (
    <motion.span
      animate={reduced ? {} : { opacity: [1, 0, 1] }}
      transition={reduced ? {} : { duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
      className={`inline-block w-[2px] h-[1em] ml-[3px] align-middle rounded-full ${
        dim ? "bg-white/18" : "bg-white/55"
      }`}
    />
  );
}

// ─── History ghost strip ──────────────────────────────────────────────────

function HistoryStrip({ exchange }: { exchange: Exchange | null }) {
  return (
    <AnimatePresence>
      {exchange && (
        <motion.div
          key={`${exchange.question}-${exchange.answer.slice(0, 20)}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 flex flex-col items-center pt-6 sm:pt-8 px-6 pointer-events-none select-none"
        >
          <p className="text-[11px] sm:text-xs text-white/14 font-mono tracking-wide text-center max-w-lg truncate leading-relaxed">
            {exchange.question}
          </p>
          <p className="text-[11px] sm:text-xs text-white/9 font-sans text-center max-w-lg mt-1 line-clamp-2 leading-relaxed">
            {exchange.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────

const GREETING = "Hi, this is Dentrix Apps AI Assistant.\nHow can I help you?";

interface Props {
  onClose: () => void;
}

export function SpaceChatOverlay({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("greeting");
  const [input, setInput] = useState("");
  const [pendingAnswer, setPendingAnswer] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);

  // The exchange that gets ghosted to the history strip.
  // Only set when the user begins typing after "done" — not when typewriter ends.
  const [ghostExchange, setGhostExchange] = useState<Exchange | null>(null);
  // Holds the last finished exchange so we can promote it to ghost when needed
  const lastExchangeRef = useRef<Exchange | null>(null);

  const isMobile = useIsMobile();
  const vpHeight = useVisualViewport();
  const prefersReducedMotion = useReducedMotion();
  const animEnabled = !prefersReducedMotion;

  const hiddenInputRef = useRef<HTMLInputElement>(null); // desktop
  const mobileInputRef = useRef<HTMLInputElement>(null); // mobile bar

  const {
    displayed: typedAnswer,
    finished: answerDone,
    completed: completedAnswer,
  } = useTypewriter(pendingAnswer, phase === "answer", 15);

  // Typewriter done → move to done phase (answer stays on screen)
  useEffect(() => {
    if (answerDone && phase === "answer") {
      const id = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(id);
    }
  }, [answerDone, phase]);

  // Focus the right input whenever phase changes
  const refocus = useCallback(() => {
    setTimeout(() => {
      if (isMobile) {
        mobileInputRef.current?.focus();
      } else {
        hiddenInputRef.current?.focus();
      }
    }, 60);
  }, [isMobile]);

  useEffect(() => {
    refocus();
  }, [phase, isMobile, refocus]);

  // Escape to close (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ── Input change — shared by both hidden and mobile inputs ───────────────

  const handleInputChange = useCallback(
    (val: string) => {
      setInput(val);

      if (phase === "greeting" && val.length > 0) {
        setPhase("typing");
      }
      if (phase === "typing" && val.length === 0) {
        setPhase("greeting");
      }
      if (phase === "done" && val.length > 0) {
        // Archive the last answer to the ghost strip NOW — when user starts typing
        if (lastExchangeRef.current) {
          setGhostExchange(lastExchangeRef.current);
        }
        setPhase("typing");
      }
    },
    [phase],
  );

  // ── Send ─────────────────────────────────────────────────────────────────

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || phase === "waiting" || phase === "answer") return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const nextHistory = [...history, userMsg];

    setInput("");
    setPhase("waiting");

    try {
      const res = await sendChatMessage(text, nextHistory);
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: res.reply,
        meta: { confidence: res.confidence, sources: res.sources },
      };
      const newHistory = [...nextHistory, assistantMsg];
      setHistory(newHistory);
      lastExchangeRef.current = { question: text, answer: res.reply };
      setPendingAnswer(res.reply);
      setPhase("answer");
    } catch {
      const errMsg =
        "Something went wrong. Please try again or visit the Contact page.";
      lastExchangeRef.current = { question: text, answer: errMsg };
      setPendingAnswer(errMsg);
      setPhase("answer");
    }
  }, [input, phase, history]);

  // ── Keyboard handlers ────────────────────────────────────────────────────

  const onHiddenKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const onMobileKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // ── Hint copy ─────────────────────────────────────────────────────────────

  const hint = useMemo(() => {
    if (phase === "greeting") return "Start typing…";
    if (phase === "typing") return "Enter to send";
    if (phase === "waiting") return null;
    if (phase === "answer") return null;
    if (phase === "done") return "Ask anything else…";
    return null;
  }, [phase]);

  // ── Layout: on mobile, push stage up above the keyboard ──────────────────
  // visualViewport.height shrinks when keyboard opens. We use that as the
  // container height so the stage + input bar fit within the visible area.
  const containerStyle = useMemo(() => {
    if (!isMobile || !vpHeight) return {};
    return { height: `${vpHeight}px` };
  }, [isMobile, vpHeight]);

  // ── Whether stage content is interactive (accept clicks to focus) ─────────
  const stageClickable = phase === "done" || phase === "greeting";

  return (
    <div
      className="fixed inset-0 z-[600] flex flex-col overflow-hidden"
      style={{ background: "#050506", ...containerStyle }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, oklch(0.55 0.18 145 / 0.055) 0%, transparent 70%)",
        }}
      />

      {/* ── Top bar: always-visible close + session indicator ── */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6 flex-shrink-0">
        {/* Session ghost label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-[10px] font-mono text-white/18 uppercase tracking-[0.2em] select-none"
        >
          Dentrix AI
        </motion.span>

        {/* Close button — always present, prominent on mobile */}
        <motion.button
          type="button"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileTap={animEnabled ? { scale: 0.88 } : {}}
          aria-label="Close AI assistant"
          className="
            flex items-center justify-center
            w-9 h-9 sm:w-8 sm:h-8
            rounded-full
            border border-white/10
            bg-white/[0.04]
            text-white/35
            hover:text-white/70
            hover:bg-white/[0.08]
            hover:border-white/20
            active:bg-white/[0.12]
            transition-all duration-200
          "
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* ── History ghost strip ── */}
      <div className="relative flex-shrink-0">
        <HistoryStrip exchange={ghostExchange} />
      </div>

      {/* ── Centre stage — fills all remaining space above mobile input bar ── */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center px-6 sm:px-10 min-h-0"
        onClick={stageClickable ? refocus : undefined}
      >
        <AnimatePresence mode="wait">
          {/* GREETING */}
          {phase === "greeting" && (
            <motion.p
              key="greeting"
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="
                text-[1.45rem] sm:text-3xl md:text-4xl
                font-light text-white/65
                leading-snug tracking-tight
                text-center select-none max-w-xl
                whitespace-pre-line
              "
            >
              {GREETING}
              <Cursor dim reduced={!animEnabled} />
            </motion.p>
          )}

          {/* TYPING — live mirror */}
          {phase === "typing" && (
            <motion.p
              key="typing"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="
                text-[1.45rem] sm:text-3xl md:text-4xl
                font-light text-white
                leading-snug tracking-tight
                text-center break-words max-w-xl
              "
            >
              {input || <span className="opacity-0">|</span>}
              <Cursor reduced={!animEnabled} />
            </motion.p>
          )}

          {/* WAITING — staggered dots */}
          {phase === "waiting" && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-[10px]"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-[5px] h-[5px] rounded-full bg-white/35"
                  animate={animEnabled ? { opacity: [0.15, 1, 0.15], y: [0, -4, 0] } : { opacity: 1 }}
                  transition={animEnabled ? {
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  } : { duration: 0 }}
                />
              ))}
            </motion.div>
          )}

          {/* ANSWER + DONE — answer stays until next typing cycle */}
          {(phase === "answer" || phase === "done") && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="
                text-[1.2rem] sm:text-2xl md:text-3xl
                font-light text-white/80
                leading-relaxed tracking-tight
                text-center max-w-xl
              "
            >
              {/* In "done" phase use completedAnswer so the text never disappears
                  when the typewriter resets its internal displayed state. */}
              {phase === "done" ? completedAnswer : typedAnswer}
              {phase === "answer" && <Cursor reduced={!animEnabled} />}
              {/* Subtle "done" indicator — fades in after answer completes */}
              {phase === "done" && (
                <>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="block mt-6 text-[11px] sm:text-xs font-mono text-white/20 uppercase tracking-[0.22em]"
                  >
                    — Dentrix AI
                  </motion.span>
                  {/* CTA after 3+ user messages — guides toward demo or contact */}
                  {history.filter(m => m.role === "user").length >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                      <a
                        href="https://bot.dentrixapps.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-white text-xs font-semibold rounded-lg hover:brightness-110 transition-all"
                      >
                        See Live Demo
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/12 text-white/70 text-xs font-semibold rounded-lg hover:border-white/30 hover:text-white transition-all"
                      >
                        Talk to Us
                      </a>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DESKTOP: hint line + esc label at very bottom ── */}
      {!isMobile && (
        <div className="flex-shrink-0 flex flex-col items-center gap-2 pb-8 pointer-events-none">
          <AnimatePresence mode="wait">
            {hint && (
              <motion.p
                key={hint}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.28 }}
                className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase"
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>
          <p className="text-[9px] font-mono text-white/10 tracking-[0.18em] uppercase">
            Esc to exit
          </p>
        </div>
      )}

      {/* ── MOBILE: visible input bar pinned above keyboard ── */}
      {isMobile && (
        <div className="flex-shrink-0 px-4 pb-5 pt-3">
          {/* Hint */}
          <AnimatePresence mode="wait">
            {hint && (
              <motion.p
                key={hint}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-center text-[10px] font-mono text-white/20 tracking-[0.18em] uppercase mb-2.5"
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Input row */}
          <div
            className="
            flex items-center gap-3
            rounded-2xl
            border border-white/10
            bg-white/[0.04]
            px-4 py-3
            focus-within:border-white/20
            focus-within:bg-white/[0.06]
            transition-all duration-200
          "
          >
            <input
              ref={mobileInputRef}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={onMobileKeyDown}
              disabled={phase === "waiting" || phase === "answer"}
              placeholder={
                phase === "waiting" || phase === "answer" ? "" : "Ask anything…"
              }
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              inputMode="text"
              aria-label="Chat input"
              className="
                flex-1 bg-transparent
                text-sm text-white
                placeholder:text-white/20
                outline-none
                disabled:opacity-0
                transition-opacity duration-200
              "
            />

            {/* Send button */}
            <motion.button
              type="button"
              onClick={handleSend}
              disabled={
                !input.trim() || phase === "waiting" || phase === "answer"
              }
              whileTap={animEnabled ? { scale: 0.85 } : {}}
              aria-label="Send message"
              className="
                flex-shrink-0
                flex items-center justify-center
                w-8 h-8 rounded-full
                bg-white text-black
                disabled:opacity-20
                transition-opacity duration-150
              "
            >
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      )}

      {/* ── DESKTOP: hidden 1px input capturing keystrokes ── */}
      {!isMobile && (
        <input
          ref={hiddenInputRef}
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={onHiddenKeyDown}
          disabled={phase === "waiting" || phase === "answer"}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Chat input"
          aria-hidden
          tabIndex={-1}
          className="fixed opacity-0 w-px h-px pointer-events-none"
          style={{ top: "50vh", left: "50vw" }}
        />
      )}
    </div>
  );
}
