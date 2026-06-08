# Prompt Therapy — Design Spec

## Overview
A tongue-in-cheek web app that provides "therapy" for people addicted to AI chatbots (ChatGPT, Claude, etc.). Built as a step-by-step recovery program with a snarky best-friend therapist tone. Uses AI (ironically) to power dynamic therapy responses.

## Decisions
- **Format:** Step-by-step recovery program (like AA for AI addiction)
- **Stack:** React + Vite + Tailwind CSS
- **Tone:** Snarky best friend — roasts you lovingly, but genuinely wants you to log off
- **AI:** Claude API for dynamic therapist responses
- **Visual:** Therapy Pastel — soft gradients, rounded corners, wellness aesthetic with savage quotes

## Architecture

### Pages / Flow
1. **Landing Page** — Hero with app name, tagline, dramatic "Begin Recovery" CTA
2. **Intake Form** — 3-4 funny diagnostic questions (e.g., "How many times did you copy-paste an error into Claude today?"). Calculates an "Addiction Score"
3. **Recovery Steps (5 steps)** — Each step is a page with:
   - Step number and title
   - A funny/devastating quote
   - An exercise or reflection prompt
   - An AI therapist chat bubble where you can confess/vent
   - A "I'm Ready to Move On" checkpoint button
4. **Graduation Page** — Certificate of completion, final roast, "Go Touch Grass" CTA

### The 5 Steps
1. **Admission** — "I have a problem" — Admit how many AI tools you have open right now
2. **Reflection** — "What did I even DO today?" — Reflect on what you accomplished vs what AI did
3. **The Inventory** — "Things I used to do myself" — List skills you've outsourced to AI
4. **The Pledge** — "I will write my own for-loops" — Make specific commitments
5. **The Shutdown** — "Close the tabs" — Actually close AI tabs and breathe

### Recovery Quotes (examples)
- "You asked an AI to write a FOR LOOP. The for-loop, bro. That's like asking someone to tie your shoes."
- "You have 14 ChatGPT tabs open. That's not productivity, that's a cry for help."
- "Remember when you used to Google things? Stack Overflow misses you."
- "You copy-pasted an error into Claude without even READING it. The error said 'file not found.' THE FILE WASN'T THERE, BRO."
- "Your git history shows 47 commits today. You wrote 3 of them. The AI wrote 44. Who's the developer here?"

### Components
- `App.tsx` — Router and state management (current step, addiction score)
- `LandingPage.tsx` — Hero, tagline, CTA
- `IntakeForm.tsx` — Diagnostic questions with slider/multiple-choice
- `RecoveryStep.tsx` — Reusable step component (quote, exercise, chat, checkpoint)
- `TherapistChat.tsx` — AI-powered chat component (sends to /api/chat)
- `GraduationPage.tsx` — Completion certificate
- `ProgressBar.tsx` — Shows current step in recovery journey
- `QuoteCard.tsx` — Styled quote display component
- `Layout.tsx` — Shared layout with gradient background

### API
- Single `/api/chat` endpoint (Vite dev server proxy or simple Express server)
- Sends user message + current step context to Claude API
- System prompt: "You are a snarky but loving therapist helping a software engineer quit their AI addiction. Be funny, use roasts, but genuinely help them reflect and commit to logging off. Keep responses to 2-3 sentences max."

### Styling
- Background: animated gradient (soft pink → lavender → light blue)
- Cards: white with soft shadows, rounded corners (16px)
- Accent: purple (#8b5cf6) for CTAs
- Secondary: pink (#f472b6) for quote highlights
- Font: Inter for body, space-grotesk or similar for headings
- Animations: gentle fade-in transitions between steps

### State
- All client-side (no database)
- React state: current step, addiction score, chat history per step
- Optional: localStorage to persist progress

## Non-goals
- User accounts / auth
- Usage tracking / analytics
- Mobile app (responsive web is fine)
- Actual therapeutic advice (this is comedy)
