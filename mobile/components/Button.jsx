import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors } from '../theme';

const VARIANTS = {
  primary: { bg: colors.primary, text: '#ffffff', border: null },
  secondary: { bg: 'rgba(255,255,255,0.06)', text: '#ffffff', border: 'rgba(255,255,255,0.15)' },
  success: { bg: colors.success, text: '#ffffff', border: null },
  ghost: { bg: 'transparent', text: colors.primaryLight, border: null },
};

const SIZES = {
  sm: { px: 16, py: 8, fontSize: 14 },
  md: { px: 24, py: 12, fontSize: 16 },
  lg: { px: 40, py: 16, fontSize: 18 },
};

export default function Button({ children, variant = 'primary', size = 'md', loading = false, onPress, disabled, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? 'transparent',
          borderWidth: v.border ? 1 : 0,
          paddingHorizontal: s.px,
          paddingVertical: s.py,
        },
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text style={[styles.text, { color: v.text, fontSize: s.fontSize }]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: { fontWeight: '600' },
  disabled: { opacity: 0.4 },
});
