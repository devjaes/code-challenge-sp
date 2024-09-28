/**
 * @summary NearPalindromeDiv1
 * A string is called a near-palindrome if we can rearrange its characters to make it a palindrome.
 *
 * For example, "aaa", "cocoa" and "xxyyzz" are near-palindromes but "abc" isn't.
 *
 * - You are given a String S of lowercase English letters.
 * - You are allowed to perform a sequence of operations.
 * - In each operation you can choose an index into S and either increment
 *   or decrement the character at that index.
 * - (Incrementing 'a' turns it into 'b', incrementing 'b' gives 'c', ..., and if we increment 'z' we get 'a' again.
 *   - Decrementing is the inverse operation.)
 *
 * - Determine and return the smallest number of operations needed to turn S into a near-palindrome.
 *
 * @param {string} text - A string of lowercase English letters
 * @returns {number} - The smallest number of operations needed to turn the text into a near-palindrome
 *
 * @constraints
 * - **text** will contain between 1 and 2,500 characters, inclusive
 *   - Each character of **text** will be a lowercase English letter ('a'-'z').
 */

export class NearPalindromeDiv1 {
  private static readonly ALPHABET_SIZE = 26;

  private validateLength = (text: string) => {
    if (text.length < 1 || text.length > 2500)
      throw new Error("The text should have 1 to 2500 characters");

    if (!text.match(/^[a-z]+$/)) {
      throw new Error(
        "The text should have only English lowercase letters ('a'-'z')",
      );
    }
  };

  public getMinDistance(a: number, b: number): number {
    const dist1 = Math.abs(a - b);
    const dist2 = NearPalindromeDiv1.ALPHABET_SIZE - dist1;
    return Math.min(dist1, dist2);
  }

  public getPalindromeMoves(text: string): number {
    if (text.length === 1) return 0;

    const freq: number[] = this.getFrequencyByChars(text);

    const oddIndices: number[] = this.getOddIndices(freq);

    if (oddIndices.length <= 1) {
      return 0; // Already a near-palindrome
    }

    let totalOps = 0;
    while (oddIndices.length > 1) {
      let minDist = 13;
      let firstIndex = -1;
      let secondIndex = -1;

      // Find the minimum distance between two odd indices
      for (let i = 0; i < oddIndices.length; i++) {
        for (let j = i + 1; j < oddIndices.length; j++) {
          const dist = this.getMinDistance(oddIndices[i], oddIndices[j]);
          if (dist < minDist) {
            minDist = dist;
            firstIndex = i;
            secondIndex = j;
          }
        }
      }

      totalOps += minDist;

      // Remove the two indices with minimum distance, first greater to avoid index shift
      oddIndices.splice(Math.max(firstIndex, secondIndex), 1);
      oddIndices.splice(Math.min(firstIndex, secondIndex), 1);
    }

    return totalOps;
  }

  public solve = (text: string): number => {
    this.validateLength(text);
    return this.getPalindromeMoves(text);
  };

  public getOddIndices(freq: number[]) {
    const oddIndices: number[] = [];
    for (let i = 0; i < NearPalindromeDiv1.ALPHABET_SIZE; i++) {
      if (freq[i] % 2 !== 0 && freq[i] > 0) {
        oddIndices.push(i);
      }
    }
    return oddIndices;
  }

  public getFrequencyByChars(text: string) {
    const freq: number[] = new Array(NearPalindromeDiv1.ALPHABET_SIZE).fill(0);
    for (const c of text) {
      freq[c.charCodeAt(0) - "a".charCodeAt(0)]++;
    }
    return freq;
  }
}
