import { getFileData } from '../../helpers/index.js';

// regex to match mul(###,###)
const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);

	const result = data.reduce((acc, line) => {
		// find all mul regex matches
		[...line.matchAll(mulRegex)].forEach((match) => {
			const [_full, a, b] = match;
			acc += +a * +b;
		});
		return acc;
	}, 0);

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
