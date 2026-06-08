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
