import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";

const questions = [
  {
    id: 1,
    type: "slider",
    question: "How many AI tabs do you have open right now?",
    subtitle: "Be honest. We can see your browser.",
    min: 0,
    max: 20,
    labels: { 0: "0", 5: "5", 10: "10", 15: "15", 20: "20+" },
    getScore: (val) => Math.round((val / 20) * 10),
  },
  {
    id: 2,
    type: "choice",
    question: "When you get an error, what's your first instinct?",
    subtitle: "No judgment. Okay, maybe a little judgment.",
    options: [
      { label: "Read the error message", score: 2, emoji: "🔍" },
      { label: "Google it", score: 4, emoji: "🔎" },
      { label: "Paste it into Claude", score: 8, emoji: "🤖" },
      { label: "Paste it into Claude AND ChatGPT simultaneously", score: 10, emoji: "🚨" },
    ],
  },
  {
    id: 3,
    type: "choice",
    question: "Have you ever asked AI to write a commit message?",
    subtitle: "Co-Authored-By: Your Conscience",
    options: [
      { label: "Never", score: 1, emoji: "😇" },
      { label: "Once or twice", score: 4, emoji: "😅" },
      { label: "It's my co-author on every commit", score: 8, emoji: "🫣" },
      { label: "I asked it to write this answer", score: 10, emoji: "💀" },
    ],
  },
  {
    id: 4,
    type: "choice",
    question: "When was the last time you wrote code without AI assistance?",
    subtitle: "Take your time. We'll wait.",
    options: [
      { label: "Today", score: 2, emoji: "💪" },
      { label: "This week", score: 4, emoji: "😬" },
      { label: "I genuinely can't remember", score: 8, emoji: "😶" },
      { label: 'What does "without AI" mean?', score: 10, emoji: "☠️" },
    ],
  },
];

const diagnoses = [
  {
    max: 15,
    label: "Mild Curiosity",
    description: "You're fine. You use AI like a normal person. But the fact that you're HERE means you suspect something...",
    color: "text-emerald-400",
    bgClass: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    max: 25,
    label: "Developing Dependency",
    description: 'You tell yourself you could stop anytime. You just choose not to. That\'s literally what every addict says, but sure, you\'re "different."',
    color: "text-amber-400",
    bgClass: "bg-amber-500/10 border-amber-500/20",
  },
  {
    max: 35,
    label: "Full-Blown Addiction",
    description: "You haven't typed a for-loop in months. Your Stack Overflow reputation is gathering dust. Your IDE autocomplete feels personally insulted.",
    color: "text-orange-400",
    bgClass: "bg-orange-500/10 border-orange-500/20",
  },
  {
    max: Infinity,
    label: "Terminal Promptitis",
    description: 'This is the worst case we\'ve ever seen. You probably asked AI to fill out this form for you. Did you? DID YOU? ...You\'re thinking about pasting this diagnosis into Claude right now, aren\'t you.',
    color: "text-red-400",
    bgClass: "bg-red-500/10 border-red-500/20",
  },
];

function getDiagnosis(score) {
  return diagnoses.find((d) => score <= d.max);
}

