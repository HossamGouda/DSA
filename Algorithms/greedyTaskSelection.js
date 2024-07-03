//greedy algorithm task selection problem

function greedyActivitySelector(start, end) {
  let results = [0];
  let i = 1;
  let j = 0;

  for (i = 1; i < start.length; i++) {
    if (start[i] >= end[j]) {
      results.push(i);
      j = i;
    }
  }

  return results;
}

s = [9, 10, 11, 12, 13, 15];
e = [11, 11, 12, 14, 15, 16];

console.log(greedyActivitySelector(s, e));

//time complexty O(n)
// if n is not sorted then n log(n)
