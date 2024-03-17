export function reverse(str) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    const segments = [];
    const iterator = segmenter.segment(str);
    
    for (const segment of iterator) {
      segments.push(segment.segment);
    }
  
    const reversed = segments.reverse().join('');
    return reversed;
  }