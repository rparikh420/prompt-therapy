# Animation & UX Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Prompt Therapy app from an AI-generated prototype into a premium, paid-product-quality experience with spring animations, refined colors, haptics, and polished micro-interactions across web and mobile.

**Architecture:** Two parallel tracks (web + mobile) sharing identical design tokens and motion language. Web uses Framer Motion 12. Mobile migrates from Moti to Reanimated-first with expo-haptics. A `MotionConfig` context provides reduced-motion support on both platforms.

**Tech Stack:** React 19 + Framer Motion + Tailwind (web), Expo 54 + react-native-reanimated 4 + react-native-gesture-handler + expo-haptics (mobile)

**Spec:** `docs/superpowers/specs/2026-06-07-animation-ux-overhaul-design.md`

---

## File Map

### Web — New Files
- `src/components/MotionConfig.jsx` — Reduced-motion context provider + spring tokens
- `src/components/AnimatedPressable.jsx` — Spring press wrapper for any clickable element
- `src/components/StaggerContainer.jsx` — Staggered children entrance via FM variants
- `src/components/PageTransition.jsx` — AnimatePresence route wrapper
- `src/components/MiniConfetti.jsx` — Small confetti burst for step completions

### Web — Modified Files
- `src/index.css` — Color system overhaul, reduced-motion queries, ambient gradient
- `src/App.jsx` — Wrap routes in PageTransition + MotionConfig provider
- `src/components/Layout.jsx` — Updated gradient colors, spacing
- `src/components/FloatingOrbs.jsx` — Framer Motion upgrade, reduced opacity
- `src/components/Button.jsx` — Use AnimatedPressable, refined styling
- `src/components/GlassCard.jsx` — Hover glow, spring press, refined borders
- `src/components/ProgressBar.jsx` — Spring-animated fill + step bounce
- `src/components/TherapistChat.jsx` — Message entrance animations, refined colors
- `src/components/QuoteCard.jsx` — Refined colors
- `src/pages/LandingPage.jsx` — Staggered entrance, refined palette
- `src/pages/IntakeForm.jsx` — Spring transitions, score counter, refined colors
- `src/pages/RecoveryStep.jsx` — Completion celebration, breathing upgrade
- `src/pages/TherapyPage.jsx` — Refined colors
- `src/pages/GraduationPage.jsx` — Enhanced confetti, shine sweep on certificate

### Mobile — New Files
- `mobile/components/MotionConfig.jsx` — Reduced-motion context + spring tokens
- `mobile/components/AnimatedPressable.jsx` — Reanimated spring press + haptics
- `mobile/components/StaggerContainer.jsx` — Staggered entrance via Reanimated entering
- `mobile/components/MiniConfetti.jsx` — Step completion confetti burst

### Mobile — Modified Files
- `mobile/package.json` — Add expo-haptics
- `mobile/theme.js` — Color system overhaul (matching web)
- `mobile/app/_layout.jsx` — MotionConfig provider, updated gradient colors, custom transitions
- `mobile/components/FloatingOrbs.jsx` — Reanimated complex paths, reduced opacity
- `mobile/components/Button.jsx` — Rewrite with AnimatedPressable + haptics
- `mobile/components/GlassCard.jsx` — Reanimated spring press
- `mobile/components/ProgressBar.jsx` — Reanimated spring fill + step bounce
- `mobile/components/TherapistChat.jsx` — Reanimated message entrance, elastic typing
- `mobile/app/index.jsx` — Reanimated staggered entrance, refined palette
- `mobile/app/intake.jsx` — Gesture fling + spring transitions
- `mobile/app/step/[step].jsx` — Completion celebration, breathing upgrade
- `mobile/app/therapy.jsx` — Refined colors
- `mobile/app/graduation.jsx` — Full Reanimated confetti, certificate shine

---

## Task 1: Web — Color System & Typography Overhaul

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Layout.jsx`

This task updates the foundation: colors move from purple-tinted to neutral dark slate, glass effects become more subtle, and typography gets breathing room.

- [ ] **Step 1: Update CSS custom properties in `src/index.css`**

Replace lines 4–21 (the `:root` block and font import) with:

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --color-bg-base: #07070d;
  --color-bg-elevated: #111827;
  --color-primary: #7c3aed;
  --color-primary-light: #8b5cf6;
  --color-accent: #f43f5e;
  --color-accent-light: #fb7185;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #475569;
  --color-glass-bg: rgba(255, 255, 255, 0.04);
  --color-glass-border: rgba(255, 255, 255, 0.06);
  --color-glass-border-hover: rgba(255, 255, 255, 0.12);
  --font-display: 'Instrument Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Key changes: bg-base `#0a0a0f` → `#07070d`, bg-elevated `#1a1025` → `#111827` (no more purple tint), glass-bg `0.06` → `0.04`, glass-border `0.1` → `0.06`, glass-border-hover `0.2` → `0.12`, added `--font-mono`.

- [ ] **Step 2: Update body styles for improved line-height**

In `src/index.css`, update the body rule to add `line-height: 1.6`:

```css
body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  background: var(--color-bg-base);
  color: var(--color-text-primary);
  line-height: 1.6;
}
```

- [ ] **Step 3: Update glow utility classes to be more subtle**

In `src/index.css`, update the `.glow-violet`, `.glow-rose`, `.glow-emerald` classes:

```css
.glow-violet {
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.2), 0 0 45px rgba(124, 58, 237, 0.08);
}

.glow-rose {
  box-shadow: 0 0 15px rgba(244, 63, 94, 0.2), 0 0 45px rgba(244, 63, 94, 0.08);
}

.glow-emerald {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2), 0 0 45px rgba(16, 185, 129, 0.08);
}
```

