//Greedy Algorithm – Huffman Coding – Code
class HeapNode {
  constructor(data, freq) {
    this.data = data;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

class Huffman {
  constructor(message) {
    this.internal_char = String.fromCharCode(0);
    this.codes = {};
    const freqHash = {};

    // Calculate frequency of each character in the message
    for (const char of message) {
      freqHash[char] = (freqHash[char] || 0) + 1;
    }

    // Create a heap node for each character and add it to min heap
    this.minHeap = [];
    for (const char in freqHash) {
      const freq = freqHash[char];
      const newNode = new HeapNode(char, freq);
      this.minHeap.push([newNode.freq, newNode]);
    }
    this.minHeap.sort((a, b) => a[0] - b[0]);

    // Construct Huffman tree by repeatedly extracting nodes from min heap
    while (this.minHeap.length > 1) {
      const [left_freq, left_node] = this.minHeap.shift();
      const [right_freq, right_node] = this.minHeap.shift();
      const newFreq = left_freq + right_freq;
      const top = new HeapNode(this.internal_char, newFreq);
      top.left = left_node;
      top.right = right_node;
      this.minHeap.push([newFreq, top]);
      this.minHeap.sort((a, b) => a[0] - b[0]);
    }

    // Generate Huffman code for each character
    this.generateCodes(this.minHeap[0][1], "");
  }

  generateCodes(node, code) {
    if (node === null) {
      return;
    }
    if (node.data !== this.internal_char) {
      this.codes[node.data] = code;
    }
    this.generateCodes(node.left, code + "0");
    this.generateCodes(node.right, code + "1");
  }
}

const msg =
  "The output from Huffman's algorithm can be viewed as a variable length code table for encoding a source symbol. The algorithm derives this table from the estimated probability or frequency of occurrence for each possible value of the source symbol. as in other entropy encoding methods, more common symbols are generally represented using fewer bits than less common symbols. Huffman's method can be efficiently implemented, finding a code in time linear to the number of input weights if these weights are sorted. However, although optimal among methods encoding symbols separately, Huffman coding is not always optimal among all compression methods it is replaced with arithmetic coding or asymmetric numeral systems if better compression ratio is required.";
const huff = new Huffman(msg);

for (const k in huff.codes) {
  console.log(k, huff.codes[k]);
}
