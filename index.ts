import { SeniropNumberSequence } from "./src/senirop-number-sequence/senirop-number-sequence";
import { NearPalindromeDiv1 } from "./src/near-palindrome/near-palindrome";
import { BicycleLock } from "./src/bicycle-lock/bicycle-lock";

const printExercise = (exerciseName: string, exerciseMethod: () => void) => {
  console.log(`---------------------${exerciseName}----------------------`);

  console.log("\n\n");
  exerciseMethod();
  console.log("\n\n");

  console.log(
    "-------------------------------------------------------------------",
  );
};

printExercise(
  "Senirop Number Sequence",
  SeniropNumberSequence.printSeniropSequence,
);

const testNearPalindrome = () => {
  const nearPalindromeDiv1 = new NearPalindromeDiv1();
  console.log(nearPalindromeDiv1.solve("abcaba")); //2
  console.log(nearPalindromeDiv1.solve("asjdhhaait")); //5
  return;
};

printExercise("Near Palindrome Div1", testNearPalindrome);

const testBicycleLock = () => {
  const bicycleLock = new BicycleLock();
  console.log(bicycleLock.getScrambleActions([3, 1, 5, 3, 2, 5, 3, 4]));
};

printExercise("BicycleLock", testBicycleLock);
