import { STEP_NAMES } from '../../shared/content';

export default function ProgressBar({ currentStep }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-3 left-0 right-0 h-px bg-white/[0.08]" />
        {STEP_NAMES.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center relative z-10 flex-1">
              {i > 0 && (
                <div className={`absolute top-3 right-1/2 w-full h-px -z-10 transition-colors duration-500 ${stepNum <= currentStep ? "bg-violet-500/60" : "bg-transparent"}`} />
              )}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
                isCompleted ? "bg-violet-500 border-violet-500 text-white"
                  : isCurrent ? "bg-violet-500 border-violet-400 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                  : "bg-white/[0.05] border-white/[0.1] text-slate-500"
              }`}>
                {isCompleted ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : stepNum}
              </div>
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
