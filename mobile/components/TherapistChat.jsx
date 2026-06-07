import { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import { MotiView } from 'moti';
import { streamTherapistResponse } from '../lib/openai';
import { colors } from '../theme';

function TypingIndicator() {
  return (
    <View style={styles.typingRow}>
      {[0, 1, 2].map((i) => (
        <MotiView
          key={i}
          from={{ opacity: 0.3, translateY: 0 }}
          animate={{ opacity: 1, translateY: -4 }}
          transition={{ type: 'timing', duration: 400, delay: i * 200, loop: true, repeatReverse: true }}
          style={styles.typingDot}
        />
      ))}
    </View>
  );
}

export default function TherapistChat({ onReadyToGraduate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const flatListRef = useRef(null);
  const exchangeCount = useRef(0);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsStreaming(true);

    setMessages([...updatedMessages, { role: 'assistant', content: '' }]);

    try {
      const stream = streamTherapistResponse(
        updatedMessages.map((m) => ({ role: m.role, content: m.content }))
      );

      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: fullText };
          return updated;
        });
      }
      exchangeCount.current++;
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Even AI therapists need a moment sometimes. Try again?",
        };
        return updated;
      });
    }

    setIsStreaming(false);
  };

  const showGraduateButton = exchangeCount.current >= 3 && !isStreaming;

  const renderMessage = ({ item: msg }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={[styles.msgRow, msg.role === 'user' ? styles.msgRowUser : styles.msgRowAssistant]}
    >
      <View style={styles.msgWrap}>
        {msg.role === 'assistant' && (
          <Text style={styles.senderLabel}>Dr. Unplugged</Text>
        )}
        <View style={[styles.bubble, msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant]}>
          {msg.content ? (
            <Text style={[styles.bubbleText, msg.role === 'user' ? styles.bubbleTextUser : styles.bubbleTextAssistant]}>
              {msg.content}
            </Text>
          ) : (
            <TypingIndicator />
          )}
        </View>
      </View>
    </MotiView>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderMessage}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🛋️</Text>
            <Text style={styles.emptyTitle}>Welcome to your therapy session.</Text>
            <Text style={styles.emptySubtitle}>Tell your AI therapist how you feel about your AI addiction.</Text>
          </View>
        }
      />

      {showGraduateButton && onReadyToGraduate && (
        <TouchableOpacity onPress={onReadyToGraduate} style={styles.graduateBtn}>
          <Text style={styles.graduateText}>I'm ready to graduate →</Text>
        </TouchableOpacity>
      )}

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Confess your AI sins..."
          placeholderTextColor={colors.textMuted}
          editable={!isStreaming}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          style={[styles.input, isStreaming && { opacity: 0.5 }]}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!input.trim() || isStreaming}
          style={[styles.sendBtn, (!input.trim() || isStreaming) && { opacity: 0.3 }]}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12, flexGrow: 1 },
  msgRow: { flexDirection: 'row' },
  msgRowUser: { justifyContent: 'flex-end' },
  msgRowAssistant: { justifyContent: 'flex-start' },
  msgWrap: { maxWidth: '85%', gap: 4 },
  senderLabel: { fontSize: 10, color: colors.textMuted, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginLeft: 12 },
  bubble: { borderRadius: 18, paddingHorizontal: 16, paddingVertical: 12 },
  bubbleUser: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleAssistant: { backgroundColor: colors.glassBg, borderWidth: 1, borderColor: colors.glassBorder, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextUser: { color: '#fff' },
  bubbleTextAssistant: { color: colors.textSecondary },
  typingRow: { flexDirection: 'row', gap: 6, paddingVertical: 4 },
  typingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primaryLight },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 8 },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: { color: colors.textSecondary, fontSize: 14 },
  emptySubtitle: { color: colors.textMuted, fontSize: 12, textAlign: 'center', paddingHorizontal: 20 },
  graduateBtn: {
    marginHorizontal: 16, marginBottom: 8, paddingVertical: 10, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)', backgroundColor: 'rgba(16,185,129,0.06)',
    alignItems: 'center',
  },
  graduateText: { color: colors.success, fontSize: 14, fontWeight: '500' },
  inputRow: {
    flexDirection: 'row', gap: 8, padding: 12,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
  },
  input: {
    flex: 1, paddingHorizontal: 16, paddingVertical: 12,
    borderRadius: 100, borderWidth: 1, borderColor: colors.glassBorder,
    backgroundColor: 'rgba(255,255,255,0.04)', color: colors.textPrimary, fontSize: 14,
  },
  sendBtn: {
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  sendText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
