# Prompt Therapy v2 — Design Spec

## Overview

Overhaul Prompt Therapy from a generic Claude-generated React app into a premium glassmorphism web experience, and wire the therapist chat to OpenAI for real AI-powered responses. The therapy session becomes a dedicated page between the final recovery step and graduation.

## User Flow

```
Landing → Intake Quiz → Steps 1-5 → Therapist Session → Graduation
```

- **New route**: `/therapy` between step 5 and graduation
- Step 5 "Shutdown" CTA navigates to `/therapy` instead of `/graduation`
- Therapist session has a "I'm ready to graduate" button that navigates to `/graduation`

---

## 1. Visual System — Glassmorphism on Dark

### Background
- Deep dark base: `#0a0a0f` to `#1a1025` gradient
- Animated floating orbs: 3-4 large blurred circles (violet, rose, teal, indigo) drifting slowly with CSS animations
- Subtle grain/noise texture overlay for depth

### Glass Cards
- `backdrop-blur-xl bg-white/[0.06] border border-white/[0.1]`
- Subtle inner shadow / glow on edges
- Hover state: border brightens to `border-white/[0.2]`, faint outer glow

### Typography
- **Display**: Satoshi (headings) — loaded via Fontsource or CDN
- **Body**: Inter (already loaded) — stays for readability
- Fluid type scale using `clamp()` for responsive sizing
- Heading weights: 700-900, body: 400-500

### Color Palette
- **Primary**: Violet `#7c3aed` → `#8b5cf6`
- **Accent**: Electric rose `#f43f5e` → `#fb7185`
- **Success**: Emerald `#10b981`
- **Warning**: Amber `#f59e0b`
- **Text**: `#f1f5f9` (primary), `#94a3b8` (secondary), `#475569` (muted)
- **Glow effects**: Color-matched shadows on interactive elements

### Micro-interactions
- Buttons: Glow spread on hover, scale 1.02, subtle magnetic feel
- Cards: Parallax tilt on hover (subtle, 2-3deg max)
- Page transitions: Staggered fade-up with blur
- Inputs: Focus ring with glow spread, not just border change

---

## 2. OpenAI Integration — Therapist Chat

### API Setup
- Client-side direct call to OpenAI Chat Completions API
- API key in `.env` as `VITE_OPENAI_API_KEY`
- Model: `gpt-4o-mini` (fast, cheap, witty enough)

### Client Module (`src/lib/openai.js`)
- `streamTherapistResponse(messages, stepContext)` — returns async iterator of text chunks
- System prompt: sarcastic AI therapist persona aware of the user's recovery journey
- Maintains conversation history in React state (session-only, not persisted)
- Graceful fallback: if no API key or fetch fails, use mock responses (current behavior)

### System Prompt
```
You are Dr. Unplugged, a hilariously sarcastic AI therapist specializing in AI addiction recovery. You're self-aware that you ARE an AI treating someone for AI addiction — and you lean into that irony constantly.

Keep responses under 3 sentences. Be witty, not mean. Mix genuine insight with comedic timing. Reference their recovery journey. Never break character.
```

### Streaming UX
- Typing indicator (3 animated dots) while waiting for first token
- Text streams in token-by-token with a subtle fade
- Auto-scroll to latest message

---

## 3. Page-by-Page Redesign

### Layout.jsx
- Dark background with animated floating orbs (CSS keyframe animations)
- Orbs: 4 absolutely-positioned circles with large blur, slow drift animation
- Grain overlay: pseudo-element with noise SVG filter
- Content wrapper: centered, responsive max-width

### LandingPage.jsx
- Large display heading "Prompt Therapy" in Satoshi, gradient text (violet → rose)
- Subtitle with typewriter or fade effect
- Quote carousel: glass cards that slide/fade with quote text
- CTA: Large pill button with violet glow, hover brightens
- Floating decorative elements (subtle geometric shapes)

### IntakeForm.jsx
- Glass card quiz container
- Option buttons: glass-style with glow border on selected
- Slider: custom styled with gradient track, glowing thumb
- Progress dots: glass pills with active glow
- Diagnosis reveal: dramatic scale-up animation, color-coded glow background

### RecoveryStep.jsx
- Glass card for step content
- Progress bar: horizontal glass pills with glow connector
- Inputs: dark-themed with focus glow
- Step 5 navigates to `/therapy` instead of `/graduation`
- Quote callout: glass card with rose accent border

### TherapyPage.jsx (NEW)
- Dedicated full-screen therapy room
- Split layout concept: therapy "room" ambiance
- Chat interface: messages in glass bubbles
- User messages: solid violet, right-aligned
- Therapist messages: glass card, left-aligned, with "Dr. Unplugged" avatar/label
- Input bar: glass-style with send button
- "I'm ready to graduate" button appears after 3+ exchanges
- Header with session context ("Post-Recovery Therapy Session")

### GraduationPage.jsx
- Glass certificate with holographic shimmer effect (animated gradient border)
- Confetti: keep but upgrade to more varied particle shapes
- "Go Touch Grass" button with emerald glow
- Share prompt (optional future: generate shareable card)

---

## 4. New Components

### GlassCard.jsx
- Reusable glass panel: accepts `className`, `glow` (boolean for hover glow), `children`
- Encapsulates the backdrop-blur + border + bg pattern

### Button.jsx
- Variants: `primary` (violet glow), `secondary` (ghost glass), `success` (emerald)
- Built-in hover scale + glow animation
- Loading state with spinner

### FloatingOrbs.jsx
- Background decoration component
- 4 orbs with randomized positions and drift animations
- Accepts `colorScheme` prop to vary per page if needed

---

## 5. File Structure

```
src/
  components/
    Layout.jsx          — dark bg + FloatingOrbs + content wrapper
    GlassCard.jsx       — reusable glass panel
    Button.jsx          — themed button with glow variants
    FloatingOrbs.jsx    — animated background orbs
    TherapistChat.jsx   — OpenAI chat UI (used inside TherapyPage)
    ProgressBar.jsx     — glass pill stepper
  pages/
    LandingPage.jsx     — hero redesign
    IntakeForm.jsx      — glass quiz
    RecoveryStep.jsx    — glass recovery steps
    TherapyPage.jsx     — NEW: dedicated therapy session
    GraduationPage.jsx  — glass certificate celebration
  lib/
    openai.js           — OpenAI streaming client + fallback
  index.css             — design tokens, fonts, keyframes, grain overlay
  App.jsx               — add /therapy route
```

---

## 6. What Stays the Same
- All copy/roast content (it's great)
- React Router architecture (just add one route)
- Framer Motion for animations
- Scoring logic in IntakeForm
- Core user flow structure
- Tailwind CSS (no new component library)

## 7. Dependencies to Add
- `openai` npm package is NOT needed — direct fetch to API
- Satoshi font via Google Fonts or Fontsource
- No other new dependencies

## 8. Environment
- `.env` file with `VITE_OPENAI_API_KEY=sk-...`
- `.env` added to `.gitignore` (already has standard ignores)
- App works without API key — falls back to mock responses
