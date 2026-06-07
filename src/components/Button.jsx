import { motion } from "framer-motion";

const variants = {
  primary: "bg-violet-600 text-white glow-violet hover:bg-violet-500",
  secondary: "bg-white/[0.06] text-white border border-white/[0.15] hover:border-white/[0.3] hover:bg-white/[0.1]",
  success: "bg-emerald-600 text-white glow-emerald hover:bg-emerald-500",
  ghost: "text-violet-400 hover:text-violet-300 hover:bg-white/[0.05]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={[
        "font-semibold rounded-full cursor-pointer transition-all duration-300",
        sizeClasses[size],
        variants[variant],
        loading ? "opacity-70 pointer-events-none" : "",
        className,
      ].filter(Boolean).join(" ")}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
