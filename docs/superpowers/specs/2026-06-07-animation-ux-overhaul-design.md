# Prompt Therapy — Animation & UX Overhaul Design Spec

**Date:** 2026-06-07
**Goal:** Transform the app from "AI-generated glassmorphism form" into a premium, mature, paid-product-quality experience across web and mobile.

## Design Philosophy

This is NOT a purple-tinted prototype. The app must feel like a $15/month subscription product — on par with Calm, Headspace, or Woebot. Every animation, color choice, and interaction must serve a purpose and feel intentional, not decorative.

### Visual Maturity Principles
- **Restrained palette**: Reduce purple saturation. Move toward deep indigo/slate backgrounds with selective violet accents — not everything glows purple.
- **Typography hierarchy**: Proper typographic scale with weight variation. Headings should command, body should breathe.
- **Whitespace as luxury**: Premium apps use generous spacing. Cramped = cheap.
- **Subtle over flashy**: Glass effects at low opacity (6–10%), borders barely visible, shadows that suggest depth without screaming "glassmorphism."
- **Professional interactions**: No bouncy cartoon animations. Spring physics with high damping (20+) for controlled, confident motion.
- **Content-first**: The therapy content (questions, exercises, chat) is the star — UI chrome recedes.

## Platform Architecture

| Platform | Animation Engine | Gesture | Haptics |
|----------|-----------------|---------|---------|
| Web | Framer Motion 12 | whileHover/whileTap/whileDrag | N/A |
| Mobile | react-native-reanimated 4 + gesture-handler | Gesture.Pan/Tap/Fling | expo-haptics |

### Shared Motion Design Tokens
- Spring config: `{ damping: 20, stiffness: 90 }` (cinematic, controlled)
- Easing: `Bezier(0.16, 1, 0.3, 1)` (Expo.out — premium feel)
- Micro-interactions: 150–300ms
- Exit animations: 60–70% of enter duration
- Stagger interval: 50ms per item
- Scale press: 0.97 (subtle, not cartoonish)

## Visual Refinements (Both Platforms)

### Color System Upgrade
The current violet-heavy palette needs maturation:

```
Background base:    #07070d (near-black with blue undertone, NOT pure black)
Background elevated: #111827 (slate-900, NOT purple-tinted)
Surface/cards:      rgba(255, 255, 255, 0.04) (barely there glass)
Surface border:     rgba(255, 255, 255, 0.06) (whisper border)
Surface hover:      rgba(255, 255, 255, 0.08)
Primary accent:     #8b5cf6 (violet-500 — used SPARINGLY for CTAs only)
Primary glow:       rgba(139, 92, 246, 0.15) (subtle, not neon)
Secondary accent:   #64748b (slate-500 — for secondary text, icons)
Text primary:       #f1f5f9 (slate-100)
Text secondary:     #94a3b8 (slate-400)
Text muted:         #475569 (slate-600)
Success:            #10b981 (emerald, for completions)
Warm accent:        #f59e0b (amber, for highlights/badges)
Error:              #ef4444
```

Key changes from current:
- Background moves from `#0a0a0f`/`#1a1025` (purple-tinted) to `#07070d`/`#111827` (neutral dark slate)
- Glass effects reduced from 6% to 4% opacity (more subtle)
- Purple used only for primary CTAs, not backgrounds/cards
- Added warm accent (amber) for visual interest without more purple

### Typography Upgrade
- Display/headings: Keep **Instrument Sans** but use weight 600–700 (bolder, more authoritative)
- Body: Keep **Inter** at 400 weight
- Add monospace for data/scores: **JetBrains Mono** or system mono
- Increase line-height to 1.6 for body text (breathing room)
- Max content width: 480px on web (prevents wall-of-text feel)

### Spacing & Layout
- Base unit: 8px grid
- Card padding: 24px (not 16px — more breathing room)
- Section gaps: 32px between major sections
- Page padding: 24px horizontal on mobile, centered max-w-lg on web

## Layer 1: Therapeutic Atmosphere (Baseline Mood)

