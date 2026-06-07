import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme';

export default function GlassCard({ children, style }) {
  return (
    <BlurView intensity={25} tint="dark" style={[styles.blur, style]}>
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  inner: {
    flex: 1,
    backgroundColor: colors.glassBg,
  },
});
