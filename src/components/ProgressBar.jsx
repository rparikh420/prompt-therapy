import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";
import { STEP_NAMES } from "../../shared/content";

export default function ProgressBar({ currentStep }) {
  const { shouldAnimate, spring } = useMotion();
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-3 left-0 right-0 h-px bg-white/[0.06]" />
        {STEP_NAMES.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center relative z-10 flex-1">
              {i > 0 && (
                <motion.div className="absolute top-3 right-1/2 w-full h-px -z-10"
                  initial={{ backgroundColor: "transparent" }}
                  animate={{ backgroundColor: stepNum <= currentStep ? "rgba(139, 92, 246, 0.4)" : "transparent" }}
                  transition={shouldAnimate ? spring.gentle : { duration: 0 }}
                />
              )}
              <motion.div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                  isCompleted ? "bg-violet-500 border-violet-500 text-white"
                  : isCurrent ? "bg-violet-500 border-violet-400 text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                  : "bg-white/[0.04] border-white/[0.06] text-slate-500"
                }`}
                animate={shouldAnimate && isCurrent ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={shouldAnimate && isCurrent ? { duration: 0.4, type: "spring", stiffness: 200, damping: 10 } : { duration: 0 }}
              >
                {isCompleted ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : stepNum}
              </motion.div>
              <span className={`mt-2 text-[10px] font-medium tracking-wider uppercase ${
                isCurrent ? "text-violet-400" : isCompleted ? "text-slate-400" : "text-slate-600"
              }`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
