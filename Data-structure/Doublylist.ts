class LinkedListNode {
  data: number;
  next: LinkedListNode | null;
  back: LinkedListNode | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
    this.back = null;
  }
}

class LinkedListIterator {
  private currentNode: LinkedListNode | null;

  constructor(node: LinkedListNode | null = null) {
    this.currentNode = node;
  }

  data(): number {
    if (this.currentNode) {
      return this.currentNode.data;
    }
    throw new Error("Iterator is not pointing to a valid node.");
  }

  next(): LinkedListIterator {
    if (this.currentNode) {
      this.currentNode = this.currentNode.next;
    }
    return this;
  }

  current(): LinkedListNode | null {
    return this.currentNode;
  }
}

class LinkedList {
  head: LinkedListNode | null = null;
  tail: LinkedListNode | null = null;

  begin(): LinkedListIterator {
    return new LinkedListIterator(this.head);
  }

  printList(): void {
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      console.log(itr.data(), " -> ");
    }
    console.log("\n");
  }

  find(data: number): LinkedListNode | null {
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      if (data === itr.data()) {
        return itr.current();
      }
    }
    return null;
  }

  insertAfter(node: LinkedListNode, data: number): void {
    const newNode = new LinkedListNode(data);
    newNode.next = node.next;
    newNode.back = node;
    node.next = newNode;

    if (newNode.next === null) {
      this.tail = newNode;
    } else {
      newNode.next.back = newNode;
    }
  }

  insertLast(data: number): void {
    const newNode = new LinkedListNode(data);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.back = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  insertBefore(node: LinkedListNode, data: number): void {
    const newNode = new LinkedListNode(data);
    newNode.next = node;

    if (node === this.head) {
      this.head = newNode;
    } else if (node.back !== null) {
      node.back.next = newNode;
    }

    node.back = newNode;
  }

  deleteNode(node: LinkedListNode): void {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (node.back === null) {
      // Node is the head
      this.head = node.next;
      if (node.next !== null) {
        node.next.back = null;
      }
    } else if (node.next === null) {
      // Node is the tail
      this.tail = node.back;
      node.back.next = null;
    } else {
      // Node is in the middle
      node.back.next = node.next;
      node.next.back = node.back;
    }
  }
}

// Main execution block

const main = () => {
  let first = new LinkedListNode(1);
  let second = new LinkedListNode(2);
  let third = new LinkedListNode(3);

  third.data = 3;
  third.next = null;

  second.data = 5;
  second.next = third;

  first.data = 1;
  first.next = second;

  const list = new LinkedList();
  list.head = first; // Assuming addHead is implemented like this
  list.tail = third; // Assuming addHead is implemented like this

  console.log("Initial list:");
  list.printList();

  console.log("Inserting 87 after the first node:");
  list.insertAfter(first, 87);
  list.printList();

  let result = list.find(87);
  if (result !== null) result.data = 99;

  console.log("Updated list with 99:");
  list.printList();

  console.log("Inserting 66 before the first node:");
  list.insertBefore(first, 66);
  list.printList();

  console.log("Inserting 44 before the node with 99:");
  result !== null && list.insertBefore(result, 44);
  list.printList();

  console.log("Deleting the node with 99:");
  result !== null && list.deleteNode(result);
  list.printList();
};

main();
