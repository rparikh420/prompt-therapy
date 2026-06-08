import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import { quotes, ROTATION_INTERVAL } from '../../shared/content';

export default function LandingPage() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-block mb-6"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 rounded-full font-medium">
            5-Step Recovery Program
          </span>
        </motion.div>

        <h1 className="text-display-xl text-gradient mb-4">
          Prompt Therapy
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl text-slate-400 mb-12 font-light max-w-lg mx-auto"
        >
          Because your relationship with AI has become...{" "}
          <span className="text-rose-400 font-medium italic">concerning.</span>
        </motion.p>

        <GlassCard className="p-8 mb-12 mx-auto max-w-xl min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg text-slate-300 italic leading-relaxed"
            >
              &ldquo;{quotes[quoteIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/intake">
            <Button variant="primary" size="lg">
              Begin Recovery
            </Button>
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            No AI was harmed in the making of this program. Several were roasted.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
