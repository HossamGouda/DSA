//28 – Graph – Breadth First Search – Algorithm – Code

// Define Vertex class
class Vertex {
  constructor() {
    this.Name = "";
    this.Visited = false;
    this.VertexLinks = [];
  }
}

// Define Edge class
class Edge {
  constructor(source, target, weight = 0) {
    this.Source = source;
    this.Target = target;
    this.Weight = weight;
  }
}

// Define Graph class
class Graph {
  constructor(names) {
    this.last_index = 0;
    this.Vertices = [];
    // Create vertices
    for (let name of names) {
      let v = new Vertex();
      v.Name = name;
      this.Vertices.push(v);
      this.last_index += 1;
    }
  }

  // Add edges to vertices
  AddEdges(vertexIndex, targets) {
    let vertex_links = [];
    for (let target of targets) {
      // Create edges
      let e = new Edge(this.Vertices[vertexIndex], this.Vertices[target]);
      vertex_links.push(e);
    }
    this.Vertices[vertexIndex].VertexLinks = vertex_links;
  }

  // Perform breadth first search on the graph
  BFS() {
    console.log("BFS From Graph Class;");
    let v = this.Vertices.length;
    let q = [];
    q.push(this.Vertices[0]);
    this.Vertices[0].Visited = true;

    while (q.length > 0) {
      let current_vertex = q.shift();
      let destinations = current_vertex.VertexLinks;
      for (let dest of destinations) {
        if (!dest.Target.Visited) {
          q.push(dest.Target);
          dest.Target.Visited = true;
          console.log(current_vertex.Name + " - " + dest.Target.Name);
        }
      }
    }

    this.RestoreVertices();
  }

  // Restore visited flag to false for all vertices
  RestoreVertices() {
    for (let v of this.Vertices) {
      v.Visited = false;
    }
  }
}

class Program {
  Main() {
    let g = new Graph(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
    g.AddEdges(0, [1, 2]);
    g.AddEdges(1, [0, 3, 4]);
    g.AddEdges(2, [0, 3, 5]);
    g.AddEdges(3, [1, 2, 4]);
    g.AddEdges(4, [1, 5]);
    g.AddEdges(5, [2, 3, 4, 7]);
    g.AddEdges(6, [7, 8]);
    g.AddEdges(7, [5, 6, 8]);
    g.AddEdges(8, [6, 7]);
    g.BFS();
  }
}

let p = new Program();
p.Main();
