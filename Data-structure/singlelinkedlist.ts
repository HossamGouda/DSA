class LinkedListNode {
  data: number;
  next: LinkedListNode | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListIterator {
  private currentNode: LinkedListNode | null;

  constructor(node: LinkedListNode | null = null) {
    this.currentNode = node;
  }

  data(): number | null {
    return this.currentNode ? this.currentNode.data : null;
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
  private length: number;
  public head: LinkedListNode | null;
  public tail: LinkedListNode | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  AddHead(node: LinkedListNode): void {
    this.head = node;
    this.tail = node;
  }

  InsertLast(data: number): void {
    const newNode = new LinkedListNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this.length++;
  }

  InsertAfter(node: LinkedListNode, data: number): void {
    const newNode = new LinkedListNode(data);
    newNode.next = node.next;
    node.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
    this.length++;
  }

  DeleteNode(node: LinkedListNode): void {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (this.head === node) {
      this.head = node.next;
    } else {
      const parentNode = this.FindParent(node);
      if (parentNode) {
        if (this.tail === node) {
          this.tail = parentNode;
        } else {
          parentNode.next = node.next;
        }
      }
    }
    this.length--;
  }

  DeleteNodeByData(data: number): void {
    const node = this.Find(data);
    if (node !== null) {
      this.DeleteNode(node);
    }
  }

  DeleteHead(): void {
    if (this.head !== null) {
      this.DeleteNode(this.head);
    }
  }

  InsertBefore(node: LinkedListNode, data: number): void {
    const newNode = new LinkedListNode(data);
    newNode.next = node;

    const parentNode = this.FindParent(node);
    if (parentNode === null) {
      this.head = newNode;
    } else {
      parentNode.next = newNode;
    }
    this.length++;
  }

  Find(data: number): LinkedListNode | null {
    for (let itr = this.Begin(); itr.current() !== null; itr.next()) {
      if (itr.data() === data) {
        return itr.current();
      }
    }
    return null;
  }

  FindParent(node: LinkedListNode): LinkedListNode | null {
    for (let itr = this.Begin(); itr.current() !== null; itr.next()) {
      if (itr.current()?.next === node) {
        return itr.current();
      }
    }
    return null;
  }

  GetLengthItr(): number {
    let count = 0;
    for (let itr = this.Begin(); itr.current() !== null; itr.next()) {
      count++;
    }
    return count;
  }

  Length(): number {
    return this.length;
  }

  PrintList(): void {
    for (let itr = this.Begin(); itr.current() !== null; itr.next()) {
      process.stdout.write(itr.data() + " -> ");
    }
    console.log("\n");
  }

  Sum(): number {
    let sum = 0;
    for (let itr = this.Begin(); itr.current() !== null; itr.next()) {
      sum += itr.data()!;
    }
    return sum;
  }

  Begin(): LinkedListIterator {
    return new LinkedListIterator(this.head);
  }
}

// Example usage:

const list = new LinkedList();
list.InsertLast(1);
list.InsertLast(2);
list.InsertLast(3);
console.log("Sum:", list.Sum());
list.PrintList();

list.InsertAfter(list.Find(2)!, 98);
list.PrintList();

list.DeleteNodeByData(2);
list.PrintList();

list.InsertBefore(list.Find(98)!, 76);
list.PrintList();

list.DeleteNodeByData(1);
list.PrintList();
