import { View, StyleSheet } from "react-native";

export default function GlassCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(0,0,0,0.45)",
    overflow: "hidden",
  },
});
