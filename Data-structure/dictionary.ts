//13 – KeyValuePair – Dictionary – Implementation
class KeyValuePair<TKey, TValue> {
  private _key: TKey;
  private _value: TValue;

  constructor(key: TKey, value: TValue) {
    this._key = key;
    this._value = value;
  }

  public get Key(): TKey {
    return this._key;
  }

  public get Value(): TValue {
    return this._value;
  }

  public set Value(value: TValue) {
    this._value = value;
  }
}

class Dictionary<TKey, TValue> {
  private entries: (KeyValuePair<TKey, TValue> | null)[];
  private initialSize: number;
  private entriesCount: number;

  constructor() {
    this.initialSize = 3;
    this.entries = new Array<KeyValuePair<TKey, TValue> | null>(
      this.initialSize
    ).fill(null);
    this.entriesCount = 0;
  }

  private ResizeOrNot(): void {
    if (this.entriesCount < this.entries.length - 1) {
      return;
    }

    const newSize = this.entries.length + this.initialSize;
    console.log(`[resize] from ${this.entries.length} to ${newSize}`);

    const newArray = new Array<KeyValuePair<TKey, TValue> | null>(newSize).fill(
      null
    );
    for (let i = 0; i < this.entries.length; i++) {
      newArray[i] = this.entries[i];
    }
    this.entries = newArray;
  }

  public Size(): number {
    return this.entriesCount;
  }

  public Set(key: TKey, value: TValue): void {
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] !== null && this.entries[i]!.Key === key) {
        this.entries[i]!.Value = value;
        return;
      }
    }
    this.ResizeOrNot();
    const newPair = new KeyValuePair<TKey, TValue>(key, value);
    this.entries[this.entriesCount] = newPair;
    this.entriesCount++;
  }

  public Get(key: TKey): TValue | undefined {
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] !== null && this.entries[i]!.Key === key) {
        return this.entries[i]!.Value;
      }
    }
    return undefined;
  }

  public Remove(key: TKey): boolean {
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] !== null && this.entries[i]!.Key === key) {
        this.entries[i] = this.entries[this.entriesCount - 1];
        this.entries[this.entriesCount - 1] = null;
        this.entriesCount--;
        return true;
      }
    }
    return false;
  }

  public Print(): void {
    console.log("----------");
    console.log(`[size] ${this.Size()}`);
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] === null) {
        console.log(`[${i}]`);
      } else {
        console.log(`[${i}]${this.entries[i]!.Key}:${this.entries[i]!.Value}`);
      }
    }
    console.log("==========");
  }
}

// Main program
const dic = new Dictionary<string, string>();
dic.Print();

dic.Set("Sinar", "sinar@gmail.com");
dic.Set("Elvis", "elvis@gmail.com");
dic.Print();

dic.Set("Tane", "tane@gmail.com");
dic.Set("Gerti", "gerti@gmail.com");
dic.Set("Arist", "arist@gmail.com");

dic.Print();

console.log(dic.Get("Tane"));
console.log(dic.Get("Sinar"));
console.log(dic.Get("Elviaaa"));

dic.Remove("Sinar");
dic.Remove("Elvis");
dic.Remove("Tane");
dic.Remove("Gerti");
dic.Remove("Arist");
dic.Print();
dic.Set("Sinar", "sinar@gmail.com");
dic.Print();
