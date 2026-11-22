"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  Bot,
  Check,
  Copy,
  Maximize2,
  Minimize2,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am **Ishaan's Grounded AI Assistant** powered by **Gemini 3.5 Flash-Lite**.\n\nAsk me anything about his projects (*ClipSense AI*, *C++ Mini DB*, *GPT-2*), verified benchmarks, ML internship at Datanomers, skills, or immediate availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(10);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Allow other components (like StickyNav or Project cards) to open the chatbot
  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        sendQuestion(customEvent.detail.prompt);
      }
    };
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Keyboard shortcut: Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
          content:
            "Network connection error. Please try again or reach out to Ishaan directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2.5 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Open AI Assistant Chatbot"
            >
              {/* Pulse indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>

              <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
              <span className="font-display text-sm font-bold tracking-tight">
                Ask Ishaan AI
              </span>

              <span className="hidden font-mono text-[11px] font-medium text-blue-200 sm:inline">
                ({remaining}/10)
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none flex sm:items-end sm:justify-end sm:p-6">
            {/* Backdrop overlay on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs sm:hidden pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto flex flex-col overflow-hidden bg-white shadow-2xl border border-gray-200 ${
                isExpanded
                  ? "fixed inset-2 sm:inset-6 sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:w-[680px] sm:h-[80vh] rounded-2xl"
                  : "fixed inset-x-0 bottom-0 h-[85vh] sm:static sm:h-[600px] sm:w-[420px] rounded-t-2xl sm:rounded-2xl"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                    <Sparkles className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-gray-900">
                        Ishaan AI
                      </h3>
                      <span className="rounded-full bg-blue-100 px-2 py-0.2 font-mono text-[10px] font-semibold text-blue-800">
                        Gemini 3.5
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-gray-500">
                      Grounded on verified dossier • 0 hallucinations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span
                    title="Rate limit remaining chats for this session"
                    className="mr-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 font-mono text-[11px] font-semibold text-gray-700"
                  >
                    {remaining} / 10 left
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
                    className="hidden sm:inline-flex rounded-lg p-1.5 text-gray-500 hover:bg-gray-200/60 hover:text-gray-900"
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-3.5 w-3.5" />
                    ) : (
                      <Maximize2 className="h-3.5 w-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200/60 hover:text-gray-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gray-900 text-white rounded-br-xs"
                          : "border border-gray-200 bg-gray-50/90 text-gray-800 rounded-bl-xs"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <MarkdownRenderer content={msg.content} />
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 font-mono text-xs text-gray-500 pl-9">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:0.4s]" />
                    <span className="ml-1 text-gray-400">Synthesizing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length < 5 && (
                <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">
                    Suggested prompts:
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {PROFILE.suggestedAiQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        disabled={loading || remaining <= 0}
                        onClick={() => sendQuestion(q)}
                        className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-700 transition hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/30 disabled:opacity-50 text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendQuestion(input);
                }}
                className="border-t border-gray-200 bg-white p-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={300}
                    disabled={loading || remaining <= 0}
                    placeholder={
                      remaining > 0
                        ? "Ask about ClipSense AI, C++ engine, skills..."
                        : "Session limit reached. Reach out via email!"
                    }
                    className="flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none disabled:bg-gray-100"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim() || remaining <= 0}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-400 font-mono px-1">
                  <span>Grounded on verified facts</span>
                  <span>{input.length}/300</span>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Enhanced Markdown Component for rendering AI responses with bold, italic,
 * code blocks, lists, and KaTeX math formulas.
 */
function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body prose prose-sm max-w-none text-gray-800 space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (
            <p className="my-1.5 leading-relaxed text-sm">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-800">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-2 ml-4 list-disc space-y-1 text-sm">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 ml-4 list-decimal space-y-1 text-sm">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="rounded-md bg-blue-50/80 px-1.5 py-0.5 font-mono text-xs font-medium text-blue-700 border border-blue-200/50"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <CodeBlock className={className}>{String(children)}</CodeBlock>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-blue-500 pl-3 italic text-gray-600">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-2 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-gray-100 px-2.5 py-1.5 font-mono font-semibold text-gray-700 border-b border-gray-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-2.5 py-1.5 border-b border-gray-100 text-gray-700">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const lang = match ? match[1] : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(children.replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2.5 overflow-hidden rounded-xl border border-gray-800 bg-gray-950 text-gray-100">
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/80 px-3 py-1.5 text-[11px] font-mono text-gray-400">
        <span>{lang || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-gray-400 transition hover:bg-gray-800 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
