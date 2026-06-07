import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';

function Orb({ style, color, size, duration, delay }) {
  return (
    <MotiView
      from={{ translateX: 0, translateY: 0, scale: 1 }}
      animate={{ translateX: [0, 40, -20, 30, 0], translateY: [0, -30, 40, 20, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
      transition={{ type: 'timing', duration, delay, loop: true }}
      style={[styles.orb, { width: size, height: size, backgroundColor: color }, style]}
    />
  );
}

export default function FloatingOrbs() {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Orb color="rgba(124,58,237,0.25)" size={350} duration={20000} delay={0} style={styles.orb1} />
      <Orb color="rgba(244,63,94,0.2)" size={300} duration={25000} delay={500} style={styles.orb2} />
      <Orb color="rgba(20,184,166,0.15)" size={280} duration={22000} delay={1000} style={styles.orb3} />
      <Orb color="rgba(99,102,241,0.15)" size={350} duration={28000} delay={1500} style={styles.orb4} />
    </View>
  );
}

const styles = StyleSheet.create({
  orb: { position: 'absolute', borderRadius: 999, opacity: 0.8 },
  orb1: { top: -100, left: -80 },
  orb2: { top: -60, right: -60 },
  orb3: { bottom: -80, left: -40 },
  orb4: { bottom: -100, right: -60 },
});
