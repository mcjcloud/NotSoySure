//
//  MLKitModule.swift
//  NotSoySure
//
//  Created by Brayden Cloud on 9/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import Firebase
import UIKit
import AVKit

extension String {
  func ranges(of string: String, options: CompareOptions = .literal) -> [Range<Index>] {
    var result: [Range<Index>] = []
    var start = startIndex
    while let range = range(of: string, options: options, range: start..<endIndex) {
      result.append(range)
      start = range.lowerBound < range.upperBound ? range.upperBound : index(range.lowerBound, offsetBy: 1, limitedBy: endIndex) ?? endIndex
    }
    return result
  }
}

@objc(MLKitModule)
class MLKitModule: NSObject {
  
  @objc func processImage(_ base64Image: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    
    let imageData = NSData(base64Encoded: base64Image, options: .ignoreUnknownCharacters)
    let image = UIImage(data: imageData! as Data)
    let visionImage = VisionImage(image: image!)
    
    let vision = Vision.vision()
    let textRecognizer = vision.onDeviceTextRecognizer()
    
    let metadata = VisionImageMetadata()
    
    metadata.orientation = .rightTop
    visionImage.metadata = metadata
    
    textRecognizer.process(visionImage) { result, error in
      guard error == nil, let result = result else {
        return
      }
      let sanitizedList = self.sanitizeData(result)
      callback([NSNull(), sanitizedList])
    }
  }
  
  func sanitizeData(_ visionText: VisionText) -> [String] {
    var sanitized = [String]()
    
    let resultText = visionText.text
    print("resultText: \(resultText)")
    for block in visionText.blocks {
      sanitized.append(block.text)
    }
    return sanitized
  }
}
