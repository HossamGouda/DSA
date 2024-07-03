//30 – Graph – Dijkstra’s Shortest Path – Algorithm – Code
class Vertex {
  constructor(name) {
    this.name = name;
    this.visited = false;
    this.totalLength = 0;
    this.sourceOfTotalLength = null;
    this.vertexLinks = [];
  }
}

class Edge {
  constructor(source, target, weight = 0) {
    this.weight = weight;
    this.source = source;
    this.target = target;
  }
}

class Graph {
  constructor(names) {
    this.lastIndex = 0;
    this.vertices = [];
    for (let name of names) {
      let v = new Vertex(name);
      this.vertices.push(v);
      this.lastIndex++;
    }
  }

  addEdges(vertexIndex, targets, weights = null) {
    this.vertices[vertexIndex].vertexLinks = [];
    for (let i = 0; i < targets.length; i++) {
      let edge =
        weights !== null
          ? new Edge(
              this.vertices[vertexIndex],
              this.vertices[targets[i]],
              weights[i]
            )
          : new Edge(this.vertices[vertexIndex], this.vertices[targets[i]]);
      this.vertices[vertexIndex].vertexLinks.push(edge);
    }
  }

  dijkstra() {
    console.log("Dijkstra From Graph Class;");
    for (let i = 1; i < this.vertices.length; i++) {
      this.vertices[i].totalLength = Infinity;
    }
    for (let i = 0; i < this.vertices.length; i++) {
      let current_vertex = this.vertices[i];
      let destinations = current_vertex.vertexLinks;
      if (destinations === null) {
        continue;
      }
      for (let j = 0; j < destinations.length; j++) {
        let current_edge = destinations[j];
        let new_length = current_vertex.totalLength + current_edge.weight;
        if (new_length < current_edge.target.totalLength) {
          current_edge.target.totalLength = new_length;
          current_edge.target.sourceOfTotalLength = current_vertex;
        }
      }
    }
    let path = this.vertices[this.vertices.length - 1].name;
    let v = this.vertices[this.vertices.length - 1];
    while (v.sourceOfTotalLength !== null) {
      path = v.sourceOfTotalLength.name + " - " + path;
      v = v.sourceOfTotalLength;
    }
    console.log(this.vertices[this.vertices.length - 1].totalLength);
    console.log(path);
    this.restoreVertices();
  }

  restoreVertices() {
    for (let v of this.vertices) {
      v.visited = false;
    }
  }
}

class Program {
  main() {
    let g = new Graph(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]);
    g.addEdges(0, [1, 2, 3], [2, 4, 3]);
    g.addEdges(1, [4, 5, 6], [7, 4, 6]);
    g.addEdges(2, [4, 5, 6], [3, 2, 4]);
    g.addEdges(3, [4, 5, 6], [4, 1, 5]);
    g.addEdges(4, [7, 8], [1, 4]);
    g.addEdges(5, [7, 8], [6, 3]);
    g.addEdges(6, [7, 8], [3, 3]);
    g.addEdges(7, [9], [3]);
    g.addEdges(8, [9], [4]);
    g.dijkstra();
  }
}

let p = new Program();
p.main();
