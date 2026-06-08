import Animated, { FadeInDown } from 'react-native-reanimated';
import { View } from 'react-native';
import { useMotion } from './MotionConfig';

export function StaggerItem({ index, children, style }) {
  const { shouldAnimate, stagger } = useMotion();

  if (!shouldAnimate) {
    return <View style={style}>{children}</View>;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * stagger).springify().damping(20).stiffness(90)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}
