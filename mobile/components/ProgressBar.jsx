import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors, springs } from '../theme';
import { STEP_NAMES } from '../../shared/content';

function StepDot({ stepNum, isCompleted, isCurrent }) {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withSpring(isCurrent ? 1.15 : 1, isCurrent ? { damping: 10, stiffness: 200 } : springs.gentle);
  }, [isCurrent]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[styles.dot, isCompleted && styles.dotCompleted, isCurrent && styles.dotCurrent, animatedStyle]}>
      <Text style={[styles.dotText, (isCompleted || isCurrent) && styles.dotTextActive]}>
        {isCompleted ? '✓' : stepNum}
      </Text>
    </Animated.View>
  );
}

export default function ProgressBar({ currentStep }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.baseLine} />
        {STEP_NAMES.map((label, i) => {
          const stepNum = i + 1;
          return (
            <View key={label} style={styles.step}>
              <StepDot stepNum={stepNum} isCompleted={stepNum < currentStep} isCurrent={stepNum === currentStep} />
              <Text style={[styles.label, stepNum === currentStep && styles.labelCurrent, stepNum < currentStep && styles.labelCompleted]}>{label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' },
  baseLine: { position: 'absolute', top: 12, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.06)' },
  step: { flex: 1, alignItems: 'center', zIndex: 1 },
  dot: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  dotCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
  dotCurrent: { backgroundColor: colors.primary, borderColor: colors.primaryLight, shadowColor: colors.primaryLight, shadowOpacity: 0.4, shadowRadius: 6, elevation: 4 },
  dotText: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  dotTextActive: { color: '#fff' },
  label: { marginTop: 6, fontSize: 8, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase', color: colors.textMuted, textAlign: 'center' },
  labelCurrent: { color: colors.primaryLight },
  labelCompleted: { color: colors.textSecondary },
});
