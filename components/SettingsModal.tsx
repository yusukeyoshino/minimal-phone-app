import { Modal, View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { t } from "../lib/i18n";

export default function SettingsModal({
  visible,
  onClose,
  showSeparators,
  onChangeShowSeparators,
  alignment,
  onChangeAlignment,
}: {
  visible: boolean;
  onClose: () => void;
  showSeparators: boolean;
  onChangeShowSeparators: (v: boolean) => void;
  alignment: "left" | "center" | "right";
  onChangeAlignment: (v: "left" | "center" | "right") => void;
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.wrap}>
        <View style={styles.topRow}>
          <Pressable onPress={onClose} hitSlop={10}>
            <Text style={styles.nav}>{t("done")}</Text>
          </Pressable>
          <Text style={styles.title}>{t("settings")}</Text>
          <View style={{ width: 72 }} />
        </View>

        <Text style={styles.section}>{t("display")}</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{t("showSeparators")}</Text>
            <Text style={styles.rowSub}>{t("showSeparatorsDesc")}</Text>
          </View>
          <Switch
            value={showSeparators}
            onValueChange={onChangeShowSeparators}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{t("alignment")}</Text>
            <Text style={styles.rowSub}>{t("alignmentDesc")}</Text>
          </View>

          <View style={styles.segment}>
            <Pressable
              onPress={() => onChangeAlignment("left")}
              style={[styles.segBtn, alignment === "left" && styles.segBtnActive]}
              hitSlop={8}
            >
              <Text style={[styles.segText, alignment === "left" && styles.segTextActive]}>
                {t("alignLeft")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onChangeAlignment("center")}
              style={[styles.segBtn, alignment === "center" && styles.segBtnActive]}
              hitSlop={8}
            >
              <Text
                style={[styles.segText, alignment === "center" && styles.segTextActive]}
              >
                {t("alignCenter")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onChangeAlignment("right")}
              style={[styles.segBtn, alignment === "right" && styles.segBtnActive]}
              hitSlop={8}
            >
              <Text style={[styles.segText, alignment === "right" && styles.segTextActive]}>
                {t("alignRight")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#0b0b0b", padding: 18, paddingTop: 10 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  nav: { color: "#0a84ff", fontSize: 17, fontWeight: "600" },
  title: { color: "white", fontSize: 34, fontWeight: "800", letterSpacing: -0.4 },
  section: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: "700", marginTop: 6, marginBottom: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  rowTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  rowSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 },

  segment: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 14,
    overflow: "hidden",
  },
  segBtn: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "rgba(0,0,0,0.2)" },
  segBtnActive: { backgroundColor: "rgba(255,255,255,0.14)" },
  segText: { color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: "800" },
  segTextActive: { color: "white" },
});
