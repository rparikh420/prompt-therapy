import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GlassCard from "../components/GlassCard";
import TherapistChat from "../components/TherapistChat";
import { useJourney } from "../context/JourneyContext";

function JourneySummaryBadge({ intakeScore }) {
  if (intakeScore === null) return null;

  const severity =
    intakeScore <= 15 ? { label: "Mild", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.06]" }
    : intakeScore <= 25 ? { label: "Developing", color: "text-amber-400 border-amber-500/20 bg-amber-500/[0.06]" }
    : intakeScore <= 35 ? { label: "Full-Blown", color: "text-orange-400 border-orange-500/20 bg-orange-500/[0.06]" }
    : { label: "Terminal", color: "text-red-400 border-red-500/20 bg-red-500/[0.06]" };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", damping: 20 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${severity.color}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      Patient Score: {intakeScore}/40 — {severity.label}
    </motion.div>
  );
}

export default function TherapyPage() {
  const navigate = useNavigate();
  const { intakeScore, getJourneySummary } = useJourney();
  const summaryRef = useRef(null);

  useEffect(() => {
    summaryRef.current = getJourneySummary();
  }, [getJourneySummary]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-violet-400/40 font-medium">
          Post-Recovery Session
        </span>
        <h1 className="text-display-md text-slate-100 mt-1">The Couch</h1>
        <p className="text-sm text-slate-500 mt-1 mb-3">
          You survived 5 steps. Now talk about your feelings — to an AI, obviously.
        </p>
        <JourneySummaryBadge intakeScore={intakeScore} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 min-h-0"
      >
        <GlassCard className="flex flex-col h-[calc(100dvh-14rem)] overflow-hidden">
          <TherapistChat onReadyToGraduate={() => navigate("/graduation")} />
        </GlassCard>
      </motion.div>
    </div>
  );
}
