//14 – Hashing – Introduction – FNV-1a Implementation

class Hash {
  public Hash32(str: string): number {
    const OffsetBasis: number = 2166136261;
    const FNVPrime: number = 16777619;
    const data: Uint8Array = new TextEncoder().encode(str);

    let hash: number = OffsetBasis;
    for (let i = 0; i < data.length; i++) {
      hash ^= data[i];
      hash *= FNVPrime;
    }
    console.log(`${str}, ${hash}, ${hash.toString(16)}`);
    return hash >>> 0; // Ensure it's treated as a 32-bit unsigned integer
  }

  public Hash64(str: string): bigint {
    const OffsetBasis: bigint = BigInt(14695981039346656037);
    const FNVPrime: bigint = BigInt(1099511628211);
    const data: Uint8Array = new TextEncoder().encode(str);

    let hash: bigint = OffsetBasis;
    for (let i = 0; i < data.length; i++) {
      hash ^= BigInt(data[i]);
      hash *= FNVPrime;
    }
    console.log(`${str}, ${hash}, ${hash.toString(16)}`);
    return hash;
  }
}

// Main program
const hash = new Hash();
hash.Hash32("This is Original Text");
hash.Hash64("This is Original Text");
