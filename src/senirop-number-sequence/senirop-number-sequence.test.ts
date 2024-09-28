import { afterAll, describe, expect, it, vi } from "vitest";
import { SeniropNumberSequence } from "./senirop-number-sequence";

describe("senirop-number-sequence tests", () => {
  const consoleLogSpy = vi
    .spyOn(console, "log")
    .mockImplementation(() => undefined);

  afterAll(() => {
    consoleLogSpy.mockReset();
  });

  describe("When validateInputNumbersRange is called", () => {
    it("should throw an error if start is less than 1 or more than 100", () => {
      expect(() =>
        SeniropNumberSequence.validateInputNumbersRange(-1, 10),
      ).toThrowError("Start must be between 1 and 100");

      expect(() =>
        SeniropNumberSequence.validateInputNumbersRange(101, 10),
      ).toThrowError("Start must be between 1 and 100");
    });

    it("should throw an error if start is more than end", () => {
      expect(() =>
        SeniropNumberSequence.validateInputNumbersRange(10, 1),
      ).toThrowError("Start must be less than or equal to End");
    });

    it("should throw an error if end is or more than 100", () => {
      expect(() =>
        SeniropNumberSequence.validateInputNumbersRange(1, 101),
      ).toThrowError("End must be between 1 and 100");
    });
  });

  describe("When getCaseNumber is called", () => {
    it("should return 'Senir' if the number is divisible by 3", () => {
      expect(SeniropNumberSequence.getCaseNumber(3)).toBe("Senir");
    });

    it("should return 'Op' if the number is divisible by 5", () => {
      expect(SeniropNumberSequence.getCaseNumber(5)).toBe("Op");
    });

    it("should return 'Senir Op' if the number is divisible by 3 and 5", () => {
      expect(SeniropNumberSequence.getCaseNumber(15)).toBe("Senir Op");
    });

    it("should return the number if it is not divisible by 3 or 5", () => {
      expect(SeniropNumberSequence.getCaseNumber(1)).toBe(1);
    });
  });

  describe("When printSeniropSequence is called", () => {
    it("should print the same times as the difference between end and start + 1", () => {
      SeniropNumberSequence.printSeniropSequence(1, 30);
      expect(consoleLogSpy).toHaveBeenCalledTimes(30);

      consoleLogSpy.mockReset();

      SeniropNumberSequence.printSeniropSequence(1, 100);
      expect(consoleLogSpy).toHaveBeenCalledTimes(100);

      consoleLogSpy.mockReset();

      SeniropNumberSequence.printSeniropSequence(1, 1);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);

      consoleLogSpy.mockReset();

      SeniropNumberSequence.printSeniropSequence(37, 56);
      expect(consoleLogSpy).toHaveBeenCalledTimes(20);
    });
  });
});
