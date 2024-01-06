export function substring(str, indexStart, indexEnd) {
  if (indexStart === undefined || isNaN(indexStart) || indexStart < 0) {
    indexStart = 0;
  } else {
    indexStart = Math.floor(indexStart);
  }

  if (indexEnd === undefined || isNaN(indexEnd) || indexEnd > str.length) {
    indexEnd = str.length;
  } else {
    indexEnd = Math.floor(indexEnd);
  }

  if (indexStart > indexEnd) {
    return '';
  }

  let result = '';
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i];
  }
  return result;
}

export function slice(str, indexStart, indexEnd) {
  if (indexStart < 0) {
    indexStart = Math.max(str.length + indexStart, 0);
  } else if (isNaN(indexStart) || indexStart === undefined) {
    indexStart = 0;
  } else {
    indexStart = Math.floor(indexStart);
  }

  if (indexEnd < 0) {
    indexEnd = str.length + indexEnd;
  } else if (isNaN(indexEnd) || indexEnd === undefined) {
    indexEnd = str.length;
  } else {
    indexEnd = Math.floor(indexEnd);
  }

  if (indexStart > indexEnd) {
    return '';
  }

  return substring(str, indexStart, indexEnd);
}

export function padStart(str, targetLength, padString) {
  if (!padString) padString = ' ';
  let padding = '';
  while (padding.length < targetLength - str.length) {
    padding += padString;
    if (padding.length + str.length > targetLength) {
      padding = padding.substring(0, targetLength - str.length);
    }
  }
  return padding + str;
}

export function trim(str) {
  let start = 0, end = str.length - 1;

  while (start <= end && (str[start] === ' ' || str[start] === '\n' || str[start] === '\r' || str[start] === '\t')) {
    start++;
  }
  while (end >= start && (str[end] === ' ' || str[end] === '\n' || str[end] === '\r' || str[end] === '\t')) {
    end--;
  }

  return start > end ? '' : substring(str, start, end + 1);
}
