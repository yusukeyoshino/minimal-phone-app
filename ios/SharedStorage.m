#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

// ⚠️ ここは「アプリのターゲット名」に合わせる
// 例: DumbPhoneMVP / minimal_phone_app / YourAppName
#import "DumbPhoneMVP-Swift.h"

@interface SharedStorage : NSObject <RCTBridgeModule>
@end

@implementation SharedStorage

RCT_EXPORT_MODULE();

- (NSString *)suiteName {
  return @"group.com.yusuke.dmpvp";
}

RCT_REMAP_METHOD(setString,
                 setString:(NSString *)key
                 value:(NSString *)value
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSUserDefaults *defaults =
    [[NSUserDefaults alloc] initWithSuiteName:[self suiteName]];

  if (!defaults) {
    reject(@"no_defaults",
           [NSString stringWithFormat:@"UserDefaults suite not found: %@",
            [self suiteName]],
           nil);
    return;
  }

  // 保存
  [defaults setObject:value forKey:key];
  [defaults synchronize];

  // ✅ Swift 側の Helper 経由で Widget を即更新
  if (@available(iOS 14.0, *)) {
    [WidgetKitHelper reloadTimelinesOfKind:@"DpmvpWidget"];
    // トラブル時の最終手段：
    // [WidgetKitHelper reloadAll];
  }

  resolve(@(YES));
}

RCT_REMAP_METHOD(getString,
                 getString:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSUserDefaults *defaults =
    [[NSUserDefaults alloc] initWithSuiteName:[self suiteName]];

  if (!defaults) {
    reject(@"no_defaults",
           [NSString stringWithFormat:@"UserDefaults suite not found: %@",
            [self suiteName]],
           nil);
    return;
  }

  NSString *v = [defaults stringForKey:key];
  resolve(v ?: @"");
}

@end
