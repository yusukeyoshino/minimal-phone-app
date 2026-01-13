import WidgetKit
import SwiftUI

// ✅ CHANGE THIS to match your App Group ID in Signing & Capabilities
private let APP_GROUP_ID = "group.com.yusuke.dpmvp"

// ✅ This must match the key your app writes JSON into
private let SHORTCUTS_KEY = "shortcuts_json"

struct ShortcutItem: Codable, Identifiable {
    let id: String
    let label: String
}

struct ShortcutsEntry: TimelineEntry {
    let date: Date
    let shortcuts: [ShortcutItem]
}

struct ShortcutsProvider: TimelineProvider {
    func placeholder(in context: Context) -> ShortcutsEntry {
        ShortcutsEntry(date: Date(), shortcuts: sample())
    }

    func getSnapshot(in context: Context, completion: @escaping (ShortcutsEntry) -> Void) {
        completion(ShortcutsEntry(date: Date(), shortcuts: loadShortcuts()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<ShortcutsEntry>) -> Void) {
        let entry = ShortcutsEntry(date: Date(), shortcuts: loadShortcuts())

        // Widget is also refreshed when your app calls WidgetCenter.shared.reloadAllTimelines()
        let next = Calendar.current.date(byAdding: .minute, value: 30, to: Date()) ?? Date().addingTimeInterval(1800)

        completion(Timeline(entries: [entry], policy: .after(next)))
    }

    private func loadShortcuts() -> [ShortcutItem] {
        guard let defaults = UserDefaults(suiteName: APP_GROUP_ID) else {
            return sample()
        }
        guard let json = defaults.string(forKey: SHORTCUTS_KEY) else {
            return sample()
        }
        guard let data = json.data(using: .utf8) else {
            return sample()
        }

        do {
            let decoded = try JSONDecoder().decode([ShortcutItem].self, from: data)
            if decoded.isEmpty { return sample() }
            return Array(decoded.prefix(12)) // Large can show more
        } catch {
            return sample()
        }
    }

    private func sample() -> [ShortcutItem] {
        return [
            .init(id: "calendar", label: "Calendar"),
            .init(id: "messages", label: "Messenger"),
            .init(id: "maps", label: "Maps"),
            .init(id: "music", label: "Music"),
            .init(id: "mail", label: "Mail"),
            .init(id: "notes", label: "Notes"),
        ]
    }
}

struct ShortcutsWidgetView: View {
    let entry: ShortcutsEntry

    var body: some View {
        content
            .applyWidgetBackground() // ✅ fixes the “broken UI” corners/background
    }

    private var content: some View {
        VStack(alignment: .leading, spacing: 0) {
            ForEach(entry.shortcuts.prefix(12)) { s in
                Link(destination: URL(string: "dpmvp://open?id=\(s.id)")!) {
                    Text(s.label)
                        .font(.system(size: 22, weight: .bold))
                        .foregroundColor(.white)
                        .lineLimit(1)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.vertical, 12)
                }

                if s.id != entry.shortcuts.prefix(12).last?.id {
                    Rectangle()
                        .fill(Color.white.opacity(0.12))
                        .frame(height: 1)
                }
            }

            Spacer(minLength: 0)
        }
        .padding(16)
    }
}

private extension View {
    @ViewBuilder
    func applyWidgetBackground() -> some View {
        if #available(iOSApplicationExtension 17.0, *) {
            self.containerBackground(.black, for: .widget)
        } else {
            ZStack {
                Color.black
                self
            }
        }
    }
}

struct DpmvpWidget: Widget {
    let kind: String = "DpmvpWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: ShortcutsProvider()) { entry in
            ShortcutsWidgetView(entry: entry)
        }
        .configurationDisplayName("DumbPhone MVP")
        .description("Your shortcut list")
        .supportedFamilies([.systemLarge]) // ✅ biggest square-ish
    }
}
