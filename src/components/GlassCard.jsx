import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";

export default function GlassCard({ children, className = "", glow = false, interactive = false, ...props }) {
  const { shouldAnimate, spring } = useMotion();
  const baseClasses = [
    "backdrop-blur-xl rounded-2xl border",
    "bg-white/[0.04] border-white/[0.06]",
    "shadow-lg shadow-black/20",
    glow ? "transition-all duration-200 hover:border-white/[0.12] hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]" : "",
    className,
  ].filter(Boolean).join(" ");

  if (interactive && shouldAnimate) {
    return <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }} transition={spring.press} className={baseClasses} {...props}>{children}</motion.div>;
  }
  return <div className={baseClasses} {...props}>{children}</div>;
}
