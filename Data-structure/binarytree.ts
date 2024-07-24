class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  Insert(data: number): void {
    const newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const q: TreeNode[] = [];
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

  private printTreeHelper(node: TreeNode | null, level: number): void {
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

// Create a new binary tree
const tree = new BinaryTree();

// Insert elements into the tree and print after each insertion
const elementsToInsert = [1, 2, 3, 4, 5, 6, 7];

elementsToInsert.forEach((element, index) => {
  tree.Insert(element);
  console.log(`\nTree after inserting ${element}:`);
  tree.printTree();
  console.log("-".repeat(20));
});

//This logging will help to understand how the tree is constructed as elements are inserted.
