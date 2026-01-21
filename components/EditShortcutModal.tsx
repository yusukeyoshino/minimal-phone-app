import { useMemo, useState } from "react";
import { Modal, View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { APPLE_APPS, AppleApp } from "../data/appleApps";
import { POPULAR_APPS, PopularApp, appCategory, appLabel } from "../data/popularApps";
import type { Shortcut } from "../db/shortcuts";
import { lang, t } from "../lib/i18n";

export default function EditShortcutModal({
  visible,
  shortcut,
  onClose,
  onSave,
}: {
  visible: boolean;
  shortcut: Shortcut | null;
  onClose: () => void;
  onSave: (patch: { label: string; target_url: string }) => void;
}) {
  const [tab, setTab] = useState<"popular" | "custom">("popular");
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [q, setQ] = useState("");

  useMemo(() => {
    if (!visible || !shortcut) return;
    setLabel(shortcut.label);
    setUrl(shortcut.target_url);
    setTab("popular");
    setQ("");
  }, [visible, shortcut?.id]);

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    const appleAsPopular: PopularApp[] = APPLE_APPS.map((a: AppleApp) => ({
      key: a.key,
      label_en: a.label_en,
      label_ja: a.label_ja,
      url: a.url,
      category_en: a.category_en,
      category_ja: a.category_ja,
    }));

    const base = [...appleAsPopular, ...POPULAR_APPS];
    if (!s) return base;
    return base.filter((a) => {
      const l = appLabel(a, lang).toLowerCase();
      const c = appCategory(a, lang).toLowerCase();
      return l.includes(s) || c.includes(s);
    });
  }, [q]);

  function pick(app: PopularApp) {
    setLabel(appLabel(app, lang));
    setUrl(app.url);
  }

  function save() {
    onSave({ label: label.trim() || "App", target_url: url.trim() || "sms:" });
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.wrap}>
        <View style={styles.topRow}>
          <Pressable onPress={onClose} hitSlop={10}>
            <Text style={styles.nav}>{t("cancel")}</Text>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable onPress={save} hitSlop={10}>
            <Text style={[styles.nav, { opacity: url.trim() ? 1 : 0.35 }]}>{t("save")}</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>{t("editShortcut")}</Text>

        <Text style={styles.section}>{t("appDetails")}</Text>
        <View style={styles.field}>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder={t("screenName")}
            placeholderTextColor="rgba(255,255,255,0.25)"
            style={styles.input}
          />
        </View>

        <View style={styles.segment}>
          <Pressable onPress={() => setTab("popular")} style={[styles.segBtn, tab === "popular" && styles.segOn]}>
            <Text style={[styles.segText, tab === "popular" && styles.segTextOn]}>{t("popularAppsTab")}</Text>
          </Pressable>
          <Pressable onPress={() => setTab("custom")} style={[styles.segBtn, tab === "custom" && styles.segOn]}>
            <Text style={[styles.segText, tab === "custom" && styles.segTextOn]}>{t("customUrlTab")}</Text>
          </Pressable>
        </View>

        {tab === "custom" ? (
          <View style={styles.field}>
            <TextInput
              value={url}
              onChangeText={setUrl}
              placeholder={t("urlSchemePlaceholder")}
              placeholderTextColor="rgba(255,255,255,0.25)"
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        ) : (
          <>
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
                <Pressable onPress={() => pick(item)} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.6 : 1 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowText}>{appLabel(item, lang)}</Text>
                    {!!appCategory(item, lang) && <Text style={styles.rowSub}>{appCategory(item, lang)}</Text>}
                  </View>
                  <Text style={styles.rowUrl}>{item.url}</Text>
                </Pressable>
              )}
            />
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#0b0b0b", padding: 18, paddingTop: 10 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  nav: { color: "#0a84ff", fontSize: 17, fontWeight: "600" },
  title: { color: "white", fontSize: 36, fontWeight: "900", letterSpacing: -0.6, marginTop: 8 },
  section: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: "800", marginTop: 16, marginBottom: 8 },
  field: {
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: { color: "white", fontSize: 16, fontWeight: "600" },
  segment: {
    flexDirection: "row",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginBottom: 12,
  },
  segBtn: { flex: 1, paddingVertical: 10, alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)" },
  segOn: { backgroundColor: "rgba(255,255,255,0.14)" },
  segText: { color: "rgba(255,255,255,0.65)", fontWeight: "800" },
  segTextOn: { color: "white" },
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
  rowText: { color: "white", fontSize: 18, fontWeight: "800" },
  rowSub: { color: "rgba(255,255,255,0.45)", marginTop: 3, fontSize: 12 },
  rowUrl: { color: "rgba(255,255,255,0.35)", fontSize: 12 },
  sep: { height: 1, backgroundColor: "rgba(255,255,255,0.07)" },
});