function ProgressDots({ current, total }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            i === current
              ? "bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              : i < current
                ? "bg-violet-500/50"
                : "bg-white/10"
          }`}
          animate={i === current ? { scale: [1, 1.4, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      ))}
    </div>
  );
}

function SliderQuestion({ question, value, onChange }) {
  return (
    <div className="space-y-6">
      <div className="relative pt-2">
        <input
          type="range"
          min={question.min}
          max={question.max}
          value={value ?? 0}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-emerald-500/40 via-amber-500/40 via-orange-500/40 to-red-500/40"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
          {Object.entries(question.labels).map(([val, label]) => (
            <span key={val}>{label}</span>
          ))}
        </div>
      </div>
      <motion.div key={value} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <span className="text-5xl font-bold text-gradient">{value ?? 0}</span>
        <p className="text-slate-500 text-sm mt-1">
          {(value ?? 0) === 0 ? "Suspiciously low..." : (value ?? 0) < 5 ? "That's... reasonable, actually." : (value ?? 0) < 10 ? "Getting concerning." : (value ?? 0) < 15 ? "Sir/Ma'am, this is a Wendy's." : "You need an intervention."}
        </p>
      </motion.div>
    </div>
  );
}

function ChoiceQuestion({ question, value, onChange }) {
  return (
    <div className="space-y-3">
      {question.options.map((option, i) => {
        const isSelected = value === i;
        return (
          <motion.button
            key={i}
            onClick={() => onChange(i)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full text-left p-4 rounded-xl border backdrop-blur-sm transition-all duration-200 cursor-pointer ${
              isSelected
                ? "border-violet-500/50 bg-violet-500/10 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06]"
            }`}
          >
            <span className="text-xl mr-3">{option.emoji}</span>
            <span className={`text-base ${isSelected ? "text-violet-300 font-semibold" : "text-slate-300"}`}>
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function IntakeForm() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQ];
  const isLastQuestion = currentQ === questions.length - 1;
  const currentAnswer = answers[currentQ];
  const hasAnswer = currentAnswer !== undefined;

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [currentQ]: value }));
  }

  function getQuestionScore(qIndex) {
    const q = questions[qIndex];
    const ans = answers[qIndex];
    if (ans === undefined) return 0;
    if (q.type === "slider") return q.getScore(ans);
    return q.options[ans].score;
  }

  function handleNext() {
    if (isLastQuestion) {
      const totalScore = questions.reduce((sum, _, i) => sum + getQuestionScore(i), 0);
      setScore(totalScore);
      setShowDiagnosis(true);
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  }

  function handleStartRecovery() {
    navigate(`/step/1?score=${score}`);
  }

  const diagnosis = getDiagnosis(score);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full">
        <AnimatePresence mode="wait">
          {!showDiagnosis ? (
            <motion.div
              key={`question-${currentQ}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ProgressDots current={currentQ} total={questions.length} />
              <GlassCard className="p-8">
                <p className="text-xs text-violet-400 font-medium mb-2 uppercase tracking-[0.15em]">
                  Question {currentQ + 1} of {questions.length}
                </p>
                <h2 className="text-display-md text-slate-100 mb-2">{question.question}</h2>
                <p className="text-sm text-slate-500 mb-6 italic">{question.subtitle}</p>
                {question.type === "slider" ? (
                  <SliderQuestion question={question} value={currentAnswer} onChange={handleAnswer} />
                ) : (
                  <ChoiceQuestion question={question} value={currentAnswer} onChange={handleAnswer} />
                )}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    disabled={currentQ === 0}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      currentQ === 0 ? "text-slate-600 cursor-not-allowed" : "text-violet-400 hover:bg-white/[0.05]"
                    }`}
                  >
                    Back
                  </button>
                  <Button
                    onClick={handleNext}
                    disabled={!hasAnswer && question.type !== "slider"}
                    variant={hasAnswer || question.type === "slider" ? "primary" : "secondary"}
                    size="sm"
                  >
                    {isLastQuestion ? "Get My Diagnosis" : "Next"}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="diagnosis"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <GlassCard className="p-8 text-center">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <p className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-2">Your Diagnosis</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 200 }}>
                  <p className="text-6xl font-black text-gradient mb-2">{score}</p>
                  <p className="text-sm text-slate-500 mb-4">out of 40</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className={`rounded-xl border p-5 mb-6 ${diagnosis.bgClass}`}>
                  <h3 className={`text-2xl font-bold mb-2 ${diagnosis.color}`}>{diagnosis.label}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{diagnosis.description}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
                  <Button onClick={handleStartRecovery} size="lg" className="w-full">Start Recovery</Button>
                  <p className="text-xs text-slate-600 mt-3">Don't worry, we'll use AI to cure your AI addiction. The irony is part of the therapy.</p>
                </motion.div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
