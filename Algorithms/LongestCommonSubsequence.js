//24 – Dynamic Programming – Longest Common Subsequence – Algorithm – Code
text_01 = "HELLOWORLD";
text_02 = "OHELOD";
n = text_01.length;
m = text_02.length;

text_01 = " " + text_01;
text_02 = " " + text_02;

dp = [];

for (var i = 0; i <= m; i++) {
  dp[i] = [];
  for (var j = 0; j <= n; j++) {
    if (i == 0 || j == 0) {
      dp[i][j] = 0;
    } else if (text_02[i] == text_01[j]) {
      dp[i][j] = 1 + dp[i - 1][j - 1];
    } else {
      dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
    }
  }
}

// start from the bottom right
// if current value > left value
// -- if current value == top value
// -- -- //the current value inherted from top
// -- -- move to top row
// -- else
// -- -- //current value is origin of match
// -- -- add the char to the solution
// -- -- move to the top row
// -- -- move to left column
// move to left column

str = "";
i = m;
j = n;
while (i > 0 && j > 0) {
  if (dp[i][j] > dp[i][j - 1]) {
    if (dp[i][j] == dp[i - 1][j]) {
      i--;
    } else {
      str = text_02[i] + str;
      i--;
      j--;
    }
  } else {
    j--;
  }
}

console.log(dp[m][n]);
console.log(str);
