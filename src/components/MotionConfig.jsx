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
