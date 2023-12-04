import { getFileData } from '../../helpers/index.js';

const splitNumbers = (str) =>
	str
		.split(': ')[1]
		.split(' | ')
		.map((e) => [...e.split(' ').filter((g) => g !== '')]);

const findMatches = (winningNumbers, myNumbers) => myNumbers.filter((e) => winningNumbers.includes(e));

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);

	let result = 0;

	data.map((card) => {
		const [winningNumbers, myNumbers] = splitNumbers(card);
		const matches = findMatches(winningNumbers, myNumbers);
		if (matches.length > 0) result += 2 ** (matches.length - 1);
	});

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
