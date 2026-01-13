import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { getShortcutById } from "../db/shortcuts"; // ←下で追加例あり

export default function Open() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return router.replace("/");

        const s = getShortcutById(String(id));
        if (s?.target_url) {
          const can = await Linking.canOpenURL(s.target_url);
          if (can) await Linking.openURL(s.target_url);
        }
      } finally {
        router.replace("/");
      }
    })();
  }, [id]);

  return null;
}
