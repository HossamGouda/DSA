// Recursion – Divide & Conquer – Merge Sort – Algorithm

// 1- read the array x , start , midpoint and End index.
// 2- create a two new arrays for each side.
// 3- compare all the items in the array and sort it in to the original arrays.
// 4- move remain items in each array to the original array as is .
// 5- return the sorted array.

// 2- Create two arrays for each side.
//----------------
//-define the lenght of each subarray.
//-create two subarrays based on calculated length.
//- loop from start index to midpoint to fill the left subarray.
//- loop from midpoint +1 to end index to fill the right subarray.

//----------------

// 3- compare all the items in the array and sort it in to the original arrays.
//----------------
//- loop over the left subarray.
//-- if current item < 0 then add it to the main array and increase its counter.
//- loop over the right subarray.
//-- if current item < 0 then add it to the main array and increase its counter.

// Merge consideratios
//----------------
// start check the left and right subarray.
//move the negative numbers only.
// both subarrays could have remain numbers.
// all remain bumbers should be positive only.
// the array should be sorted in ascending order.

// 5- return the sorted array.
//----------------
// -return the main array.

// Time Complexity: O(n log(n)).
// Space Complexity: O(n).
//imelementary of mergesort with recursion.
function mergeSort(array, start, end) {
  // Base case: if there is only one element or less in the array, return it
  if (end <= start) {
    return;
  }

  // Divide the array into two halves
  let midpoint = Math.floor((end + start) / 2);
  mergeSort(array, start, midpoint);
  mergeSort(array, midpoint + 1, end);

  // Merge the two sorted halves
  merge(array, start, midpoint, end);
}

function merge(array, start, midpoint, end) {
  let leftLength = midpoint - start + 1;
  let rightLength = end - midpoint;

  // Create new arrays to hold the left and right halves of the original array
  let leftArray = new Array(leftLength);
  let rightArray = new Array(rightLength);

  // Copy the left half of the original array into the leftArray
  for (let i = 0; i < leftLength; i++) {
    leftArray[i] = array[start + i];
  }

  // Copy the right half of the original array into the rightArray
  for (let j = 0; j < rightLength; j++) {
    rightArray[j] = array[midpoint + 1 + j];
  }

  // Merge the left and right halves into the original array
  let i = 0,
    j = 0;
  let k = start;
  while (i < leftLength && j < rightLength) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
  }

  // Copy any remaining elements from the left or right halves into the original array
  while (i < leftLength) {
    array[k] = leftArray[i];
    i++;
    k++;
  }

  while (j < rightLength) {
    array[k] = rightArray[j];
    j++;
    k++;
  }
}

// Main function
let array = [8, 65, 9, 7, 3, 5, 54];
console.log(array);
mergeSort(array, 0, array.length - 1);
console.log(array);
