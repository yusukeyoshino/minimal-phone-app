import { useMemo, useState } from "react";
import { Modal, View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { APPLE_APPS, AppleApp } from "../data/appleApps";
import { POPULAR_APPS, PopularApp, appCategory, appLabel } from "../data/popularApps";
import { lang, t } from "../lib/i18n";

type Tab = "apple" | "popular";
type SortOrder = "asc" | "desc";

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
  const [tab, setTab] = useState<Tab>("apple");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // We keep the public callback signature (PopularApp) to minimize changes.
  // Apple apps are mapped into PopularApp shape at runtime.
  const appleAsPopular: PopularApp[] = useMemo(
    () =>
      APPLE_APPS.map((a: AppleApp) => ({
        key: a.key,
        label_en: a.label_en,
        label_ja: a.label_ja,
        url: a.url,
        category_en: a.category_en,
        category_ja: a.category_ja,
      })),
    []
  );

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    const base = tab === "apple" ? appleAsPopular : POPULAR_APPS;

    const filtered = !s
      ? base
      : base.filter((a) => {
          const label = appLabel(a, lang).toLowerCase();
          const cat = appCategory(a, lang).toLowerCase();
          return label.includes(s) || cat.includes(s);
        });

    const sorted = [...filtered].sort((a, b) => appLabel(a, lang).localeCompare(appLabel(b, lang)));
    if (sortOrder === "desc") sorted.reverse();
    return sorted;
  }, [q, tab, sortOrder, appleAsPopular]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.wrap}>
        <View style={styles.topRow}>
          <View style={styles.leftSlot}>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.nav}>{t("cancel")}</Text>
            </Pressable>
          </View>

          <Text style={styles.title} numberOfLines={1}>
            {t("newShortcut")}
          </Text>

          <View style={styles.rightSlot} />
        </View>

        <View style={styles.segment}>
          <Pressable onPress={() => setTab("apple")} style={[styles.segBtn, tab === "apple" && styles.segOn]}>
            <Text style={[styles.segText, tab === "apple" && styles.segTextOn]}>{t("appleAppsTab")}</Text>
          </Pressable>
          <Pressable onPress={() => setTab("popular")} style={[styles.segBtn, tab === "popular" && styles.segOn]}>
            <Text style={[styles.segText, tab === "popular" && styles.segTextOn]}>{t("popularAppsTab")}</Text>
          </Pressable>
        </View>

        <View style={styles.searchRow}>
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

          <Pressable
            onPress={() => setSortOrder((p) => (p === "asc" ? "desc" : "asc"))}
            style={({ pressed }) => [styles.sortBtn, { opacity: pressed ? 0.7 : 1 }]}
            hitSlop={10}
          >
            <Text style={styles.sortText}>{sortOrder === "asc" ? "A→Z" : "Z→A"}</Text>
          </Pressable>
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
  topRow: { height: 44, justifyContent: "center", marginBottom: 10 },
  leftSlot: { position: "absolute", left: 0, top: 0, bottom: 0, justifyContent: "center" },
  rightSlot: { position: "absolute", right: 0, top: 0, bottom: 0, width: 72 },
  nav: { color: "#0a84ff", fontSize: 16, fontWeight: "600" },
  title: { color: "white", fontSize: 20, fontWeight: "800", letterSpacing: -0.2, textAlign: "center" },

  segment: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  segBtn: { flex: 1, paddingVertical: 10, backgroundColor: "rgba(0,0,0,0.2)", alignItems: "center" },
  segOn: { backgroundColor: "rgba(255,255,255,0.14)" },
  segText: { color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: "800" },
  segTextOn: { color: "white" },

  searchRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  searchIcon: { color: "rgba(255,255,255,0.55)", fontSize: 18 },
  searchInput: { flex: 1, color: "white", fontSize: 16 },

  sortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  sortText: { color: "white", fontSize: 12, fontWeight: "800", opacity: 0.9 },

  row: { paddingVertical: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { color: "white", fontSize: 18, fontWeight: "700" },
  rowSub: { color: "rgba(255,255,255,0.45)", marginTop: 3, fontSize: 12 },
  rowUrl: { color: "rgba(255,255,255,0.35)", fontSize: 12 },
  sep: { height: 1, backgroundColor: "rgba(255,255,255,0.07)" },
});
