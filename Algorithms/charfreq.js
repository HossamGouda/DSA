//characters frequencies in a string algorithm ASCII Letters only.

// 1- read the string.
// 2- create an object to store the characters and their frequencies.
// 3- loop over the string.
// 4- if the character is not in the object then add it to the object with value 1.
// 5- if the character is in the object then increment its value by 1.
// 6- return the object.
// 7- time complexity is O(n)
// 8- space complexity is O(n)

//** if we have to use array only :
//**creat array of length =127 .. so that each index represent one char .. the value of the item in each index is the frequency of the char. - for each char in the text , find the proper index by getting the ASCII value of the char then increase the value in that index. - print array*/

//upgrade the algorithm to use th UTF-8 characters.
//using new data structure type hash table >

// function charFreq(message) {
//   let maxCharCode = 0;
//   for (let i = 0; i < message.length; i++) {
//     let current_code = message.charCodeAt(i);
//     if (current_code > maxCharCode) {
//       maxCharCode = current_code;
//     }
//   }

//   let freq = new Array(maxCharCode + 1).fill(0);

//   for (let i = 0; i < message.length; i++) {
//     let current_code = message.charCodeAt(i);
//     if (current_code >= 0 && current_code < freq.length) {
//       freq[current_code]++;
//     } else {
//       console.warn(`Invalid character code: `);
//     }
//   }

//   for (let i = 0; i < freq.length; i++) {
//     let c = String.fromCharCode(i);
//     if (freq[i] > 0) {
//       console.log(`${c} : ${freq[i]}`);
//     }
//   }
// }

// charFreq("hello world");

class CharFreq {
  ASCIIMethod(message) {
    console.log("ASCIIMethod");

    const freq = new Array(127).fill(0);

    // Count the frequency of each ASCII character in the string
    for (let i = 0; i < message.length; i++) {
      const current_code = message.charCodeAt(i);
      freq[current_code] += 1;
    }

    // Print the characters and their corresponding frequencies
    for (let i = 0; i < freq.length; i++) {
      if (freq[i] > 0) {
        const c = String.fromCharCode(i);
        console.log(c, freq[i]);
      }
    }
  }

  AnyCodeMethod(message) {
    console.log("AnyCodeMethod");

    const freq = {};

    // Count the frequency of any character in the string
    for (let i = 0; i < message.length; i++) {
      if (!freq[message[i]]) {
        freq[message[i]] = 1;
      } else {
        freq[message[i]] += 1;
      }
    }

    // Print the characters and their corresponding frequencies
    for (const k in freq) {
      console.log(k, freq[k]);
    }

    this.SortHash(freq);
  }

  SortHash(freq) {
    const freqArray = [];

    // Convert the Hashtable into a 2D integer array
    for (const k in freq) {
      freqArray.push([k.charCodeAt(0), freq[k]]);
    }

    // Sort the array in descending order based on the frequency count
    this.sort(freqArray, 0, freqArray.length - 1);

    console.log("Print Sorted data ...");

    // Print the characters and their corresponding frequencies
    for (let i = 0; i < freqArray.length; i++) {
      console.log(String.fromCharCode(freqArray[i][0]), freqArray[i][1]);
    }
  }

  sort(array, start, end) {
    if (end <= start) {
      return;
    }

    const midpoint = Math.floor((end + start) / 2);
    this.sort(array, start, midpoint);
    this.sort(array, midpoint + 1, end);
    this.merge_(array, start, midpoint, end);
  }

  merge_(array, start, mid, end) {
    // Calculate lengths of two sub-arrays
    const left_length = mid - start + 1;
    const right_length = end - mid;

    // Create temporary sub-arrays
    const left_array = new Array(left_length);
    const right_array = new Array(right_length);

    // Copy data to temporary sub-arrays
    for (let i = 0; i < left_length; i++) {
      left_array[i] = [array[start + i][0], array[start + i][1]];
    }
    for (let j = 0; j < right_length; j++) {
      right_array[j] = [array[mid + 1 + j][0], array[mid + 1 + j][1]];
    }

    // Merge the temporary sub-arrays back into the original array
    let i = 0;
    let j = 0;
    let k = start;
    while (i < left_length && j < right_length) {
      if (left_array[i][1] <= right_array[j][1]) {
        array[k][0] = left_array[i][0];
        array[k][1] = left_array[i][1];
        i += 1;
      } else {
        array[k][0] = right_array[j][0];
        array[k][1] = right_array[j][1];
        j += 1;
      }
      k += 1;
    }

    // Copy the remaining elements of left_array[] if any
    while (i < left_length) {
      array[k][0] = left_array[i][0];
      array[k][1] = left_array[i][1];
      i += 1;
      k += 1;
    }

    // Copy the remaining elements of right_array[] if any
    while (j < right_length) {
      array[k][0] = right_array[j][0];
      array[k][1] = right_array[j][1];
      j += 1;
      k += 1;
    }
  }
}

const msg =
  "The output from Huffman's algorithm can be viewed as a variable length code table for encoding a source symbol. The algorithm derives this table from the estimated probability or frequency of occurrence for each possible value of the source symbol. as in other entropy encoding methods, more common symbols are generally represented using fewer bits than less common symbols. Huffman's method can be efficiently implemented, finding a code in time linear to the number of input weights if these weights are sorted. However, although optimal among methods encoding symbols separately, Huffman coding is not always optimal among all compression methods it is replaced with arithmetic coding or asymmetric numeral systems if better compression ratio is required.";

const cf = new CharFreq();
cf.AnyCodeMethod(msg);
// cf.ASCIIMethod(msg);
