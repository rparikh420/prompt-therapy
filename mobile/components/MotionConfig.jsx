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
