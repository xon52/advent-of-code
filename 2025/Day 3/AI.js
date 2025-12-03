import { getFileData } from '../../helpers/index.js';

// In 987654321111111, the largest joltage can be found by turning on everything except some 1s at the end to produce 987654321111.
// In the digit sequence 811111111111119, the largest joltage can be found by turning on everything except some 1s, producing 811111111119.
// In 234234234234278, the largest joltage can be found by turning on everything except a 2 battery, a 3 battery, and another 2 battery near the start to produce 434234234278.
// In 818181911112111, the joltage 888911112111 is produced by turning on everything except some 1s near the front.
// The total output joltage is now much larger: 987654321111 + 811111111119 + 434234234278 + 888911112111 = 3121910778619.

const run = (puzzle) => {
  const data = getFileData(import.meta, puzzle);
  const banks = data.map((line) => line.split('').map(Number));

  let sum = 0;

  for (const bank of banks) {
    const firstMax = Math.max(...bank.slice(0, bank.length - 12));
    const firstMaxIndex = bank.indexOf(firstMax);

    const remaining = bank.slice(firstMaxIndex);

    // Use greedy algorithm on the remaining segment to select best 12 digits
    // This keeps the "find starting position" idea but uses proper selection
    const toRemove = remaining.length - 12;
    const stack = [];
    let removed = 0;

    for (let i = 0; i < remaining.length; i++) {
      const digit = remaining[i];
      // While we can remove more and current digit is larger than stack top,
      // remove smaller digits from stack to make room for larger ones
      while (
        stack.length > 0 &&
        stack[stack.length - 1] < digit &&
        removed < toRemove
      ) {
        stack.pop();
        removed++;
      }
      stack.push(digit);
    }

    // If we still have more than 12 digits, remove from the end
    while (stack.length > 12) {
      stack.pop();
    }

    const max = Number(stack.join(''));
    sum += max;
    // console.log(max);
  }

  console.log(puzzle, sum);
};

run('sample');
run('puzzle');
