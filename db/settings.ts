import { getFirst, run } from "./client";

const nowIso = () => new Date().toISOString();

export function getSetting(key: string): string | undefined {
  const row = getFirst<{ value: string }>("SELECT value FROM settings WHERE key = ?;", [key]);
  return row?.value;
}

export function setSetting(key: string, value: string) {
  run(
    `INSERT INTO settings (key, value, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at;`,
    [key, value, nowIso()]
  );
}

export function getBoolSetting(key: string, defaultValue: boolean): boolean {
  const v = getSetting(key);
  if (v == null) return defaultValue;
  if (v === "1" || v.toLowerCase() === "true") return true;
  if (v === "0" || v.toLowerCase() === "false") return false;
  return defaultValue;
}

export function setBoolSetting(key: string, value: boolean) {
  setSetting(key, value ? "1" : "0");
}
