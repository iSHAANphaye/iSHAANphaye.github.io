import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { limitContact } from "@/lib/ratelimit";
import { contactRequestSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    const rate = await limitContact(ip);
    if (!rate.success) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid form data." },
        { status: 400 }
      );
    }

    // Silent drop if honeypot triggered
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_your_")) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured yet (missing valid RESEND_API_KEY in .env.local).",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || "ishaanphaye@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Portfolio Inquiry <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: parsed.data.email,
      subject: `[Portfolio] Message from ${parsed.data.name}`,
      text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\nMessage:\n${parsed.data.message}`,
    });

    if (error) {
      console.error("[/api/contact] Resend error:", error);
      return NextResponse.json(
        {
          error:
            error.message ||
            "Failed to send message. Please email directly instead.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please email directly instead." },
      { status: 500 }
    );
  }
}
