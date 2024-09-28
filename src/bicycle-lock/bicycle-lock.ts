/**
 * @summary BicycleLock
 * You have a bicycle lock.
 * The locking mechanism consists of several dials.
 * Each dial contains the digits 0-9 in a cycle, in this order.
 *
 * Each dial can be rotated in either direction:
 * - Rotating the dial one step in the positive direction (denoted '+') increments the digit shown.
 * -- E.g., if the dial currently shows 4 and you make the '+' rotation, the dial will now show 5.
 * --  After the digit 9 comes the digit 0 again.
 * - Rotating the dial one step in the negative direction (denoted '-') does the opposite.
 * -- E.g., the '-' rotation will change a dial showing 5 into a dial showing 4,
 * -- and it will change a dial showing 0 into a dial showing 9.
 *
 * Your finger is currently on the leftmost dial.
 * You can use it to rotate the dial it's on.
 * You can also move your finger one dial to the right (denoted '>') or one dial to the left (denoted '<').
 * You can only move your finger if the destination dial actually exists.
 *
 * You would like to scramble your lock into a state where all of the digits shown on the dials are mutually distinct.
 * Find any sequence of at most 100 actions that accomplishes this goal, and return it as a String[].
 *
 * @param {number[]} dials - The digits currently shown on the dials of your lock, from the left to the right.
 *
 * @returns {string}
 * A sequence of at most 100 actions that will scramble the lock into a state where all of the digits shown on the dials are mutually distinct.
 *
 * @constriants
 * **dials** will contain between 1 and 10 elements, inclusive.
 * Each element of **dials** will be between 0 and 9, inclusive.
 */

export enum ACTIONS {
  MOVE_RIGHT = ">",
  MOVE_LEFT = "<",
  INCREMENT = "+",
  DECREMENT = "-",
}

export class BicycleLock {
  private static readonly MAX_ACTIONS = 100;
  private static readonly DIGITS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  public validateDials = (dials: number[]): void => {
    if (dials.length < 1 || dials.length > 10) {
      throw new Error("The dials should have between 1 and 10 elements");
    }
    if (!dials.every((dial) => dial >= 0 && dial <= 9)) {
      throw new Error("Each dial should be between 0 and 9");
    }
  };

  public getUnusedDials = (dials: number[]): number[] => {
    const usedDials = new Set<number>(dials);
    const unusedDials: number[] = [];

    for (let i = 0; i < 10; i++) {
      if (!usedDials.has(i)) {
        unusedDials.push(i);
      }
    }
    return unusedDials;
  };

  public isScramble = (dials: number[]): boolean => {
    const usedDials = new Set<number>(dials);
    return usedDials.size === dials.length;
  };

  public isUniqueDigit = (digit: number, dials: number[]): boolean => {
    return dials.filter((dial) => dial === digit).length === 1;
  };

  public getNearestUnusedDialDistance = (
    dial: number,
    unusedDials: number[],
  ): number[] => {
    let minDistance: number = 10;
    let minValue = unusedDials[0];

    unusedDials.forEach((value) => {
      const minDiff = this.getDifference(dial, value);

      if (Math.abs(minDiff) < Math.abs(minDistance)) {
        minDistance = minDiff;
        minValue = value;
      }
    });

    return [minDistance, minValue];
  };

  public getDifference = (target: number, value: number) => {
    const diff = target - value;
    const absDiff = Math.abs(diff);
    const alterDiff = 10 - absDiff;

    if (Math.min(absDiff, alterDiff) === absDiff) {
      return diff * -1;
    }

    return diff > 0 ? alterDiff : alterDiff * -1;
  };

  public resolveAction = (actions: string, action: ACTIONS, times = 1) => {
    if (action === ACTIONS.MOVE_LEFT || action === ACTIONS.MOVE_RIGHT)
      return actions.concat(action);

    return actions.concat(action.repeat(times));
  };

  public getScrambleActions = (dials: number[]): string => {
    this.validateDials(dials);

    if (this.isScramble(dials)) return "";

    let actions: string = "";

    let unusedDials = this.getUnusedDials(dials);

    for (let i = 0; i < dials.length; i++) {
      const dial = dials[i];

      if (!this.isUniqueDigit(dial, dials)) {
        const [distance, value] = this.getNearestUnusedDialDistance(
          dial,
          unusedDials,
        );

        actions = this.resolveAction(
          actions,
          distance > 0 ? ACTIONS.INCREMENT : ACTIONS.DECREMENT,
          Math.abs(distance),
        );

        dials[i] = value;
        unusedDials = unusedDials.filter((dial) => dial !== value);
      }

      if (this.isScramble(dials)) return actions;

      actions = this.resolveAction(actions, ACTIONS.MOVE_RIGHT);
    }

    if (actions.length > BicycleLock.MAX_ACTIONS) {
      throw new Error(
        `It can't be made in less than ${BicycleLock.MAX_ACTIONS}`,
      );
    }

    return actions;
  };
}
