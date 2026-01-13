import { NativeModules } from "react-native";
import { listShortcuts } from "../db/shortcuts";

const { SharedStorage } = NativeModules as {
  SharedStorage?: {
    setString: (key: string, value: string) => Promise<boolean>;
  };
};

const KEY = "shortcuts_json";

export async function syncShortcutsToWidget() {
  if (!SharedStorage?.setString) {
    console.warn("SharedStorage native module not found");
    return;
  }

  const shortcuts = listShortcuts();
  const payload = shortcuts.map((s) => ({
    id: s.id,
    label: s.label,
  }));

  await SharedStorage.setString(KEY, JSON.stringify(payload));
}
