"use server";

import { z } from "zod";
import {
  ALLOWED_UPLOAD_EXT,
  ALLOWED_UPLOAD_MIME,
  CONTACT_UPLOAD,
  formatFileSize,
} from "@/lib/contact-upload";

const DEFAULT_CONTACT_EMAIL = "ceo@dentrixapps.com";
const FALLBACK_CONTACT_EMAIL = DEFAULT_CONTACT_EMAIL;

/* ─── Schema ──────────────────────────────────────────────────────────── */

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  budget: z.string().optional(),
  serviceType: z.string().optional(),
  description: z.string().min(10, "Please provide at least 10 characters"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, "").replace(/\.\./g, "");
  const cleaned = base.replace(/[^\w.\- ()[\]]+/g, "_").trim();
  const truncated = cleaned.slice(0, 120) || "attachment";
  return truncated.includes(".") ? truncated : `${truncated}.bin`;
}

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

type ParsedAttachment = {
  filename: string;
  content: Buffer;
  size: number;
};

async function parseAttachments(
  formData: FormData
): Promise<{ attachments: ParsedAttachment[]; error: string | null }> {
  const entries = formData
    .getAll(CONTACT_UPLOAD.fieldName)
    .filter((v): v is File => v instanceof File && v.size > 0);

  if (entries.length === 0) {
    return { attachments: [], error: null };
  }

  if (entries.length > CONTACT_UPLOAD.maxFiles) {
    return {
      attachments: [],
      error: `You can attach up to ${CONTACT_UPLOAD.maxFiles} files.`,
    };
  }

  const parsed: ParsedAttachment[] = [];
  let totalBytes = 0;

  for (const file of entries) {
    const ext = extOf(file.name);
    if (!ALLOWED_UPLOAD_MIME.has(file.type) && !ALLOWED_UPLOAD_EXT.has(ext)) {
      return {
        attachments: [],
        error: `"${file.name}" is not an allowed file type.`,
      };
    }

    if (file.size > CONTACT_UPLOAD.maxFileBytes) {
      return {
        attachments: [],
        error: `"${file.name}" exceeds the ${formatFileSize(CONTACT_UPLOAD.maxFileBytes)} per-file limit.`,
      };
    }

    totalBytes += file.size;
    if (totalBytes > CONTACT_UPLOAD.maxTotalBytes) {
      return {
        attachments: [],
        error: `Total attachments cannot exceed ${formatFileSize(CONTACT_UPLOAD.maxTotalBytes)}.`,
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    parsed.push({
      filename: sanitizeFilename(file.name),
      content: buffer,
      size: file.size,
    });
  }

  return { attachments: parsed, error: null };
}

/* ─── In-memory rate limiter (per-deployment, resets on cold start) ─── */
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000;

function cleanupOldEntries(): void {
  const now = Date.now();
  for (const [email, timestamps] of submissions.entries()) {
    const validTimestamps = timestamps.filter((t) => now - t < RATE_WINDOW);
    if (validTimestamps.length === 0) {
      submissions.delete(email);
    } else {
      submissions.set(email, validTimestamps);
    }
  }
}

function isRateLimited(email: string): boolean {
  const now = Date.now();

  if (Math.random() < 0.1) {
    cleanupOldEntries();
  }

  const timestamps = submissions.get(email) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_WINDOW);

  if (validTimestamps.length >= RATE_LIMIT) {
    return true;
  }

  validTimestamps.push(now);
  submissions.set(email, validTimestamps);
  return false;
}

/* ─── Server Action ───────────────────────────────────────────────────── */

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    budget: formData.get("budget"),
    serviceType: formData.get("serviceType"),
    description: formData.get("description"),
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, company, budget, serviceType, description } = result.data;

  const { attachments, error: attachmentError } = await parseAttachments(formData);
  if (attachmentError) {
    return {
      success: false,
      message: attachmentError,
      errors: { attachments: [attachmentError] },
    };
  }

  if (isRateLimited(email)) {
    return {
      success: false,
      message: `You've submitted too many requests. Please try again in an hour, or email ${FALLBACK_CONTACT_EMAIL} directly.`,
    };
  }

  const honeypot = formData.get("website");
  if (honeypot) {
    return {
      success: true,
      message: "Your message has been received. We'll be in touch within 12 hours.",
    };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Dentrix Apps <noreply@dentrixapps.com>";

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "—");
  const safeService = escapeHtml(serviceType || "Not specified");
  const safeBudget = escapeHtml(budget || "Not specified");
  const safeDescription = escapeHtml(description);

  const attachmentListHtml =
    attachments.length > 0
      ? `<ul style="margin: 8px 0 0; padding-left: 18px; color: #a3a3a3; font-size: 13px;">${attachments
          .map(
            (a) =>
              `<li>${escapeHtml(a.filename)} <span style="color:#666">(${formatFileSize(a.size)})</span></li>`
          )
          .join("")}</ul>`
      : `<p style="color: #666; font-size: 13px; margin: 8px 0 0;">No files attached</p>`;

  if (resendKey && resendKey !== "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `New Project Inquiry: ${budget || "Budget not specified"} — ${name} (${company || "No company"})`,
        html: `
          <div style="font-family: 'SF Mono', 'Fira Code', monospace; background: #0a0a0a; color: #e5e5e5; padding: 32px; border-radius: 12px;">
            <div style="border-bottom: 1px solid #333; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="color: #22c55e; margin: 0 0 4px;">New Project Inquiry</h2>
              <p style="color: #666; font-size: 12px; margin: 0;">via dentrixapps.com contact form · ${new Date().toISOString()}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 120px;">Name</td><td style="padding: 8px 0; color: #fff;">${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #818cf8;">${safeEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0; color: #fff;">${safeCompany}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Service Type</td><td style="padding: 8px 0; color: #fff;">${safeService}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Budget</td><td style="padding: 8px 0; color: #22c55e; font-weight: bold;">${safeBudget}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #111; border: 1px solid #222; border-radius: 8px;">
              <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Project Details</p>
              <p style="white-space: pre-wrap; color: #e5e5e5; margin: 0; line-height: 1.6;">${safeDescription}</p>
            </div>
            <div style="margin-top: 16px; padding: 16px; background: #111; border: 1px solid #222; border-radius: 8px;">
              <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px;">Attachments (${attachments.length})</p>
              ${attachmentListHtml}
            </div>
          </div>
        `,
        attachments:
          attachments.length > 0
            ? attachments.map((a) => ({
                filename: a.filename,
                content: a.content,
              }))
            : undefined,
      });

      if (error) {
        console.error("[Contact] Resend error:", error);
        return {
          success: false,
          message: `Failed to send message. Please email ${FALLBACK_CONTACT_EMAIL} directly.`,
        };
      }
    } catch (err) {
      console.error("[Contact] Unexpected error:", err);
      return {
        success: false,
        message: `An unexpected error occurred. Please email ${FALLBACK_CONTACT_EMAIL} directly.`,
      };
    }
  } else {
    console.log("──────────────────────────────────────────");
    console.log("[Contact Form Submission] (RESEND_API_KEY not set — dev log only)");
    console.log(`  To:      ${toEmail}`);
    console.log(`  Name:    ${name}`);
    console.log(`  Email:   ${email}`);
    console.log(`  Company: ${company || "—"}`);
    console.log(`  Service: ${serviceType || "—"}`);
    console.log(`  Budget:  ${budget || "—"}`);
    console.log(`  Message: ${description}`);
    if (attachments.length > 0) {
      console.log(`  Files:   ${attachments.map((a) => `${a.filename} (${formatFileSize(a.size)})`).join(", ")}`);
    } else {
      console.log("  Files:   (none)");
    }
    console.log(`  Time:    ${new Date().toISOString()}`);
    console.log("  → Set RESEND_API_KEY to deliver email with attachments.");
    console.log("──────────────────────────────────────────");
  }

  return {
    success: true,
    message:
      attachments.length > 0
        ? `Your message and ${attachments.length} file${attachments.length === 1 ? "" : "s"} have been received. We'll be in touch within 12 hours.`
        : "Your message has been received. We'll be in touch within 12 hours.",
  };
}
