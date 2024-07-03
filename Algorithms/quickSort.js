/*Insertion Sort:
Principle: Insertion sort works by dividing the array into a sorted and an unsorted region. The sorted region starts with the first element, and with each iteration, one element from the unsorted region is placed into its correct position in the sorted region.
Time Complexity: The average and worst-case time complexity of insertion sort is O(n^2), making it less efficient on large lists.
Space Complexity: The space complexity is O(1), as it only requires a single additional memory space.
Usage: It is useful when the array is almost sorted, when the problem size is small, or when using a data structure that requires low overhead (like in embedded systems).
Quick Sort:
Principle: Quick sort works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted.
Time Complexity: The average time complexity of quick sort is O(n log n), but in the worst case, it can be O(n^2), although this scenario is rare.
Space Complexity: The worst-case space complexity is O(n), but in the average case, it's O(log n) if we consider the stack space for recursion.
Usage: It is useful when the problem size is large and when average-case performance matters more than worst-case performance.
In summary, the choice between insertion sort and quick sort depends on the specific requirements of your problem, such as the size of your data and the importance of worst-case performance guarantees.*/

// 1- read the string.
// 2- create an object to store the characters and their frequencies.
// 3- loop over the string.
// 4- if the character is not in the object then add it to the object with value 1.
// 5- if the character is in the object then increment its value by 1.
// 6- return the object.
// 7- time complexity is O(n)
// 8- space complexity is O(n)

//** if we have to use array only :
function quickSort(arr) {
  //base case to stop recursion
  if (arr.length <= 1) {
    return arr;
  }

  let less = [];
  let high = [];
  let equal = [];
  let mid = arr[Math.floor(arr.length / 2)]; //middle element
  for (let i = 0; i < arr.length; i++) {
    let currntVal = arr[i];
    if (currntVal < mid) {
      less.push(currntVal);
    } else if (currntVal > mid) {
      high.push(currntVal);
    } else {
      equal.push(currntVal);
    }
  }

  return [...quickSort(less), ...equal, ...quickSort(high)];
}
