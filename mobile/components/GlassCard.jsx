import { View, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, springs } from '../theme';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

export default function GlassCard({ children, style, interactive = false, onPress }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  if (interactive) {
    return (
      <Pressable onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.98, springs.press); }}
        onPressOut={() => { scale.value = withSpring(1, springs.press); }}
      >
        <AnimatedBlur intensity={25} tint="dark" style={[styles.blur, animatedStyle, style]}>
          <View style={styles.inner}>{children}</View>
        </AnimatedBlur>
      </Pressable>
    );
  }
  return (
    <BlurView intensity={25} tint="dark" style={[styles.blur, style]}>
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: colors.glassBorder },
  inner: { flex: 1, backgroundColor: colors.glassBg },
});
