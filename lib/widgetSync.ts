import { NativeModules } from "react-native";
import { listShortcuts } from "../db/shortcuts";

const { SharedStorage } = NativeModules as {
  SharedStorage?: {
    setString: (key: string, value: string) => Promise<boolean>;
    getString: (key: string) => Promise<string>;
  };
};

const KEY = "shortcuts_json";

export async function syncShortcutsToWidget() {
  if (!SharedStorage?.setString || !SharedStorage?.getString) {
    console.warn("SharedStorage native module not found");
    return;
  }

  const shortcuts = listShortcuts();
  const payload = shortcuts.map((s) => ({ id: s.id, label: s.label }));
  const json = JSON.stringify(payload);

  await SharedStorage.setString(KEY, json);

  // ✅ 書けてるか確認（コンソールで見える）
  const back = await SharedStorage.getString(KEY);
  console.log("Widget shortcuts_json saved:", back);
}
