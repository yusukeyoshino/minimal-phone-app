#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SharedStorage, NSObject)

RCT_EXTERN_METHOD(setString:(NSString *)key
                  value:(NSString *)value
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getString:(NSString *)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
