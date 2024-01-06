// LF を CR+LF に変換
export function convertLFtoCRLF(str) {
    return str.replace(/\n/g, '\r\n');
}

// CR+LF を LF に変換
export function convertCRLFtoLF(str) {
    return str.replace(/\r\n/g, '\n');
}
