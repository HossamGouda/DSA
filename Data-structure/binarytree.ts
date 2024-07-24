class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  Insert(data: T): void {
    const newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const q: TreeNode<T>[] = [];
    q.push(this.root);

    while (q.length > 0) {
      const currentNode = q.shift()!;

      if (currentNode.left === null) {
        currentNode.left = newNode;
        break;
      } else {
        q.push(currentNode.left);
      }

      if (currentNode.right === null) {
        currentNode.right = newNode;
        break;
      } else {
        q.push(currentNode.right);
      }
    }
  }

  // Helper function to print the tree structure
  printTree(): void {
    this.printTreeHelper(this.root, 0);
  }

  private printTreeHelper(node: TreeNode<T> | null, level: number): void {
    if (node === null) {
      return;
    }

    // Print right subtree
    this.printTreeHelper(node.right, level + 1);

    // Print current node
    console.log("  ".repeat(level) + node.data);

    // Print left subtree
    this.printTreeHelper(node.left, level + 1);
  }
}

// Create a new binary tree of numbers
const numberTree = new BinaryTree<number>();

// Insert elements into the tree and print after each insertion
const numbersToInsert = [1, 2, 3, 4, 5, 6, 7];

numbersToInsert.forEach((element, index) => {
  numberTree.Insert(element);
  console.log(`\nTree after inserting ${element}:`);
  numberTree.printTree();
  console.log("-".repeat(20));
});

// Example with a string tree
const stringTree = new BinaryTree<string>();
const stringsToInsert = ["A", "B", "C", "D", "E"];

stringsToInsert.forEach((element, index) => {
  stringTree.Insert(element);
  console.log(`\nString tree after inserting ${element}:`);
  stringTree.printTree();
  console.log("-".repeat(20));
});

//This logging will help to understand how the tree is constructed as elements are inserted.
