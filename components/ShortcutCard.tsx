import { View, Text, Pressable, StyleSheet } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import GlassCard from "./ui/GlassCard";
import type { Shortcut } from "../db/shortcuts";
import { t } from "../lib/i18n";

export default function ShortcutCard({
  shortcuts,
  editMode,
  showSeparators,
  alignment,
  onPressItem,
  onRemove,
  onReorder,
  onAdd,
  onToggleEdit,
}: {
  shortcuts: Shortcut[];
  editMode: boolean;
  showSeparators: boolean;
  alignment: "left" | "center" | "right";
  onPressItem: (s: Shortcut) => void;
  onRemove: (id: string) => void;
  onReorder: (next: Shortcut[]) => void;
  onAdd: () => void;
  onToggleEdit: () => void;
}) {
  function renderItem({ item, drag, isActive }: RenderItemParams<Shortcut>) {
    return (
      <View style={[styles.row, isActive && { opacity: 0.65 }]}>
        {editMode ? (
          <Pressable onPress={() => onRemove(item.id)} hitSlop={10} style={styles.minusWrap}>
            <View style={styles.minusDot}>
              <Text style={styles.minusText}>−</Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.minusSpacer} />
        )}

        <Pressable
          onPress={() => onPressItem(item)}
          style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.55 : 1 }]}
        >
          <Text style={[styles.rowText, { textAlign: alignment }]} numberOfLines={1}>
            {item.label}
          </Text>
        </Pressable>

        <View style={styles.handleSlot}>
          {editMode ? (
            <Pressable
              onLongPress={drag}
              delayLongPress={180}
              hitSlop={14}
              style={({ pressed }) => [styles.handlePress, { opacity: pressed ? 0.95 : 0.55 }]}
            >
              <Text style={styles.handleText}>≡</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <GlassCard>
      <View style={styles.inner}>
        <View style={styles.listArea}>
          <DraggableFlatList
            data={shortcuts}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => onReorder(data)}
            renderItem={renderItem}
            activationDistance={editMode ? 8 : 9999}
            scrollEnabled={shortcuts.length > 8}
            ItemSeparatorComponent={showSeparators ? () => <View style={styles.sep} /> : undefined}
            containerStyle={{ flexGrow: 0 }}
          />
        </View>

        <View style={styles.addWrap}>
          <Pressable onPress={onAdd} style={({ pressed }) => [styles.addBtn, { opacity: pressed ? 0.75 : 1 }]}>
            <View style={styles.plusDot}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <Text style={styles.addText}>{t("addNewShortcut")}</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => {}} hitSlop={10}>
            <Text style={styles.footerText}>{t("appearance")}</Text>
          </Pressable>
          <Pressable onPress={onToggleEdit} hitSlop={10}>
            <Text style={styles.footerText}>{editMode ? t("done") : t("edit")}</Text>
          </Pressable>
        </View>
      </View>
    </GlassCard>
  );
}

const HANDLE_W = 34;

const styles = StyleSheet.create({
  inner: { padding: 20, paddingTop: 18, minHeight: 520 },
  listArea: { flex: 1, paddingTop: 6 },

  row: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  rowText: { color: "white", fontSize: 22, fontWeight: "800", letterSpacing: -0.2, width: "100%" },
  sep: { height: 1, backgroundColor: "rgba(255,255,255,0.08)" },

  minusWrap: { paddingRight: 12 },
  minusSpacer: { width: 28 + 12 },
  minusDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#ff3b30", alignItems: "center", justifyContent: "center" },
  minusText: { color: "white", fontSize: 20, fontWeight: "900", marginTop: -2 },

  handleSlot: { width: HANDLE_W, marginLeft: 12, alignItems: "flex-end", justifyContent: "center" },
  handlePress: { width: HANDLE_W, height: 28, alignItems: "flex-end", justifyContent: "center" },
  handleText: { color: "white", fontSize: 18, fontWeight: "900" },

  addWrap: { alignItems: "center", paddingTop: 18, paddingBottom: 10 },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  plusDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#34C759", alignItems: "center", justifyContent: "center" },
  plusText: { color: "black", fontSize: 18, fontWeight: "900", marginTop: -1 },
  addText: { color: "white", fontSize: 18, fontWeight: "800" },

  footer: { flexDirection: "row", justifyContent: "space-between", paddingTop: 8 },
  footerText: { color: "white", opacity: 0.9, fontSize: 18, fontWeight: "700" },
});
