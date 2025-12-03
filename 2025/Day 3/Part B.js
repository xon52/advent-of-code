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

		let remaining = bank.slice(firstMaxIndex);
		let toRemove = remaining.length - 12;

		while (toRemove > 0) {
			let removed = false;
			for (let j = 0; j < remaining.length - 1; j++) {
				if (remaining[j] < remaining[j + 1]) {
					remaining = [...remaining.slice(0, j), ...remaining.slice(j + 1)];
					toRemove--;
					removed = true;
					break;
				}
			}
			if (!removed) {
				remaining = remaining.slice(0, -1);
				toRemove--;
			}
		}

		const max = Number(remaining.join(''));
		sum += max;
	}

	console.log(puzzle, sum);
};

// run('sample');
run('puzzle');
