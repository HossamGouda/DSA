// Impelemnt Stack using Linked List without using built-in methods

class Node {
  constructor(public data: number, public next: Node | null = null) {}
}

class Stack {
  private head: Node | null = null;
  private _length: number = 0; // length of the stack

  push(data: number) {
    const node = new Node(data, this.head);
    this.head = node;
    this._length++;
  } // O(1)

  pop() {
    if (this.head === null) {
      return null;
    }

    const node = this.head;
    this.head = node.next; // O(1)
    this._length--;
    return node.data;
  } // O(1)

  get length() {
    return this._length;
  }

  // Add isEmpty method
  isEmpty() {
    return this._length === 0;
  }

  // Add peek method
  peek() {
    if (this.head === null) {
      return null;
    }
    return this.head.data;
  }
}

// Testing
const stack = new Stack();
console.log(stack.isEmpty()); // true
stack.push(1);
console.log(stack.isEmpty()); // false

stack.push(2);
console.log("PEEK:", stack.peek()); // 2

stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.pop()); // 1
console.log(stack.pop()); // null
console.log(stack.length); // 0

// Time Complexity: O(1)
// Space Complexity: O(1)
