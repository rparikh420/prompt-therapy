import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useMotion } from './MotionConfig';

function Orb({ color, size, duration, style }) {
  const { shouldAnimate } = useMotion();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!shouldAnimate) return;
    const easing = Easing.inOut(Easing.ease);
    const d = duration / 4;
    translateX.value = withRepeat(withSequence(
      withTiming(40, { duration: d, easing }), withTiming(-20, { duration: d, easing }),
      withTiming(30, { duration: d, easing }), withTiming(0, { duration: d, easing }),
    ), -1, false);
    translateY.value = withRepeat(withSequence(
      withTiming(-30, { duration: d, easing }), withTiming(40, { duration: d, easing }),
      withTiming(20, { duration: d, easing }), withTiming(0, { duration: d, easing }),
    ), -1, false);
    scale.value = withRepeat(withSequence(
      withTiming(1.1, { duration: d, easing }), withTiming(0.95, { duration: d, easing }),
      withTiming(1.05, { duration: d, easing }), withTiming(1, { duration: d, easing }),
    ), -1, false);
  }, [shouldAnimate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
  }));

  return <Animated.View style={[styles.orb, { width: size, height: size, backgroundColor: color }, animatedStyle, style]} />;
}

export default function FloatingOrbs() {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Orb color="rgba(124,58,237,0.12)" size={350} duration={20000} style={styles.orb1} />
      <Orb color="rgba(244,63,94,0.08)" size={300} duration={25000} style={styles.orb2} />
      <Orb color="rgba(20,184,166,0.06)" size={280} duration={22000} style={styles.orb3} />
      <Orb color="rgba(99,102,241,0.06)" size={350} duration={28000} style={styles.orb4} />
    </View>
  );
}

const styles = StyleSheet.create({
  orb: { position: 'absolute', borderRadius: 999 },
  orb1: { top: -100, left: -80 },
  orb2: { top: -60, right: -60 },
  orb3: { bottom: -80, left: -40 },
  orb4: { bottom: -100, right: -60 },
});
