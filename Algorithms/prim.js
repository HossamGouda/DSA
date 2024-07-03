//27 – Graph – Prim’s Minimum Spanning Tree – Algorithm – Code
function find_minimum_spanning_tree() {
  let labels = ["1", "2", "3", "4", "5", "6"];
  let graph = [
    [0, 6.7, 5.2, 2.8, 5.6, 3.6],
    [6.7, 0, 5.7, 7.3, 5.1, 3.2],
    [5.2, 5.7, 0, 3.4, 8.5, 4.0],
    [2.8, 7.3, 3.4, 0, 8, 4.4],
    [5.6, 5.1, 8.5, 8, 0, 4.6],
    [3.6, 3.2, 4, 4.4, 4.6, 0],
  ];
  let v = 6;
  let selected_edges_count = 0;
  let selected = Array(v).fill(false);
  selected[0] = true;

  // While loop to keep selecting edges until we have v - 1 edges
  while (selected_edges_count < v - 1) {
    let minimum_weight = Infinity;
    let temp_from = -1;
    let temp_to = -1;

    // Loop through all vertices
    for (let i = 0; i < v; i++) {
      // If the vertex is selected
      if (selected[i]) {
        // Loop through all the vertices again
        for (let j = 0; j < v; j++) {
          // If the vertex is not selected and the weight of the edge is less than the minimum weight
          if (!selected[j] && graph[i][j] > 0 && graph[i][j] < minimum_weight) {
            minimum_weight = graph[i][j];
            temp_from = i;
            temp_to = j;
          }
        }
      }
    }

    // Select the edge with the minimum weight
    selected[temp_to] = true;
    selected_edges_count += 1;
    console.log(
      labels[temp_from] +
        " - " +
        labels[temp_to] +
        " : " +
        graph[temp_from][temp_to].toString()
    );
  }
}

find_minimum_spanning_tree();
