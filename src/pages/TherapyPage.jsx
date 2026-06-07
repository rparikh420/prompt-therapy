import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import TherapistChat from "../components/TherapistChat";

export default function TherapyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-violet-400/60 font-medium">
          Post-Recovery Session
        </span>
        <h1 className="text-display-md text-slate-100 mt-1">The Couch</h1>
        <p className="text-sm text-slate-500 mt-1">
          You survived 5 steps. Now talk about your feelings — to an AI, obviously.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 min-h-0"
      >
        <GlassCard className="flex flex-col h-[calc(100vh-14rem)] overflow-hidden">
          <TherapistChat onReadyToGraduate={() => navigate("/graduation")} />
        </GlassCard>
      </motion.div>
    </div>
  );
}
