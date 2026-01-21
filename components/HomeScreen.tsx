import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import ShortcutCard from "./ShortcutCard";
import AddShortcutModal from "./AddShortcutModal";
import EditShortcutModal from "./EditShortcutModal";
import MissingAppModal from "./MissingAppModal";
import SettingsModal from "./SettingsModal";
import {
  listShortcuts,
  addShortcut,
  removeShortcut,
  reorderShortcuts,
  updateShortcut,
  Shortcut,
} from "../db/shortcuts";
import { PopularApp, appLabel } from "../data/popularApps";
import { lang, t } from "../lib/i18n";
import { syncShortcutsToWidget } from "../lib/widgetSync";
import { getBoolSetting, getSetting, setBoolSetting, setSetting } from "../db/settings";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ missing?: string; label?: string; url?: string }>();

  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [editMode, setEditMode] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showSeparators, setShowSeparators] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Shortcut | null>(null);

  const missingFromLink = useMemo(() => {
    const isMissing = params?.missing === "1";
    if (!isMissing) return null;
    return {
      label: params?.label ? String(params.label) : undefined,
      url: params?.url ? String(params.url) : undefined,
    };
  }, [params?.missing, params?.label, params?.url]);

  const [missingLocal, setMissingLocal] = useState<
    { label?: string; url?: string } | null
  >(null);

  function refresh() {
    setShortcuts(listShortcuts());
  }

  async function refreshAndSync() {
    refresh();
    try {
      await syncShortcutsToWidget();
    } catch (e) {
      console.error("widget sync failed:", e);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        refresh();
        setShowSeparators(getBoolSetting("showSeparators", false));

        const savedAlign = getSetting("shortcutAlignment");
        if (savedAlign === "left" || savedAlign === "center" || savedAlign === "right") {
          setAlignment(savedAlign);
        } else {
          setAlignment("left");
        }

        await syncShortcutsToWidget();
      } catch (e) {
        console.error("init failed:", e);
      }
    })();
  }, []);

  function onToggleSeparators(v: boolean) {
    setShowSeparators(v);
    try {
      setBoolSetting("showSeparators", v);
    } catch (e) {
      console.error("save settings failed:", e);
    }
  }

  function onChangeAlignment(v: "left" | "center" | "right") {
    setAlignment(v);
    try {
      setSetting("shortcutAlignment", v);
    } catch (e) {
      console.error("save settings failed:", e);
    }
  }

  async function onPressItem(s: Shortcut) {
    if (editMode) {
      setSelected(s);
      setEditOpen(true);
      return;
    }

    try {
      const can = await Linking.canOpenURL(s.target_url);
      if (!can) {
        setMissingLocal({ label: s.label, url: s.target_url });
        return;
      }
      await Linking.openURL(s.target_url);
    } catch (e: any) {
      setMissingLocal({ label: s.label, url: s.target_url });
    }
  }

  async function onPickPopular(app: PopularApp) {
    addShortcut(appLabel(app, lang), app.url);
    setAddOpen(false);
    await refreshAndSync();
  }

  async function onSaveEdit(patch: { label: string; target_url: string }) {
    if (!selected) return;
    updateShortcut(selected.id, patch);
    setEditOpen(false);
    setSelected(null);
    await refreshAndSync();
  }

  async function onRemove(id: string) {
    removeShortcut(id);
    await refreshAndSync();
  }

  async function onReorder(next: Shortcut[]) {
    setShortcuts(next);
    reorderShortcuts(next);

    try {
      await syncShortcutsToWidget();
    } catch (e) {
      console.error("widget sync failed:", e);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <Pressable
          style={styles.gear}
          hitSlop={12}
          onPress={() => setSettingsOpen(true)}
        >
          <Text style={styles.icon}>⚙︎</Text>
        </Pressable>

        {/* Help icon hidden (requested) */}

        <View style={styles.cardWrap}>
          <ShortcutCard
            shortcuts={shortcuts}
            editMode={editMode}
            showSeparators={showSeparators}
            alignment={alignment}
            onPressItem={onPressItem}
            onRemove={onRemove}
            onReorder={onReorder}
            onAdd={() => setAddOpen(true)}
            onToggleEdit={() => setEditMode((v) => !v)}
          />
        </View>

        <SettingsModal
          visible={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          showSeparators={showSeparators}
          onChangeShowSeparators={onToggleSeparators}
          alignment={alignment}
          onChangeAlignment={onChangeAlignment}
        />

        <AddShortcutModal
          visible={addOpen}
          onClose={() => setAddOpen(false)}
          onPick={onPickPopular}
        />

        <EditShortcutModal
          visible={editOpen}
          shortcut={selected}
          onClose={() => {
            setEditOpen(false);
            setSelected(null);
          }}
          onSave={onSaveEdit}
        />

        <MissingAppModal
          visible={!!missingFromLink || !!missingLocal}
          label={missingLocal?.label ?? missingFromLink?.label}
          url={missingLocal?.url ?? missingFromLink?.url}
          onClose={() => {
            setMissingLocal(null);
            if (missingFromLink) {
              // Clear query params so it doesn't show again
              router.replace("/");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "black" },
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  gear: { position: "absolute", right: 16, bottom: 14, zIndex: 10 },
  icon: { color: "white", fontSize: 28, fontWeight: "800", opacity: 0.9 },
  cardWrap: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 34,
    paddingBottom: 18,
  },
});