- [ ] **Step 4: Add reduced-motion media query and ambient gradient keyframe**

Append to the end of `src/index.css` (before the scrollbar styles):

```css
@keyframes ambient-gradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Update Layout.jsx background gradient**

In `src/components/Layout.jsx`, update the gradient and add ambient animation + wider content area:

```jsx
import FloatingOrbs from "./FloatingOrbs";
import { MotionConfigProvider } from "./MotionConfig";

export default function Layout({ children }) {
  return (
    <MotionConfigProvider>
      <div
        className="grain-overlay relative min-h-screen"
        style={{
          background: "linear-gradient(145deg, #07070d 0%, #111827 40%, #0c1220 70%, #07070d 100%)",
          backgroundSize: "200% 200%",
          animation: "ambient-gradient 30s ease infinite",
        }}
      >
        <FloatingOrbs />
        <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-10">
          {children}
        </div>
      </div>
    </MotionConfigProvider>
  );
}
```

Key changes: gradient uses new slate colors (no purple), ambient-gradient animation, max-w-2xl → max-w-lg (narrower for premium feel), px-4 → px-6, py-8 → py-10, wrapped in MotionConfigProvider.

- [ ] **Step 6: Verify web app loads with new colors**

Run: `cd /Users/rushabhparikh/prompt-therapy && npm run dev`

Open the app in browser — background should be deep neutral dark (not purple-tinted). The app may show errors about MotionConfig not existing yet — that's expected, we create it in Task 3.

- [ ] **Step 7: Commit**

```bash
git add src/index.css src/components/Layout.jsx
git commit -m "feat(web): color system overhaul — neutral dark slate, subtler glass, improved typography"
```

---

## Task 2: Mobile — Color System & Theme Overhaul

**Files:**
- Modify: `mobile/theme.js`
- Modify: `mobile/app/_layout.jsx`
- Modify: `mobile/package.json`

- [ ] **Step 1: Update `mobile/theme.js` with refined color system**

```js
export const colors = {
  bgBase: '#07070d',
  bgElevated: '#111827',
  primary: '#7c3aed',
  primaryLight: '#8b5cf6',
  accent: '#f43f5e',
  accentLight: '#fb7185',
  success: '#10b981',
  warning: '#f59e0b',
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#475569',
  glassBg: 'rgba(255, 255, 255, 0.04)',
  glassBorder: 'rgba(255, 255, 255, 0.06)',
  glassBorderHover: 'rgba(255, 255, 255, 0.12)',
};

export const springs = {
  press: { damping: 15, stiffness: 150 },
  gentle: { damping: 20, stiffness: 90 },
  snappy: { damping: 12, stiffness: 200 },
};
```

- [ ] **Step 2: Update `mobile/app/_layout.jsx` gradient colors**

```jsx
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingOrbs from '../components/FloatingOrbs';
import { MotionConfigProvider } from '../components/MotionConfig';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MotionConfigProvider>
        <View style={styles.container}>
          <LinearGradient
            colors={['#07070d', '#111827', '#0c1220', '#07070d']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <FloatingOrbs />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'fade',
            }}
          />
        </View>
      </MotionConfigProvider>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07070d' },
});
```

- [ ] **Step 3: Add expo-haptics dependency**

Run: `cd /Users/rushabhparikh/prompt-therapy/mobile && npx expo install expo-haptics`

- [ ] **Step 4: Commit**

```bash
git add mobile/theme.js mobile/app/_layout.jsx mobile/package.json mobile/package-lock.json
git commit -m "feat(mobile): color system overhaul + add expo-haptics + spring tokens"
```

---

## Task 3: Web — MotionConfig Context Provider

**Files:**
- Create: `src/components/MotionConfig.jsx`

Provides reduced-motion detection and shared spring tokens to all components.

- [ ] **Step 1: Create `src/components/MotionConfig.jsx`**

```jsx
import { createContext, useContext, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

const MotionContext = createContext(null);

const SPRING_TOKENS = {
  press: { type: "spring", damping: 15, stiffness: 150 },
  gentle: { type: "spring", damping: 20, stiffness: 90 },
  snappy: { type: "spring", damping: 12, stiffness: 200 },
  page: { type: "spring", damping: 25, stiffness: 120 },
};

const INSTANT = { duration: 0 };

export function MotionConfigProvider({ children }) {
  const prefersReduced = useReducedMotion();

  const value = useMemo(() => ({
    shouldAnimate: !prefersReduced,
    spring: prefersReduced
      ? { press: INSTANT, gentle: INSTANT, snappy: INSTANT, page: INSTANT }
      : SPRING_TOKENS,
    duration: prefersReduced ? 0 : undefined,
    stagger: prefersReduced ? 0 : 0.05,
  }), [prefersReduced]);

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    return {
      shouldAnimate: true,
      spring: SPRING_TOKENS,
      duration: undefined,
      stagger: 0.05,
    };
  }
  return ctx;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MotionConfig.jsx
git commit -m "feat(web): add MotionConfig context with reduced-motion + spring tokens"
```

---

## Task 4: Mobile — MotionConfig Context Provider

**Files:**
- Create: `mobile/components/MotionConfig.jsx`

- [ ] **Step 1: Create `mobile/components/MotionConfig.jsx`**

```jsx
import { createContext, useContext, useMemo } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

const MotionContext = createContext(null);

export function MotionConfigProvider({ children }) {
  const prefersReduced = useReducedMotion();

  const value = useMemo(() => ({
    shouldAnimate: !prefersReduced,
    stagger: prefersReduced ? 0 : 50,
  }), [prefersReduced]);

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) return { shouldAnimate: true, stagger: 50 };
  return ctx;
}
```

- [ ] **Step 2: Commit**

```bash
git add mobile/components/MotionConfig.jsx
git commit -m "feat(mobile): add MotionConfig context with reduced-motion support"
```

---

## Task 5: Web — AnimatedPressable + StaggerContainer + PageTransition

**Files:**
- Create: `src/components/AnimatedPressable.jsx`
- Create: `src/components/StaggerContainer.jsx`
- Create: `src/components/PageTransition.jsx`

- [ ] **Step 1: Create `src/components/AnimatedPressable.jsx`**

```jsx
import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";

