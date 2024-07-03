// Implemenation of segration array with merge sort

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
//start moving remain number from left subarray then the rught subarray.

//----------------

//start segregate the array.
function segregate(array, start, end) {
  if (end <= start) return;
  let mid = Math.floor((start + end) / 2);
  segregate(array, start, mid);
  segregate(array, mid + 1, end);
  merge(array, start, mid, end);
}
//end segregate the array.

//start merge the array.
function merge(array, start, mid, end) {
  let i, j, k;
  let left_length = mid - start + 1;
  let right_length = end - mid;

  let left_array = new Array(left_length);
  let right_array = new Array(right_length);

  for (i = 0; i < left_length; i++) {
    left_array[i] = array[start + i];
  }
  for (j = 0; j < right_length; j++) {
    right_array[j] = array[mid + 1 + j];
  }

  i = 0;
  j = 0;
  k = start;

  while (i < left_length && left_array[i] <= 0) {
    array[k] = left_array[i];
    i++;
    k++;
  }
  while (j < right_length && right_array[j] <= 0) {
    array[k] = right_array[j];
    j++;
    k++;
  }

  while (i < left_length) {
    array[k] = left_array[i];
    i++;
    k++;
  }
  while (j < right_length) {
    array[k] = right_array[j];
    j++;
    k++;
  }
}
//end merge the array.

let array = [6, -5, 12, 10, -9, -1];
segregate(array, 0, array.length - 1);
console.log(array);
