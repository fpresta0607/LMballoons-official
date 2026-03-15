import { Resend } from "resend";
import { NextResponse } from "next/server";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  // Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { name, email, phone, eventDate, eventType, message } =
      await req.json();

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Sanitize all string fields for email HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "");
    const safeEventDate = escapeHtml(eventDate || "");
    const safeEventType = escapeHtml(eventType || "");
    const safeMessage = escapeHtml(message);

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #3D3230;">
        <h2 style="font-size: 24px; margin-bottom: 8px;">New Booking Inquiry</h2>
        <p style="color: #6B5B59; margin-bottom: 24px;">From your LM Designs & Balloons Co. website</p>
        <hr style="border: none; border-top: 1px solid #E8D5CC; margin-bottom: 24px;" />

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #6B5B59; width: 130px;">Name</td><td style="padding: 8px 0;">${safeName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Email</td><td style="padding: 8px 0;">${safeEmail}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Phone</td><td style="padding: 8px 0;">${safePhone || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Event Date</td><td style="padding: 8px 0;">${safeEventDate || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Event Type</td><td style="padding: 8px 0;">${safeEventType || "—"}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #E8D5CC; margin: 24px 0;" />

        <p style="color: #6B5B59; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Message</p>
        <p style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>

        <hr style="border: none; border-top: 1px solid #E8D5CC; margin: 24px 0;" />
        <p style="font-size: 12px; color: #6B5B59;">Sent via lmdesignsandco.com</p>
      </div>
    `;

    await getResend().emails.send({
      from: "LM Balloons Website <onboarding@resend.dev>",
      to: ["LM.Designs.Balloons.Co@gmail.com"],
      replyTo: email,
      subject: `New inquiry from ${safeName} — ${safeEventType || "Event"}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