### Enhanced Floating Orbs
- Slow, organic breathing motion (20–28s cycles)
- Reduce opacity to 0.08–0.12 (current 0.2–0.3 is too prominent)
- Larger blur radius (100px+) for softer ambient feel
- Web: Framer Motion multi-keyframe transforms
- Mobile: Reanimated `withRepeat` + `withSequence` complex oscillation
- Respect `prefers-reduced-motion` — freeze to static blur

### Ambient Background
- Subtle 30s gradient angle rotation on background
- Barely perceptible — creates subconscious "living" environment
- Web: CSS `@keyframes` on gradient angle
- Mobile: Reanimated `interpolateColor` on LinearGradient props

### Breathing Circle (Recovery Steps)
- Upgrade to spring-physics scale (natural inhale/exhale)
- Add subtle glow pulse synchronized with scale
- Mobile: Haptic pulse on exhale beat
- Duration stays 4s per cycle (medically standard)

## Layer 2: Premium Polish (Core Motion System)

### A. Page Transitions
**Web (AnimatePresence + React Router):**
- Forward navigation: opacity 0→1, y: 12→0, scale: 0.99→1 (subtle, not dramatic)
- Exit: opacity 1→0, scale: 1→0.99 (fast — 200ms)
- Spring config with high damping for no overshoot

**Mobile (Custom Reanimated transitions):**
- Replace default Stack fade with custom `Easing.bezier(0.16, 1, 0.3, 1)`
- Enter: translateY 20→0 + opacity 0→1 (300ms)
- Exit: opacity 1→0 (180ms)
- No iOS-style horizontal slides — vertical feel is more therapeutic

### B. Staggered Entrances
- Every list/group staggers at 50ms per child
- Web: Framer Motion `variants` with `staggerChildren: 0.05`
- Mobile: Reanimated `FadeInDown.delay(index * 50).springify().damping(20)`
- Applied to: recovery steps, intake choices, chat messages, graduation items, landing page sections

### C. Spring Press Feedback (Every Interactive Element)
**New `AnimatedPressable` component (both platforms):**
- Scale: 1.0 → 0.97 on press, spring back on release
- Spring config: `{ damping: 15, stiffness: 150 }` (snappy return)
- Web: Framer Motion `whileTap` + optional glow intensify
- Mobile: Reanimated `useAnimatedStyle` + `withSpring`
  - `Haptics.impactAsync(ImpactFeedbackStyle.Light)` on press
  - Replaces ALL `TouchableOpacity` usage

### D. Input Focus Animations
- Border glow: glassBorder brightens from 6% to 15% white on focus
- Subtle box-shadow pulse on web
- Web: Framer Motion `animate` on border-color + box-shadow
- Mobile: Reanimated `interpolateColor` on border style

### E. Progress Bar
- Animated fill with spring physics (overshoots slightly, settles)
- Step completion: dot scales 1.0→1.2→1.0 with spring
- Connecting line animates width with `withSpring`
- Web: Framer Motion layout animation
- Mobile: Reanimated `useAnimatedStyle` + `withSpring` on width

## Layer 3: Engagement & Rewards

### Step Completion Celebration
- Mini confetti burst: 8–12 particles, short-lived (1.5s)
- Success checkmark: SVG draw-on animation (web) / Reanimated path (mobile)
- Mobile: `Haptics.notificationAsync(NotificationFeedbackType.Success)`
- Triggered when completing each of the 5 recovery steps

### Enhanced Graduation
- Web: 40+ particles with varied sizes, colors (violet, emerald, amber, white), gravity physics
- Mobile: Full Reanimated particle system with `withDecay` for natural fall
- Staggered wave release (3 waves over 2s)
- Certificate card: subtle shine sweep animation (diagonal gradient translate)

### Chat Message Entrances
- AI messages: slide-up from bottom, fade in (not typewriter — too slow for therapy context)
- User messages: slide-up + slight scale from input position
- Typing indicator: 3 dots with elastic spring bounce, staggered 100ms apart

### Intake Quiz Transitions
- Mobile: `Gesture.Fling` horizontal to advance/go back between questions
- Card transition: spring slide with no overshoot (damping: 25)
- Score reveal: number counter animation (0→final in 1.2s, easeOut)
- Diagnosis card: spring scale entrance with slight delay (dramatic reveal)

## Layer 4: Accessibility & Performance

