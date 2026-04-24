"use server";

import { z } from "zod";

/* ─── Schema ──────────────────────────────────────────────────────────── */

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  budget: z.string().optional(),
  description: z.string().min(10, "Please provide at least 10 characters"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

/* ─── In-memory rate limiter (per-deployment, resets on cold start) ─── */

const submissions = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // per hour (ms)

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = submissions.get(email);

  if (!entry || now - entry.lastReset > RATE_WINDOW) {
    submissions.set(email, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

/* ─── Server Action ───────────────────────────────────────────────────── */

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 1. Validate
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    budget: formData.get("budget"),
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

  const { name, email, company, budget, description } = result.data;

  // 2. Rate limit
  if (isRateLimited(email)) {
    return {
      success: false,
      message:
        "You've submitted too many requests. Please try again in an hour, or email hello@dentrixapps.com directly.",
    };
  }

  // 3. Honeypot check (hidden field "website" should be empty)
  const honeypot = formData.get("website");
  if (honeypot) {
    // Bot detected — return fake success to not reveal detection
    return {
      success: true,
      message: "Your message has been received. We'll be in touch within 12 hours.",
    };
  }

  // 4. Send email via Resend (if API key is configured)
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey && resendKey !== "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    try {
      // Dynamic import to avoid build errors if resend isn't installed yet
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const toEmail = process.env.CONTACT_EMAIL || "hello@dentrixapps.com";

      const { error } = await resend.emails.send({
        from: "Dentrix Apps <noreply@dentrixapps.com>",
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
              <tr><td style="padding: 8px 0; color: #888; width: 120px;">Name</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #818cf8;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0; color: #fff;">${company || "—"}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Budget</td><td style="padding: 8px 0; color: #22c55e; font-weight: bold;">${budget || "Not specified"}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #111; border: 1px solid #222; border-radius: 8px;">
              <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Project Details</p>
              <p style="white-space: pre-wrap; color: #e5e5e5; margin: 0; line-height: 1.6;">${description}</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("[Contact] Resend error:", error);
        return {
          success: false,
          message:
            "Failed to send message. Please email hello@dentrixapps.com directly.",
        };
      }
    } catch (err) {
      console.error("[Contact] Unexpected error:", err);
      return {
        success: false,
        message:
          "An unexpected error occurred. Please email hello@dentrixapps.com directly.",
      };
    }
  } else {
    // No Resend key configured — log to server console as fallback
    console.log("──────────────────────────────────────────");
    console.log("[Contact Form Submission]");
    console.log(`  Name:    ${name}`);
    console.log(`  Email:   ${email}`);
    console.log(`  Company: ${company || "—"}`);
    console.log(`  Budget:  ${budget || "—"}`);
    console.log(`  Message: ${description}`);
    console.log(`  Time:    ${new Date().toISOString()}`);
    console.log("──────────────────────────────────────────");
  }

  return {
    success: true,
    message:
      "Your message has been received. We'll be in touch within 12 hours.",
  };
}
