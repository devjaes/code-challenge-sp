import { describe, it, expect } from "vitest";
import { NearPalindromeDiv1 } from "./near-palindrome";

describe("NearPalindromeDiv1", () => {
  const nearPalindrome = new NearPalindromeDiv1();

  it("should be defined", () => {
    expect(nearPalindrome).toBeDefined();
  });

  describe("When text is validated", () => {
    it("should throw an error when text has less than one or more than 2500 characters", () => {
      expect(() => nearPalindrome.solve("a".repeat(2501))).toThrowError(
        "The text should have 1 to 2500 characters",
      );

      expect(() => nearPalindrome.solve("")).toThrowError(
        "The text should have 1 to 2500 characters",
      );
    });

    it("shoud throw an error when the text doesn't have lowercase english characters", () => {
      expect(() => nearPalindrome.solve("á")).toThrowError(
        "The text should have only English lowercase letters ('a'-'z')",
      );
      expect(() => nearPalindrome.solve("A")).toThrowError(
        "The text should have only English lowercase letters ('a'-'z')",
      );
    });
  });

  describe("getFrequencyByChars", () => {
    it("should return correct frequency array for given string", () => {
      const result = nearPalindrome.getFrequencyByChars("abcaba");
      expect(result[0]).toBe(3); // 'a'
      expect(result[1]).toBe(2); // 'b'
      expect(result[2]).toBe(1); // 'c'
      expect(result.slice(3).every((freq) => freq === 0)).toBe(true);
    });

    it("should handle empty string", () => {
      const result = nearPalindrome.getFrequencyByChars("");
      expect(result.every((freq) => freq === 0)).toBe(true);
    });
  });

  describe("getOddIndices", () => {
    it("should return correct indices for odd frequencies", () => {
      const freq = [1, 2, 3, 4, 5];
      expect(nearPalindrome.getOddIndices(freq)).toEqual([0, 2, 4]);
    });

    it("should return empty array when all frequencies are even", () => {
      const freq = [2, 4, 6, 8];
      expect(nearPalindrome.getOddIndices(freq)).toEqual([]);
    });
  });

  describe("When solve is called", () => {
    it("should handle edge cases", () => {
      expect(nearPalindrome.solve("a")).toBe(0);
      expect(nearPalindrome.solve("aa")).toBe(0);
      expect(nearPalindrome.solve("ab")).toBe(1);
      expect(nearPalindrome.solve("z".repeat(2500))).toBe(0);
    });

    it("should return 0 when the text is a palindrome", () => {
      expect(nearPalindrome.solve("a")).toBe(0);
      expect(nearPalindrome.solve("aa")).toBe(0);
      expect(nearPalindrome.solve("aba")).toBe(0);
      expect(nearPalindrome.solve("abba")).toBe(0);
      expect(nearPalindrome.solve("abcba")).toBe(0);
    });

    it("should return the number of moves needed to make the text a palindrome", () => {
      expect(nearPalindrome.solve("abc")).toBe(1);
      expect(nearPalindrome.solve("daddy")).toBe(2);
      expect(nearPalindrome.solve("ddddhkxxxx")).toBe(3);
      expect(nearPalindrome.solve("dddhkxxx")).toBe(9);
      expect(nearPalindrome.solve("ddhkxx")).toBe(3);
      expect(nearPalindrome.solve("cocoa")).toBe(0);
      expect(nearPalindrome.solve("xxyyzz")).toBe(0);
      expect(nearPalindrome.solve("daddt")).toBe(3);
      expect(nearPalindrome.solve("euccatirno")).toBe(15);
    });
  });
});
