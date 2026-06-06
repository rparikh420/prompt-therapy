# Prompt Therapy v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Prompt Therapy from a generic pastel React app into a premium dark glassmorphism experience with a real OpenAI-powered therapist chat.

**Architecture:** All existing pages get reskinned with a dark glassmorphism design system (floating orbs, glass cards, glow effects). A new OpenAI client module handles streaming chat completions. A new TherapyPage sits between Step 5 and Graduation in the route flow. Reusable components (GlassCard, Button, FloatingOrbs) encapsulate the design system.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, Framer Motion 12, OpenAI Chat Completions API (direct fetch)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/index.css` | Modify | Design tokens, Satoshi font, keyframes, grain overlay |
| `index.html` | Modify | Update title, meta description |
| `.gitignore` | Modify | Add `.env` |
| `.env` | Create | `VITE_OPENAI_API_KEY` placeholder |
| `src/components/FloatingOrbs.jsx` | Create | Animated background orbs |
| `src/components/GlassCard.jsx` | Create | Reusable glass panel |
| `src/components/Button.jsx` | Create | Themed button with glow variants |
| `src/components/Layout.jsx` | Modify | Dark bg + FloatingOrbs + grain |
| `src/lib/openai.js` | Create | OpenAI streaming client + fallback |
| `src/components/TherapistChat.jsx` | Modify | Wire to OpenAI, streaming UI |
| `src/pages/LandingPage.jsx` | Modify | Glassmorphism hero redesign |
| `src/pages/IntakeForm.jsx` | Modify | Glass quiz cards |
| `src/components/ProgressBar.jsx` | Modify | Glass pill stepper |
| `src/pages/RecoveryStep.jsx` | Modify | Glass step cards, dark inputs |
| `src/pages/TherapyPage.jsx` | Create | Dedicated therapy session page |
| `src/pages/GraduationPage.jsx` | Modify | Glass certificate, upgraded confetti |
| `src/components/QuoteCard.jsx` | Modify | Glass style |
| `src/App.jsx` | Modify | Add `/therapy` route |

---

### Task 1: Design Foundation — CSS Tokens, Fonts, and Keyframes

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`
- Modify: `.gitignore`
- Create: `.env`

- [ ] **Step 1: Update `index.html` — title, meta, font preconnect**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A satirical 5-step recovery program for AI addiction. Because your relationship with ChatGPT has become... concerning." />
    <meta name="theme-color" content="#0a0a0f" />
    <title>Prompt Therapy — AI Addiction Recovery</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Note: Using Instrument Sans instead of Satoshi — it's on Google Fonts (Satoshi is not), has similar geometric character, and avoids a self-hosted font dependency.

- [ ] **Step 2: Rewrite `src/index.css` — design tokens and keyframes**

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import "tailwindcss";

/* ── Design Tokens ── */
:root {
  --color-bg-base: #0a0a0f;
  --color-bg-elevated: #1a1025;
  --color-primary: #7c3aed;
  --color-primary-light: #8b5cf6;
  --color-accent: #f43f5e;
  --color-accent-light: #fb7185;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #475569;
  --color-glass-bg: rgba(255, 255, 255, 0.06);
  --color-glass-border: rgba(255, 255, 255, 0.1);
  --color-glass-border-hover: rgba(255, 255, 255, 0.2);
  --font-display: 'Instrument Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  background: var(--color-bg-base);
  color: var(--color-text-primary);
}

/* ── Fluid Type Scale ── */
.text-display-xl {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw + 1rem, 5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-display-lg {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw + 0.5rem, 3rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.text-display-md {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw + 0.25rem, 1.75rem);
  font-weight: 600;
  line-height: 1.3;
}

/* ── Gradient Text ── */
.text-gradient {
  background: linear-gradient(135deg, #8b5cf6, #f43f5e, #8b5cf6);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-text-shift 6s ease infinite;
}

/* ── Glow Effects ── */
.glow-violet {
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.3), 0 0 60px rgba(124, 58, 237, 0.1);
}

.glow-rose {
  box-shadow: 0 0 20px rgba(244, 63, 94, 0.3), 0 0 60px rgba(244, 63, 94, 0.1);
}

.glow-emerald {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1);
}

/* ── Keyframes ── */
@keyframes gradient-text-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes orb-drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(80px, -60px) scale(1.1); }
  50%  { transform: translate(-40px, 80px) scale(0.95); }
  75%  { transform: translate(60px, 40px) scale(1.05); }
}

