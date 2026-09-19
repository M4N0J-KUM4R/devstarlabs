"use server";

import { Resend } from "resend";

export type ContactState = { ok: boolean; message: string };

function validate(data: FormData): { name: string; email: string; topic: string; message: string } | string {
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const topic = String(data.get("topic") ?? "project");
  const message = String(data.get("message") ?? "").trim();

  if (!name || name.length < 2) return "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "That email address doesn't look right.";
  if (!message || message.length < 10)
    return "Give us a little more detail — at least a sentence.";

  return { name, email, topic, message };
}

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  const parsed = validate(formData);
  if (typeof parsed === "string") return { ok: false, message: parsed };
  const { name, email, topic, message } = parsed;

  // Deliver via Resend when configured; otherwise log server-side so the
  // flow still works in local/dev deployments before the key is added.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "DevStarLabs <onboarding@resend.dev>",
        to: process.env.CONTACT_TO ?? "manoj@devstarlabs.cloud",
        replyTo: email,
        subject: `[${topic}] ${name} — devstarlabs.dev contact`,
        text: `${name} <${email}>\n\n${message}`,
      });
      return {
        ok: true,
        message: "Thanks! We'll reply within one business day.",
      };
    } catch {
      return {
        ok: false,
        message: "Something broke on our side — email manoj@devstarlabs.cloud directly.",
      };
    }
  }

  console.info("[contact]", { name, email, topic, message });
  return {
    ok: true,
    message: "Thanks! We'll reply within one business day.",
  };
}
