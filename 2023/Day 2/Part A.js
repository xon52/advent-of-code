import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	// Define round counter
	const maxColorCounts = [];
	data.forEach((d, i) => maxColorCounts.push({ game: i + 1, blue: 0, red: 0, green: 0 }));
	// Process data
	const sorted = data.map((e, i) => {
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

	// Get sum of valid games
	let result = 0;
	maxColorCounts.forEach((e) => {
		if (e.blue > 14) return;
		if (e.red > 12) return;
		if (e.green > 13) return;
		result += e.game;
	});
	console.log(puzzle, result);
};

run('sample');
run('puzzle');
