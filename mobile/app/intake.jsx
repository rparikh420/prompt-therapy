import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { colors } from '../theme';
import { questions, diagnoses, getDiagnosis, getQuestionScore } from '../../shared/content';

// Map shared colorKey to native color values
const colorKeyToNative = {
  success: colors.success,
  warning: colors.warning,
  orange: '#f97316',
  accent: colors.accent,
};

function ProgressDots({ current, total }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i < current && styles.dotPast,
            i === current && styles.dotActive,
          ]}
        />
      ))}
    </View>
  );
}

function SliderQuestion({ question, value, onChange }) {
  const val = value ?? 0;
  return (
    <View style={styles.sliderWrap}>
      <Slider
        minimumValue={question.min}
        maximumValue={question.max}
        value={val}
        onValueChange={(v) => onChange(Math.round(v))}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="rgba(255,255,255,0.1)"
        thumbTintColor={colors.primaryLight}
        style={{ width: '100%' }}
      />
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabel}>0</Text>
        <Text style={styles.sliderLabel}>10</Text>
        <Text style={styles.sliderLabel}>20+</Text>
      </View>
      <View style={styles.sliderValueWrap}>
        <Text style={styles.sliderValue}>{val}</Text>
        <Text style={styles.sliderHint}>
          {val === 0 ? 'Suspiciously low...' : val < 5 ? "That's... reasonable, actually." : val < 10 ? 'Getting concerning.' : val < 15 ? "Sir/Ma'am, this is a Wendy's." : 'You need an intervention.'}
        </Text>
      </View>
    </View>
  );
}

function ChoiceQuestion({ question, value, onChange }) {
  return (
    <View style={styles.choices}>
      {question.options.map((option, i) => {
        const isSelected = value === i;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onChange(i)}
            activeOpacity={0.8}
            style={[styles.choice, isSelected && styles.choiceSelected]}
          >
            <Text style={styles.choiceEmoji}>{option.emoji}</Text>
            <Text style={[styles.choiceLabel, isSelected && styles.choiceLabelSelected]}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function IntakeForm() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQ];
  const isLastQuestion = currentQ === questions.length - 1;
  const currentAnswer = answers[currentQ];
  const hasAnswer = currentAnswer !== undefined;

  function handleNext() {
    if (isLastQuestion) {
      const total = questions.reduce((sum, _, i) => sum + getQuestionScore(questions, answers, i), 0);
      setScore(total);
      setShowDiagnosis(true);
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  }

  const diagnosisData = getDiagnosis(score);
  const diagnosis = diagnosisData ? { ...diagnosisData, color: colorKeyToNative[diagnosisData.colorKey] } : diagnosisData;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!showDiagnosis ? (
          <MotiView
            key={`q-${currentQ}`}
            from={{ opacity: 0, translateX: 40 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 350 }}
          >
            <ProgressDots current={currentQ} total={questions.length} />
            <GlassCard style={styles.card}>
              <View style={styles.cardInner}>
                <Text style={styles.qNum}>Question {currentQ + 1} of {questions.length}</Text>
                <Text style={styles.qText}>{question.question}</Text>
                <Text style={styles.qSub}>{question.subtitle}</Text>

                {question.type === 'slider' ? (
                  <SliderQuestion question={question} value={currentAnswer} onChange={(v) => setAnswers((p) => ({ ...p, [currentQ]: v }))} />
                ) : (
                  <ChoiceQuestion question={question} value={currentAnswer} onChange={(v) => setAnswers((p) => ({ ...p, [currentQ]: v }))} />
                )}

                <View style={styles.nav}>
                  <TouchableOpacity
                    onPress={() => currentQ > 0 && setCurrentQ((p) => p - 1)}
                    disabled={currentQ === 0}
                  >
                    <Text style={[styles.backBtn, currentQ === 0 && { opacity: 0.3 }]}>Back</Text>
                  </TouchableOpacity>
                  <Button
                    size="sm"
                    onPress={handleNext}
                    disabled={!hasAnswer && question.type !== 'slider'}
                    variant={hasAnswer || question.type === 'slider' ? 'primary' : 'secondary'}
                  >
                    {isLastQuestion ? 'Get My Diagnosis' : 'Next'}
                  </Button>
                </View>
              </View>
            </GlassCard>
          </MotiView>
        ) : (
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 600 }}
          >
            <GlassCard style={styles.card}>
              <View style={styles.cardInner}>
                <Text style={styles.diagnosisLabel}>Your Diagnosis</Text>
                <Text style={styles.diagnosisScore}>{score}</Text>
                <Text style={styles.diagnosisOutOf}>out of 40</Text>
                <View style={[styles.diagnosisBox, { borderColor: `${diagnosis.color}30`, backgroundColor: `${diagnosis.color}10` }]}>
                  <Text style={[styles.diagnosisName, { color: diagnosis.color }]}>{diagnosis.label}</Text>
                  <Text style={styles.diagnosisDesc}>{diagnosis.description}</Text>
                </View>
                <Button size="lg" style={{ width: '100%' }} onPress={() => router.push(`/step/1?score=${score}`)}>
                  Start Recovery
                </Button>
                <Text style={styles.ironyNote}>Don't worry, we'll use AI to cure your AI addiction. The irony is part of the therapy.</Text>
              </View>
            </GlassCard>
          </MotiView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 24 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.1)' },
  dotPast: { backgroundColor: 'rgba(124,58,237,0.5)' },
  dotActive: { backgroundColor: colors.primaryLight, shadowColor: colors.primaryLight, shadowOpacity: 0.6, shadowRadius: 8 },
  card: { width: '100%' },
  cardInner: { padding: 20, gap: 12 },
  qNum: { fontSize: 11, color: colors.primaryLight, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1.5 },
  qText: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, lineHeight: 28 },
  qSub: { fontSize: 13, color: colors.textMuted, fontStyle: 'italic' },
  sliderWrap: { gap: 8 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  sliderLabel: { fontSize: 11, color: colors.textMuted },
  sliderValueWrap: { alignItems: 'center', gap: 4 },
  sliderValue: { fontSize: 48, fontWeight: '900', color: colors.primaryLight },
  sliderHint: { fontSize: 13, color: colors.textMuted },
  choices: { gap: 10 },
  choice: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  choiceSelected: { borderColor: 'rgba(124,58,237,0.5)', backgroundColor: 'rgba(124,58,237,0.1)' },
  choiceEmoji: { fontSize: 20 },
  choiceLabel: { fontSize: 15, color: colors.textSecondary, flex: 1 },
  choiceLabelSelected: { color: '#c4b5fd', fontWeight: '600' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 },
  backBtn: { fontSize: 14, color: colors.primaryLight, fontWeight: '500', padding: 8 },
  diagnosisLabel: { fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center' },
  diagnosisScore: { fontSize: 72, fontWeight: '900', color: colors.primaryLight, textAlign: 'center' },
  diagnosisOutOf: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: -8 },
  diagnosisBox: { padding: 16, borderRadius: 12, borderWidth: 1, gap: 8 },
  diagnosisName: { fontSize: 22, fontWeight: '700' },
  diagnosisDesc: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  ironyNote: { fontSize: 11, color: colors.textMuted, textAlign: 'center' },
});
