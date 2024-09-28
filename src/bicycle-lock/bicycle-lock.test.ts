import { describe, it, expect } from "vitest";
import { BicycleLock, ACTIONS } from "./bicycle-lock";

describe("BicycleLock", () => {
  const bicycleLock = new BicycleLock();
  it("should be defined", () => {
    expect(bicycleLock).toBeDefined();
  });

  describe("when validateDials is called", () => {
    it("should throw an error when dials have less than 1 or more than 10 elements", () => {
      expect(() => bicycleLock.validateDials([])).toThrowError(
        "The dials should have between 1 and 10 elements",
      );
      expect(() =>
        bicycleLock.validateDials([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
      ).toThrowError("The dials should have between 1 and 10 elements");
    });
  });

  describe("getUnusedDials", () => {
    it("should return correct unused dials", () => {
      expect(bicycleLock.getUnusedDials([0, 1, 2])).toEqual([
        3, 4, 5, 6, 7, 8, 9,
      ]);
      expect(bicycleLock.getUnusedDials([9, 8, 7])).toEqual([
        0, 1, 2, 3, 4, 5, 6,
      ]);
    });
  });

  describe("isScramble", () => {
    it("should return true for scrambled dials", () => {
      expect(bicycleLock.isScramble([0, 1, 2, 3])).toBe(true);
    });

    it("should return false for unscrambled dials", () => {
      expect(bicycleLock.isScramble([0, 1, 1, 3])).toBe(false);
    });
  });

  describe("isUniqueDigit", () => {
    it("should return true for unique digit", () => {
      expect(bicycleLock.isUniqueDigit(0, [0, 1, 2, 3])).toBe(true);
    });

    it("should return false for non-unique digit", () => {
      expect(bicycleLock.isUniqueDigit(1, [0, 1, 2, 1])).toBe(false);
    });
  });

  describe("getNearestUnusedDialDistance", () => {
    it("should return correct distance and value", () => {
      expect(bicycleLock.getNearestUnusedDialDistance(5, [1, 7, 9])).toEqual([
        2, 7,
      ]);
      expect(bicycleLock.getNearestUnusedDialDistance(0, [3, 7, 9])).toEqual([
        -1, 9,
      ]);
    });
  });

  describe("getDifference", () => {
    it("should return correct difference", () => {
      expect(bicycleLock.getDifference(5, 7)).toBe(2);
      expect(bicycleLock.getDifference(9, 0)).toBe(1);
      expect(bicycleLock.getDifference(0, 9)).toBe(-1);
    });
  });

  describe("resolveAction", () => {
    it("should append correct actions", () => {
      expect(bicycleLock.resolveAction("", ACTIONS.MOVE_RIGHT)).toBe(">");
      expect(bicycleLock.resolveAction(">", ACTIONS.INCREMENT, 3)).toBe(">+++");
    });
  });

  describe("getScrambleActions", () => {
    it("should return empty string for already scrambled dials", () => {
      expect(bicycleLock.getScrambleActions([0, 1, 2, 3])).toBe("");
    });

    it("should return correct actions for simple cases", () => {
      expect(bicycleLock.getScrambleActions([1, 1, 2])).toBe("-");
      expect(bicycleLock.getScrambleActions([1, 2, 3])).toBe("");
      expect(bicycleLock.getScrambleActions([1, 2, 1])).toBe("-");
    });

    it("should handle complex cases", () => {
      const result = bicycleLock.getScrambleActions([0, 0, 0, 0]);
      expect(result.length).toBeLessThanOrEqual(100);
      expect(bicycleLock.isScramble([0, 1, 2, 3])).toBe(true);
      expect(bicycleLock.isScramble([0, 0, 0, 0])).toBe(false);
    });

    it("should return >>++>- for [3,4,5,2,6,8,5,2]", () => {
      expect(bicycleLock.getUnusedDials([3, 4, 5, 2, 6, 8, 5, 2])).toEqual([
        0, 1, 7, 9,
      ]);
      expect(bicycleLock.getDifference(5, 7)).toBe(2);
      expect(
        bicycleLock.getNearestUnusedDialDistance(5, [0, 1, 7, 9]),
      ).toStrictEqual([2, 7]);
      expect(bicycleLock.getScrambleActions([3, 4, 5, 2, 6, 8, 5, 2])).toBe(
        ">>++>-",
      );
    });
  });
});
