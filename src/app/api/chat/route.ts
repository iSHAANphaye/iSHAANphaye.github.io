import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "@/lib/knowledge-base";
import { limitChat } from "@/lib/ratelimit";
import { chatRequestSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    const rate = await limitChat(ip);
    if (!rate.success) {
      return NextResponse.json(
        {
          error:
            "Session chat limit reached (10/10). Please reach out via the Contact section or email.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(rate.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.startsWith("AIzaSy_your_")) {
      return NextResponse.json(
        {
          error:
            "AI assistant is not configured yet (missing valid GEMINI_API_KEY in .env.local).",
        },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: parsed.data.message,
      config: {
        systemInstruction: buildSystemPrompt(),
      },
    });

    const reply =
      response.text?.trim() ||
      "I couldn't generate a response. Please try rephrasing your question.";

    return NextResponse.json(
      { reply, remaining: rate.remaining, limit: rate.limit },
      {
        headers: {
          "X-RateLimit-Limit": String(rate.limit),
          "X-RateLimit-Remaining": String(rate.remaining),
        },
      }
    );
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      { error: "Something went wrong while querying the assistant." },
      { status: 500 }
    );
  }
}