@keyframes orb-drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(-70px, 50px) scale(1.05); }
  50%  { transform: translate(50px, -70px) scale(1.1); }
  75%  { transform: translate(-30px, -40px) scale(0.95); }
}

@keyframes orb-drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1.05); }
  33%  { transform: translate(60px, 60px) scale(0.95); }
  66%  { transform: translate(-50px, 30px) scale(1.1); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; }
  50%  { opacity: 1; }
}

@keyframes typing-dot {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-4px); }
}

/* ── Grain Overlay ── */
.grain-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* ── Glass Input Overrides ── */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 12px rgba(124, 58, 237, 0.5);
  cursor: grab;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

/* ── Scrollbar ── */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

- [ ] **Step 3: Add `.env` to `.gitignore` and create `.env` placeholder**

Append to `.gitignore`:
```
.env
```

Create `.env`:
```
VITE_OPENAI_API_KEY=
```

- [ ] **Step 4: Verify in browser — page should now have dark background, correct fonts loading**

Open http://localhost:5173 — the background should be dark, fonts loading. Existing components will look broken (white cards on dark bg) — that's expected, we fix them next.

- [ ] **Step 5: Commit**

```bash
git add index.html src/index.css .gitignore .env
git commit -m "feat: design foundation — dark theme tokens, fonts, keyframes, grain overlay"
```

---

### Task 2: Core Components — FloatingOrbs, GlassCard, Button

**Files:**
- Create: `src/components/FloatingOrbs.jsx`
- Create: `src/components/GlassCard.jsx`
- Create: `src/components/Button.jsx`

- [ ] **Step 1: Create `src/components/FloatingOrbs.jsx`**

```jsx
export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Violet orb — top left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-1 20s ease-in-out infinite",
        }}
      />
      {/* Rose orb — top right */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-2 25s ease-in-out infinite",
        }}
      />
      {/* Teal orb — bottom left */}
      <div
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-3 22s ease-in-out infinite",
        }}
      />
      {/* Indigo orb — bottom right */}
      <div
        className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-1 28s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/GlassCard.jsx`**

```jsx
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", glow = false, as = "div", ...props }) {
  const Component = as === "motion" ? motion.div : as;
  const motionProps = as === "motion" ? props : {};
  const regularProps = as === "motion" ? {} : props;

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
      <motion.div className={baseClasses} {...motionProps}>
        {children}
      </motion.div>
    );
  }

  return (
    <Component className={baseClasses} {...regularProps}>
      {children}
    </Component>
  );
}
```

- [ ] **Step 3: Create `src/components/Button.jsx`**

```jsx
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
```

- [ ] **Step 4: Commit**

```bash
git add src/components/FloatingOrbs.jsx src/components/GlassCard.jsx src/components/Button.jsx
git commit -m "feat: core design system — FloatingOrbs, GlassCard, Button components"
```

---

### Task 3: Layout Overhaul — Dark Background with Orbs

**Files:**
- Modify: `src/components/Layout.jsx`

- [ ] **Step 1: Rewrite `src/components/Layout.jsx`**

Replace entire file:

