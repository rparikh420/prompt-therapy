import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { STEP_NAMES } from '../../shared/content';

export default function ProgressBar({ currentStep }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.baseLine} />
        {STEP_NAMES.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <View key={label} style={styles.step}>
              <View style={[
                styles.dot,
                isCompleted && styles.dotCompleted,
                isCurrent && styles.dotCurrent,
              ]}>
                <Text style={[styles.dotText, (isCompleted || isCurrent) && styles.dotTextActive]}>
                  {isCompleted ? '✓' : stepNum}
                </Text>
              </View>
              <Text style={[
                styles.label,
                isCurrent && styles.labelCurrent,
                isCompleted && styles.labelCompleted,
              ]}>
                {label}
              </Text>
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
  baseLine: {
    position: 'absolute', top: 12, left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  step: { flex: 1, alignItems: 'center', zIndex: 1 },
  dot: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  dotCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
  dotCurrent: {
    backgroundColor: colors.primary, borderColor: colors.primaryLight,
    shadowColor: colors.primaryLight, shadowOpacity: 0.6, shadowRadius: 8, elevation: 4,
  },
  dotText: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  dotTextActive: { color: '#fff' },
  label: {
    marginTop: 6, fontSize: 8, fontWeight: '600',
    letterSpacing: 0.5, textTransform: 'uppercase',
    color: colors.textMuted, textAlign: 'center',
  },
  labelCurrent: { color: colors.primaryLight },
  labelCompleted: { color: colors.textSecondary },
});
