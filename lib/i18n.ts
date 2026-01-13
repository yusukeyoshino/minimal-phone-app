import * as Localization from "expo-localization";

export type Lang = "en" | "ja";

export const lang: Lang =
  Localization.getLocales?.()?.[0]?.languageCode === "ja" ? "ja" : "en";

const dict = {
  en: {
    addNewShortcut: "Add New Shortcut",
    appearance: "Appearance",
    edit: "Edit",
    done: "Done",
    help: "Help",
    settings: "Settings",
    newShortcut: "New Shortcut",
    popularApps: "POPULAR APPS",
    searchCommonApps: "Search common apps",
    cancel: "Cancel",
    save: "Save",
    editShortcut: "Edit Shortcut",
    appDetails: "APP DETAILS",
    screenName: "Screen Name",
    popularAppsTab: "Popular Apps",
    customUrlTab: "Custom URL",
    urlSchemePlaceholder: "URL scheme (e.g. sms:, maps:, whatsapp://)",
    tipEditDrag: "Tip: Edit → long-press ≡ and drag to reorder.",
    mvpSettings: "MVP: settings later",
  },
  ja: {
    addNewShortcut: "ショートカットを追加",
    appearance: "外観",
    edit: "編集",
    done: "完了",
    help: "ヘルプ",
    settings: "設定",
    newShortcut: "新規ショートカット",
    popularApps: "よく使うアプリ",
    searchCommonApps: "アプリを検索",
    cancel: "キャンセル",
    save: "保存",
    editShortcut: "ショートカット編集",
    appDetails: "アプリ詳細",
    screenName: "表示名",
    popularAppsTab: "人気アプリ",
    customUrlTab: "カスタムURL",
    urlSchemePlaceholder: "URLスキーム（例: sms: / maps: / whatsapp://）",
    tipEditDrag: "ヒント：編集 → ≡ を長押しして並び替え。",
    mvpSettings: "MVP：設定は後で追加",
  },
} as const;

type Key = keyof typeof dict.en;

export function t(key: Key) {
  return dict[lang][key];
}
