"use client";
import { useState } from "react";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const history = [...messages, userMsg];

    setMessages(history);
    setInput("");
    setLoading(true);
    setErr(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ API ของคุณรอ { msg: ChatMessage[] }
        body: JSON.stringify({ msg: history }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data: { result: string } = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.result ?? "" },
      ]);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("เกิดข้อผิดพลาด");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-4 md:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-black text-white grid place-items-center font-semibold">AI</div>
        <h1 className="text-xl md:text-2xl font-semibold">RAG Chatbot</h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Messages */}
        <div className="h-[60vh] overflow-y-auto p-4 md:p-6 space-y-3">
          {messages.length === 0 && (
            <div className="text-slate-500">
              เริ่มต้นพิมพ์คำถามด้านล่างได้เลยครับ 🙂 (ระบบจะตอบโดยอิงข้อมูลจากฐานของคุณ)
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={[
                "max-w-[85%] rounded-2xl px-4 py-2 whitespace-pre-wrap",
                m.role === "user"
                  ? "ml-auto bg-sky-100 text-slate-800"
                  : "mr-auto bg-slate-100 text-slate-800",
              ].join(" ")}
            >
              <div className="text-xs font-medium text-slate-500 mb-1">
                {m.role === "user" ? "คุณ" : "บอท"}
              </div>
              {m.content}
            </div>
          ))}

          {loading && (
            <div className="mr-auto bg-slate-100 text-slate-800 rounded-2xl px-4 py-2 inline-flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400"></span>
              กำลังประมวลผล…
            </div>
          )}

          {err && (
            <div className="text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-lg">
              Error: {err}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="border-t border-slate-200 p-3 md:p-4">
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="พิมพ์คำถามของคุณ…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 disabled:opacity-50"
            >
              ส่ง
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            * ระบบนี้จะส่ง `{`msg: ChatMessage[]`}` ไปยัง <code>/api/chat</code> และรับ `{`result`}` กลับมา
          </p>
        </form>
      </div>
    </main>
  );
}