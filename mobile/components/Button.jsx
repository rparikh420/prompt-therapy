import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import APressable from './AnimatedPressable';
import { colors } from '../theme';

const VARIANTS = {
  primary: { bg: colors.primary, text: '#ffffff', border: null },
  secondary: { bg: colors.glassBg, text: '#ffffff', border: colors.glassBorder },
  success: { bg: colors.success, text: '#ffffff', border: null },
  ghost: { bg: 'transparent', text: colors.primaryLight, border: null },
};

const SIZES = {
  sm: { px: 20, py: 10, fontSize: 14 },
  md: { px: 28, py: 14, fontSize: 16 },
  lg: { px: 40, py: 16, fontSize: 18 },
};

export default function Button({ children, variant = 'primary', size = 'md', loading = false, onPress, disabled, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;
  return (
    <APressable onPress={onPress} disabled={disabled || loading}
      style={[styles.base, { backgroundColor: v.bg, borderColor: v.border ?? 'transparent', borderWidth: v.border ? 1 : 0, paddingHorizontal: s.px, paddingVertical: s.py }, (disabled || loading) && styles.disabled, style]}
    >
      {loading ? <ActivityIndicator color={v.text} size="small" /> : <Text style={[styles.text, { color: v.text, fontSize: s.fontSize }]}>{children}</Text>}
    </APressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  text: { fontWeight: '600' },
  disabled: { opacity: 0.4 },
});