export default function AnimatedPressable({
  children,
  className = "",
  as = "button",
  scaleAmount = 0.97,
  ...props
}) {
  const { shouldAnimate, spring } = useMotion();
  const Component = motion[as] || motion.button;

  return (
    <Component
      whileHover={shouldAnimate ? { scale: 1.015 } : undefined}
      whileTap={shouldAnimate ? { scale: scaleAmount } : undefined}
      transition={spring.press}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Create `src/components/StaggerContainer.jsx`**

```jsx
import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";

const containerVariants = (stagger) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 90 },
  },
};

export default function StaggerContainer({ children, className = "" }) {
  const { stagger } = useMotion();

  return (
    <motion.div
      variants={containerVariants(stagger)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `src/components/PageTransition.jsx`**

```jsx
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useMotion } from "./MotionConfig";

const variants = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.99 },
};

export default function PageTransition({ children }) {
  const location = useLocation();
  const { shouldAnimate, spring } = useMotion();

  if (!shouldAnimate) {
    return <div key={location.pathname}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          ...spring.page,
          exit: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Update `src/App.jsx` to use PageTransition**

```jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import PageTransition from "./components/PageTransition";
import LandingPage from "./pages/LandingPage";
import IntakeForm from "./pages/IntakeForm";
import RecoveryStep from "./pages/RecoveryStep";
import TherapyPage from "./pages/TherapyPage";
import GraduationPage from "./pages/GraduationPage";

function AnimatedRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/intake" element={<IntakeForm />} />
        <Route path="/step/:step" element={<RecoveryStep />} />
        <Route path="/therapy" element={<TherapyPage />} />
        <Route path="/graduation" element={<GraduationPage />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}
```

- [ ] **Step 5: Verify page transitions work**

Run: `npm run dev`

Navigate between pages — should see subtle fade+slide+scale transitions. Check that going forward and backward both animate.

- [ ] **Step 6: Commit**

```bash
git add src/components/AnimatedPressable.jsx src/components/StaggerContainer.jsx src/components/PageTransition.jsx src/App.jsx
git commit -m "feat(web): add AnimatedPressable, StaggerContainer, PageTransition components"
```

---

## Task 6: Mobile — AnimatedPressable + StaggerContainer

**Files:**
- Create: `mobile/components/AnimatedPressable.jsx`
- Create: `mobile/components/StaggerContainer.jsx`

- [ ] **Step 1: Create `mobile/components/AnimatedPressable.jsx`**

```jsx
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { springs } from '../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function APressable({
  children,
  onPress,
  disabled,
  style,
  scaleAmount = 0.97,
  haptic = true,
  ...props
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(scaleAmount, springs.press);
    if (haptic && !disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springs.press);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[animatedStyle, style]}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
```

- [ ] **Step 2: Create `mobile/components/StaggerContainer.jsx`**

```jsx
import Animated, { FadeInDown } from 'react-native-reanimated';
import { View } from 'react-native';
import { useMotion } from './MotionConfig';

export function StaggerItem({ index, children, style }) {
  const { shouldAnimate, stagger } = useMotion();

  if (!shouldAnimate) {
    return <View style={style}>{children}</View>;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * stagger).springify().damping(20).stiffness(90)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add mobile/components/AnimatedPressable.jsx mobile/components/StaggerContainer.jsx
git commit -m "feat(mobile): add AnimatedPressable with haptics + StaggerContainer"
```

---

## Task 7: Web — Upgrade Core Components (Button, GlassCard, FloatingOrbs, ProgressBar)

**Files:**
- Modify: `src/components/Button.jsx`
- Modify: `src/components/GlassCard.jsx`
- Modify: `src/components/FloatingOrbs.jsx`
- Modify: `src/components/ProgressBar.jsx`

- [ ] **Step 1: Rewrite `src/components/Button.jsx`**

```jsx
import AnimatedPressable from "./AnimatedPressable";

const variants = {
  primary: "bg-violet-600 text-white glow-violet hover:bg-violet-500",
  secondary: "bg-white/[0.04] text-white border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.06]",
  success: "bg-emerald-600 text-white glow-emerald hover:bg-emerald-500",
  ghost: "text-violet-400 hover:text-violet-300 hover:bg-white/[0.04]",
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
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <AnimatedPressable
      className={[
        "font-semibold rounded-full transition-colors duration-200",
        sizeClasses[size],
        variants[variant],
        loading ? "opacity-60 pointer-events-none" : "",
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
    </AnimatedPressable>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/GlassCard.jsx`**

```jsx
import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";

export default function GlassCard({ children, className = "", glow = false, interactive = false, ...props }) {
  const { shouldAnimate, spring } = useMotion();

  const baseClasses = [
    "backdrop-blur-xl rounded-2xl border",
    "bg-white/[0.04] border-white/[0.06]",
    "shadow-lg shadow-black/20",
    glow ? "transition-all duration-200 hover:border-white/[0.12] hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]" : "",
    className,
  ].filter(Boolean).join(" ");

  if (interactive && shouldAnimate) {
    return (
      <motion.div
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        transition={spring.press}
        className={baseClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/FloatingOrbs.jsx` with Framer Motion and reduced opacity**

```jsx
import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";

const orbs = [
  {
    color: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
    className: "absolute -top-32 -left-32 w-96 h-96",
    animate: { x: [0, 80, -40, 60, 0], y: [0, -60, 80, 40, 0], scale: [1, 1.1, 0.95, 1.05, 1] },
    duration: 20,
  },
  {
    color: "radial-gradient(circle, rgba(244,63,94,0.25) 0%, transparent 70%)",
    className: "absolute -top-20 -right-20 w-80 h-80",
    animate: { x: [0, -70, 50, -30, 0], y: [0, 50, -70, -40, 0], scale: [1, 1.05, 1.1, 0.95, 1] },
    duration: 25,
  },
  {
    color: "radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)",
    className: "absolute -bottom-24 -left-16 w-72 h-72",
    animate: { x: [0, 60, -50, 40, 0], y: [0, 60, -40, 30, 0], scale: [1.05, 0.95, 1.1, 1, 1.05] },
    duration: 22,
  },
  {
    color: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
    className: "absolute -bottom-32 -right-24 w-96 h-96",
    animate: { x: [0, -60, 40, -80, 0], y: [0, -50, 70, -30, 0], scale: [1, 1.1, 0.95, 1.05, 1] },
    duration: 28,
  },
];

export default function FloatingOrbs() {
  const { shouldAnimate } = useMotion();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`${orb.className} rounded-full`}
          style={{
            background: orb.color,
            filter: "blur(100px)",
            opacity: 0.1,
          }}
          animate={shouldAnimate ? orb.animate : undefined}
          transition={shouldAnimate ? {
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          } : undefined}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/ProgressBar.jsx` with spring animations**

```jsx
import { motion } from "framer-motion";
import { useMotion } from "./MotionConfig";

const STEPS = ["Admission", "Reflection", "Inventory", "Pledge", "Shutdown"];

export default function ProgressBar({ currentStep }) {
  const { shouldAnimate, spring } = useMotion();

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-3 left-0 right-0 h-px bg-white/[0.06]" />
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center relative z-10 flex-1">
              {i > 0 && (
                <motion.div
                  className="absolute top-3 right-1/2 w-full h-px -z-10"
                  initial={{ backgroundColor: "transparent" }}
                  animate={{
                    backgroundColor: stepNum <= currentStep
                      ? "rgba(139, 92, 246, 0.4)"
                      : "transparent",
                  }}
                  transition={shouldAnimate ? spring.gentle : { duration: 0 }}
                />
              )}
              <motion.div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                  isCompleted
                    ? "bg-violet-500 border-violet-500 text-white"
                    : isCurrent
                      ? "bg-violet-500 border-violet-400 text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                      : "bg-white/[0.04] border-white/[0.06] text-slate-500"
                }`}
                animate={
                  shouldAnimate && isCurrent
                    ? { scale: [1, 1.15, 1] }
                    : { scale: 1 }
                }
                transition={
                  shouldAnimate && isCurrent
                    ? { duration: 0.4, type: "spring", stiffness: 200, damping: 10 }
                    : { duration: 0 }
                }
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
```

- [ ] **Step 5: Verify all components render**

Run: `npm run dev` — test landing page (button hover/tap should spring), navigate to intake (glass cards refined), step pages (progress bar springs).

- [ ] **Step 6: Commit**

```bash
git add src/components/Button.jsx src/components/GlassCard.jsx src/components/FloatingOrbs.jsx src/components/ProgressBar.jsx
git commit -m "feat(web): upgrade Button, GlassCard, FloatingOrbs, ProgressBar with spring physics + refined palette"
```

---

## Task 8: Mobile — Upgrade Core Components (Button, GlassCard, FloatingOrbs, ProgressBar)

**Files:**
- Modify: `mobile/components/Button.jsx`
- Modify: `mobile/components/GlassCard.jsx`
- Modify: `mobile/components/FloatingOrbs.jsx`
- Modify: `mobile/components/ProgressBar.jsx`

- [ ] **Step 1: Rewrite `mobile/components/Button.jsx` with AnimatedPressable + haptics**

```jsx
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import APressable from './AnimatedPressable';
import { colors } from '../theme';

const VARIANTS = {
  primary: { bg: colors.primary, text: '#ffffff', border: null },
  secondary: { bg: colors.glassBg, text: '#ffffff', border: colors.glassBorder },
  success: { bg: colors.success, text: '#ffffff', border: null },
  ghost: { bg: 'transparent', text: colors.primaryLight, border: null },
};

const SIZES = {
  sm: { px: 20, py: 10, fontSize: 14 },
  md: { px: 28, py: 14, fontSize: 16 },
  lg: { px: 40, py: 16, fontSize: 18 },
};

export default function Button({ children, variant = 'primary', size = 'md', loading = false, onPress, disabled, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;

  return (
    <APressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? 'transparent',
          borderWidth: v.border ? 1 : 0,
          paddingHorizontal: s.px,
          paddingVertical: s.py,
        },
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text style={[styles.text, { color: v.text, fontSize: s.fontSize }]}>{children}</Text>
      )}
    </APressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: { fontWeight: '600' },
  disabled: { opacity: 0.4 },
});
```

- [ ] **Step 2: Rewrite `mobile/components/GlassCard.jsx` with spring press**

```jsx
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { colors, springs } from '../theme';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

