import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, withSequence, Easing } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#f1f5f9', '#60a5fa', '#f472b6'];
const { width } = Dimensions.get('window');

function Particle({ x, color, size, delay }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const targetY = -120 - Math.random() * 100;
    const targetX = (Math.random() - 0.5) * 120;
    const dur = 1200 + Math.random() * 500;
    const easing = Easing.out(Easing.quad);
    opacity.value = withDelay(delay, withSequence(withTiming(1, { duration: 100 }), withTiming(0, { duration: dur - 100, easing })));
    translateY.value = withDelay(delay, withTiming(targetY, { duration: dur, easing }));
    translateX.value = withDelay(delay, withTiming(targetX, { duration: dur, easing }));
    scale.value = withDelay(delay, withSequence(withTiming(1.2, { duration: 200 }), withTiming(0.4, { duration: dur - 200, easing })));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { translateX: translateX.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: color, left: x, bottom: '50%' }, style]} />;
}

export default function MiniConfetti({ show }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    if (show) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setParticles(Array.from({ length: 12 }, (_, i) => ({
        id: i, x: width * 0.3 + Math.random() * width * 0.4,
        color: COLORS[i % COLORS.length], size: 6 + Math.random() * 8, delay: Math.random() * 300,
      })));
    }
  }, [show]);

  if (!show || particles.length === 0) return null;
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.map((p) => <Particle key={p.id} {...p} />)}
    </View>
  );
}
