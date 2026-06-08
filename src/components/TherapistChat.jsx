import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { streamTherapistResponse } from "../lib/openai";

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
      const stream = streamTherapistResponse(
        updatedMessages.map((m) => ({ role: m.role, content: m.content }))
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
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🛋️</p>
            <p className="text-slate-400 text-sm mb-1">Welcome to your therapy session.</p>
            <p className="text-slate-600 text-xs">Go ahead. Tell your AI therapist how you feel about your AI addiction.</p>
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
