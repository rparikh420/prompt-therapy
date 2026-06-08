import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import APressable from '../../components/AnimatedPressable';
import MiniConfetti from '../../components/MiniConfetti';
import { colors } from '../../theme';
import { STEPS } from '../../../shared/content';

const inputClasses = {
  borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12,
  backgroundColor: 'rgba(255,255,255,0.04)', padding: 14,
  color: colors.textPrimary, fontSize: 14,
};

function BreathingCircle() {
  const size = useSharedValue(80);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    size.value = withRepeat(withTiming(160, { duration: 4000 }), -1, true);
    opacity.value = withRepeat(withTiming(1, { duration: 4000 }), -1, true);
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.breathingWrap}>
      <Animated.View style={[styles.breathCircle, circleStyle]} />
      <Animated.View style={textStyle}>
        <Text style={styles.breathText}>Breathe in... and out...</Text>
      </Animated.View>
    </View>
  );
}

function CheckboxOption({ label, checked, onToggle }) {
  return (
    <APressable onPress={onToggle} style={styles.checkRow}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.checkLabel, checked && styles.checkLabelChecked]}>{label}</Text>
    </APressable>
  );
}

function StepInput({ step, value, onChange }) {
  switch (step.inputType) {
    case 'text':
      return (
        <TextInput
          value={value || ''}
          onChangeText={onChange}
          placeholder={step.inputPlaceholder}
          placeholderTextColor={colors.textMuted}
          style={inputClasses}
        />
      );
    case 'textarea':
      return (
        <TextInput
          value={value || ''}
          onChangeText={onChange}
          placeholder={step.inputPlaceholder}
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          style={[inputClasses, { minHeight: 120 }]}
        />
      );
    case 'checkboxes': {
      const selected = Array.isArray(value) ? value : [];
      return (
        <View style={styles.checkboxList}>
          {step.checkboxOptions.map((option) => (
            <CheckboxOption
              key={option}
              label={option}
              checked={selected.includes(option)}
              onToggle={() => {
                const next = selected.includes(option)
                  ? selected.filter((v) => v !== option)
                  : [...selected, option];
                onChange(next);
              }}
            />
          ))}
        </View>
      );
    }
    case 'pledge':
      return (
        <GlassCard>
          <View style={styles.pledgeInner}>
            <Text style={styles.pledgeTitle}>Official Pledge of Digital Sobriety</Text>
            <TextInput
              value={value || ''}
              onChangeText={onChange}
              placeholder={step.inputPlaceholder}
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              style={[inputClasses, { minHeight: 120, fontStyle: 'italic' }]}
            />
            <Text style={styles.pledgeSigned}>Signed this day, in full clarity of mind (probably)</Text>
          </View>
        </GlassCard>
      );
    case 'breathing':
      return <BreathingCircle />;
    default:
      return null;
  }
}

export default function RecoveryStep() {
  const { step: stepParam } = useLocalSearchParams();
  const router = useRouter();
  const stepNumber = parseInt(stepParam, 10);
  const step = STEPS[stepNumber - 1];
  const [inputValues, setInputValues] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setShowCelebration(false);
  }, [stepNumber]);

  if (!step) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Step not found. You okay?</Text>
          <APressable onPress={() => router.push('/')}>
            <Text style={styles.homeLink}>Go home</Text>
          </APressable>
        </View>
      </SafeAreaView>
    );
  }

  const currentValue = inputValues[stepNumber] ?? '';

  const handleNext = () => {
    setShowCelebration(true);
    setTimeout(() => {
      if (stepNumber < STEPS.length) {
        router.push(`/step/${stepNumber + 1}`);
      } else {
        router.push('/therapy');
      }
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ProgressBar currentStep={stepNumber} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Animated.View
          key={stepNumber}
          entering={FadeInDown.springify().damping(20)}
        >
          <GlassCard>
            <View style={styles.cardInner}>
              <View>
                <Text style={styles.title}>{step.title}</Text>
                <Text style={styles.subtitle}>{step.subtitle}</Text>
              </View>

              <View style={styles.quoteBlock}>
                <Text style={styles.quoteText}>"{step.quote}"</Text>
              </View>

              <View>
                <Text style={styles.exerciseLabel}>Exercise</Text>
                <Text style={styles.exerciseText}>{step.exercise}</Text>
                <View style={{ marginTop: 12 }}>
                  <StepInput
                    step={step}
                    value={currentValue}
                    onChange={(val) => setInputValues((prev) => ({ ...prev, [stepNumber]: val }))}
                  />
                </View>
              </View>

              <View style={styles.navRow}>
                {stepNumber > 1 ? (
                  <APressable onPress={() => router.push(`/step/${stepNumber - 1}`)}>
                    <Text style={styles.prevLink}>← Previous Step</Text>
                  </APressable>
                ) : <View />}
                <Button size="sm" onPress={handleNext}>
                  {stepNumber < STEPS.length ? "I'm Ready to Move On" : 'Talk to Your Therapist'}
                </Button>
              </View>
            </View>
          </GlassCard>
        </Animated.View>
      </ScrollView>
      <MiniConfetti show={showCelebration} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingHorizontal: 16 },
  scroll: { paddingBottom: 32 },
  cardInner: { padding: 20, gap: 20 },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, lineHeight: 28 },
  subtitle: { fontSize: 16, color: colors.primaryLight, fontWeight: '500', marginTop: 4 },
  quoteBlock: {
    borderLeftWidth: 2, borderLeftColor: 'rgba(244,63,94,0.5)',
    backgroundColor: 'rgba(244,63,94,0.06)', borderRadius: 4,
    paddingHorizontal: 16, paddingVertical: 12,
  },
  quoteText: { color: colors.textSecondary, fontStyle: 'italic', fontSize: 13, lineHeight: 20 },
  exerciseLabel: { fontSize: 9, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: '700', marginBottom: 6 },
  exerciseText: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  checkboxList: { gap: 12, marginTop: 4 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  checkLabel: { fontSize: 15, color: colors.textSecondary },
  checkLabelChecked: { color: '#c4b5fd' },
  pledgeInner: { padding: 16, gap: 10 },
  pledgeTitle: { fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 3, textAlign: 'center', fontWeight: '600' },
  pledgeSigned: { fontSize: 11, color: colors.textMuted, textAlign: 'right' },
  breathingWrap: { alignItems: 'center', paddingVertical: 32, gap: 20 },
  breathCircle: {
    borderRadius: 999,
    backgroundColor: 'rgba(139,92,246,0.3)',
  },
  breathText: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  prevLink: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundText: { fontSize: 20, color: colors.textSecondary },
  homeLink: { fontSize: 15, color: colors.primaryLight, textDecorationLine: 'underline' },
});
