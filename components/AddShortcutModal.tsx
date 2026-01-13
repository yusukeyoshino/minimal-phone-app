import { useMemo, useState } from "react";
import { Modal, View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { POPULAR_APPS, PopularApp, appCategory, appLabel } from "../data/popularApps";
import { lang, t } from "../lib/i18n";

export default function AddShortcutModal({
  visible,
  onClose,
  onPick,
}: {
  visible: boolean;
  onClose: () => void;
  onPick: (app: PopularApp) => void;
}) {
  const [q, setQ] = useState("");

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return POPULAR_APPS;
    return POPULAR_APPS.filter((a) => {
      const label = appLabel(a, lang).toLowerCase();
      const cat = appCategory(a, lang).toLowerCase();
      return label.includes(s) || cat.includes(s);
    });
  }, [q]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.wrap}>
        <View style={styles.topRow}>
          <Pressable onPress={onClose} hitSlop={10}>
            <Text style={styles.nav}>{t("cancel")}</Text>
          </Pressable>
          <Text style={styles.title}>{t("newShortcut")}</Text>
          <View style={{ width: 72 }} />
        </View>

        <Text style={styles.section}>{t("popularApps")}</Text>

        <View style={styles.search}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder={t("searchCommonApps")}
            placeholderTextColor="rgba(255,255,255,0.35)"
            style={styles.searchInput}
            autoCapitalize="none"
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(it) => it.key}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPick(item)} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.6 : 1 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowText}>{appLabel(item, lang)}</Text>
                {!!appCategory(item, lang) && <Text style={styles.rowSub}>{appCategory(item, lang)}</Text>}
              </View>
              <Text style={styles.rowUrl}>{item.url}</Text>
            </Pressable>
          )}
        />
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
  search: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 12,
  },
  searchIcon: { color: "rgba(255,255,255,0.55)", fontSize: 18 },
  searchInput: { flex: 1, color: "white", fontSize: 16 },
  row: { paddingVertical: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { color: "white", fontSize: 18, fontWeight: "700" },
  rowSub: { color: "rgba(255,255,255,0.45)", marginTop: 3, fontSize: 12 },
  rowUrl: { color: "rgba(255,255,255,0.35)", fontSize: 12 },
  sep: { height: 1, backgroundColor: "rgba(255,255,255,0.07)" },
});
