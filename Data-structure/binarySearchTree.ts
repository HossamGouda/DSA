class TreeNode<T> {
  public Data: T;
  public Left: TreeNode<T> | null = null;
  public Right: TreeNode<T> | null = null;
  public Count: number = 1; // Count of duplicates

  constructor(data: T) {
    this.Data = data;
  }
}

class NodeAndParent<T> {
  public Node: TreeNode<T> | null;
  public Parent: TreeNode<T> | null;
  public isLeft: boolean;

  constructor(
    node: TreeNode<T> | null,
    parent: TreeNode<T> | null,
    isLeft: boolean
  ) {
    this.Node = node;
    this.Parent = parent;
    this.isLeft = isLeft;
  }
}

class Queue<T> {
  private data_list: T[] = [];

  public enqueue(data: T): void {
    this.data_list.push(data);
  }

  public dequeue(): T | undefined {
    return this.hasData() ? this.data_list.shift() : undefined;
  }

  public peek(): T | undefined {
    return this.hasData() ? this.data_list[0] : undefined;
  }

  public hasData(): boolean {
    return this.data_list.length > 0;
  }

  public size(): number {
    return this.data_list.length;
  }
}

class BinaryTree<T> {
  private Root: TreeNode<T> | null = null;

  public IsExist(data: T): boolean {
    return this.BSFind(data) !== null;
  }

  private FindNodeAndParent(data: T): NodeAndParent<T> | null {
    let currentNode = this.Root;
    let parent: TreeNode<T> | null = null;
    let left = false;

    while (currentNode !== null) {
      if (currentNode.Data === data) {
        return new NodeAndParent(currentNode, parent, left);
      } else if (currentNode.Data > data) {
        parent = currentNode;
        left = true;
        currentNode = currentNode.Left;
      } else {
        parent = currentNode;
        left = false;
        currentNode = currentNode.Right;
      }
    }
    return null;
  }

  private BSFind(data: T): TreeNode<T> | null {
    let currentNode = this.Root;
    while (currentNode !== null) {
      if (currentNode.Data === data) {
        return currentNode;
      } else if (currentNode.Data > data) {
        currentNode = currentNode.Left;
      } else {
        currentNode = currentNode.Right;
      }
    }
    return null;
  }

  public BSInsert(data: T): void {
    const newNode = new TreeNode(data);

    if (this.Root === null) {
      this.Root = newNode;
      return;
    }

    let currentNode = this.Root;

    while (true) {
      if (data < currentNode.Data) {
        // Go left
        if (currentNode.Left === null) {
          currentNode.Left = newNode;
          break;
        } else {
          currentNode = currentNode.Left;
        }
      } else if (data > currentNode.Data) {
        // Go right
        if (currentNode.Right === null) {
          currentNode.Right = newNode;
          break;
        } else {
          currentNode = currentNode.Right;
        }
      } else {
        // Duplicate found
        currentNode.Count++;
        break; // Handle duplicates by just incrementing count
      }
    }
  }

  public Delete(data: T): void {
    const nodeAndParent = this.FindNodeAndParent(data);
    if (!nodeAndParent || !nodeAndParent.Node) return;

    const nodeToDelete = nodeAndParent.Node;

    // If there's more than one of the same value, just decrement count
    if (nodeToDelete.Count > 1) {
      nodeToDelete.Count--;
      return; // Just decrement the count for duplicates
    }

    const parent = nodeAndParent.Parent;

    // Case 1: Node has no children
    if (!nodeToDelete.Left && !nodeToDelete.Right) {
      if (parent) {
        if (nodeAndParent.isLeft) parent.Left = null;
        else parent.Right = null;
      } else {
        this.Root = null; // Deleting root
      }
    }
    // Case 2: Node has one child
    else if (!nodeToDelete.Left || !nodeToDelete.Right) {
      const child = nodeToDelete.Left ? nodeToDelete.Left : nodeToDelete.Right;

      if (parent) {
        if (nodeAndParent.isLeft) parent.Left = child;
        else parent.Right = child;
      } else {
        this.Root = child; // Updating root
      }
    }
    // Case 3: Node has two children
    else {
      const successor = this.getMin(nodeToDelete.Right);
      const successorData = successor.Data;

      this.Delete(successorData); // Remove successor
      nodeToDelete.Data = successorData; // Replace data
    }
  }

  private getMin(node: TreeNode<T>): TreeNode<T> {
    while (node.Left !== null) {
      node = node.Left;
    }
    return node;
  }

