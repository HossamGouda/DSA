class PriorityQueue<T> {
  private data_list: {priority: number; data: T}[] = [];
  private size: number = 0;

  enqueue(priority: number, data: T): void {
    let i = this.size; // Changed to let
    this.data_list[i] = {priority, data};
    this.size++;
    let parent_index = Math.floor((i - 1) / 2);

    while (
      i !== 0 &&
      this.data_list[i].priority < this.data_list[parent_index].priority
    ) {
      const temp = this.data_list[i];
      this.data_list[i] = this.data_list[parent_index];
      this.data_list[parent_index] = temp;
      i = parent_index;
      parent_index = Math.floor((i - 1) / 2);
    }
  }

  dequeue(): [T | null, number | null] {
    if (this.size === 0) return [null, null];
    let i = 0; // Changed to let
    const data = this.data_list[i].data;
    const priority = this.data_list[i].priority;

    // Copy last node to root
    this.data_list[i] = this.data_list[this.size - 1];

    // Delete last node
    this.data_list[this.size - 1] = null as any; // TypeScript does not allow null assignment to object
    this.size--;

    let left_index = 2 * i + 1;

    while (left_index < this.size) {
      const right_index = 2 * i + 2;
      let smaller_index = left_index; // initial value

      if (
        this.data_list[right_index] != null &&
        this.data_list[right_index].priority <
          this.data_list[left_index].priority
      ) {
        smaller_index = right_index;
      }
      if (
        this.data_list[smaller_index].priority >= this.data_list[i].priority
      ) {
        break;
      }

      // Swap
      const temp = this.data_list[i];
      this.data_list[i] = this.data_list[smaller_index];
      this.data_list[smaller_index] = temp;

      i = smaller_index;
      left_index = 2 * i + 1;
    }

    return [data, priority];
  }

  hasData(): boolean {
    return this.size > 0;
  }

  print(): void {
    let print_data = "";
    for (let i = 0; i < this.size; i++) {
      print_data += `${this.data_list[i].data} - `;
    }
    console.log(print_data);
  }

  getSize(): number {
    return this.size;
  }

  draw(): void {
    const levels_count = Math.log2(this.size) + 1;
    const line_width = Math.pow(2, levels_count - 1);

    let j = 0;
    for (let i = 0; i < levels_count; i++) {
      const nodes_count = Math.pow(2, i);
      const space = Math.ceil(line_width - nodes_count / 2);
      let space_between = Math.ceil(levels_count / nodes_count);
      space_between = space_between < 1 ? 1 : space_between;

      const k = j;
      let str = " ".repeat(space + space_between);

      for (; j < k + nodes_count; j++) {
        if (j === this.size) {
          break;
        }
        if (this.data_list[j]) {
          str += `${this.data_list[j].data}[${
            this.data_list[j].priority
          }]${" ".repeat(space_between)}`;
        }
      }
      str += " ".repeat(space) + "\n";
      console.log(str);
    }
  }
}

// Example usage
const queue = new PriorityQueue<number>();
queue.enqueue(5, 24);
queue.enqueue(5, 32);
queue.enqueue(3, 16);
queue.enqueue(3, 45);
queue.enqueue(1, 20);
queue.enqueue(1, 53);
queue.enqueue(2, 14);
queue.enqueue(2, 27);

queue.print();
queue.draw();

while (queue.hasData()) {
  const result = queue.dequeue();
  console.log(`${result[0]}[${result[1]}]`);
}
