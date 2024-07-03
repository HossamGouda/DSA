//13 – Binary Search – Algorithm – Code
//only for sorted array

//Search for key in array.
//claculate the middle of the array based on low and high index.
//compare the middle element with the key.
//if the key is equal mid element return the index.
//if the key is less than the middle element then search in the left subarray.
//if the key is greater than the middle element then search in the right subarray.

function binarySearch(array, key) {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (key === array[mid]) {
      return mid;
    } else if (key < array[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

console.log(binarySearch([2, 4, 6, 8, 10, 12, 14], 12));

//Time Complexity: O(log n)
//Space Complexity: O(1)
