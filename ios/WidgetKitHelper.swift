// ios/WidgetKitHelper.swift
import Foundation
import WidgetKit

@available(iOS 14.0, *)
@objcMembers
final class WidgetKitHelper: NSObject {
  class func reloadTimelines(ofKind kind: String) {
    WidgetCenter.shared.reloadTimelines(ofKind: kind)
  }

  class func reloadAll() {
    WidgetCenter.shared.reloadAllTimelines()
  }
}