export default function GlassCard({ children, style, interactive = false, onPress }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (interactive) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.98, springs.press); }}
        onPressOut={() => { scale.value = withSpring(1, springs.press); }}
      >
        <AnimatedBlur intensity={25} tint="dark" style={[styles.blur, animatedStyle, style]}>
          <View style={styles.inner}>{children}</View>
        </AnimatedBlur>
      </Pressable>
    );
  }

  return (
    <BlurView intensity={25} tint="dark" style={[styles.blur, style]}>
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  inner: {
    flex: 1,
    backgroundColor: colors.glassBg,
  },
});
```

- [ ] **Step 3: Rewrite `mobile/components/FloatingOrbs.jsx` with Reanimated**

```jsx
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useMotion } from './MotionConfig';

function Orb({ color, size, duration, delay, style }) {
  const { shouldAnimate } = useMotion();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!shouldAnimate) return;
    const easing = Easing.inOut(Easing.ease);
    const d = duration / 4;

    translateX.value = withRepeat(
      withSequence(
        withTiming(40, { duration: d, easing }),
        withTiming(-20, { duration: d, easing }),
        withTiming(30, { duration: d, easing }),
        withTiming(0, { duration: d, easing }),
      ), -1, false
    );
    translateY.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: d, easing }),
        withTiming(40, { duration: d, easing }),
        withTiming(20, { duration: d, easing }),
        withTiming(0, { duration: d, easing }),
      ), -1, false
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: d, easing }),
        withTiming(0.95, { duration: d, easing }),
        withTiming(1.05, { duration: d, easing }),
        withTiming(1, { duration: d, easing }),
      ), -1, false
    );
  }, [shouldAnimate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.orb,
        { width: size, height: size, backgroundColor: color },
        animatedStyle,
        style,
      ]}
    />
  );
}

