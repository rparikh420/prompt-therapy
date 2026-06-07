import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import TherapistChat from '../components/TherapistChat';
import { colors } from '../theme';

export default function TherapyPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={styles.header}
      >
        <Text style={styles.label}>Post-Recovery Session</Text>
        <Text style={styles.title}>The Couch</Text>
        <Text style={styles.subtitle}>
          You survived 5 steps. Now talk about your feelings — to an AI, obviously.
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
        style={styles.chatWrapper}
      >
        <GlassCard style={styles.chatCard}>
          <TherapistChat onReadyToGraduate={() => router.push('/graduation')} />
        </GlassCard>
      </MotiView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingHorizontal: 16 },
  header: { paddingVertical: 16, alignItems: 'center', gap: 4 },
  label: { fontSize: 9, color: 'rgba(167,139,250,0.6)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: '500' },
  title: { fontSize: 26, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textMuted, textAlign: 'center', paddingHorizontal: 16 },
  chatWrapper: { flex: 1, marginBottom: 16 },
  chatCard: { flex: 1 },
});
