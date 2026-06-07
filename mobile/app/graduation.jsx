import { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { colors } from '../theme';

const NATURE_WEBCAMS = [
  'https://explore.org/livecams/brown-bears/brown-bear-salmon-cam-brooks-702',
  'https://explore.org/livecams/african-wildlife/african-animal-lookout-camera',
];

const CONFETTI_COLORS = ['#8b5cf6', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#f87171', '#a78bfa', '#fb923c'];

const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: Math.random() * 2,
  x: `${Math.random() * 90 + 5}%`,
  size: 8 + Math.random() * 12,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  isCircle: Math.random() > 0.5,
  duration: 3000 + Math.random() * 2000,
}));

function ConfettiPiece({ piece }) {
  return (
    <MotiView
      from={{ translateY: 800, opacity: 1, scale: 0 }}
      animate={{ translateY: -200, opacity: [0, 1, 0], scale: [0, 1, 0.5] }}
      transition={{ type: 'timing', duration: piece.duration, delay: piece.delay * 1000, loop: true }}
      style={[
        styles.confetti,
        {
          left: piece.x,
          width: piece.size,
          height: piece.isCircle ? piece.size : piece.size * 0.6,
          backgroundColor: piece.color,
          borderRadius: piece.isCircle ? piece.size : 2,
        },
      ]}
    />
  );
}

export default function GraduationPage() {
  const router = useRouter();
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleTouchGrass = () => {
    const url = NATURE_WEBCAMS[Math.floor(Math.random() * NATURE_WEBCAMS.length)];
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        {confettiPieces.map((piece) => (
          <ConfettiPiece key={piece.id} piece={piece} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 600 }}>
          <View style={styles.certBorderWrap}>
            <LinearGradient
              colors={['#8b5cf6', '#f43f5e', '#8b5cf6', '#14b8a6', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.certGradientBorder}
            >
              <View style={styles.certInner}>
                <Text style={styles.certLabel}>Certificate of Recovery</Text>
                <View style={styles.divider} />
                <Text style={styles.certBy}>This certifies that</Text>
                <Text style={styles.certName}>A Recovering Prompt Addict</Text>
                <Text style={styles.certBody}>
                  has completed the{' '}
                  <Text style={{ color: colors.primaryLight, fontWeight: '600' }}>5-Step Recovery Program</Text>
                </Text>
                <Text style={styles.certBody}>
                  and is hereby authorized to{' '}
                  <Text style={{ color: colors.accentLight, fontWeight: '600' }}>write their own code again</Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.certDate}>{today}</Text>
                <View style={styles.signatureWrap}>
                  <Text style={styles.signature}>Dr. Unplugged</Text>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureTitle}>Chief Recovery Officer</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 600, delay: 400 }}>
          <GlassCard style={styles.quoteCard}>
            <View style={styles.quoteInner}>
              <Text style={styles.quoteText}>
                "Congratulations. You just completed a program designed by AI to help you stop using AI. The irony is not lost on us."
              </Text>
            </View>
          </GlassCard>
        </MotiView>

        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 600, delay: 600 }}>
          <Text style={styles.note}>
            You survived 5 steps of brutal honesty and a therapy session. Most people relapse at Step 2.
          </Text>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 600, delay: 800 }} style={styles.actions}>
          <Button variant="success" size="lg" onPress={handleTouchGrass}>
            Go Touch Grass
          </Button>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.restart}>Start Over (we won't judge… much)</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, padding: 20, gap: 16 },
  confetti: { position: 'absolute' },
  certBorderWrap: { borderRadius: 20, overflow: 'hidden' },
  certGradientBorder: { padding: 2, borderRadius: 20 },
  certInner: {
    backgroundColor: '#0f0a1a', borderRadius: 18,
    padding: 28, alignItems: 'center', gap: 8,
  },
  certLabel: { fontSize: 10, color: colors.primaryLight, fontWeight: '700', letterSpacing: 3, textTransform: 'uppercase' },
  divider: { width: 80, height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 4 },
  certBy: { fontSize: 15, color: colors.textSecondary, fontStyle: 'italic' },
  certName: { fontSize: 26, fontWeight: '700', color: colors.primaryLight, textAlign: 'center' },
  certBody: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  certDate: { fontSize: 12, color: colors.textMuted },
  signatureWrap: { alignItems: 'center', gap: 4, marginTop: 4 },
  signature: { fontSize: 22, fontStyle: 'italic', color: colors.textSecondary },
  signatureLine: { width: 120, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  signatureTitle: { fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: colors.textMuted },
  quoteCard: {},
  quoteInner: { padding: 20 },
  quoteText: { color: colors.textSecondary, fontStyle: 'italic', fontSize: 15, lineHeight: 22, textAlign: 'center' },
  note: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  actions: { alignItems: 'center', gap: 16 },
  restart: { fontSize: 13, color: colors.textMuted, textDecorationLine: 'underline' },
});
