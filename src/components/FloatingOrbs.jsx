import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";

const orbs = [
  { color: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)", className: "absolute -top-32 -left-32 w-96 h-96", animate: { x: [0, 80, -40, 60, 0], y: [0, -60, 80, 40, 0], scale: [1, 1.1, 0.95, 1.05, 1] }, duration: 20 },
  { color: "radial-gradient(circle, rgba(244,63,94,0.25) 0%, transparent 70%)", className: "absolute -top-20 -right-20 w-80 h-80", animate: { x: [0, -70, 50, -30, 0], y: [0, 50, -70, -40, 0], scale: [1, 1.05, 1.1, 0.95, 1] }, duration: 25 },
  { color: "radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)", className: "absolute -bottom-24 -left-16 w-72 h-72", animate: { x: [0, 60, -50, 40, 0], y: [0, 60, -40, 30, 0], scale: [1.05, 0.95, 1.1, 1, 1.05] }, duration: 22 },
  { color: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", className: "absolute -bottom-32 -right-24 w-96 h-96", animate: { x: [0, -60, 40, -80, 0], y: [0, -50, 70, -30, 0], scale: [1, 1.1, 0.95, 1.05, 1] }, duration: 28 },
];

export default function FloatingOrbs() {
  const { shouldAnimate } = useMotion();
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div key={i} className={`${orb.className} rounded-full`}
          style={{ background: orb.color, filter: "blur(100px)", opacity: 0.18 }}
          animate={shouldAnimate ? orb.animate : undefined}
          transition={shouldAnimate ? { duration: orb.duration, repeat: Infinity, ease: "easeInOut" } : undefined}
        />
      ))}
    </div>
  );
}
