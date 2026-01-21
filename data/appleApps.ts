import type { Lang } from "../lib/i18n";

export type AppleApp = {
  key: string;
  label_en: string;
  label_ja: string;
  url: string;
  category_en?: string;
  category_ja?: string;
};

// Note: these are mostly iOS URL schemes.
// Some schemes can behave differently across iOS versions.
export const APPLE_APPS: AppleApp[] = [
  { key: "calendar", label_en: "Calendar", label_ja: "カレンダー", url: "calshow://", category_en: "Apple", category_ja: "Apple" },
  { key: "messages", label_en: "Messages", label_ja: "メッセージ", url: "sms:", category_en: "Apple", category_ja: "Apple" },
  { key: "phone", label_en: "Phone", label_ja: "電話", url: "tel:", category_en: "Apple", category_ja: "Apple" },
  { key: "mail", label_en: "Mail", label_ja: "メール", url: "mailto:", category_en: "Apple", category_ja: "Apple" },
  { key: "maps", label_en: "Maps", label_ja: "マップ", url: "maps:", category_en: "Apple", category_ja: "Apple" },
  { key: "music", label_en: "Music", label_ja: "ミュージック", url: "music:", category_en: "Apple", category_ja: "Apple" },
  { key: "notes", label_en: "Notes", label_ja: "メモ", url: "mobilenotes://", category_en: "Apple", category_ja: "Apple" },
  { key: "reminders", label_en: "Reminders", label_ja: "リマインダー", url: "x-apple-reminderkit://", category_en: "Apple", category_ja: "Apple" },
  { key: "photos", label_en: "Photos", label_ja: "写真", url: "photos-redirect://", category_en: "Apple", category_ja: "Apple" },
  { key: "camera", label_en: "Camera", label_ja: "カメラ", url: "camera:", category_en: "Apple", category_ja: "Apple" },
  { key: "appstore", label_en: "App Store", label_ja: "App Store", url: "itms-apps://", category_en: "Apple", category_ja: "Apple" },
  { key: "settings", label_en: "Settings", label_ja: "設定", url: "App-Prefs:", category_en: "Apple", category_ja: "Apple" },
  { key: "safari", label_en: "Safari", label_ja: "Safari", url: "https://", category_en: "Apple", category_ja: "Apple" },
  { key: "files", label_en: "Files", label_ja: "ファイル", url: "shareddocuments://", category_en: "Apple", category_ja: "Apple" },
  { key: "clock", label_en: "Clock", label_ja: "時計", url: "clock-alarm://", category_en: "Apple", category_ja: "Apple" },
  { key: "calculator", label_en: "Calculator", label_ja: "計算機", url: "calc://", category_en: "Apple", category_ja: "Apple" },
  { key: "contacts", label_en: "Contacts", label_ja: "連絡先", url: "contacts://", category_en: "Apple", category_ja: "Apple" },
];

export function appleAppLabel(app: AppleApp, lang: Lang) {
  return lang === "ja" ? app.label_ja : app.label_en;
}

export function appleAppCategory(app: AppleApp, lang: Lang) {
  const v = lang === "ja" ? app.category_ja : app.category_en;
  return v ?? "";
}
