import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { colors } from '../theme';
import { quotes } from '../../shared/content';

export default function LandingPage() {
  const router = useRouter();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInDown.delay(0).springify().damping(20)}
          style={styles.content}
        >
          <Animated.View
            entering={FadeInDown.delay(50).springify().damping(20)}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>5-Step Recovery Program</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).springify().damping(20)}>
            <Text style={styles.title}>Prompt Therapy</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).springify().damping(20)}>
            <Text style={styles.subtitle}>
              Because your relationship with AI has become...{' '}
              <Text style={styles.subtitleAccent}>concerning.</Text>
            </Text>
          </Animated.View>

          <GlassCard style={styles.quoteCard}>
            <Animated.View
              entering={FadeInDown.delay(200).springify().damping(20)}
              style={[styles.quoteInner, { opacity: quoteVisible ? 1 : 0 }]}
            >
              <Text style={styles.quoteText}>"{quotes[quoteIndex]}"</Text>
            </Animated.View>
          </GlassCard>

          <Animated.View
            entering={FadeInDown.delay(250).springify().damping(20)}
            style={styles.buttonSection}
          >
            <Button size="lg" onPress={() => router.push('/intake')}>
              Begin Recovery
            </Button>
            <Text style={styles.disclaimer}>
              No AI was harmed in the making of this program. Several were roasted.
            </Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  content: { alignItems: 'center', gap: 12 },
  badge: {
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100,
    backgroundColor: 'rgba(124,58,237,0.1)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)',
  },
  badgeText: { color: '#a78bfa', fontSize: 11, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 52, fontWeight: '700', letterSpacing: -1, color: colors.primaryLight, textAlign: 'center' },
  subtitle: { fontSize: 17, color: colors.textSecondary, textAlign: 'center', fontWeight: '300', lineHeight: 24 },
  subtitleAccent: { color: colors.accentLight, fontWeight: '500', fontStyle: 'italic' },
  quoteCard: { width: '100%', marginVertical: 12 },
  quoteInner: { padding: 24, minHeight: 100, justifyContent: 'center', alignItems: 'center' },
  quoteText: { color: colors.textSecondary, fontStyle: 'italic', fontSize: 15, lineHeight: 22, textAlign: 'center' },
  buttonSection: { alignItems: 'center', gap: 12, marginTop: 8 },
  disclaimer: { color: colors.textMuted, fontSize: 11, textAlign: 'center' },
});
