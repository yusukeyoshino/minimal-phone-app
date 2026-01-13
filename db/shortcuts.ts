import { getAll, getFirst, run } from "./client";
import { makeId } from "../lib/id";

export type Shortcut = {
  id: string;
  label: string;
  target_url: string;
  sort_order: number;
};

const nowIso = () => new Date().toISOString();

export function listShortcuts(): Shortcut[] {
  return getAll<Shortcut>("SELECT * FROM shortcuts ORDER BY sort_order ASC;");
}

export function addShortcut(label: string, url: string) {
  const max = getFirst<{ m: number }>("SELECT COALESCE(MAX(sort_order), -1) as m FROM shortcuts;");
  const nextOrder = (max?.m ?? -1) + 1;

  run(
    "INSERT INTO shortcuts (id, label, target_url, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?);",
    [makeId(), label, url, nextOrder, nowIso(), nowIso()]
  );
}

export function updateShortcut(id: string, patch: Partial<Pick<Shortcut, "label" | "target_url">>) {
  const cur = getFirst<Shortcut>("SELECT * FROM shortcuts WHERE id = ?;", [id]);
  if (!cur) return;

  run(
    "UPDATE shortcuts SET label = ?, target_url = ?, updated_at = ? WHERE id = ?;",
    [patch.label ?? cur.label, patch.target_url ?? cur.target_url, nowIso(), id]
  );
}

export function removeShortcut(id: string) {
  run("DELETE FROM shortcuts WHERE id = ?;", [id]);
  normalizeSortOrder();
}

export function reorderShortcuts(next: Shortcut[]) {
  next.forEach((s, i) => {
    run("UPDATE shortcuts SET sort_order = ?, updated_at = ? WHERE id = ?;", [i, nowIso(), s.id]);
  });
}

function normalizeSortOrder() {
  const all = listShortcuts();
  all.forEach((s, i) => run("UPDATE shortcuts SET sort_order = ? WHERE id = ?;", [i, s.id]));
}
