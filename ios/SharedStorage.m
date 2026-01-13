#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

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
  NSUserDefaults *defaults = [[NSUserDefaults alloc] initWithSuiteName:[self suiteName]];
  if (!defaults) {
    reject(@"no_defaults", [NSString stringWithFormat:@"UserDefaults suite not found: %@", [self suiteName]], nil);
    return;
  }

  [defaults setObject:value forKey:key];
  [defaults synchronize];

  // ✅ WidgetCenterは使わない（リンク問題回避）
  resolve(@(YES));
}

RCT_REMAP_METHOD(getString,
                 getString:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSUserDefaults *defaults = [[NSUserDefaults alloc] initWithSuiteName:[self suiteName]];
  if (!defaults) {
    reject(@"no_defaults", [NSString stringWithFormat:@"UserDefaults suite not found: %@", [self suiteName]], nil);
    return;
  }

  NSString *v = [defaults stringForKey:key];
  resolve(v ?: @"");
}

@end