export default function FloatingOrbs() {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Orb color="rgba(124,58,237,0.12)" size={350} duration={20000} delay={0} style={styles.orb1} />
      <Orb color="rgba(244,63,94,0.08)" size={300} duration={25000} delay={500} style={styles.orb2} />
      <Orb color="rgba(20,184,166,0.06)" size={280} duration={22000} delay={1000} style={styles.orb3} />
      <Orb color="rgba(99,102,241,0.06)" size={350} duration={28000} delay={1500} style={styles.orb4} />
    </View>
  );
}

const styles = StyleSheet.create({
  orb: { position: 'absolute', borderRadius: 999 },
  orb1: { top: -100, left: -80 },
  orb2: { top: -60, right: -60 },
  orb3: { bottom: -80, left: -40 },
  orb4: { bottom: -100, right: -60 },
});
```

- [ ] **Step 4: Rewrite `mobile/components/ProgressBar.jsx` with Reanimated spring**

```jsx
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors, springs } from '../theme';

const STEPS = ['Admission', 'Reflection', 'Inventory', 'Pledge', 'Shutdown'];

function StepDot({ stepNum, isCompleted, isCurrent }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isCurrent) {
      scale.value = withSpring(1.15, { damping: 10, stiffness: 200 });
    } else {
      scale.value = withSpring(1, springs.gentle);
    }
  }, [isCurrent]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        isCompleted && styles.dotCompleted,
        isCurrent && styles.dotCurrent,
        animatedStyle,
      ]}
    >
      <Text style={[styles.dotText, (isCompleted || isCurrent) && styles.dotTextActive]}>
        {isCompleted ? '✓' : stepNum}
      </Text>
    </Animated.View>
  );
}

export default function ProgressBar({ currentStep }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.baseLine} />
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <View key={label} style={styles.step}>
              <StepDot stepNum={stepNum} isCompleted={isCompleted} isCurrent={isCurrent} />
              <Text style={[
                styles.label,
                isCurrent && styles.labelCurrent,
                isCompleted && styles.labelCompleted,
              ]}>{label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' },
  baseLine: {
    position: 'absolute', top: 12, left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  step: { flex: 1, alignItems: 'center', zIndex: 1 },
  dot: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  dotCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
  dotCurrent: {
    backgroundColor: colors.primary, borderColor: colors.primaryLight,
    shadowColor: colors.primaryLight, shadowOpacity: 0.4, shadowRadius: 6, elevation: 4,
  },
  dotText: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  dotTextActive: { color: '#fff' },
  label: {
    marginTop: 6, fontSize: 8, fontWeight: '600',
    letterSpacing: 0.5, textTransform: 'uppercase',
    color: colors.textMuted, textAlign: 'center',
  },
  labelCurrent: { color: colors.primaryLight },
  labelCompleted: { color: colors.textSecondary },
});
```

- [ ] **Step 5: Commit**

```bash
git add mobile/components/Button.jsx mobile/components/GlassCard.jsx mobile/components/FloatingOrbs.jsx mobile/components/ProgressBar.jsx
git commit -m "feat(mobile): upgrade Button, GlassCard, FloatingOrbs, ProgressBar — Reanimated springs + haptics + refined palette"
```

---

## Task 9: Web — MiniConfetti Component

**Files:**
- Create: `src/components/MiniConfetti.jsx`

- [ ] **Step 1: Create `src/components/MiniConfetti.jsx`**

```jsx
import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from "./MotionConfig";

const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#f1f5f9", "#60a5fa", "#f472b6"];

function Particle({ x, color, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        bottom: "50%",
      }}
      initial={{ y: 0, opacity: 1, scale: 0 }}
      animate={{
        y: [0, -120 - Math.random() * 100],
        x: [(Math.random() - 0.5) * 120],
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0.4],
        rotate: [0, Math.random() * 360],
      }}
      transition={{
        duration: 1.2 + Math.random() * 0.5,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function MiniConfetti({ show }) {
  const { shouldAnimate } = useMotion();

  if (!shouldAnimate || !show) return null;

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 40,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.3,
  }));

  return (
    <AnimatePresence>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MiniConfetti.jsx
git commit -m "feat(web): add MiniConfetti component for step completion celebrations"
```

---

## Task 10: Mobile — MiniConfetti Component

**Files:**
- Create: `mobile/components/MiniConfetti.jsx`

- [ ] **Step 1: Create `mobile/components/MiniConfetti.jsx`**

```jsx
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#f1f5f9', '#60a5fa', '#f472b6'];
const { width } = Dimensions.get('window');

function Particle({ x, color, size, delay }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const targetY = -120 - Math.random() * 100;
    const targetX = (Math.random() - 0.5) * 120;
    const dur = 1200 + Math.random() * 500;
    const easing = Easing.out(Easing.quad);

    opacity.value = withDelay(delay, withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: dur - 100, easing }),
    ));
    translateY.value = withDelay(delay, withTiming(targetY, { duration: dur, easing }));
    translateX.value = withDelay(delay, withTiming(targetX, { duration: dur, easing }));
    scale.value = withDelay(delay, withSequence(
      withTiming(1.2, { duration: 200 }),
      withTiming(0.4, { duration: dur - 200, easing }),
    ));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          left: x,
          bottom: '50%',
        },
        style,
      ]}
    />
  );
}