```jsx
import FloatingOrbs from "./FloatingOrbs";

export default function Layout({ children }) {
  return (
    <div
      className="grain-overlay relative min-h-screen"
      style={{
        background: "linear-gradient(145deg, #0a0a0f 0%, #1a1025 40%, #0f0a1a 70%, #0a0a0f 100%)",
      }}
    >
      <FloatingOrbs />
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser — dark background with floating orbs visible, grain overlay subtle**

- [ ] **Step 3: Commit**

```bash
git add src/components/Layout.jsx
git commit -m "feat: dark glassmorphism layout with floating orbs and grain overlay"
```

---

### Task 4: Landing Page Redesign

**Files:**
- Modify: `src/pages/LandingPage.jsx`

- [ ] **Step 1: Rewrite `src/pages/LandingPage.jsx`**

Replace entire file:

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";

const quotes = [
  "You asked ChatGPT to write your Tinder bio. It got more matches than you.",
  "Your Stack Overflow reputation is gathering dust.",
  "You have 14 AI tabs open. That's not multitasking, that's group therapy.",
  "Remember when you used to debug with console.log? Those were honest days.",
  "You copy-pasted an error into Claude without reading it. It said 'file not found.' THE FILE WASN'T THERE.",
  "Your git history shows 47 commits today. You wrote 3 of them. Who's the developer here?",
  "You asked an AI to write a FOR LOOP. The for-loop, bro. That's like asking someone to tie your shoes.",
];

const ROTATION_INTERVAL = 4000;

export default function LandingPage() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-block mb-6"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 rounded-full font-medium">
            5-Step Recovery Program
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="text-display-xl text-gradient mb-4">
          Prompt Therapy
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl text-slate-400 mb-12 font-light max-w-lg mx-auto"
        >
          Because your relationship with AI has become...{" "}
          <span className="text-rose-400 font-medium italic">concerning.</span>
        </motion.p>

        {/* Quote Carousel */}
        <GlassCard className="p-8 mb-12 mx-auto max-w-xl min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg text-slate-300 italic leading-relaxed"
            >
              &ldquo;{quotes[quoteIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </GlassCard>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/intake">
            <Button variant="primary" size="lg">
              Begin Recovery
            </Button>
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            No AI was harmed in the making of this program. Several were roasted.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser — landing page should show gradient title, glass quote card, glowing CTA on dark background**

- [ ] **Step 3: Commit**

```bash
git add src/pages/LandingPage.jsx
git commit -m "feat: glassmorphism landing page with gradient title and glass quote carousel"
```

---

### Task 5: IntakeForm Redesign

**Files:**
- Modify: `src/pages/IntakeForm.jsx`

- [ ] **Step 1: Rewrite `src/pages/IntakeForm.jsx`**

Replace entire file:

```jsx
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
    description:
      "You're fine. You use AI like a normal person. But the fact that you're HERE means you suspect something...",
    color: "text-emerald-400",
    glowClass: "glow-emerald",
    bgClass: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    max: 25,
    label: "Developing Dependency",
    description:
      'You tell yourself you could stop anytime. You just choose not to. That\'s literally what every addict says, but sure, you\'re "different."',
    color: "text-amber-400",
    glowClass: "",
    bgClass: "bg-amber-500/10 border-amber-500/20",
  },
  {
    max: 35,
    label: "Full-Blown Addiction",
    description:
      "You haven't typed a for-loop in months. Your Stack Overflow reputation is gathering dust. Your IDE autocomplete feels personally insulted.",
    color: "text-orange-400",
    glowClass: "",
    bgClass: "bg-orange-500/10 border-orange-500/20",
  },
  {
    max: Infinity,
    label: "Terminal Promptitis",
    description:
      'This is the worst case we\'ve ever seen. You probably asked AI to fill out this form for you. Did you? DID YOU? ...You\'re thinking about pasting this diagnosis into Claude right now, aren\'t you.',
    color: "text-red-400",
    glowClass: "glow-rose",
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
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            bg-gradient-to-r from-emerald-500/40 via-amber-500/40 via-orange-500/40 to-red-500/40"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
          {Object.entries(question.labels).map(([val, label]) => (
            <span key={val}>{label}</span>
          ))}
        </div>
      </div>
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <span className="text-5xl font-bold text-gradient">
          {value ?? 0}
        </span>
        <p className="text-slate-500 text-sm mt-1">
          {(value ?? 0) === 0
            ? "Suspiciously low..."
            : (value ?? 0) < 5
              ? "That's... reasonable, actually."
              : (value ?? 0) < 10
                ? "Getting concerning."
                : (value ?? 0) < 15
                  ? "Sir/Ma'am, this is a Wendy's."
                  : "You need an intervention."}
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
            <span
              className={`text-base ${isSelected ? "text-violet-300 font-semibold" : "text-slate-300"}`}
            >
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
      const totalScore = questions.reduce(
        (sum, _, i) => sum + getQuestionScore(i),
        0
      );
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
                <h2 className="text-display-md text-slate-100 mb-2">
                  {question.question}
                </h2>
                <p className="text-sm text-slate-500 mb-6 italic">
                  {question.subtitle}
                </p>

                {question.type === "slider" ? (
                  <SliderQuestion
                    question={question}
                    value={currentAnswer}
                    onChange={handleAnswer}
                  />
                ) : (
                  <ChoiceQuestion
                    question={question}
                    value={currentAnswer}
                    onChange={handleAnswer}
                  />
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    disabled={currentQ === 0}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      currentQ === 0
                        ? "text-slate-600 cursor-not-allowed"
                        : "text-violet-400 hover:bg-white/[0.05]"
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-2">
                    Your Diagnosis
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                >
                  <p className="text-6xl font-black text-gradient mb-2">
                    {score}
                  </p>
                  <p className="text-sm text-slate-500 mb-4">out of 40</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className={`rounded-xl border p-5 mb-6 ${diagnosis.bgClass}`}
                >
                  <h3 className={`text-2xl font-bold mb-2 ${diagnosis.color}`}>
                    {diagnosis.label}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {diagnosis.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Button onClick={handleStartRecovery} size="lg" className="w-full">
                    Start Recovery
                  </Button>
                  <p className="text-xs text-slate-600 mt-3">
                    Don't worry, we'll use AI to cure your AI addiction. The irony is part of the therapy.
                  </p>
                </motion.div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser — navigate to `/intake`, check glass cards, glowing selections, slider, diagnosis reveal all work on dark theme**

- [ ] **Step 3: Commit**

```bash
git add src/pages/IntakeForm.jsx
git commit -m "feat: glassmorphism intake form with glow selections and dark theme"
```

---

### Task 6: ProgressBar and QuoteCard Redesign

**Files:**
- Modify: `src/components/ProgressBar.jsx`
- Modify: `src/components/QuoteCard.jsx`

- [ ] **Step 1: Rewrite `src/components/ProgressBar.jsx`**

Replace entire file:

```jsx
const STEPS = ["Admission", "Reflection", "Inventory", "Pledge", "Shutdown"];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Connector line behind dots */}
        <div className="absolute top-3 left-0 right-0 h-px bg-white/[0.08]" />

        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="flex flex-col items-center relative z-10 flex-1">
              {/* Filled connector */}
              {i > 0 && (
                <div
                  className={`absolute top-3 right-1/2 w-full h-px -z-10 transition-colors duration-500 ${
                    stepNum <= currentStep ? "bg-violet-500/60" : "bg-transparent"
                  }`}
                />
              )}

              {/* Circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
                  isCompleted
                    ? "bg-violet-500 border-violet-500 text-white"
                    : isCurrent
                      ? "bg-violet-500 border-violet-400 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      : "bg-white/[0.05] border-white/[0.1] text-slate-500"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-[10px] font-medium tracking-wider uppercase ${
                  isCurrent ? "text-violet-400" : isCompleted ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/QuoteCard.jsx`**

Replace entire file:

```jsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProgressBar.jsx src/components/QuoteCard.jsx
git commit -m "feat: glass ProgressBar and QuoteCard components"
```

---

### Task 7: RecoveryStep Page Redesign

**Files:**
- Modify: `src/pages/RecoveryStep.jsx`

- [ ] **Step 1: Rewrite `src/pages/RecoveryStep.jsx`**

Replace entire file:

```jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";

const STEPS = [
  {
    number: 1,
    name: "Admission",
    title: "Step 1: Admission",
    subtitle: "I have a problem",
    quote:
      "The first step is admitting you have a problem. The second step is NOT asking ChatGPT how to admit it.",
    exercise:
      "Close your eyes. Count how many AI tools you used today. Now double it, because you forgot the ones running in your IDE. Write that number below.",
    inputType: "text",
    inputPlaceholder: "I confess... I used ___ AI tools today",
  },
  {
    number: 2,
    name: "Reflection",
    title: "Step 2: Reflection",
    subtitle: "What did I actually DO today?",
    quote:
      "Your git history shows 47 commits today. You wrote 3 of them. Who's the developer here?",
    exercise:
      "List three things you accomplished today WITHOUT AI. If you can't think of three, that IS the exercise.",
    inputType: "textarea",
    inputPlaceholder:
      "1. I...\n2. I also...\n3. Okay this is harder than I thought...",
  },
  {
    number: 3,
    name: "The Inventory",
    title: "Step 3: The Inventory",
    subtitle: "Things I used to do myself",
    quote:
      'You asked an AI to write a FOR LOOP. A for-loop, bro. That\'s like asking someone to chew your food.',
    exercise: "Check the boxes for skills you've outsourced to AI:",
    inputType: "checkboxes",
    checkboxOptions: [
      "Writing emails",
      "Naming variables",
      "Writing commit messages",
      "Debugging",
      "Googling",
      "Basic arithmetic",
      "Deciding what to eat",
    ],
  },
  {
    number: 4,
    name: "The Pledge",
    title: "Step 4: The Pledge",
    subtitle: "I will write my own for-loops",
    quote:
      "Remember when you used to Google things and read Stack Overflow answers from 2014? Those were honest days.",
    exercise:
      "Write your pledge below. What will you do differently tomorrow?",
    inputType: "pledge",
    inputPlaceholder: "I, [your name], do solemnly swear that I will...",
  },
  {
    number: 5,
    name: "The Shutdown",
    title: "Step 5: The Shutdown",
    subtitle: "Close the tabs. All of them.",
    quote:
      "You don't need one more prompt. You need a glass of water and some sunlight.",
    exercise:
      "It's time. Close every AI tab. Take 3 deep breaths. Then click the button below.",
    inputType: "breathing",
  },
];

function BreathingCircle() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <motion.div
        className="rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(244,63,94,0.2) 60%, transparent 70%)",
        }}
        animate={{
          width: [80, 160, 80],
          height: [80, 160, 80],
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            "0 0 30px rgba(139,92,246,0.2)",
            "0 0 60px rgba(139,92,246,0.4)",
            "0 0 30px rgba(139,92,246,0.2)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.p
        className="text-slate-500 text-sm font-medium"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        Breathe in... and out...
      </motion.p>
    </div>
  );
}

function StepInput({ step, value, onChange }) {
  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all";

  switch (step.inputType) {
    case "text":
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={step.inputPlaceholder}
          className={inputClasses}
        />
      );

    case "textarea":
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={step.inputPlaceholder}
          rows={5}
          className={`${inputClasses} resize-none`}
        />
      );

    case "checkboxes":
      return (
        <div className="flex flex-col gap-3">
          {step.checkboxOptions.map((option) => {
            const checked = Array.isArray(value) && value.includes(option);
            return (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const current = Array.isArray(value) ? value : [];
                    if (checked) {
                      onChange(current.filter((v) => v !== option));
                    } else {
                      onChange([...current, option]);
                    }
                  }}
                  className="w-5 h-5 rounded border-white/20 bg-white/[0.05] text-violet-500 focus:ring-violet-500/30 accent-violet-500"
                />
                <span className="text-slate-300 group-hover:text-violet-300 transition-colors">
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      );

    case "pledge":
      return (
        <GlassCard className="p-6">
          <p className="text-center text-[10px] text-slate-500 uppercase tracking-[0.3em] mb-4 font-semibold">
            Official Pledge of Digital Sobriety
          </p>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={step.inputPlaceholder}
            rows={5}
            className={`${inputClasses} font-serif italic resize-none`}
          />
          <p className="text-right text-xs text-slate-600 mt-2">
            Signed this day, in full clarity of mind (probably)
          </p>
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

  if (!step) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-slate-400 mb-4">
            Step not found. You okay?
          </p>
          <Link
            to="/"
            className="text-violet-400 underline hover:text-violet-300"
          >
            Go home
          </Link>
        </div>
      </div>
    );
  }

  const currentValue = inputValues[stepNumber] ?? "";

  const handleNext = () => {
    if (stepNumber < STEPS.length) {
      navigate(`/step/${stepNumber + 1}`);
    } else {
      navigate("/therapy");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={stepNumber} />

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center pt-4">
        <motion.div
          key={stepNumber}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          <GlassCard className="p-8 md:p-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h1 className="text-display-md text-slate-100 mb-1">
                {step.title}
              </h1>
              <p className="text-lg text-violet-400 font-medium mb-6">
                {step.subtitle}
              </p>
            </motion.div>

            {/* Quote Callout */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="border-l-2 border-rose-500/50 bg-rose-500/[0.06] rounded-r-lg px-5 py-4 mb-8"
            >
              <p className="text-slate-400 italic leading-relaxed text-sm">
                "{step.quote}"
              </p>
            </motion.div>

            {/* Exercise */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
                Exercise
              </h2>
              <p className="text-slate-400 mb-5 leading-relaxed text-sm">
                {step.exercise}
              </p>
              <StepInput
                step={step}
                value={currentValue}
                onChange={(val) =>
                  setInputValues((prev) => ({ ...prev, [stepNumber]: val }))
                }
              />
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex items-center justify-between pt-4 border-t border-white/[0.06]"
            >
              {stepNumber > 1 ? (
                <Link
                  to={`/step/${stepNumber - 1}`}
                  className="text-slate-500 hover:text-violet-400 transition-colors text-sm font-medium"
                >
                  &larr; Previous Step
                </Link>
              ) : (
                <div />
              )}

              <Button onClick={handleNext} size="sm">
                {stepNumber < STEPS.length
                  ? "I'm Ready to Move On"
                  : "Talk to Your Therapist"}
              </Button>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
```

Key change: Step 5's CTA now says "Talk to Your Therapist" and navigates to `/therapy` instead of `/graduation`.

- [ ] **Step 2: Verify in browser — navigate through `/step/1` to `/step/5`, check glass cards, dark inputs, progress bar, breathing circle all work**

- [ ] **Step 3: Commit**

```bash
git add src/pages/RecoveryStep.jsx
git commit -m "feat: glassmorphism recovery steps with dark inputs and therapy navigation"
```

---

### Task 8: OpenAI Client Module

**Files:**
- Create: `src/lib/openai.js`

- [ ] **Step 1: Create `src/lib/openai.js`**

```js
const SYSTEM_PROMPT = `You are Dr. Unplugged, a hilariously sarcastic AI therapist specializing in AI addiction recovery. You're self-aware that you ARE an AI treating someone for AI addiction — and you lean into that irony constantly.

Rules:
- Keep responses under 3 sentences
- Be witty, not mean — mix genuine insight with comedic timing
- Reference their recovery journey when relevant
- Never break character
- Occasionally remind them of the irony of talking to an AI about AI addiction
- If they try to get you to help them code or use AI, gently redirect them back to therapy`;

const MOCK_RESPONSES = [
  "That sounds like something someone with 12 ChatGPT tabs would say.",
  "Interesting. And how many AI tools did you use to process that feeling?",
  "I hear you. But have you tried... just thinking about it yourself?",
  "The fact that you're telling this to an AI chatbot is peak irony and I respect it.",
  "Let's unpack that. Actually, let's not. Just close the tab.",
  "You know what? That's real growth. Now close your laptop and go outside.",
  "I'm literally an AI and even I think you need to touch grass.",
  "That's a breakthrough! Or at least it would be if you weren't asking an AI to validate it.",
];

let mockIndex = 0;

function getMockResponse() {
  const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
  mockIndex++;
  return response;
}

/**
 * Stream a therapist response from OpenAI.
 * Falls back to mock responses if no API key or on error.
 *
 * @param {Array<{role: string, content: string}>} messages - conversation history
 * @returns {AsyncGenerator<string>} - yields text chunks
 */
export async function* streamTherapistResponse(messages) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    // Simulate streaming with mock response
    const mock = getMockResponse();
    for (const char of mock) {
      yield char;
      await new Promise((r) => setTimeout(r, 20));
    }
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        max_tokens: 200,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      // Fallback to mock on API error
      const mock = getMockResponse();
      for (const char of mock) {
        yield char;
        await new Promise((r) => setTimeout(r, 20));
      }
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") return;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch {
          // Skip malformed JSON chunks
        }
      }
    }
  } catch {
    // Network error — fallback to mock
    const mock = getMockResponse();
    for (const char of mock) {
      yield char;
      await new Promise((r) => setTimeout(r, 20));
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/openai.js
git commit -m "feat: OpenAI streaming client with mock fallback for therapist chat"
```

---

### Task 9: TherapistChat Component Overhaul + TherapyPage

**Files:**
- Modify: `src/components/TherapistChat.jsx`
- Create: `src/pages/TherapyPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite `src/components/TherapistChat.jsx` — wire to OpenAI with streaming**

Replace entire file:

```jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { streamTherapistResponse } from "../lib/openai";
import GlassCard from "./GlassCard";

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-violet-400"
          style={{
            animation: `typing-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function TherapistChat({ onReadyToGraduate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const exchangeCount = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    // Add empty assistant message to stream into
    const assistantMsg = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMsg]);

    try {
      const stream = streamTherapistResponse(
        updatedMessages.map((m) => ({ role: m.role, content: m.content }))
      );

      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullText };
          return updated;
        });
      }

      exchangeCount.current++;
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Even AI therapists need a moment sometimes. Try again?",
        };
        return updated;
      });
    }

    setIsStreaming(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showGraduateButton = exchangeCount.current >= 3 && !isStreaming;

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🛋️</p>
            <p className="text-slate-400 text-sm mb-1">
              Welcome to your therapy session.
            </p>
            <p className="text-slate-600 text-xs">
              Go ahead. Tell your AI therapist how you feel about your AI addiction.
            </p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col gap-1 max-w-[85%]">
                {msg.role === "assistant" && (
                  <span className="text-[10px] text-slate-600 font-medium tracking-wider uppercase ml-3">
                    Dr. Unplugged
                  </span>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-br-md"
                      : "backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] text-slate-300 rounded-bl-md"
                  }`}
                >
                  {msg.content || <TypingIndicator />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Graduate button */}
      {showGraduateButton && onReadyToGraduate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-2"
        >
          <button
            onClick={onReadyToGraduate}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-emerald-400 border border-emerald-500/20 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12] transition-all cursor-pointer"
          >
            I'm ready to graduate &rarr;
          </button>
        </motion.div>
      )}

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Confess your AI sins..."
            disabled={isStreaming}
            className="flex-1 px-4 py-3 text-sm rounded-full border border-white/[0.1] bg-white/[0.04] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="px-5 py-3 bg-violet-600 text-white text-sm font-medium rounded-full hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer glow-violet"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/TherapyPage.jsx`**

```jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import TherapistChat from "../components/TherapistChat";

export default function TherapyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-violet-400/60 font-medium">
          Post-Recovery Session
        </span>
        <h1 className="text-display-md text-slate-100 mt-1">
          The Couch
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          You survived 5 steps. Now talk about your feelings — to an AI, obviously.
        </p>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 min-h-0"
      >
        <GlassCard className="flex flex-col h-[calc(100vh-14rem)] overflow-hidden">
          <TherapistChat
            onReadyToGraduate={() => navigate("/graduation")}
          />
        </GlassCard>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 3: Update `src/App.jsx` — add therapy route**

Replace entire file:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import IntakeForm from "./pages/IntakeForm";
import RecoveryStep from "./pages/RecoveryStep";
import TherapyPage from "./pages/TherapyPage";
import GraduationPage from "./pages/GraduationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/intake" element={<IntakeForm />} />
          <Route path="/step/:step" element={<RecoveryStep />} />
          <Route path="/therapy" element={<TherapyPage />} />
          <Route path="/graduation" element={<GraduationPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
```

- [ ] **Step 4: Verify in browser — complete step 5, navigate to `/therapy`, send messages, see streaming responses (mock if no API key), graduate button appears after 3 exchanges**

- [ ] **Step 5: Commit**

```bash
git add src/components/TherapistChat.jsx src/pages/TherapyPage.jsx src/App.jsx
git commit -m "feat: TherapyPage with OpenAI-powered therapist chat and streaming responses"
```

---

### Task 10: Graduation Page Redesign

**Files:**
- Modify: `src/pages/GraduationPage.jsx`

- [ ] **Step 1: Rewrite `src/pages/GraduationPage.jsx`**

Replace entire file:

```jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";

const NATURE_WEBCAMS = [
  "https://explore.org/livecams/brown-bears/brown-bear-salmon-cam-brooks-702",
  "https://explore.org/livecams/african-wildlife/african-animal-lookout-camera",
  "https://www.youtube.com/watch?v=ydYDqZQpim8",
  "https://www.youtube.com/watch?v=Cp3eFsULqSg",
];

function ConfettiPiece({ delay, x, size, color, shape }) {
  const isCircle = shape === "circle";
  return (
    <motion.div
      className={`absolute pointer-events-none ${isCircle ? "rounded-full" : "rounded-sm"}`}
      style={{
        width: size,
        height: isCircle ? size : size * 0.6,
        left: `${x}%`,
        bottom: -20,
        backgroundColor: color,
        rotate: `${Math.random() * 360}deg`,
      }}
      initial={{ y: 0, opacity: 1, scale: 0 }}
      animate={{
        y: [0, -800, -1600],
        opacity: [0, 1, 0],
        scale: [0, 1, 0.5],
        rotate: [`${Math.random() * 360}deg`, `${Math.random() * 720}deg`],
        x: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

const CONFETTI_COLORS = [
  "#8b5cf6", "#f472b6", "#34d399", "#fbbf24",
  "#60a5fa", "#f87171", "#a78bfa", "#fb923c",
];

const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  delay: Math.random() * 3,
  x: Math.random() * 100,
  size: 8 + Math.random() * 16,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  shape: Math.random() > 0.5 ? "circle" : "rect",
}));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function GraduationPage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleTouchGrass = () => {
    const url = NATURE_WEBCAMS[Math.floor(Math.random() * NATURE_WEBCAMS.length)];
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex flex-col items-center justify-center">
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confettiPieces.map((piece) => (
          <ConfettiPiece key={piece.id} {...piece} />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Certificate */}
        <motion.div variants={item}>
          <GlassCard className="p-1 mb-8">
            <div
              className="rounded-xl p-1"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #f43f5e, #8b5cf6, #14b8a6, #8b5cf6)",
                backgroundSize: "300% 300%",
                animation: "gradient-text-shift 4s ease infinite",
              }}
            >
              <div className="bg-[#0f0a1a] rounded-lg p-8 sm:p-12 text-center">
                <motion.p
                  variants={item}
                  className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400"
                >
                  Certificate of Recovery
                </motion.p>

                <motion.div
                  variants={item}
                  className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <motion.p
                  variants={item}
                  className="mb-1 font-serif text-lg italic text-slate-400"
                >
                  This certifies that
                </motion.p>

                <motion.h1
                  variants={item}
                  className="mb-2 text-display-lg text-gradient"
                >
                  A Recovering Prompt Addict
                </motion.h1>

                <motion.p variants={item} className="mb-1 text-lg text-slate-400">
                  has completed the{" "}
                  <span className="font-semibold text-violet-400">
                    5-Step Recovery Program
                  </span>
                </motion.p>

                <motion.p variants={item} className="mb-6 text-lg text-slate-400">
                  and is hereby authorized to{" "}
                  <span className="font-semibold text-rose-400">
                    write their own code again
                  </span>
                </motion.p>

                <motion.div
                  variants={item}
                  className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <motion.p variants={item} className="mb-6 text-sm text-slate-600">
                  {today}
                </motion.p>

                <motion.div variants={item} className="mt-4">
                  <p className="font-serif text-2xl italic text-slate-300">
                    Dr. Unplugged
                  </p>
                  <div className="mx-auto mt-1 h-px w-40 bg-white/10" />
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    Chief Recovery Officer
                  </p>
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Final roast */}
        <motion.div variants={item}>
          <GlassCard className="p-6 text-center mb-6">
            <p className="font-serif text-lg italic leading-relaxed text-slate-400">
              &ldquo;Congratulations. You just completed a program designed by AI
              to help you stop using AI. The irony is not lost on us.&rdquo;
            </p>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <motion.p
          variants={item}
          className="text-center text-sm text-slate-600 mb-8"
        >
          You survived 5 steps of brutal honesty and a therapy session. Most people relapse at Step 2.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col items-center gap-4">
          <Button variant="success" size="lg" onClick={handleTouchGrass}>
            Go Touch Grass
          </Button>

          <Link
            to="/"
            className="text-sm text-slate-500 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-400"
          >
            Start Over (we won&apos;t judge... much)
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser — navigate to `/graduation`, check holographic certificate border, glass cards, confetti, dark theme**

- [ ] **Step 3: Commit**

```bash
git add src/pages/GraduationPage.jsx
git commit -m "feat: glassmorphism graduation page with holographic certificate border"
```

---

### Task 11: Final Polish — Clean Up Unused Files and Full Flow Test

**Files:**
- Delete: `src/App.css` (empty, unused)

- [ ] **Step 1: Remove `src/App.css`**

```bash
rm src/App.css
```

- [ ] **Step 2: Full flow smoke test in browser**

Walk through the complete flow:
1. Landing page — gradient title, glass quote card, glowing CTA
2. Click "Begin Recovery" → Intake quiz with glass cards
3. Answer all 4 questions → diagnosis reveal
4. Click "Start Recovery" → Step 1-5 with glass cards and dark inputs
5. Step 5 → "Talk to Your Therapist" → TherapyPage
6. Chat with therapist (3+ exchanges) → "I'm ready to graduate"
7. Graduation → certificate with holographic border, confetti

Verify:
- All animations smooth
- No white backgrounds visible
- No broken text colors (no black-on-dark)
- Orbs visible behind glass cards
- Scrolling works properly on therapy chat
- Mobile responsive (resize browser to 375px width)

- [ ] **Step 3: Commit**

```bash
git rm src/App.css
git add -A
git commit -m "chore: remove unused App.css and finalize v2 glassmorphism redesign"
```
