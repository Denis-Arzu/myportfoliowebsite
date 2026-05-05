"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
  voice: string;
  duration?: string;
  badge?: string | null;
  tags?: string[];
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  voice,
  duration,
  badge,
  tags = [],
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => {
      setAudioDuration(audio.duration || 0);
      setIsLoaded(true);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      const progress = progressRef.current;
      if (!audio || !progress || !isLoaded) return;

      const rect = progress.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      audio.currentTime = pct * audioDuration;
    },
    [audioDuration, isLoaded]
  );

  const progressPct = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl p-4 sm:p-5"
      style={{ border: "1px solid rgba(255,255,255,0.05)", background: "transparent" }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Title + Voice */}
      <div className="mb-3">
        <h3 className="text-sm text-white/80 font-mono leading-tight">{title}</h3>
        <p className="text-xs text-white/40 font-mono mt-0.5">{voice} {duration && `· ${duration}`}</p>
      </div>

      {/* Player row */}
      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-colors hover:border-[oklch(0.55_0.18_145)/0.5] hover:text-[oklch(0.85_0.3_150)] text-white/70"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Progress bar */}
        <div className="flex-1 space-y-1">
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="h-1 rounded-full bg-white/10 cursor-pointer relative overflow-hidden"
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progressPct}%`,
                background: "oklch(0.55 0.18 145)",
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/30 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{isLoaded ? formatTime(audioDuration) : duration || "--:--"}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-white/35 leading-relaxed mt-3">{/* description passed from parent */}</p>

      {/* Tags + Badge */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/30 font-mono"
          >
            {tag}
          </span>
        ))}
        {badge && (
          <span className="text-[10px] uppercase tracking-wider text-[oklch(0.85_0.3_150)] font-mono ml-auto">
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
