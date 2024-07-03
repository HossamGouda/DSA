//09 – Insertion Sort – Algorithm – Code – Analysis

// Define the insertionSort function that takes an array as an argument
function insertionSort(arr) {
  // Start from the second element (index 1) and iterate through the array
  for (let i = 1; i < arr.length; i++) {
    // Store the current element in a variable
    let currentVal = arr[i];
    // Start a second loop that goes from the current element's index - 1 to the start of the array
    // This loop continues as long as the current element of the sorted portion is greater than currentVal
    for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      // If the current element of the sorted portion is greater than currentVal, move it one position to the right
      arr[j + 1] = arr[j];
    }
    // Once the correct position for currentVal has been found, place currentVal in that position
    arr[j + 1] = currentVal;
  }
  // Return the sorted array
  return arr;
}

// Call the insertionSort function with an array and log the sorted array to the console
console.log(insertionSort([9, 5, 1, 4, 3])); // Output: [1, 3, 4, 5, 9]

//complexity O(n^2)
//time complexity O(n^2)
//space complexity O(1)
