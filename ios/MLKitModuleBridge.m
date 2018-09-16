//
//  MLKitModuleBridge.m
//  NotSoySure
//
//  Created by Brayden Cloud on 9/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MLKitModule, NSObject)

RCT_EXTERN_METHOD(processImage:(NSString *)base64Image callback:(RCTResponseSenderBlock)callback)

@end
