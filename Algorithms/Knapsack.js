// Greedy Algorithm – Fractional Knapsack Problem.

class Knapsack {
  constructor(max_capacity) {
    this.max_capacity = max_capacity;
    this.current_capacity = 0;
    this.total_value = 0;
    this.items = [];
  }

  add_item(new_item) {
    if (new_item.weight > this.max_capacity - this.current_capacity) {
      const diff = this.max_capacity - this.current_capacity;
      new_item.weight = diff;
      new_item.value = diff * new_item.ratio;
    }

    this.items.push(new_item);
    this.current_capacity += new_item.weight;
    this.total_value += new_item.value;
  }
}

class Item {
  constructor(value, weight, name) {
    this.value = value;
    this.weight = weight;
    this.name = name;
    this.ratio = weight !== 0 ? value / weight : 0;
  }
}

function merge_sort(array, start, end) {
  if (end <= start) {
    return;
  }

  const midpoint = Math.floor((end + start) / 2);
  merge_sort(array, start, midpoint);
  merge_sort(array, midpoint + 1, end);
  merge(array, start, midpoint, end);
}

function merge(array, start, midpoint, end) {
  const left_length = midpoint - start + 1;
  const right_length = end - midpoint;

  const left_array = new Array(left_length);
  const right_array = new Array(right_length);

  for (let i = 0; i < left_length; i++) {
    left_array[i] = array[start + i];
  }

  for (let j = 0; j < right_length; j++) {
    right_array[j] = array[midpoint + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = start;

  while (i < left_length && j < right_length) {
    if (left_array[i].ratio > right_array[j].ratio) {
      array[k] = left_array[i];
      i++;
    } else {
      array[k] = right_array[j];
      j++;
    }
    k++;
  }

  while (i < left_length) {
    array[k] = left_array[i];
    i++;
    k++;
  }

  while (j < right_length) {
    array[k] = right_array[j];
    j++;
    k++;
  }
}

function print_items(bag) {
  console.log("----------------------------");
  console.log("total value:", bag.total_value);
  console.log("current capacity:", bag.current_capacity);
  console.log("items:");
  console.log("n\tv\tw");
  for (let i = 0; i < bag.items.length; i++) {
    const item = bag.items[i];
    console.log(`${item.name}\t${item.value}\t${item.weight}`);
  }
}

function print_array(items) {
  console.log("n\tv\tw\tr");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`${item.name}\t${item.value}\t${item.weight}\t${item.ratio}`);
  }
}

const values = [4, 9, 12, 11, 6, 5];
const weights = [1, 2, 10, 4, 3, 5];
const items = [];

for (let i = 0; i < values.length; i++) {
  const new_item = new Item(values[i], weights[i], "#" + i);
  items.push(new_item);
}

merge_sort(items, 0, items.length - 1);
print_array(items);

let j = 0;
const bag = new Knapsack(12);
while (bag.current_capacity < bag.max_capacity) {
  bag.add_item(items[j]);
  j++;
}

print_items(bag);
