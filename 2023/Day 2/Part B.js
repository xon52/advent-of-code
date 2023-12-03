import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	// Define max colour counter
	const maxColorCounts = data.map((d, i) => ({ game: i + 1, blue: 0, red: 0, green: 0 }));
	// Process data
	data.map((e, i) => {
		// Get game
		const splitGame = e.split('Game ')[1].split(': ');
		// Get rounds
		const splitRounds = splitGame[1]
			.split('; ')
			.map((r) => r.split(', '))
			.flat();
		// Get max colour counts for each step
		splitRounds.forEach((r) => {
			const [count, color] = r.split(' ');
			maxColorCounts[i][color] = Math.max(maxColorCounts[i][color], +count);
		});
		// console.log(maxColorCounts);
	});

	// Get powers of each game
	const powers = maxColorCounts.map((e) => e.blue * e.red * e.green);
	// Get sum of all powers
	const result = powers.reduce((prev, curr) => prev + curr, 0);
	console.log(puzzle, result);
};

run('sample');
run('puzzle');
