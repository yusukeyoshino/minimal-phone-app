import type { Lang } from "../lib/i18n";

export type PopularApp = {
  key: string;
  label_en: string;
  label_ja: string;
  url: string;
  category_en?: string;
  category_ja?: string;
};

// Non-Apple apps ("Popular Apps" tab).
// Prefer https universal links where possible, since iOS canOpenURL() may return false
// for custom schemes unless LSApplicationQueriesSchemes is configured.
export const POPULAR_APPS: PopularApp[] = [
  // AI / Search
  { key: "chatgpt", label_en: "ChatGPT", label_ja: "ChatGPT", url: "https://chat.openai.com", category_en: "AI", category_ja: "AI" },
  { key: "google", label_en: "Google", label_ja: "Google", url: "https://www.google.com", category_en: "Search", category_ja: "検索" },

  // Social / Chat
  { key: "whatsapp", label_en: "WhatsApp", label_ja: "WhatsApp", url: "https://wa.me", category_en: "Social", category_ja: "SNS" },
  { key: "line", label_en: "LINE", label_ja: "LINE", url: "https://line.me", category_en: "Social", category_ja: "SNS" },
  { key: "telegram", label_en: "Telegram", label_ja: "Telegram", url: "https://t.me", category_en: "Social", category_ja: "SNS" },
  { key: "signal", label_en: "Signal", label_ja: "Signal", url: "https://signal.org", category_en: "Social", category_ja: "SNS" },
  { key: "discord", label_en: "Discord", label_ja: "Discord", url: "https://discord.com/app", category_en: "Social", category_ja: "SNS" },
  { key: "wechat", label_en: "WeChat", label_ja: "WeChat", url: "https://www.wechat.com", category_en: "Social", category_ja: "SNS" },
  { key: "snapchat", label_en: "Snapchat", label_ja: "Snapchat", url: "https://www.snapchat.com", category_en: "Social", category_ja: "SNS" },
  { key: "x", label_en: "X", label_ja: "X", url: "https://x.com", category_en: "Social", category_ja: "SNS" },
  { key: "instagram", label_en: "Instagram", label_ja: "Instagram", url: "https://instagram.com", category_en: "Social", category_ja: "SNS" },
  { key: "facebook", label_en: "Facebook", label_ja: "Facebook", url: "https://facebook.com", category_en: "Social", category_ja: "SNS" },
  { key: "messenger", label_en: "Messenger", label_ja: "Messenger", url: "https://m.me", category_en: "Social", category_ja: "SNS" },
  { key: "tiktok", label_en: "TikTok", label_ja: "TikTok", url: "https://www.tiktok.com", category_en: "Social", category_ja: "SNS" },
  { key: "reddit", label_en: "Reddit", label_ja: "Reddit", url: "https://reddit.com", category_en: "Social", category_ja: "SNS" },
  { key: "linkedin", label_en: "LinkedIn", label_ja: "LinkedIn", url: "https://linkedin.com", category_en: "Social", category_ja: "SNS" },
  { key: "threads", label_en: "Threads", label_ja: "Threads", url: "https://www.threads.net", category_en: "Social", category_ja: "SNS" },

  // Video / Streaming
  { key: "youtube", label_en: "YouTube", label_ja: "YouTube", url: "https://youtube.com", category_en: "Video", category_ja: "動画" },
  { key: "netflix", label_en: "Netflix", label_ja: "Netflix", url: "https://netflix.com", category_en: "Video", category_ja: "動画" },
  { key: "primevideo", label_en: "Prime Video", label_ja: "Prime Video", url: "https://primevideo.com", category_en: "Video", category_ja: "動画" },
  { key: "disneyplus", label_en: "Disney+", label_ja: "Disney+", url: "https://www.disneyplus.com", category_en: "Video", category_ja: "動画" },
  { key: "hulu", label_en: "Hulu", label_ja: "Hulu", url: "https://www.hulu.com", category_en: "Video", category_ja: "動画" },
  { key: "twitch", label_en: "Twitch", label_ja: "Twitch", url: "https://twitch.tv", category_en: "Video", category_ja: "動画" },

  // Music / Audio
  { key: "spotify", label_en: "Spotify", label_ja: "Spotify", url: "https://open.spotify.com", category_en: "Music", category_ja: "音楽" },
  { key: "soundcloud", label_en: "SoundCloud", label_ja: "SoundCloud", url: "https://soundcloud.com", category_en: "Music", category_ja: "音楽" },
  { key: "podcasts", label_en: "Podcasts", label_ja: "Podcast", url: "https://podcasts.apple.com", category_en: "Audio", category_ja: "音声" },

  // Email / Productivity
  { key: "gmail", label_en: "Gmail", label_ja: "Gmail", url: "https://mail.google.com", category_en: "Email", category_ja: "メール" },
  { key: "googlemaps", label_en: "Google Maps", label_ja: "Google Maps", url: "https://maps.google.com", category_en: "Navigation", category_ja: "地図" },
  { key: "googledrive", label_en: "Google Drive", label_ja: "Google Drive", url: "https://drive.google.com", category_en: "Productivity", category_ja: "仕事" },
  { key: "googledocs", label_en: "Google Docs", label_ja: "Google Docs", url: "https://docs.google.com", category_en: "Productivity", category_ja: "仕事" },
  { key: "sheets", label_en: "Google Sheets", label_ja: "Google Sheets", url: "https://sheets.google.com", category_en: "Productivity", category_ja: "仕事" },
  { key: "notion", label_en: "Notion", label_ja: "Notion", url: "https://notion.so", category_en: "Productivity", category_ja: "仕事" },
  { key: "slack", label_en: "Slack", label_ja: "Slack", url: "https://slack.com/app", category_en: "Work", category_ja: "仕事" },
  { key: "zoom", label_en: "Zoom", label_ja: "Zoom", url: "https://zoom.us", category_en: "Work", category_ja: "仕事" },
  { key: "teams", label_en: "Microsoft Teams", label_ja: "Teams", url: "https://www.microsoft.com/microsoft-teams", category_en: "Work", category_ja: "仕事" },
  { key: "trello", label_en: "Trello", label_ja: "Trello", url: "https://trello.com", category_en: "Productivity", category_ja: "仕事" },
  { key: "asana", label_en: "Asana", label_ja: "Asana", url: "https://asana.com", category_en: "Productivity", category_ja: "仕事" },

  // Shopping
  { key: "amazon", label_en: "Amazon", label_ja: "Amazon", url: "https://amazon.com", category_en: "Shopping", category_ja: "買い物" },
  { key: "ebay", label_en: "eBay", label_ja: "eBay", url: "https://ebay.com", category_en: "Shopping", category_ja: "買い物" },
  { key: "walmart", label_en: "Walmart", label_ja: "Walmart", url: "https://walmart.com", category_en: "Shopping", category_ja: "買い物" },
  { key: "costco", label_en: "Costco", label_ja: "Costco", url: "https://costco.com", category_en: "Shopping", category_ja: "買い物" },

  // Finance
  { key: "paypal", label_en: "PayPal", label_ja: "PayPal", url: "https://paypal.com", category_en: "Finance", category_ja: "金融" },
  { key: "wise", label_en: "Wise", label_ja: "Wise", url: "https://wise.com", category_en: "Finance", category_ja: "金融" },

  // Food / Delivery
  { key: "ubereats", label_en: "Uber Eats", label_ja: "Uber Eats", url: "https://www.ubereats.com", category_en: "Food", category_ja: "フード" },
  { key: "doordash", label_en: "DoorDash", label_ja: "DoorDash", url: "https://doordash.com", category_en: "Food", category_ja: "フード" },
  { key: "instacart", label_en: "Instacart", label_ja: "Instacart", url: "https://instacart.com", category_en: "Food", category_ja: "フード" },

  // Travel
  { key: "uber", label_en: "Uber", label_ja: "Uber", url: "https://m.uber.com", category_en: "Travel", category_ja: "移動" },
  { key: "lyft", label_en: "Lyft", label_ja: "Lyft", url: "https://lyft.com", category_en: "Travel", category_ja: "移動" },
  { key: "airbnb", label_en: "Airbnb", label_ja: "Airbnb", url: "https://airbnb.com", category_en: "Travel", category_ja: "旅行" },
  { key: "booking", label_en: "Booking.com", label_ja: "Booking.com", url: "https://booking.com", category_en: "Travel", category_ja: "旅行" },

  // Utilities
  { key: "authenticator", label_en: "Authenticator", label_ja: "認証アプリ", url: "https://", category_en: "Utilities", category_ja: "ツール" },
  { key: "translate", label_en: "Google Translate", label_ja: "Google翻訳", url: "https://translate.google.com", category_en: "Utilities", category_ja: "ツール" },
  { key: "weather", label_en: "Weather", label_ja: "天気", url: "https://www.weather.com", category_en: "Utilities", category_ja: "ツール" },
];

export function appLabel(app: PopularApp, lang: Lang) {
  return lang === "ja" ? app.label_ja : app.label_en;
}

export function appCategory(app: PopularApp, lang: Lang) {
  const v = lang === "ja" ? app.category_ja : app.category_en;
  return v ?? "";
}
