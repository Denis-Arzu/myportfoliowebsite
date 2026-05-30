"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { FileText, Image as LucideImage, Plus, Upload, X } from "lucide-react";
import {
  ALLOWED_UPLOAD_EXT,
  ALLOWED_UPLOAD_MIME,
  CONTACT_UPLOAD,
  fileKey,
  formatFileSize,
  isImageMime,
} from "@/lib/contact-upload";

type ProjectFileUploadProps = {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  error?: string | null;
};

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

function validateIncoming(
  incoming: File[],
  existing: File[]
): { accepted: File[]; error: string | null } {
  const keys = new Set(existing.map(fileKey));
  const accepted: File[] = [];
  let totalBytes = existing.reduce((s, f) => s + f.size, 0);
  const slotsLeft = CONTACT_UPLOAD.maxFiles - existing.length;

  if (slotsLeft <= 0) {
    return { accepted: [], error: `Maximum ${CONTACT_UPLOAD.maxFiles} files allowed.` };
  }

  for (const file of incoming) {
    if (accepted.length + existing.length >= CONTACT_UPLOAD.maxFiles) {
      return {
        accepted,
        error: `Only ${CONTACT_UPLOAD.maxFiles} files allowed - extra files were skipped.`,
      };
    }

    const ext = extOf(file.name);
    if (!ALLOWED_UPLOAD_MIME.has(file.type) && !ALLOWED_UPLOAD_EXT.has(ext)) {
      return {
        accepted,
        error: `"${file.name}" is not a supported type. Use images, PDF, Word, Excel, or TXT.`,
      };
    }

    if (file.size > CONTACT_UPLOAD.maxFileBytes) {
      return {
        accepted,
        error: `"${file.name}" exceeds ${formatFileSize(CONTACT_UPLOAD.maxFileBytes)} per file.`,
      };
    }

    if (totalBytes + file.size > CONTACT_UPLOAD.maxTotalBytes) {
      return {
        accepted,
        error: `Total upload size cannot exceed ${formatFileSize(CONTACT_UPLOAD.maxTotalBytes)}.`,
      };
    }

    const key = fileKey(file);
    if (keys.has(key)) continue;
    keys.add(key);
    accepted.push(file);
    totalBytes += file.size;
  }

  return { accepted, error: null };
}

export function ProjectFileUpload({ files, onChange, disabled, error }: ProjectFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Map<string, string>>(new Map());

  const displayError = error ?? localError;
  const totalBytes = files.reduce((s, f) => s + f.size, 0);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      if (!list.length) return;
      const { accepted, error: err } = validateIncoming(list, files);
      if (err) setLocalError(err);
      else setLocalError(null);
      if (accepted.length) onChange([...files, ...accepted]);
    },
    [files, onChange]
  );

  const removeFile = (index: number) => {
    setLocalError(null);
    onChange(files.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const next = new Map<string, string>();
    const toRevoke: string[] = [];

    for (const file of files) {
      const key = fileKey(file);
      if (isImageMime(file.type)) {
        const url = URL.createObjectURL(file);
        next.set(key, url);
        toRevoke.push(url);
      }
    }

    const timeout = window.setTimeout(() => {
      setPreviews(next);
    }, 0);

    return () => {
      window.clearTimeout(timeout);
      toRevoke.forEach(URL.revokeObjectURL);
    };
  }, [files]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    addFiles(e.dataTransfer.files);
  };

  return (
    <motion.div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-xs font-mono text-white/30 uppercase tracking-wider">
          Project files <span className="text-white/20 normal-case">(optional)</span>
        </label>
        <span className="text-[10px] font-mono text-white/20">
          {files.length}/{CONTACT_UPLOAD.maxFiles} · {formatFileSize(totalBytes)} /{" "}
          {formatFileSize(CONTACT_UPLOAD.maxTotalBytes)}
        </span>
      </div>

      <motion.div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false);
        }}
        onDrop={onDrop}
        className={[
          "relative rounded-xl border border-dashed px-4 py-6 text-center transition-all cursor-pointer",
          "bg-white/[0.02] hover:bg-white/[0.04]",
          dragOver
            ? "border-[oklch(0.55_0.18_145)] bg-[oklch(0.55_0.18_145/0.08)] ring-1 ring-[oklch(0.55_0.18_145/0.35)]"
            : "border-white/10 hover:border-white/20",
          disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "",
        ].join(" ")}
        aria-label="Upload project files"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          disabled={disabled}
          accept={[...ALLOWED_UPLOAD_MIME].join(",")}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <motion.div
          className="flex flex-col items-center gap-2 pointer-events-none"
          animate={dragOver ? { scale: 1.02 } : { scale: 1 }}
        >
          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-full border",
              dragOver
                ? "border-[oklch(0.55_0.18_145/0.5)] bg-[oklch(0.55_0.18_145/0.15)]"
                : "border-white/10 bg-white/5",
            ].join(" ")}
          >
            {dragOver ? (
              <Upload className="h-4 w-4 text-[oklch(0.75_0.2_145)]" />
            ) : (
              <Plus className="h-4 w-4 text-white/40" aria-hidden />
            )}
          </div>
          <p className="text-sm text-white/60">
            <span className="text-white/80">Drop files here</span> or click to browse
          </p>
          <p className="text-[10px] font-mono text-white/25 max-w-xs leading-relaxed">
            Images · PDF · Word · Excel · TXT - up to {CONTACT_UPLOAD.maxFiles} files,{" "}
            {formatFileSize(CONTACT_UPLOAD.maxFileBytes)} each
          </p>
        </motion.div>
      </motion.div>

      {displayError && (
        <p role="alert" className="text-red-400 text-xs font-mono">
          {displayError}
        </p>
      )}

      {files.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {files.map((file, index) => {
            const key = fileKey(file);
            const thumb = previews.get(key);
            const isImg = isImageMime(file.type);

            return (
              <li
                key={key}
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-2 pr-2"
              >
                <motion.div
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/50 flex items-center justify-center"
                >
                  {isImg && thumb ? (
                    <div
                      role="img"
                      aria-label={file.name}
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${thumb})` }}
                    />
                  ) : isImg ? (
                    <LucideImage className="h-4 w-4 text-white/30" aria-hidden="true" />
                  ) : (
                    <FileText className="h-4 w-4 text-white/30" />
                  )}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-white/80 font-medium">{file.name}</p>
                  <p className="text-[10px] font-mono text-white/30">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  disabled={disabled}
                  className="shrink-0 rounded-md p-1.5 text-white/30 hover:bg-white/10 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}
