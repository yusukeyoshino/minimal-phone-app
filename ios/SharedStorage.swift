import Foundation
import WidgetKit

@objc(SharedStorage)
class SharedStorage: NSObject {

  private let suiteName = "group.com.yusuke.dmpvp"

  @objc
  func setString(_ key: String,
                 value: String,
                 resolver resolve: RCTPromiseResolveBlock,
                 rejecter reject: RCTPromiseRejectBlock) {

    guard let defaults = UserDefaults(suiteName: suiteName) else {
      reject("no_defaults", "UserDefaults suite not found: \(suiteName)", nil)
      return
    }

    defaults.set(value, forKey: key)
    defaults.synchronize()

    // ✅ Widgetを更新
    WidgetCenter.shared.reloadAllTimelines()

    resolve(true)
  }

  @objc
  func getString(_ key: String,
                 resolver resolve: RCTPromiseResolveBlock,
                 rejecter reject: RCTPromiseRejectBlock) {

    guard let defaults = UserDefaults(suiteName: suiteName) else {
      reject("no_defaults", "UserDefaults suite not found: \(suiteName)", nil)
      return
    }

    resolve(defaults.string(forKey: key) ?? "")
  }

  @objc static func requiresMainQueueSetup() -> Bool { false }
}
