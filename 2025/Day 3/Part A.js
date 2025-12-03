import { getFileData } from '../../helpers/index.js';

// In 987654321111111, you can make the largest joltage possible, 98, by turning on the first two batteries.
// In 811111111111119, you can make the largest joltage possible by turning on the batteries labeled 8 and 9, producing 89 jolts.
// In 234234234234278, you can make 78 by turning on the last two batteries (marked 7 and 8).
// In 818181911112111, the largest joltage you can produce is 92.
// The total output joltage is the sum of the maximum joltage from each bank, so in this example, the total output joltage is 98 + 89 + 78 + 92 = 357.

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const banks = data.map((line) => line.split('').map(Number));

	let sum = 0;

	for (const bank of banks) {
		const firstMax = Math.max(...bank.slice(0, bank.length - 1));
		const firstMaxIndex = bank.indexOf(firstMax);
		const secondMax = Math.max(...bank.slice(firstMaxIndex + 1));
		const max = firstMax * 10 + secondMax;
		sum += max;
	}

	console.log(puzzle, sum);
};

run('sample');
run('puzzle');
