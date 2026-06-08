import AnimatedPressable from "./AnimatedPressable";

const variants = {
  primary: "bg-violet-600 text-white glow-violet hover:bg-violet-500",
  secondary: "bg-white/[0.04] text-white border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.06]",
  success: "bg-emerald-600 text-white glow-emerald hover:bg-emerald-500",
  ghost: "text-violet-400 hover:text-violet-300 hover:bg-white/[0.04]",
};

export default function Button({ children, variant = "primary", size = "md", loading = false, className = "", ...props }) {
  const sizeClasses = { sm: "px-5 py-2.5 text-sm", md: "px-7 py-3.5 text-base", lg: "px-10 py-4 text-lg" };
  return (
    <AnimatedPressable
      className={[
        "font-semibold rounded-full transition-colors duration-200",
        sizeClasses[size], variants[variant],
        loading ? "opacity-60 pointer-events-none" : "", className,
      ].filter(Boolean).join(" ")}
      disabled={loading} {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </span>
      ) : children}
    </AnimatedPressable>
  );
}
