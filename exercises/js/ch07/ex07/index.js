export function bubbleSort(array) {
    let n = array.length;
    let swapped = true;
  
    while (swapped) {
      swapped = false;
      for (let i = 1; i < n; i++) {
        if (array[i - 1] > array[i]) {
          let temp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = temp;
          swapped = true;
        }
      }
      n--;
    }
    return array;
  }
  