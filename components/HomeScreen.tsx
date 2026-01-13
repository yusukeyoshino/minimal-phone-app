import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import ShortcutCard from "./ShortcutCard";
import AddShortcutModal from "./AddShortcutModal";
import EditShortcutModal from "./EditShortcutModal";
import { listShortcuts, addShortcut, removeShortcut, reorderShortcuts, updateShortcut, Shortcut } from "../db/shortcuts";
import { PopularApp, appLabel } from "../data/popularApps";
import { lang, t } from "../lib/i18n";

export default function HomeScreen() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [editMode, setEditMode] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Shortcut | null>(null);

  function refresh() {
    setShortcuts(listShortcuts());
  }

  useEffect(() => {
    try {
      refresh();
    } catch (e) {
      console.error("refresh failed:", e);
    }
  }, []);

  async function onPressItem(s: Shortcut) {
    if (editMode) {
      setSelected(s);
      setEditOpen(true);
      return;
    }

    try {
      const can = await Linking.canOpenURL(s.target_url);
      if (!can) {
        Alert.alert("Can't open", `Target: ${s.target_url}`);
        return;
      }
      await Linking.openURL(s.target_url);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to open");
    }
  }

  function onPickPopular(app: PopularApp) {
    addShortcut(appLabel(app, lang), app.url);
    setAddOpen(false);
    refresh();
  }

  function onSaveEdit(patch: { label: string; target_url: string }) {
    if (!selected) return;
    updateShortcut(selected.id, patch);
    setEditOpen(false);
    setSelected(null);
    refresh();
  }

  function onRemove(id: string) {
    removeShortcut(id);
    refresh();
  }

  function onReorder(next: Shortcut[]) {
    setShortcuts(next);
    reorderShortcuts(next);
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <Pressable style={styles.gear} hitSlop={12} onPress={() => Alert.alert(t("settings"), t("mvpSettings"))}>
          <Text style={styles.icon}>⚙︎</Text>
        </Pressable>

        <Pressable style={styles.help} hitSlop={12} onPress={() => Alert.alert(t("help"), t("tipEditDrag"))}>
          <Text style={styles.icon}>?</Text>
        </Pressable>

        <View style={styles.cardWrap}>
          <ShortcutCard
            shortcuts={shortcuts}
            editMode={editMode}
            onPressItem={onPressItem}
            onRemove={onRemove}
            onReorder={onReorder}
            onAdd={() => setAddOpen(true)}
            onToggleEdit={() => setEditMode((v) => !v)}
          />
        </View>

        <AddShortcutModal visible={addOpen} onClose={() => setAddOpen(false)} onPick={onPickPopular} />
        <EditShortcutModal
          visible={editOpen}
          shortcut={selected}
          onClose={() => {
            setEditOpen(false);
            setSelected(null);
          }}
          onSave={onSaveEdit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "black" },
  container: { flex: 1, backgroundColor: "black", paddingHorizontal: 16, paddingTop: 6 },
  gear: { position: "absolute", left: 16, top: 10, zIndex: 10 },
  help: { position: "absolute", right: 16, top: 10, zIndex: 10 },
  icon: { color: "white", fontSize: 28, fontWeight: "800", opacity: 0.9 },
  cardWrap: { flex: 1, justifyContent: "center", paddingTop: 34, paddingBottom: 18 },
});