export default function MiniConfetti({ show }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setParticles(
        Array.from({ length: 12 }, (_, i) => ({
          id: i,
          x: width * 0.3 + Math.random() * width * 0.4,
          color: COLORS[i % COLORS.length],
          size: 6 + Math.random() * 8,
          delay: Math.random() * 300,
        }))
      );
    }
  }, [show]);

  if (!show || particles.length === 0) return null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </View>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add mobile/components/MiniConfetti.jsx
git commit -m "feat(mobile): add MiniConfetti component with haptic success feedback"
```

---

## Task 11: Web — Upgrade All Pages (Landing, Intake, Recovery, Therapy, Graduation)

**Files:**
- Modify: `src/pages/LandingPage.jsx`
- Modify: `src/pages/IntakeForm.jsx`
- Modify: `src/pages/RecoveryStep.jsx`
- Modify: `src/pages/TherapyPage.jsx`
- Modify: `src/pages/GraduationPage.jsx`
- Modify: `src/components/TherapistChat.jsx`
- Modify: `src/components/QuoteCard.jsx`

- [ ] **Step 1: Rewrite `src/pages/LandingPage.jsx` with stagger + refined palette**

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import StaggerContainer, { staggerItem } from "../components/StaggerContainer";

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
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      <StaggerContainer className="text-center w-full flex flex-col items-center">
        <motion.div variants={staggerItem} className="inline-block mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-violet-400/80 bg-violet-500/[0.08] border border-violet-500/[0.12] px-4 py-1.5 rounded-full font-medium">
            5-Step Recovery Program
          </span>
        </motion.div>

        <motion.h1 variants={staggerItem} className="text-display-xl text-gradient mb-5">
          Prompt Therapy
        </motion.h1>

        <motion.p variants={staggerItem} className="text-lg sm:text-xl text-slate-400 mb-12 font-light max-w-md mx-auto leading-relaxed">
          Because your relationship with AI has become...{" "}
          <span className="text-rose-400 font-medium italic">concerning.</span>
        </motion.p>

        <motion.div variants={staggerItem} className="w-full max-w-xl mb-12">
          <GlassCard className="p-8 min-h-[120px] flex items-center justify-center" glow>
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="text-base sm:text-lg text-slate-300/90 italic leading-relaxed"
              >
                &ldquo;{quotes[quoteIndex]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </GlassCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Link to="/intake">
            <Button variant="primary" size="lg">
              Begin Recovery
            </Button>
          </Link>
          <p className="text-xs text-slate-600 mt-5">
            No AI was harmed in the making of this program. Several were roasted.
          </p>
        </motion.div>
      </StaggerContainer>
    </div>
  );
}
```

- [ ] **Step 2: Update `src/pages/IntakeForm.jsx` — refined colors and spring transitions**

Apply these targeted edits to `IntakeForm.jsx`:

a) Update the `ProgressDots` pulsing dot shadow from `shadow-[0_0_8px_rgba(139,92,246,0.6)]` to `shadow-[0_0_6px_rgba(139,92,246,0.3)]`

b) Update `ChoiceQuestion` button borders — unselected: `border-white/[0.08]` → `border-white/[0.06]`, `bg-white/[0.03]` → `bg-white/[0.03]`, `hover:border-white/[0.15]` → `hover:border-white/[0.1]`, `hover:bg-white/[0.06]` → `hover:bg-white/[0.05]`

c) Update selected choice: `shadow-[0_0_20px_rgba(124,58,237,0.15)]` → `shadow-[0_0_12px_rgba(124,58,237,0.1)]`

d) Update the diagnosis card entrance to use spring physics:
Replace `transition={{ delay: 0.6, type: "spring", stiffness: 200 }}` with `transition={{ delay: 0.6, type: "spring", stiffness: 120, damping: 14 }}`

- [ ] **Step 3: Update `src/pages/RecoveryStep.jsx` — add MiniConfetti on step completion**

Add import at the top:
```jsx
import MiniConfetti from "../components/MiniConfetti";
```

Add state for celebration tracking (after the `inputValues` state):
```jsx
const [showCelebration, setShowCelebration] = useState(false);
```

Update `handleNext` to trigger celebration:
```jsx
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
```

Add `<MiniConfetti show={showCelebration} />` just inside the outer wrapping div, before the ProgressBar.

Reset celebration when step changes — add `useEffect`:
```jsx
useEffect(() => {
  setShowCelebration(false);
}, [stepNumber]);
```

- [ ] **Step 4: Update `src/pages/TherapyPage.jsx` — refine colors**

Update the label class from `text-violet-400/60` to `text-violet-400/40`.

- [ ] **Step 5: Update `src/pages/GraduationPage.jsx` — increase confetti, refine timing**

a) Change confetti piece count from 30 to 45:
```jsx
const confettiPieces = Array.from({ length: 45 }, (_, i) => ({ ... }));
```

