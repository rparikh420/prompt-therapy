import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import MiniConfetti from "../components/MiniConfetti";
import { STEPS } from '../../shared/content';

function BreathingCircle() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <motion.div
        className="rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(244,63,94,0.2) 60%, transparent 70%)" }}
        animate={{
          width: [80, 160, 80], height: [80, 160, 80], opacity: [0.5, 1, 0.5],
          boxShadow: ["0 0 30px rgba(139,92,246,0.2)", "0 0 60px rgba(139,92,246,0.4)", "0 0 30px rgba(139,92,246,0.2)"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.p className="text-slate-500 text-sm font-medium" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        Breathe in... and out...
      </motion.p>
    </div>
  );
}

function StepInput({ step, value, onChange }) {
  const inputClasses = "w-full px-4 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all";

  switch (step.inputType) {
    case "text":
      return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={step.inputPlaceholder} className={inputClasses} />;
    case "textarea":
      return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={step.inputPlaceholder} rows={5} className={`${inputClasses} resize-none`} />;
    case "checkboxes":
      return (
        <div className="flex flex-col gap-3">
          {step.checkboxOptions.map((option) => {
            const checked = Array.isArray(value) && value.includes(option);
            return (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={checked} onChange={() => {
                  const current = Array.isArray(value) ? value : [];
                  onChange(checked ? current.filter((v) => v !== option) : [...current, option]);
                }} className="w-5 h-5 rounded border-white/20 bg-white/[0.05] text-violet-500 focus:ring-violet-500/30 accent-violet-500" />
                <span className="text-slate-300 group-hover:text-violet-300 transition-colors">{option}</span>
              </label>
            );
          })}
        </div>
      );
    case "pledge":
      return (
        <GlassCard className="p-6">
          <p className="text-center text-[10px] text-slate-500 uppercase tracking-[0.3em] mb-4 font-semibold">Official Pledge of Digital Sobriety</p>
          <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={step.inputPlaceholder} rows={5} className={`${inputClasses} font-serif italic resize-none`} />
          <p className="text-right text-xs text-slate-600 mt-2">Signed this day, in full clarity of mind (probably)</p>
        </GlassCard>
      );
    case "breathing":
      return <BreathingCircle />;
    default:
      return null;
  }
}

export default function RecoveryStep() {
  const { step: stepParam } = useParams();
  const navigate = useNavigate();
  const stepNumber = parseInt(stepParam, 10);
  const stepIndex = stepNumber - 1;
  const step = STEPS[stepIndex];
  const [inputValues, setInputValues] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => { setShowCelebration(false); }, [stepNumber]);

  if (!step) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-slate-400 mb-4">Step not found. You okay?</p>
          <Link to="/" className="text-violet-400 underline hover:text-violet-300">Go home</Link>
        </div>
      </div>
    );
  }

  const currentValue = inputValues[stepNumber] ?? "";
  const handleNext = () => {
    setShowCelebration(true);
    setTimeout(() => {
      if (stepNumber < STEPS.length) {
        navigate(`/step/${stepNumber + 1}`);
      } else {
        navigate("/therapy");
      }
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col relative">
      <MiniConfetti show={showCelebration} />
      <ProgressBar currentStep={stepNumber} />
      <div className="flex-1 flex items-start justify-center pt-4">
        <motion.div key={stepNumber} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full">
          <GlassCard className="p-8 md:p-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
              <h1 className="text-display-md text-slate-100 mb-1">{step.title}</h1>
              <p className="text-lg text-violet-400 font-medium mb-6">{step.subtitle}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.4 }} className="border-l-2 border-rose-500/50 bg-rose-500/[0.06] rounded-r-lg px-5 py-4 mb-8">
              <p className="text-slate-400 italic leading-relaxed text-sm">"{step.quote}"</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="mb-8">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">Exercise</h2>
              <p className="text-slate-400 mb-5 leading-relaxed text-sm">{step.exercise}</p>
              <StepInput step={step} value={currentValue} onChange={(val) => setInputValues((prev) => ({ ...prev, [stepNumber]: val }))} />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.4 }} className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              {stepNumber > 1 ? (
                <Link to={`/step/${stepNumber - 1}`} className="text-slate-500 hover:text-violet-400 transition-colors text-sm font-medium">&larr; Previous Step</Link>
              ) : <div />}
              <Button onClick={handleNext} size="sm">
                {stepNumber < STEPS.length ? "I'm Ready to Move On" : "Talk to Your Therapist"}
              </Button>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
