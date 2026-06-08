import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import StaggerContainer, { staggerItem } from "../components/StaggerContainer";
import { quotes, ROTATION_INTERVAL } from "../../shared/content";

export default function LandingPage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setQuoteIndex((prev) => (prev + 1) % quotes.length), ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      <StaggerContainer className="text-center w-full flex flex-col items-center">
        <motion.div variants={staggerItem} className="inline-block mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-violet-400/80 bg-violet-500/[0.08] border border-violet-500/[0.12] px-4 py-1.5 rounded-full font-medium">
            5-Step Recovery Program
          </span>
        </motion.div>
        <motion.h1 variants={staggerItem} className="text-display-xl text-gradient mb-5">Prompt Therapy</motion.h1>
        <motion.p variants={staggerItem} className="text-lg sm:text-xl text-slate-400 mb-12 font-light max-w-md mx-auto leading-relaxed">
          Because your relationship with AI has become...{" "}
          <span className="text-rose-400 font-medium italic">concerning.</span>
        </motion.p>
        <motion.div variants={staggerItem} className="w-full max-w-xl mb-12">
          <GlassCard className="p-8 min-h-[120px] flex items-center justify-center" glow>
            <AnimatePresence mode="wait">
              <motion.p key={quoteIndex}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-serif-quote"
              >&ldquo;{quotes[quoteIndex]}&rdquo;</motion.p>
            </AnimatePresence>
          </GlassCard>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Link to="/intake"><Button variant="primary" size="lg">Begin Recovery</Button></Link>
          <p className="text-xs text-slate-600 mt-5">No AI was harmed in the making of this program. Several were roasted.</p>
        </motion.div>
      </StaggerContainer>
    </div>
  );
}
