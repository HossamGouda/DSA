class LinkedListNode {
  constructor(_data) {
    this.data = _data;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAfter(node, data) {
    const newNode = new LinkedListNode(data);

    if (node === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = node;
      newNode.next = node.next;
      node.next = newNode;
      if (node === this.tail) {
        this.tail = newNode;
      }
    }
  }

  insertLast(data) {
    const newNode = new LinkedListNode(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  deleteNode(node) {
    if (node === this.head && node === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head = this.head.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  }

  find(data) {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  printList() {
    let current = this.head;

    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
}

let list = new DoubleLinkedList();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);
list.printList();

list.insertAfter(list.find(2), 98);
list.printList();

list.deleteNode(list.find(2));
list.printList();

list.insertLast(76);
list.printList();

list.deleteNode(list.find(1));
list.printList();
