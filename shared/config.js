export const SLIDER_HINTS = [
  { max: 0, text: 'Suspiciously low...' },
  { max: 5, text: "That's... reasonable, actually." },
  { max: 10, text: 'Getting concerning.' },
  { max: 15, text: "Sir/Ma'am, this is a Wendy's." },
  { max: 20, text: 'You need an intervention.' },
];

export function getSliderHint(value) {
  return (SLIDER_HINTS.find(h => value <= h.max) || SLIDER_HINTS[SLIDER_HINTS.length - 1]).text;
}
