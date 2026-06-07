import { motion } from "framer-motion";

export default function QuoteCard({ quote, attribution }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="backdrop-blur-xl bg-white/[0.04] rounded-xl border-l-2 border-rose-500/50 border-r border-t border-b border-r-white/[0.06] border-t-white/[0.06] border-b-white/[0.06] p-6 my-4"
    >
      <p className="text-slate-300 italic text-lg leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <p className="mt-3 text-sm text-slate-500 font-medium">
          &mdash; {attribution}
        </p>
      )}
    </motion.div>
  );
}
