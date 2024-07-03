// 10 – Recursion

//if no basecase we got an error Stack overflow

function Factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * Factorial(n - 1);
  }
}
console.log(Factorial(5));
