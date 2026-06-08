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