b) Update the certificate inner background from `bg-[#0f0a1a]` to `bg-[#0a0e1a]` (slate-tinted, not purple-tinted).

c) Update stagger timing from `staggerChildren: 0.15` to `staggerChildren: 0.1` and item transitions to use spring:
```jsx
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 90 } },
};
```

- [ ] **Step 6: Update `src/components/TherapistChat.jsx` — message entrance refinements**

Update message entrance animation:
```jsx
initial={{ opacity: 0, y: 8, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
transition={{ type: "spring", damping: 20, stiffness: 120 }}
```

Update the send button class — replace `glow-violet` shadow with subtler:
```jsx
className="px-5 py-3 bg-violet-600 text-white text-sm font-medium rounded-full hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
```

- [ ] **Step 7: Update `src/components/QuoteCard.jsx` — use spring entrance**

```jsx
import { motion } from "framer-motion";

export default function QuoteCard({ quote, attribution }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 90 }}
      className="backdrop-blur-xl bg-white/[0.03] rounded-xl border-l-2 border-rose-500/40 border-r border-t border-b border-r-white/[0.04] border-t-white/[0.04] border-b-white/[0.04] p-6 my-4"
    >
      <p className="text-slate-300/90 italic text-lg leading-relaxed">
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

- [ ] **Step 8: Verify full web flow**

Run: `npm run dev`

Walk through entire flow: Landing → Intake → all 5 Recovery Steps → Therapy → Graduation. Check:
- Page transitions are smooth (fade+slide+scale)
- Staggered entrances on landing page
- Spring press on all buttons
- MiniConfetti on step completion
- Refined color palette (no purple tint in backgrounds)
- FloatingOrbs are subtle (opacity ~0.1)

- [ ] **Step 9: Commit**

```bash
git add src/pages/LandingPage.jsx src/pages/IntakeForm.jsx src/pages/RecoveryStep.jsx src/pages/TherapyPage.jsx src/pages/GraduationPage.jsx src/components/TherapistChat.jsx src/components/QuoteCard.jsx
git commit -m "feat(web): upgrade all pages — staggered entrances, spring transitions, confetti celebrations, refined palette"
```

---

## Task 12: Mobile — Upgrade All Screens

**Files:**
- Modify: `mobile/app/index.jsx`
- Modify: `mobile/app/intake.jsx`
- Modify: `mobile/app/step/[step].jsx`
- Modify: `mobile/app/therapy.jsx`
- Modify: `mobile/app/graduation.jsx`
- Modify: `mobile/components/TherapistChat.jsx`

- [ ] **Step 1: Update `mobile/app/index.jsx` — Reanimated staggered entrance**

Replace all `MotiView` usages with Reanimated `Animated.View` + `FadeInDown` entering animations:

```jsx
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { colors } from '../theme';

const quotes = [
  "You asked ChatGPT to write your Tinder bio. It got more matches than you.",
  "Your Stack Overflow reputation is gathering dust.",
  "You have 14 AI tabs open. That's not multitasking, that's group therapy.",
  "Remember when you used to debug with console.log? Those were honest days.",
  "You copy-pasted an error into Claude without reading it. It said 'file not found.' THE FILE WASN'T THERE.",
  "Your git history shows 47 commits today. You wrote 3 of them. Who's the developer here?",
  "You asked an AI to write a FOR LOOP. The for-loop, bro. That's like asking someone to tie your shoes.",
];

export default function LandingPage() {
  const router = useRouter();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(0).springify().damping(20)} style={styles.badge}>
            <Text style={styles.badgeText}>5-Step Recovery Program</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(50).springify().damping(20)}>
            <Text style={styles.title}>Prompt Therapy</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).springify().damping(20)}>
            <Text style={styles.subtitle}>
              Because your relationship with AI has become...{' '}
              <Text style={styles.subtitleAccent}>concerning.</Text>
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).springify().damping(20)} style={styles.quoteCard}>
            <GlassCard style={{ width: '100%' }}>
              <View style={[styles.quoteInner, { opacity: quoteVisible ? 1 : 0 }]}>
                <Text style={styles.quoteText}>"{quotes[quoteIndex]}"</Text>
              </View>
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).springify().damping(20)} style={styles.buttonSection}>
            <Button size="lg" onPress={() => router.push('/intake')}>
              Begin Recovery
            </Button>
            <Text style={styles.disclaimer}>
              No AI was harmed in the making of this program. Several were roasted.
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  content: { alignItems: 'center', gap: 14 },
  badge: {
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100,
    backgroundColor: 'rgba(124,58,237,0.08)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.12)',
  },
  badgeText: { color: '#a78bfa', fontSize: 11, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 52, fontWeight: '700', letterSpacing: -1, color: colors.primaryLight, textAlign: 'center' },
  subtitle: { fontSize: 17, color: colors.textSecondary, textAlign: 'center', fontWeight: '300', lineHeight: 24 },
  subtitleAccent: { color: colors.accentLight, fontWeight: '500', fontStyle: 'italic' },
  quoteCard: { width: '100%', marginVertical: 12 },
  quoteInner: { padding: 24, minHeight: 100, justifyContent: 'center', alignItems: 'center' },
  quoteText: { color: colors.textSecondary, fontStyle: 'italic', fontSize: 15, lineHeight: 22, textAlign: 'center' },
  buttonSection: { alignItems: 'center', gap: 14, marginTop: 8 },
  disclaimer: { color: colors.textMuted, fontSize: 11, textAlign: 'center' },
});
```

- [ ] **Step 2: Update `mobile/app/intake.jsx` — replace Moti with Reanimated + spring transitions**

Apply targeted changes:

a) Replace `import { MotiView } from 'moti';` with `import Animated, { FadeInRight, FadeInDown } from 'react-native-reanimated';`

b) Replace the question transition `MotiView` (wrapping the card when `!showDiagnosis`) with:
```jsx
<Animated.View
  key={`q-${currentQ}`}
  entering={FadeInRight.springify().damping(20)}
