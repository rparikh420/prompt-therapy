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
