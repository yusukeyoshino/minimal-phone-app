import { run } from "./client";

export function migrate() {
  run(`
    CREATE TABLE IF NOT EXISTS shortcuts (
      id TEXT PRIMARY KEY NOT NULL,
      label TEXT NOT NULL,
      target_url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  run("CREATE INDEX IF NOT EXISTS idx_shortcuts_sort ON shortcuts(sort_order);");

  // Simple key/value settings store.
  run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}