### Reduced Motion (Both Platforms)
- Web: `@media (prefers-reduced-motion: reduce)` — all spring/stagger → instant opacity crossfade
- Mobile: Reanimated `useReducedMotion()` hook
- Shared `MotionConfig` context provider with:
  - `shouldAnimate: boolean`
  - `springConfig` (full or instant)
  - `duration` (full or 0)

### Performance
- Web: ONLY animate `transform` and `opacity` (no layout properties)
- Mobile: ALL animations on UI thread via Reanimated worklets
- `will-change: transform` on animated web elements
- No animating `width`/`height` directly — use `scaleX`/`scaleY`
- Virtualized lists maintained (FlatList on mobile)

## New Components

| Component | Web | Mobile | Purpose |
|-----------|-----|--------|---------|
| `AnimatedPressable` | FM `motion.button` | Reanimated + GestureDetector + Haptics | Spring press on every tap target |
| `StaggerContainer` | FM variants | Reanimated `entering` | Staggered children entrance |
| `PageTransition` | AnimatePresence wrapper | Custom screen transition config | Route-level animation |
| `AnimatedProgressBar` | FM layout animation | Reanimated spring width | Bouncy fill on step change |
| `MiniConfetti` | FM particles | Reanimated particles | Step completion burst |
| `MotionConfig` | React context | React context | Reduced motion + spring tokens |

## Files to Change

### Web (src/)
- `main.jsx` — AnimatePresence route wrapper, MotionConfig provider
- `index.css` — Color system update, reduced motion queries, ambient gradient keyframes, typography refinements
- NEW `components/AnimatedPressable.jsx`
- NEW `components/StaggerContainer.jsx`
- NEW `components/PageTransition.jsx`
- NEW `components/MiniConfetti.jsx`
- NEW `components/MotionConfig.jsx`
- MODIFY `components/Button.jsx` — Use AnimatedPressable
- MODIFY `components/GlassCard.jsx` — Subtle hover glow + spring press
- MODIFY `components/ProgressBar.jsx` — Spring-animated fill
- MODIFY `components/FloatingOrbs.jsx` — FM with organic motion, reduced opacity
- MODIFY `components/TherapistChat.jsx` — Message entrance animations
- MODIFY `pages/LandingPage.jsx` — Enhanced entrance stagger, color refinements
- MODIFY `pages/IntakeForm.jsx` — Spring transitions, score counter
- MODIFY `pages/RecoveryStep.jsx` — Completion celebration, breathing upgrade
- MODIFY `pages/TherapyPage.jsx` — Chat animation refinements
- MODIFY `pages/GraduationPage.jsx` — Enhanced confetti system

### Mobile (mobile/)
- `app/_layout.jsx` — Custom Reanimated screen transitions, MotionConfig provider
- `package.json` — Add expo-haptics
- `theme.js` — Updated color system
- NEW `components/AnimatedPressable.jsx`
- NEW `components/StaggerContainer.jsx`
- NEW `components/MiniConfetti.jsx`
- NEW `components/MotionConfig.jsx`
- MODIFY `components/Button.jsx` — Rewrite with Reanimated + Haptics
- MODIFY `components/GlassCard.jsx` — Spring press
- MODIFY `components/ProgressBar.jsx` — Reanimated spring fill
- MODIFY `components/FloatingOrbs.jsx` — Full Reanimated complex paths
- MODIFY `components/TherapistChat.jsx` — Message entrance + elastic typing
- MODIFY `app/index.jsx` — Staggered entrance with Reanimated
- MODIFY `app/intake.jsx` — Gesture fling + spring transitions
- MODIFY `app/step/[step].jsx` — Completion celebration, breathing upgrade
- MODIFY `app/therapy.jsx` — Chat refinements
- MODIFY `app/graduation.jsx` — Full Reanimated confetti system

## Success Criteria
- App looks like a $15/month paid product, not a hackathon project
- Every tap gives immediate spring feedback (+ haptic on mobile)
- Page transitions are smooth and purposeful
- Animations respect reduced-motion preferences
- No jank — 60fps maintained on both platforms
- Color palette feels mature (dark slate, not purple-tinted everything)
- Whitespace and typography feel premium
