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

class HashTable<TKey extends {toString(): string}, TValue> {
  private entries: (KeyValuePair<TKey, TValue> | null)[];
  private initialSize: number;
  private entriesCount: number;

  constructor() {
    this.initialSize = 3;
    this.entriesCount = 0;
    this.entries = new Array<KeyValuePair<TKey, TValue> | null>(
      this.initialSize
    ).fill(null);
  }

  private GetHash(key: TKey): number {
    const FnvOffsetBasis = 2166136261;
    const FNVPrime = 16777619;

    const data: Uint8Array = new TextEncoder().encode(key.toString());
    let hash: number = FnvOffsetBasis;

    for (let i = 0; i < data.length; i++) {
      hash ^= data[i];
      hash *= FNVPrime;
    }

    hash = Math.abs(hash); // Ensure hash is positive

    console.log(
      `[hash] ${key.toString()} ${hash} ${hash.toString(16)} ${
        hash % this.entries.length
      }`
    );

    return hash % this.entries.length;
  }

  private CollisionHandling(key: TKey, hash: number, set: boolean): number {
    let newHash: number;
    for (let i = 1; i < this.entries.length; i++) {
      newHash = (hash + i) % this.entries.length;

      console.log(`[coll] ${key.toString()} ${hash}, new hash: ${newHash}`);
      if (
        set &&
        (this.entries[newHash] === null || this.entries[newHash]?.Key === key)
      ) {
        return newHash;
      } else if (!set && this.entries[newHash]?.Key === key) {
        return newHash;
      }
    }
    return -1;
  }

  private AddToEntries(key: TKey, value: TValue): void {
    let hash = this.GetHash(key);
    if (this.entries[hash] !== null && this.entries[hash]?.Key !== key) {
      hash = this.CollisionHandling(key, hash, true);
    }
    if (hash === -1) {
      throw new Error("Invalid Hashtable!!!!");
    }
    if (this.entries[hash] === null) {
      const newPair = new KeyValuePair<TKey, TValue>(key, value);
      this.entries[hash] = newPair;
      this.entriesCount++;
    } else if (this.entries[hash]?.Key === key) {
      this.entries[hash]!.Value = value;
    } else {
      throw new Error("Invalid Hashtable!!!!");
    }
  }

  public ResizeOrNot(): void {
    if (this.entriesCount < this.entries.length) {
      return;
    }

    const newSize = this.entries.length * 2;
    console.log(`[resize] from ${this.entries.length} to ${newSize}`);

    const entriesCopy = [...this.entries];
    this.entries = new Array<KeyValuePair<TKey, TValue> | null>(newSize).fill(
      null
    );
    this.entriesCount = 0;

    for (const entry of entriesCopy) {
      if (entry !== null) {
        this.AddToEntries(entry.Key, entry.Value);
      }
    }
  }

  public Set(key: TKey, value: TValue): void {
    this.ResizeOrNot();
    this.AddToEntries(key, value);
  }

  public Get(key: TKey): TValue | undefined {
    let hash = this.GetHash(key);
    if (this.entries[hash] !== null && this.entries[hash]?.Key !== key) {
      hash = this.CollisionHandling(key, hash, false);
    }

    if (hash === -1 || this.entries[hash] === null) {
      return undefined;
    }

    if (this.entries[hash]?.Key === key) {
      return this.entries[hash]!.Value;
    } else {
      throw new Error("Invalid Hashtable!!!!");
    }
  }

  public Remove(key: TKey): boolean {
    let hash = this.GetHash(key);

    if (this.entries[hash] !== null && this.entries[hash]?.Key !== key) {
      hash = this.CollisionHandling(key, hash, false);
    }

    if (
      hash === -1 ||
      this.entries[hash] === null ||
      this.entries[hash]?.Key !== key
    ) {
      return false; // Key not found
    }

    // Remove the entry
    console.log(`[remove] Removing key: ${key.toString()}`);
    this.entries[hash] = null;
    this.entriesCount--;

    // Rehashing to handle collisions
    for (let i = 1; i < this.entries.length; i++) {
      const nextIndex = (hash + i) % this.entries.length;
      if (this.entries[nextIndex] === null) break; // Stop rehashing when we hit an empty slot

      const rehashedKey = this.entries[nextIndex]?.Key;
      const rehashedValue = this.entries[nextIndex]?.Value;

      // Reinsert the entry
      if (rehashedKey !== undefined && rehashedValue !== undefined) {
        console.log(`[rehash] Re-inserting key: ${rehashedKey.toString()}`);
        this.entries[nextIndex] = null; // Clear the current slot
        this.AddToEntries(rehashedKey, rehashedValue); // Re-add the entry
      }
    }

    return true; // Key successfully removed
  }

  public Size(): number {
    return this.entriesCount;
  }

  public Print(): void {
    console.log("-----------");
    console.log(`[Size] ${this.Size()}`);

    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] === null) {
        console.log(`[${i}] null`);
      } else {
        console.log(`[${i}] ${this.entries[i]?.Key}:${this.entries[i]?.Value}`);
      }
    }

    console.log("============");
  }
}

// Main program
// Main program
const table = new HashTable<string, string>();
table.Print();
table.Set("Sinar", "sinar@gmail.com");
table.Set("Elvis", "elvis@gmail.com");
table.Set("Tane", "tane@gmail.com");
table.Print();
console.log(`[get] ${table.Get("Sinar")}`);
console.log(`[remove] ${table.Remove("Elvis")}`);
table.Print();
console.log(`[get] ${table.Get("Elvis")}`); // Should return undefined
table.Set("Gerti", "gerti@gmail.com");
table.Set("Arist", "arist@gmail.com");
table.Print();
console.log(`[get] ${table.Get("Sinar")}`);
