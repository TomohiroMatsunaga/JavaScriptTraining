import { convertLFtoCRLF, convertCRLFtoLF } from './index.js';

describe('convertLFtoCRLF', () => {
  it('LF を CR+LF に変換する', () => {
    expect(convertLFtoCRLF("Hello\nWorld")).toBe("Hello\r\nWorld");
  });
});

describe('convertCRLFtoLF', () => {
  it('CR+LF を LF に変換する', () => {
    expect(convertCRLFtoLF("Hello\r\nWorld")).toBe("Hello\nWorld");
  });
});
