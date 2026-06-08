import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { streamTherapistResponse } from "../lib/openai";
import { useJourney } from "../context/JourneyContext";

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-violet-400"
          style={{
            animation: `typing-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function TherapistChat({ onReadyToGraduate }) {
  const { getJourneySummary } = useJourney();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const exchangeCount = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    const assistantMsg = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMsg]);

    try {
      const journeySummary = getJourneySummary();
      const stream = streamTherapistResponse(
        updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        journeySummary
      );

      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullText };
          return updated;
        });
      }

      exchangeCount.current++;
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Even AI therapists need a moment sometimes. Try again?",
        };
        return updated;
      });
    }

    setIsStreaming(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showGraduateButton = exchangeCount.current >= 3 && !isStreaming;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-violet-500/[0.08] border border-violet-500/[0.12] flex items-center justify-center">
              <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <p className="text-slate-300 text-base font-medium mb-2">Dr. Unplugged is ready for you.</p>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto mb-4">
              I've reviewed your case file. Let's talk about what brought you here today.
            </p>
            <p className="text-slate-600 text-xs font-serif-quote">
              &ldquo;The couch is warm. The irony is thick. Begin when you're ready.&rdquo;
            </p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 120 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col gap-1 max-w-[85%]">
                {msg.role === "assistant" && (
                  <span className="text-[10px] text-slate-600 font-medium tracking-wider uppercase ml-3">Dr. Unplugged</span>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-violet-600 text-white rounded-br-md"
                    : "backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] text-slate-300 rounded-bl-md"
                }`}>
                  {msg.content || <TypingIndicator />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {showGraduateButton && onReadyToGraduate && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 pb-2">
          <button
            onClick={onReadyToGraduate}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-emerald-400 border border-emerald-500/20 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12] transition-all cursor-pointer"
          >
            I'm ready to graduate &rarr;
          </button>
        </motion.div>
      )}

      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Confess your AI sins..."
            disabled={isStreaming}
            className="flex-1 px-4 py-3 text-sm rounded-full border border-white/[0.1] bg-white/[0.04] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="px-5 py-3 bg-violet-600 text-white text-sm font-medium rounded-full hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
