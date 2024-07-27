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

  printTree(): void {
    if (!this.root) {
      console.log("Empty tree");
      return;
    }

    const getHeight = (node: TreeNode<T> | null): number => {
      if (!node) return 0;
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    const height = getHeight(this.root);
    const width = Math.pow(2, height + 1);

    const levels: string[][] = Array(height * 2 - 1)
      .fill(null)
      .map(() => Array(width).fill(" "));

    const toString = (value: T): string => {
      if (value === null || value === undefined) {
        return "";
      }
      return String(value);
    };

    const renderNode = (
      node: TreeNode<T> | null,
      level: number,
      left: number,
      right: number
    ) => {
      if (!node) return;

      const mid = Math.floor((left + right) / 2);
      levels[level * 2][mid] = toString(node.data);

      if (node.left) {
        levels[level * 2 + 1][Math.floor((left + mid) / 2)] = "/";
        renderNode(node.left, level + 1, left, mid - 1);
      }
      if (node.right) {
        levels[level * 2 + 1][Math.floor((mid + 1 + right) / 2)] = "\\";
        renderNode(node.right, level + 1, mid + 1, right);
      }
    };

    renderNode(this.root, 0, 0, width - 1);

    levels.forEach((level) => {
      console.log(level.join(""));
    });
  }

  // PreOrder Traversal
  PreOrder(): void {
    const traverse = (node: TreeNode<T> | null): void => {
      if (node === null) return;
      process.stdout.write(`${node.data} -> `); // Printing without newline
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    console.log(""); // New line after traversal
  }

  // InOrder Traversal
  InOrder(): void {
    const traverse = (node: TreeNode<T> | null): void => {
      if (node === null) return;
      traverse(node.left);
      process.stdout.write(`${node.data} -> `); // Printing without newline
      traverse(node.right);
    };
    traverse(this.root);
    console.log(""); // New line after traversal
  }

  // PostOrder Traversal
  PostOrder(): void {
    const traverse = (node: TreeNode<T> | null): void => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      process.stdout.write(`${node.data} -> `); // Printing without newline
    };
    traverse(this.root);
    console.log(""); // New line after traversal
  }
}

// Test with numbers
console.log("Test with numbers:");
const numberTree = new BinaryTree<number>();
const numbersToInsert = [1, 2, 3, 4, 5, 6, 7];

numbersToInsert.forEach((element) => {
  numberTree.Insert(element);
  console.log(`\nTree after inserting ${element}:`);
  numberTree.printTree();
  console.log("-".repeat(20));
});

// Test with letters
console.log("\nTest with letters:");
const letterTree = new BinaryTree<string>();
const lettersToInsert = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

lettersToInsert.forEach((element) => {
  letterTree.Insert(element);
  console.log(`\nTree after inserting ${element}:`);
  letterTree.printTree();
  console.log("-".repeat(20));
});

// Testing Traversals for Numbers
console.log("Number Tree Traversals:");
console.log("PreOrder Traversal:");
numberTree.PreOrder();
console.log("InOrder Traversal:");
numberTree.InOrder();
console.log("PostOrder Traversal:");
numberTree.PostOrder();

// Testing Traversals for Letters
console.log("\nLetter Tree Traversals:");
console.log("PreOrder Traversal:");
//node->left->right
letterTree.PreOrder();
console.log("InOrder Traversal:");
//left->node->right
letterTree.InOrder();
console.log("PostOrder Traversal:");
letterTree.PostOrder();
//left->right->node
