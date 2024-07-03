class OurArray<T> {
  resize(source: T[], newSize: number): T[] {
    if (newSize <= 0 || source === null || source.length === newSize) {
      return source;
    }

    let newArray = new Array<T>(newSize).fill(0 as any);
    for (let i = 0; i < Math.min(source.length, newSize); i++) {
      newArray[i] = source[i];
    }

    return newArray;
  }

  getAt(source: T[], index: number): T | null {
    if (index < 0 || index >= source.length) {
      return null;
    }

    return source[index];
  }
}

// Usage
let arr = [4654, 921, 762];
let ourArray = new OurArray<number>();
arr = ourArray.resize(arr, 5);
console.log(arr.join(", ")); // 4654, 921, 762, 0, 0

let item = ourArray.getAt(arr, 1);
console.log(item); // 921
console.log(arr[1]); // 921
