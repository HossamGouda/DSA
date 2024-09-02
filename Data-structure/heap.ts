class Heap<T> {
  private data_list: (T | null)[];
  private size: number;

  constructor() {
    this.data_list = [];
    this.size = 0;
  }

  insert(data: T) {
    let i = this.size;
    this.data_list[i] = data;
    this.size++;

    let parent_index = Math.floor((i - 1) / 2);
    while (i !== 0 && this.data_list[i]! < this.data_list[parent_index]!) {
      this.data_list[i] = this.data_list[parent_index];
      this.data_list[parent_index] = data;
      i = parent_index;
      parent_index = Math.floor((i - 1) / 2);
    }
  }

  pop(): T | null {
    if (this.size === 0) return null;
    let i = 0;
    const data = this.data_list[i];

    this.data_list[i] = this.data_list[this.size - 1];
    this.data_list[this.size - 1] = null;
    this.size--;

    let left_index = 2 * i + 1;
    while (left_index < this.size) {
      const right_index = 2 * i + 2;

      let smaller_index = left_index;
      if (
        right_index < this.size &&
        this.data_list[right_index]! < this.data_list[left_index]!
      ) {
        smaller_index = right_index;
      }

      if (this.data_list[smaller_index]! >= this.data_list[i]!) {
        break;
      }

      const temp = this.data_list[i];
      this.data_list[i] = this.data_list[smaller_index];
      this.data_list[smaller_index] = temp;

      i = smaller_index;
      left_index = 2 * i + 1;
    }

    return data;
  }

  print() {
    let print_data = "";
    for (let i = 0; i < this.size; i++) {
      print_data += this.data_list[i] + " - ";
    }
    console.log(print_data);
  }

  getSize(): number {
    return this.size;
  }

  draw() {
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
          str += this.data_list[j] + " ".repeat(space_between);
        }
      }
      str += " ".repeat(space) + "\n";
      console.log(str);
    }
  }
}
//usage example

const heap = new Heap();
heap.insert(10);
heap.insert(20);
heap.insert(30);
heap.insert(40);
heap.insert(50);
heap.insert(60);
heap.insert(70);
heap.insert(80);
heap.insert(90);
heap.insert(100);
heap.insert(110);
heap.insert(120);
heap.insert(130);

heap.print();

heap.draw();

heap.pop();

heap.print();

heap.draw();
//Parent = array[(i - 1 ) / 2]
//Left = array[(2 * i) + 1]
//Right = array[(2 * i ) + 2]
