export function detectFileType(dataBuffer) {
    const data = new Uint8Array(dataBuffer);
  
    // PDF ファイルの判定
    if (data[0] === 0x25 && data[1] === 0x50 && data[2] === 0x44 && data[3] === 0x46) {
      return "PDF";
    }
  
    // ZIP ファイルの判定
    if (data[0] === 0x50 && data[1] === 0x4b && ((data[2] === 0x03 && data[3] === 0x04) || (data[2] === 0x05 && data[3] === 0x06) || (data[2] === 0x07 && data[3] === 0x08))) {
       return "ZIP";
     }
     
  
    // GIF ファイルの判定
    if (data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x38 && (data[4] === 0x37 || data[4] === 0x39) && data[5] === 0x61) {
      return "GIF";
    }
  
    // PNG ファイルの判定
    if (data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47) {
      return "PNG";
    }
  
    // どのマジックバイトにも一致しない場合は "UNKNOWN"
    return "UNKNOWN";
  }
  