import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", glow = false, as = "div", ...props }) {
  const baseClasses = [
    "backdrop-blur-xl rounded-2xl border",
    "bg-white/[0.06] border-white/[0.1]",
    "shadow-lg shadow-black/20",
    glow
      ? "transition-all duration-300 hover:border-white/[0.2] hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
      : "",
    className,
  ].filter(Boolean).join(" ");

  if (as === "motion") {
    return (
      <motion.div className={baseClasses} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}
