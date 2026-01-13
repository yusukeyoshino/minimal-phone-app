import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { migrate } from "../db/schema";
import { seedIfEmpty } from "../db/seed";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      migrate();
      seedIfEmpty();
      setReady(true);
    } catch (e) {
      console.error("DB init failed:", e);
      setReady(false);
    }
  }, []);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </GestureHandlerRootView>
  );
}
