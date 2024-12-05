import { getFileData } from '../../helpers/index.js';

// regexes
const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

// regex to match do()
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;
const combinedRegexes = new RegExp(`(${mulRegex.source})|(${dontRegex.source})|(${doRegex.source})`, 'g');

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	let active = true;

	const result = data.reduce((acc, line) => {
		// find all mul regex matches
		[...line.matchAll(combinedRegexes)].forEach((match) => {
			const [full, str, a, b] = match;
			console.log(full, str, a, b);
			if (full === 'do()') {
				active = true;
				console.log('do()', active);
			} else if (full === "don't()") {
				active = false;
				console.log("don't()", active);
			} else if (active) {
				acc += +a * +b;
				console.log(`mul(${a},${b})`, acc, active);
			}
		});
		return acc;
	}, 0);

	console.log(puzzle, result);
};

// run('sample');
run('puzzle');
