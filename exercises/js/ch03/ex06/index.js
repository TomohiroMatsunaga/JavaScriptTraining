export function substring(str, indexStart, indexEnd) {
  console.log("" + str + "," + indexStart + "," + indexEnd);
  let originalStart = indexStart
  if (indexStart === undefined || isNaN(indexStart) || indexStart < 0) {
    indexStart = 0;
  } else {
    indexStart = Math.floor(indexStart);
  }

  if (indexEnd === undefined || indexEnd > str.length) {
    if(originalStart > str.length) {
      return '';
    } else {
      indexEnd = str.length;
    }
  } else {
    indexEnd = Math.floor(indexEnd);
  }
  
  if(isNaN(indexEnd)){
    indexEnd = 0;
  }

  if (indexStart > indexEnd) {
    let temp = indexStart
    indexStart = indexEnd
    indexEnd = temp
    if (indexStart === undefined || isNaN(indexStart) || indexStart < 0) {
      indexStart = 0;
    }
    if (indexEnd > str.length) {
      indexEnd = str.length;
    }
  }

  let result = '';
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i];
  }
  console.log("" + result);
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
  } else if (indexEnd === undefined) {
    indexEnd = str.length;
  } else if (isNaN(indexEnd)) {
    indexEnd = 0;
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
