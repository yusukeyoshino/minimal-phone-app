import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { getShortcutById } from "../db/shortcuts";

const FALLBACK_URLS: Record<string, string> = {
  calendar: "calshow://",
  messages: "sms:",
  phone: "tel:",
  maps: "maps:",
  music: "music:",
  mail: "mailto:",
  notes: "mobilenotes://",
  reminders: "x-apple-reminderkit://",
  camera: "camera:",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Open() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return router.replace("/");

        const sid = String(id);

        // 1) Prefer DB record (real shortcuts synced from app)
        const s = getShortcutById(sid);
        const url = s?.target_url ?? FALLBACK_URLS[sid];

        if (url) {
          // Small delay helps when app is cold-started from Widget
          await sleep(150);

          // Avoid canOpenURL() because iOS may require whitelist for queries.
          try {
            await Linking.openURL(url);
          } catch (e) {
            console.error("Failed to open url:", url, e);
          }
        }
      } finally {
        router.replace("/");
      }
    })();
  }, [id]);

  return null;
}
