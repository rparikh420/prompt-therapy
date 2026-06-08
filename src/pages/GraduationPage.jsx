import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import { NATURE_WEBCAMS, CONFETTI_COLORS } from '../../shared/content';

function ConfettiPiece({ delay, x, size, color, shape }) {
  const isCircle = shape === "circle";
  return (
    <motion.div
      className={`absolute pointer-events-none ${isCircle ? "rounded-full" : "rounded-sm"}`}
      style={{
        width: size,
        height: isCircle ? size : size * 0.6,
        left: `${x}%`,
        bottom: -20,
        backgroundColor: color,
        rotate: `${Math.random() * 360}deg`,
      }}
      initial={{ y: 0, opacity: 1, scale: 0 }}
      animate={{
        y: [0, -800, -1600],
        opacity: [0, 1, 0],
        scale: [0, 1, 0.5],
        rotate: [`${Math.random() * 360}deg`, `${Math.random() * 720}deg`],
        x: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  delay: Math.random() * 3,
  x: Math.random() * 100,
  size: 8 + Math.random() * 16,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  shape: Math.random() > 0.5 ? "circle" : "rect",
}));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function GraduationPage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleTouchGrass = () => {
    const url = NATURE_WEBCAMS[Math.floor(Math.random() * NATURE_WEBCAMS.length)];
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confettiPieces.map((piece) => (
          <ConfettiPiece key={piece.id} {...piece} />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <GlassCard className="p-1 mb-8">
            <div
              className="rounded-xl p-1"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #f43f5e, #8b5cf6, #14b8a6, #8b5cf6)",
                backgroundSize: "300% 300%",
                animation: "gradient-text-shift 4s ease infinite",
              }}
            >
              <div className="bg-[#0f0a1a] rounded-lg p-8 sm:p-12 text-center">
                <motion.p variants={item} className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">
                  Certificate of Recovery
                </motion.p>
                <motion.div variants={item} className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <motion.p variants={item} className="mb-1 font-serif text-lg italic text-slate-400">
                  This certifies that
                </motion.p>
                <motion.h1 variants={item} className="mb-2 text-display-lg text-gradient">
                  A Recovering Prompt Addict
                </motion.h1>
                <motion.p variants={item} className="mb-1 text-lg text-slate-400">
                  has completed the{" "}
                  <span className="font-semibold text-violet-400">5-Step Recovery Program</span>
                </motion.p>
                <motion.p variants={item} className="mb-6 text-lg text-slate-400">
                  and is hereby authorized to{" "}
                  <span className="font-semibold text-rose-400">write their own code again</span>
                </motion.p>
                <motion.div variants={item} className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <motion.p variants={item} className="mb-6 text-sm text-slate-600">{today}</motion.p>
                <motion.div variants={item} className="mt-4">
                  <p className="font-serif text-2xl italic text-slate-300">Dr. Unplugged</p>
                  <div className="mx-auto mt-1 h-px w-40 bg-white/10" />
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-600">Chief Recovery Officer</p>
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={item}>
          <GlassCard className="p-6 text-center mb-6">
            <p className="font-serif text-lg italic leading-relaxed text-slate-400">
              &ldquo;Congratulations. You just completed a program designed by AI
              to help you stop using AI. The irony is not lost on us.&rdquo;
            </p>
          </GlassCard>
        </motion.div>

        <motion.p variants={item} className="text-center text-sm text-slate-600 mb-8">
          You survived 5 steps of brutal honesty and a therapy session. Most people relapse at Step 2.
        </motion.p>

        <motion.div variants={item} className="flex flex-col items-center gap-4">
          <Button variant="success" size="lg" onClick={handleTouchGrass}>
            Go Touch Grass
          </Button>
          <Link
            to="/"
            className="text-sm text-slate-500 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-400"
          >
            Start Over (we won&apos;t judge... much)
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
