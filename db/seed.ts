import { getFirst, run } from "./client";
import { makeId } from "../lib/id";
import { POPULAR_APPS, appLabel } from "../data/popularApps";
import { lang } from "../lib/i18n";

const nowIso = () => new Date().toISOString();

export function seedIfEmpty() {
  const existing = getFirst<{ c: number }>("SELECT COUNT(*) as c FROM shortcuts;");
  if (existing?.c && existing.c > 0) return;

  const defaults = ["calendar", "messages", "maps", "music", "mail"];
  const picks = POPULAR_APPS.filter((a) => defaults.includes(a.key));

  picks.forEach((a, i) => {
    run(
      `INSERT INTO shortcuts (id, label, target_url, sort_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [makeId(), appLabel(a, lang), a.url, i, nowIso(), nowIso()]
    );
  });
}
