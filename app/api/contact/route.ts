import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, eventDate, eventType, message } =
      await req.json();

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #3D3230;">
        <h2 style="font-size: 24px; margin-bottom: 8px;">New Booking Inquiry</h2>
        <p style="color: #6B5B59; margin-bottom: 24px;">From your LM Designs & Balloons Co. website</p>
        <hr style="border: none; border-top: 1px solid #E8D5CC; margin-bottom: 24px;" />

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #6B5B59; width: 130px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Phone</td><td style="padding: 8px 0;">${phone || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Event Date</td><td style="padding: 8px 0;">${eventDate || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5B59;">Event Type</td><td style="padding: 8px 0;">${eventType || "—"}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #E8D5CC; margin: 24px 0;" />

        <p style="color: #6B5B59; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Message</p>
        <p style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>

        <hr style="border: none; border-top: 1px solid #E8D5CC; margin: 24px 0;" />
        <p style="font-size: 12px; color: #6B5B59;">Sent via lmdesignsandco.com</p>
      </div>
    `;

    await resend.emails.send({
      from: "LM Balloons Website <onboarding@resend.dev>",
      to: ["LM.Designs.Balloons.Co@gmail.com"],
      replyTo: email,
      subject: `New inquiry from ${name} — ${eventType || "Event"}`,
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