>
```

c) Replace the diagnosis `MotiView` with:
```jsx
<Animated.View entering={FadeInDown.springify().damping(14).stiffness(120)}>
```

d) Replace `TouchableOpacity` in `ChoiceQuestion` with the `APressable` component:
```jsx
import APressable from '../components/AnimatedPressable';
```
Then replace `<TouchableOpacity key={i} onPress={() => onChange(i)} activeOpacity={0.8} ...>` with `<APressable key={i} onPress={() => onChange(i)} ...>`

- [ ] **Step 3: Update `mobile/app/step/[step].jsx` — add MiniConfetti + Reanimated transitions**

a) Replace `import { MotiView } from 'moti';` with:
```jsx
import Animated, { FadeInDown } from 'react-native-reanimated';
import MiniConfetti from '../../components/MiniConfetti';
```

b) Add celebration state:
```jsx
const [showCelebration, setShowCelebration] = useState(false);
```

c) Update `handleNext`:
```jsx
const handleNext = () => {
  setShowCelebration(true);
  setTimeout(() => {
    if (stepNumber < STEPS.length) {
      router.push(`/step/${stepNumber + 1}`);
    } else {
      router.push('/therapy');
    }
  }, 800);
};
```

d) Add `<MiniConfetti show={showCelebration} />` inside the SafeAreaView.

e) Replace `MotiView` wrapping the card with:
```jsx
<Animated.View key={stepNumber} entering={FadeInDown.springify().damping(20)}>
```

f) Replace `BreathingCircle` MotiView with Reanimated using `useAnimatedStyle` + `withRepeat` + `withTiming` for the breathing scale/opacity loop.

- [ ] **Step 4: Update `mobile/app/therapy.jsx` — Reanimated transitions**

Replace `import { MotiView } from 'moti';` with `import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';`

Replace the header `MotiView` with:
```jsx
<Animated.View entering={FadeInUp.springify().damping(20)} style={styles.header}>
```

Replace the chat wrapper `MotiView` with:
```jsx
<Animated.View entering={FadeInDown.delay(150).springify().damping(20)} style={styles.chatWrapper}>
```

- [ ] **Step 5: Update `mobile/app/graduation.jsx` — Reanimated confetti + refined palette**

Replace `import { MotiView } from 'moti';` with `import Animated, { FadeInDown } from 'react-native-reanimated';`

a) Replace `ConfettiPiece` `MotiView` with Reanimated equivalent using `useSharedValue` + `withRepeat` + `withTiming`.

b) Update certificate inner background from `backgroundColor: '#0f0a1a'` to `backgroundColor: '#0a0e1a'`.

c) Replace all `MotiView` entrance animations with `Animated.View entering={FadeInDown.delay(N).springify().damping(20)}`.

- [ ] **Step 6: Update `mobile/components/TherapistChat.jsx` — Reanimated message entrance + elastic typing**

Replace `import { MotiView } from 'moti';` with `import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';`

a) Replace `TypingIndicator` MotiView dots with Reanimated bounce using `useSharedValue` + `withRepeat` + `withSpring`.

b) Replace message `MotiView` with:
```jsx
<Animated.View
  entering={FadeInUp.delay(50).springify().damping(20)}
  style={[styles.msgRow, msg.role === 'user' ? styles.msgRowUser : styles.msgRowAssistant]}
>
```

c) Replace `TouchableOpacity` for graduate button and send button with `APressable`:
```jsx
import APressable from './AnimatedPressable';
```

- [ ] **Step 7: Verify mobile flow on simulator**

Run: `cd /Users/rushabhparikh/prompt-therapy/mobile && npx expo start`

Walk through entire flow on iOS Simulator or device. Check:
- Staggered entrances with spring physics (no linear timing)
- Haptic feedback on all button presses
- MiniConfetti on step completion with haptic success notification
- Breathing circle smooth with Reanimated
- Typing indicator with elastic spring dots
- Subtle floating orbs (reduced opacity)

- [ ] **Step 8: Commit**

```bash
git add mobile/app/index.jsx mobile/app/intake.jsx mobile/app/step/[step].jsx mobile/app/therapy.jsx mobile/app/graduation.jsx mobile/components/TherapistChat.jsx
git commit -m "feat(mobile): upgrade all screens — Reanimated springs, haptics, confetti, staggered entrances"
```

---

## Task 13: Final Polish & Build Verification

**Files:**
- Various minor tweaks

- [ ] **Step 1: Verify web build succeeds**

Run: `cd /Users/rushabhparikh/prompt-therapy && npm run build`

Fix any build errors.

- [ ] **Step 2: Verify mobile bundler starts clean**

Run: `cd /Users/rushabhparikh/prompt-therapy/mobile && npx expo start --clear`

Verify no bundler errors.

- [ ] **Step 3: Final visual audit**

Walk through both apps one more time. Check the pre-delivery checklist from the spec:
- [ ] No emojis used as structural icons (existing emoji usage in quiz options is content, not icons — acceptable)
- [ ] All tappable elements have spring feedback
- [ ] Text contrast ≥ 4.5:1 in dark mode (slate-100 on #07070d = ~16:1 ✓)
- [ ] Orb opacity ≤ 0.12 (not overwhelming)
- [ ] Glass border opacity is 0.06 (barely visible, premium feel)
- [ ] Background gradient is neutral dark slate (no purple tint)
- [ ] Page transitions are smooth and purposeful
- [ ] prefers-reduced-motion disables all animations on web

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final polish — build verification and visual audit fixes"
```
