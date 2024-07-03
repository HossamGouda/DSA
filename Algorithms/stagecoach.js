//Dynamic Programming – Stagecoach Problem .
labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
data = [
  [0, 2, 4, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 7, 4, 6, 0, 0, 0],
  [0, 0, 0, 0, 3, 2, 4, 0, 0, 0],
  [0, 0, 0, 0, 4, 1, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

n = data.length;
states = [];
states[n - 1] = {from: "", to: "", cost: 0};

for (var i = n - 2; i >= 0; i--) {
  states[i] = {from: labels[i], to: labels[j], cost: Number.MAX_SAFE_INTEGER};
  for (var j = i + 1; j < n; j++) {
    if (data[i][j] == 0) continue;

    newCost = data[i][j] + states[j].cost;

    if (newCost < states[i].cost) {
      states[i].to = labels[j];
      states[i].cost = newCost;
    }
  }
}
console.log(states);

path = ["A"];
var i = 0;
var j = 0;
while (i < states.length) {
  if (states[i].from == path[j]) {
    path[j + 1] = states[i].to;
    j++;
  }
  i++;
}

console.log("Minimum Cost:", states[0].cost);
console.log("Minimum path:", path);
