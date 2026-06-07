import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { colors } from '../theme';

const quotes = [
  "You asked ChatGPT to write your Tinder bio. It got more matches than you.",
  "Your Stack Overflow reputation is gathering dust.",
  "You have 14 AI tabs open. That's not multitasking, that's group therapy.",
  "Remember when you used to debug with console.log? Those were honest days.",
  "You copy-pasted an error into Claude without reading it. It said 'file not found.' THE FILE WASN'T THERE.",
  "Your git history shows 47 commits today. You wrote 3 of them. Who's the developer here?",
  "You asked an AI to write a FOR LOOP. The for-loop, bro. That's like asking someone to tie your shoes.",
];

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
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.content}
        >
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 100 }}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>5-Step Recovery Program</Text>
          </MotiView>

          <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 600, delay: 200 }}>
            <Text style={styles.title}>Prompt Therapy</Text>
          </MotiView>

          <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 600, delay: 300 }}>
            <Text style={styles.subtitle}>
              Because your relationship with AI has become...{' '}
              <Text style={styles.subtitleAccent}>concerning.</Text>
            </Text>
          </MotiView>

          <GlassCard style={styles.quoteCard}>
            <MotiView
              animate={{ opacity: quoteVisible ? 1 : 0 }}
              transition={{ type: 'timing', duration: 350 }}
              style={styles.quoteInner}
            >
              <Text style={styles.quoteText}>"{quotes[quoteIndex]}"</Text>
            </MotiView>
          </GlassCard>

          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 600 }}
            style={styles.buttonSection}
          >
            <Button size="lg" onPress={() => router.push('/intake')}>
              Begin Recovery
            </Button>
            <Text style={styles.disclaimer}>
              No AI was harmed in the making of this program. Several were roasted.
            </Text>
          </MotiView>
        </MotiView>
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
