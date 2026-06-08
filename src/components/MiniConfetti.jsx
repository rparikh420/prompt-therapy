import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from "./MotionConfig";

const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#f1f5f9", "#60a5fa", "#f472b6"];

function Particle({ x, color, size, delay }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, backgroundColor: color, left: `${x}%`, bottom: "50%" }}
      initial={{ y: 0, opacity: 1, scale: 0 }}
      animate={{
        y: [0, -120 - Math.random() * 100],
        x: [(Math.random() - 0.5) * 120],
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0.4],
        rotate: [0, Math.random() * 360],
      }}
      transition={{ duration: 1.2 + Math.random() * 0.5, delay, ease: "easeOut" }}
    />
  );
}

export default function MiniConfetti({ show }) {
  const { shouldAnimate } = useMotion();
  if (!shouldAnimate || !show) return null;
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i, x: 30 + Math.random() * 40, color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 8, delay: Math.random() * 0.3,
  }));
  return (
    <AnimatePresence>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>
    </AnimatePresence>
  );
}
