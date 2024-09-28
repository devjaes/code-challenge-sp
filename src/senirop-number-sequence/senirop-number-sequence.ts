type message = "Senir" | "Op";

/**
 * @summary SeniropNumber
 * Write a program that prints the numbers from 1 to 100.
 * - For multiples of three print "Senir" instead of the number
 * - For the multiples of five print "Op" instead of the number
 * - For numbers which are multiples of both three and five print "Senir Op" instead of the number
 *
 * @params {number} start - The start number of the sequence
 * @params {number} end - The end number
 */
export class SeniropNumberSequence {
  public static validateInputNumbersRange = (
    start: number,
    end: number,
  ): void => {
    if (start < 1 || start > 100) {
      throw new Error("Start must be between 1 and 100");
    }

    if (start > end) {
      throw new Error("Start must be less than or equal to End");
    }

    if (end < 1 || end > 100) {
      throw new Error("End must be between 1 and 100");
    }
  };

  public static getCaseNumber = (num: number): string | number => {
    const res: message[] = [];

    if (num % 3 === 0) res.push("Senir");

    if (num % 5 === 0) res.push("Op");

    return res.length > 0 ? res.join(" ") : num;
  };

  private static printSequenceByRange = (start: number, end: number): void => {
    if (start > end) return;

    console.log(this.getCaseNumber(start));
    return this.printSequenceByRange(start + 1, end);
  };

  public static printSeniropSequence = (start = 1, end = 100) => {
    this.validateInputNumbersRange(start, end);
    this.printSequenceByRange(start, end);
  };
}
