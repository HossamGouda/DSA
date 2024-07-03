// Algorith for selection sort
// Function to perform selection sort on an array
function selectionSort(arr) {
  // Iterate over each element in the array
  for (let i = 0; i < arr.length; i++) {
    // Assume the current index is the index of the smallest element
    let min = i;
    // Iterate over the rest of the array to find the smallest element
    for (let j = i + 1; j < arr.length; j++) {
      // If a smaller element is found, update 'min' to the new index
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    // If the smallest element is not at the current index, swap them
    if (min !== i) {
      let temp = arr[min];
      arr[min] = arr[i];
      arr[i] = temp;
    }
  }
  // Return the sorted array
  return arr;
}

// Test the function with an example array
console.log(
  selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 75, 23, 1, 45, 89, 33])
);
