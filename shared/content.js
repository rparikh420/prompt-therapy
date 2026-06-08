export const quotes = [
  "You asked ChatGPT to write your Tinder bio. It got more matches than you.",
  "Your Stack Overflow reputation is gathering dust.",
  "You have 14 AI tabs open. That's not multitasking, that's group therapy.",
  "Remember when you used to debug with console.log? Those were honest days.",
  "You copy-pasted an error into Claude without reading it. It said 'file not found.' THE FILE WASN'T THERE.",
  "Your git history shows 47 commits today. You wrote 3 of them. Who's the developer here?",
  "You asked an AI to write a FOR LOOP. The for-loop, bro. That's like asking someone to tie your shoes.",
];

export const ROTATION_INTERVAL = 4000;

export const questions = [
  {
    id: 1, type: 'slider',
    question: 'How many AI tabs do you have open right now?',
    subtitle: 'Be honest. We can see your browser.',
    min: 0, max: 20,
    labels: { 0: '0', 5: '5', 10: '10', 15: '15', 20: '20+' },
    getScore: (val) => Math.round((val / 20) * 10),
  },
  {
    id: 2, type: 'choice',
    question: "When you get an error, what's your first instinct?",
    subtitle: 'No judgment. Okay, maybe a little judgment.',
    options: [
      { label: 'Read the error message', score: 2, emoji: '🔍' },
      { label: 'Google it', score: 4, emoji: '🔎' },
      { label: 'Paste it into Claude', score: 8, emoji: '🤖' },
      { label: 'Paste it into Claude AND ChatGPT simultaneously', score: 10, emoji: '🚨' },
    ],
  },
  {
    id: 3, type: 'choice',
    question: 'Have you ever asked AI to write a commit message?',
    subtitle: 'Co-Authored-By: Your Conscience',
    options: [
      { label: 'Never', score: 1, emoji: '😇' },
      { label: 'Once or twice', score: 4, emoji: '😅' },
      { label: "It's my co-author on every commit", score: 8, emoji: '🫣' },
      { label: 'I asked it to write this answer', score: 10, emoji: '💀' },
    ],
  },
  {
    id: 4, type: 'choice',
    question: 'When was the last time you wrote code without AI assistance?',
    subtitle: "Take your time. We'll wait.",
    options: [
      { label: 'Today', score: 2, emoji: '💪' },
      { label: 'This week', score: 4, emoji: '😬' },
      { label: "I genuinely can't remember", score: 8, emoji: '😶' },
      { label: 'What does "without AI" mean?', score: 10, emoji: '☠️' },
    ],
  },
];

export const diagnoses = [
  { max: 15, label: 'Mild Curiosity', description: "You're fine. You use AI like a normal person. But the fact that you're HERE means you suspect something...", colorKey: 'success' },
  { max: 25, label: 'Developing Dependency', description: 'You tell yourself you could stop anytime. You just choose not to. That\'s literally what every addict says, but sure, you\'re "different."', colorKey: 'warning' },
  { max: 35, label: 'Full-Blown Addiction', description: "You haven't typed a for-loop in months. Your Stack Overflow reputation is gathering dust. Your IDE autocomplete feels personally insulted.", colorKey: 'orange' },
  { max: Infinity, label: 'Terminal Promptitis', description: 'This is the worst case we\'ve ever seen. You probably asked AI to fill out this form for you. Did you? DID YOU? ...You\'re thinking about pasting this diagnosis into Claude right now, aren\'t you.', colorKey: 'accent' },
];

export function getDiagnosis(score) {
  return diagnoses.find((d) => score <= d.max);
}

export function getQuestionScore(questions, answers, qIndex) {
  const q = questions[qIndex];
  const ans = answers[qIndex];
  if (ans === undefined) return 0;
  if (q.type === 'slider') return q.getScore(ans);
  return q.options[ans].score;
}

export const STEPS = [
  {
    number: 1, name: 'Admission', title: 'Step 1: Admission', subtitle: 'I have a problem',
    quote: 'The first step is admitting you have a problem. The second step is NOT asking ChatGPT how to admit it.',
    exercise: 'Close your eyes. Count how many AI tools you used today. Now double it, because you forgot the ones running in your IDE. Write that number below.',
    inputType: 'text', inputPlaceholder: 'I confess... I used ___ AI tools today',
  },
  {
    number: 2, name: 'Reflection', title: 'Step 2: Reflection', subtitle: 'What did I actually DO today?',
    quote: 'Your git history shows 47 commits today. You wrote 3 of them. Who\'s the developer here?',
    exercise: 'List three things you accomplished today WITHOUT AI. If you can\'t think of three, that IS the exercise.',
    inputType: 'textarea', inputPlaceholder: '1. I...\n2. I also...\n3. Okay this is harder than I thought...',
  },
  {
    number: 3, name: 'The Inventory', title: 'Step 3: The Inventory', subtitle: 'Things I used to do myself',
    quote: 'You asked an AI to write a FOR LOOP. A for-loop, bro. That\'s like asking someone to chew your food.',
    exercise: 'Check the boxes for skills you\'ve outsourced to AI:',
    inputType: 'checkboxes',
    checkboxOptions: ['Writing emails', 'Naming variables', 'Writing commit messages', 'Debugging', 'Googling', 'Basic arithmetic', 'Deciding what to eat'],
  },
  {
    number: 4, name: 'The Pledge', title: 'Step 4: The Pledge', subtitle: 'I will write my own for-loops',
    quote: 'Remember when you used to Google things and read Stack Overflow answers from 2014? Those were honest days.',
    exercise: 'Write your pledge below. What will you do differently tomorrow?',
    inputType: 'pledge', inputPlaceholder: 'I, [your name], do solemnly swear that I will...',
  },
  {
    number: 5, name: 'The Shutdown', title: 'Step 5: The Shutdown', subtitle: 'Close the tabs. All of them.',
    quote: 'You don\'t need one more prompt. You need a glass of water and some sunlight.',
    exercise: 'It\'s time. Close every AI tab. Take 3 deep breaths. Then click the button below.',
    inputType: 'breathing',
  },
];

export const STEP_NAMES = STEPS.map(s => s.name);

export const NATURE_WEBCAMS = [
  'https://explore.org/livecams/brown-bears/brown-bear-salmon-cam-brooks-702',
  'https://explore.org/livecams/african-wildlife/african-animal-lookout-camera',
  'https://www.youtube.com/watch?v=ydYDqZQpim8',
  'https://www.youtube.com/watch?v=Cp3eFsULqSg',
];

export const CONFETTI_COLORS = ['#8b5cf6', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#f87171', '#a78bfa', '#fb923c'];
