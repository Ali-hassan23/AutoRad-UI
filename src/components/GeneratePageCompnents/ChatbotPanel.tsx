"use client";

import { chatWithReport } from "@/lib/chatbot";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  report: string;
  onUpdate: (report: string) => void;
};

export default function ChatbotPanel({ report, onUpdate }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingReport, setPendingReport] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const newHistory = [...messages, { role: "user" as const, content: message }];
    setMessages(newHistory);
    setMessage("");
    setLoading(true);

    try {
      const res = await chatWithReport(report, message, newHistory.slice(-8));

      if (res.type === "report_update") {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: res.response },
          { role: "assistant", content: "I've drafted an updated version of the report. Review and apply below." },
        ]);
        setPendingReport(res.updated_report);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: res.response }]);
      }
    } catch (e) {
      console.error("Chat error:", e);
      const errorMessage = e instanceof Error ? e.message : String(e);
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${errorMessage}` }]);
    }

    setLoading(false);
  }

  function applyUpdate() {
    if (!pendingReport) return;
    onUpdate(pendingReport);
    setMessages(prev => [...prev, { role: "assistant", content: "✓ Report updated successfully." }]);
    setPendingReport(null);
  }

  return (
    <div className="flex h-full flex-col gap-3 min-h-0">

      {/* Header */}
      <div className="shrink-0 flex items-center gap-3 pb-2 border-b border-slate-200">
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.591 2.25l3.176 1.588m-9.017-8.552a36.18 36.18 0 00-2.33.567" />
          </svg>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-blue-700">Assistant</p>
          <h2 className="text-base font-semibold text-slate-900 leading-tight">Radiology AI</h2>
        </div>
      </div>

      {/* Chat history — scrollable, fills all available space */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-slate-400 py-10">
            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-500">Ask about the report</p>
            <p className="text-xs text-slate-400 max-w-[220px]">Request edits, ask for clarification, or improve specific sections.</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

            {/* Avatar */}
            <div className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-semibold mt-0.5
              ${m.role === "user" ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"}`}
            >
              {m.role === "user" ? "You" : "AI"}
            </div>

            {/* Bubble */}
            <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6
              ${m.role === "user"
                ? "bg-blue-600 text-white rounded-tr-sm"
                : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
              }`}
            >
              {m.content}
            </div>

          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-600 shrink-0 flex items-center justify-center text-[11px] font-semibold">AI</div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1.5 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Pending update banner */}
      {pendingReport && (
        <div className="shrink-0 rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-2">
          <p className="text-xs font-semibold text-amber-800">Report update ready</p>
          <p className="text-xs text-amber-700">Review the AI's suggested changes and apply or discard.</p>
          <div className="flex gap-2">
            <button
              onClick={applyUpdate}
              className="flex-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition"
            >
              Apply changes
            </button>
            <button
              onClick={() => setPendingReport(null)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 flex gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Ask about the report or request edits..."
          className="flex-1 bg-transparent px-2 py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>

    </div>
  );
}