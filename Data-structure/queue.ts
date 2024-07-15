//Implemnet DS queue with linked list without built-in methods.

class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class Queue<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size: number = 0;

  // Add an element to the end of the queue
  enqueue(value: T): void {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this._size++;
  }

  // Remove an element from the front of the queue
  dequeue(): T | null {
    if (!this.head) {
      return null;
    }
    const dequeued = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this._size--;
    return dequeued.value;
  }

  // Delete the head node
  deleteHead(): void {
    if (this.head) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this._size--;
    }
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return !this.head;
  }

  // Get the value at the front of the queue without removing it
  peek(): T | null {
    return this.head ? this.head.value : null;
  }

  // Get the number of elements in the queue
  size(): number {
    return this._size;
  }
}

// Create a new queue
const queue = new Queue<number>();

// Test enqueue method
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.size()); // Output: 3

// Test peek method
console.log(queue.peek()); // Output: 1

// Test dequeue method
console.log(queue.dequeue()); // Output: 1
console.log(queue.size()); // Output: 2

// Test deleteHead method
queue.deleteHead();
console.log(queue.size()); // Output: 1

// Test isEmpty method
console.log(queue.isEmpty()); // Output: false

// Dequeue last element
queue.dequeue();
console.log(queue.isEmpty()); // Output: true
