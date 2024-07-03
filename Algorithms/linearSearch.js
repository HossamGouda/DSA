//linear Search Algorithm
function linearSearch(array, key) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === key) {
      console.log(`Element found at index: ${i}`);
      return i;
    }
  }
  console.log(`Element Not found : ${i}`);
  return -1;
}

console.log(linearSearch([2, 4, 6, 8, 10, 12, 14], 2));

//Time Complexity: O(n)
//Space Complexity: O(1)

//if n is not sorted then n
