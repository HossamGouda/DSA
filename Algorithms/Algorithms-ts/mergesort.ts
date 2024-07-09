function mergesort(arr: Array<number>): Array<number> {
  // Helper function to perform merge sort with start and end indices.
  function mergeSortHelper(
    arr: Array<number>,
    start: number,
    end: number
  ): void {
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);

    mergeSortHelper(arr, start, mid);
    mergeSortHelper(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }

  // Function to merge two sorted subarrays.
  function merge(
    arr: Array<number>,
    start: number,
    mid: number,
    end: number
  ): void {
    let leftLength = mid - start + 1;
    let rightLength = end - mid;

    // Create temporary arrays for left and right subarrays.
    let left = new Array(leftLength);
    let right = new Array(rightLength);

    // Copy data to temporary arrays.
    for (let i = 0; i < leftLength; i++) {
      left[i] = arr[start + i];
    }
    for (let j = 0; j < rightLength; j++) {
      right[j] = arr[mid + 1 + j];
    }

    // Merge the temporary arrays back into the original array.
    let i = 0,
      j = 0,
      k = start;

    while (i < leftLength && j < rightLength) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
    }

    // Copy any remaining elements of left[], if any.
    while (i < leftLength) {
      arr[k] = left[i];
      i++;
      k++;
    }

    // Copy any remaining elements of right[], if any.
    while (j < rightLength) {
      arr[k] = right[j];
      j++;
      k++;
    }
  }

  // Call the helper function with initial indices.
  mergeSortHelper(arr, 0, arr.length - 1);
  return arr;
}

let numerSet: Array<number> = [8, 65, 9, 7, 3, 5, 54];
console.log(numerSet);
numerSet = mergesort(numerSet);
console.log(numerSet);
