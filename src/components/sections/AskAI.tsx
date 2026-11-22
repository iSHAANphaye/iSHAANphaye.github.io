"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function AskAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am Ishaan's grounded AI assistant. Ask me anything about his projects, benchmarks, Datanomers internship, skills, or availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(10);

  async function sendQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading || remaining <= 0) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      if (typeof data.remaining === "number") {
        setRemaining(data.remaining);
      }

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Unable to respond right now.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please try again or email Ishaan directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="ai-chat"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
              AI Assistant
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-gray-900">
              ASK ABOUT ISHAAN
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Grounded directly on Ishaan&apos;s verified projects, benchmarks,
              internship impact, and academic records.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/sticker-magnifier.svg"
            alt=""
            aria-hidden="true"
            className="hidden sm:block w-16 h-16"
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          {/* Chat header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/70 px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-gray-900">
                  Ishaan AI
                </div>
                <div className="font-mono text-xs text-gray-500">
                  Grounded on 5 verified projects • 0 hallucinations
                </div>
              </div>
            </div>
            <div
              title="Strict session chat budget to prevent rate exhaustion"
              className="rounded-full border border-gray-200 bg-white px-3 py-1 font-mono text-xs font-semibold text-gray-700"
            >
              {remaining} / 10 chats left
            </div>
          </div>

          {/* Messages */}
          <div className="max-h-96 space-y-4 overflow-y-auto p-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-gray-900 text-white"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-3.5 w-3.5" />
                  ) : (
                    <Bot className="h-3.5 w-3.5" />
                  )}
                </div>
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 bg-gray-50 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600" />
                Thinking...
              </div>
            )}
          </div>

          {/* Suggested prompts */}
          <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
              Suggested questions:
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROFILE.suggestedAiQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={loading || remaining <= 0}
                  onClick={() => sendQuestion(q)}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 transition hover:border-blue-400 hover:text-blue-700 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendQuestion(input);
            }}
            className="flex items-center gap-2 border-t border-gray-200 bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              disabled={loading || remaining <= 0}
              placeholder={
                remaining > 0
                  ? "Ask about ClipSense AI, C++ DB engine, skills, or availability..."
                  : "Session chat limit reached. Use the Contact form below."
              }
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || remaining <= 0}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
        </div>

        <p className="mt-3 text-center font-mono text-xs text-gray-500">
          Strictly rate-limited &amp; grounded on Ishaan&apos;s verified project
          facts and academic records (max 10 chats/session).
        </p>
      </div>
    </section>
  );
}