  public Balance(): void {
    const nodes: T[] = [];
    this.inOrderCollect(this.Root, nodes);
    this.Root = this.buildBalancedTree(nodes, 0, nodes.length - 1);
  }

  private inOrderCollect(node: TreeNode<T> | null, nodes: T[]): void {
    if (node === null) return;

    this.inOrderCollect(node.Left, nodes);

    for (let i = 0; i < node.Count; i++) {
      // Add duplicates to the list
      nodes.push(node.Data);
    }

    this.inOrderCollect(node.Right, nodes);
  }

  private buildBalancedTree(
    nodes: T[],
    start: number,
    end: number
  ): TreeNode<T> | null {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new TreeNode(nodes[mid]);

    node.Left = this.buildBalancedTree(nodes, start, mid - 1);
    node.Right = this.buildBalancedTree(nodes, mid + 1, end);

    return node;
  }

  public Insert(data: T): void {
    const newNode = new TreeNode(data);

    if (this.Root === null) {
      this.Root = newNode;
      return;
    }

    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.Root);

    while (queue.hasData()) {
      const currentNode = queue.dequeue();

      if (currentNode) {
        if (currentNode.Left === null) {
          currentNode.Left = newNode;
          break;
        } else {
          queue.enqueue(currentNode.Left);
        }

        if (currentNode.Right === null) {
          currentNode.Right = newNode;
          break;
        } else {
          queue.enqueue(currentNode.Right);
        }
      }
    }
  }

  public Height(): number {
    return this.internalHeight(this.Root);
  }

  private internalHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;

    return (
      1 +
      Math.max(this.internalHeight(node.Left), this.internalHeight(node.Right))
    );
  }

  public PreOrder(): void {
    this.internalPreOrder(this.Root);
    console.log("");
  }

  private internalPreOrder(node: TreeNode<T> | null): void {
    if (node === null) return;

    process.stdout.write(node.Data + " -> ");

    this.internalPreOrder(node.Left);

    this.internalPreOrder(node.Right);
  }

  public InOrder(): void {
    this.internalInOrder(this.Root);
    console.log("");
  }

  private internalInOrder(node: TreeNode<T> | null): void {
    if (node === null) return;

    this.internalInOrder(node.Left);

    process.stdout.write(node.Data + " -> ");

    this.internalInOrder(node.Right);
  }

  public PostOrder(): void {
    this.internalPostOrder(this.Root);
    console.log("");
  }

  private internalPostOrder(node: TreeNode<T> | null): void {
    if (node === null) return;

    this.internalPostOrder(node.Left);

    this.internalPostOrder(node.Right);

    process.stdout.write(node.Data + " -> ");
  }

  public Print(): void {
    if (this.Root === null) {
      console.log("Tree is empty.");
      return;
    }

    const printNode = (
      node: TreeNode<T> | null,
      prefix: string,
      isLeft: boolean
    ) => {
      if (node === null) return;

      console.log(
        prefix +
          (isLeft ? "├── " : "└── ") +
          node.Data +
          (node.Count > 1 ? ` (x${node.Count})` : "")
      );
      printNode(node.Left, prefix + (isLeft ? "│   " : "    "), true);
      printNode(node.Right, prefix + (isLeft ? "│   " : "    "), false);
    };

    printNode(this.Root, "", false);
  }
}

function main() {
  const tree = new BinaryTree<number>();

  // Insert nodes
  tree.BSInsert(4);
  tree.BSInsert(2);
  tree.BSInsert(6);
  tree.BSInsert(1);
  tree.BSInsert(3);
  tree.BSInsert(5);
  tree.BSInsert(7);

  // Insert duplicates
  tree.BSInsert(4);
  tree.BSInsert(4);

  console.log("Initial Tree:");
  tree.Print();

  console.log("In-order before deletion:");
  tree.InOrder();

  tree.Delete(4); // Deleting a node with two children
  console.log("In-order after deleting 4:");
  tree.InOrder();

  tree.Balance();
  console.log("In-order after balancing:");
  tree.InOrder();

  console.log(tree.IsExist(8)); // Test existence of a value

  console.log("Tree after deletion:");
  tree.Print();

  // const charTree = new BinaryTree<string>();
  // charTree.Insert("A");
  // charTree.Insert("B");
  // charTree.Insert("C");
  // charTree.Insert("D");
  // charTree.Insert("E");
  // charTree.Insert("F");
  // charTree.Insert("G");
  // charTree.Insert("H");
  // charTree.Insert("I");
  // charTree.Print();

  // console.log("Height:", charTree.Height());
  // charTree.PreOrder();
  // charTree.InOrder();
  // charTree.PostOrder();
}

main();
