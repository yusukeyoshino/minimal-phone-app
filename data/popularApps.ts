import type { Lang } from "../lib/i18n";

export type PopularApp = {
  key: string;
  label_en: string;
  label_ja: string;
  url: string;
  category_en?: string;
  category_ja?: string;
};

export const POPULAR_APPS: PopularApp[] = [
  { key: "calendar", label_en: "Calendar", label_ja: "カレンダー", url: "calshow://", category_en: "Apple", category_ja: "Apple" },
  { key: "messages", label_en: "Messenger", label_ja: "メッセージ", url: "sms:", category_en: "Apple", category_ja: "Apple" },
  { key: "phone", label_en: "Phone", label_ja: "電話", url: "tel:", category_en: "Apple", category_ja: "Apple" },
  { key: "maps", label_en: "Maps", label_ja: "マップ", url: "maps:", category_en: "Apple", category_ja: "Apple" },
  { key: "music", label_en: "Music", label_ja: "ミュージック", url: "music:", category_en: "Apple", category_ja: "Apple" },
  { key: "mail", label_en: "Mail", label_ja: "メール", url: "mailto:", category_en: "Apple", category_ja: "Apple" },
  { key: "notes", label_en: "Notes", label_ja: "メモ", url: "mobilenotes://", category_en: "Apple", category_ja: "Apple" },
  { key: "reminders", label_en: "Reminders", label_ja: "リマインダー", url: "x-apple-reminderkit://", category_en: "Apple", category_ja: "Apple" },
  { key: "camera", label_en: "Camera", label_ja: "カメラ", url: "camera:", category_en: "Apple", category_ja: "Apple" },

  { key: "whatsapp", label_en: "WhatsApp", label_ja: "WhatsApp", url: "whatsapp://", category_en: "Social", category_ja: "SNS" },
  { key: "line", label_en: "LINE", label_ja: "LINE", url: "line://", category_en: "Social", category_ja: "SNS" },
  { key: "gmail", label_en: "Gmail", label_ja: "Gmail", url: "googlegmail://", category_en: "Email", category_ja: "メール" },
  { key: "spotify", label_en: "Spotify", label_ja: "Spotify", url: "spotify://", category_en: "Music", category_ja: "音楽" },
  { key: "youtube", label_en: "YouTube", label_ja: "YouTube", url: "youtube://", category_en: "Video", category_ja: "動画" },
  { key: "instagram", label_en: "Instagram", label_ja: "Instagram", url: "instagram://", category_en: "Social", category_ja: "SNS" },
  { key: "slack", label_en: "Slack", label_ja: "Slack", url: "slack://", category_en: "Work", category_ja: "仕事" },
];

export function appLabel(app: PopularApp, lang: Lang) {
  return lang === "ja" ? app.label_ja : app.label_en;
}

export function appCategory(app: PopularApp, lang: Lang) {
  const v = lang === "ja" ? app.category_ja : app.category_en;
  return v ?? "";
}
