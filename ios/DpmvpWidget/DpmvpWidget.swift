import WidgetKit
import SwiftUI

private let APP_GROUP_ID = "group.com.yusuke.dmpvp"
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
        let next = Calendar.current.date(byAdding: .minute, value: 30, to: Date()) ?? Date().addingTimeInterval(1800)
        completion(Timeline(entries: [entry], policy: .after(next)))
    }

private func loadShortcuts() -> [ShortcutItem] {
    guard let defaults = UserDefaults(suiteName: APP_GROUP_ID) else {
        return [.init(id: "err", label: "NO APP GROUP")]
    }

    guard let json = defaults.string(forKey: SHORTCUTS_KEY), !json.isEmpty else {
        return [.init(id: "err", label: "NO JSON")]
    }

    guard let data = json.data(using: .utf8) else {
        return [.init(id: "err", label: "BAD UTF8")]
    }

    do {
        let decoded = try JSONDecoder().decode([ShortcutItem].self, from: data)
        if decoded.isEmpty { return [.init(id: "err", label: "EMPTY JSON")] }
        return Array(decoded.prefix(12))
    } catch {
        return [.init(id: "err", label: "DECODE FAIL")]
    }
}


    private func sample() -> [ShortcutItem] {
        [
            .init(id: "calendar", label: "Calendar"),
            .init(id: "maps", label: "Maps"),
            .init(id: "notes", label: "Notes"),
            .init(id: "mail", label: "Mail"),
            .init(id: "music", label: "Music"),
            .init(id: "messages", label: "Messages"),
        ]
    }
}

struct ShortcutsWidgetView: View {
    let entry: ShortcutsEntry

    var body: some View {
        content.applyWidgetBackground()
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
    let kind = "DpmvpWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: ShortcutsProvider()) { entry in
            ShortcutsWidgetView(entry: entry)
        }
        .configurationDisplayName("DumbPhone")
        .description("Shortcut list")
        .supportedFamilies([.systemLarge])
    }
}
